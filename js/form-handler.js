/**
 * pix.city — Shared Form Handler
 * Handles UTM capture, reCAPTCHA v3, and AJAX submission for all LP pages.
 *
 * Config (set on window before this script loads, or just before):
 *   window.PIX_RECAPTCHA_KEY  — reCAPTCHA v3 site key (optional; skips captcha if absent)
 *
 * Each form needs:
 *   data-pix-form            — opt-in marker (or use id="leadForm" / id="leadFormFinal" legacy)
 *   hidden input name="page_name" — identifies the LP in the API payload
 *
 * UTM fields are auto-injected as hidden inputs if not already present.
 */

(function () {
  "use strict";

  const API_ENDPOINT = "https://qwert.pix.city/api/marketing-lead/en";
  const UTM_KEYS = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
  ];
  const STORAGE_PREFIX = "pix_";
  const SKIP_FIELDS = new Set(["website", "consent"]); // honeypot + consent checkbox

  // ─── UTM capture ────────────────────────────────────────────────────────────

  function captureUtmParams() {
    const params = new URLSearchParams(window.location.search);
    UTM_KEYS.forEach(function (key) {
      const val = params.get(key);
      if (val) {
        try {
          sessionStorage.setItem(STORAGE_PREFIX + key, val);
        } catch (_) {}
      }
    });
  }

  function getStoredUtm(key) {
    try {
      return sessionStorage.getItem(STORAGE_PREFIX + key) || "";
    } catch (_) {
      return "";
    }
  }

  // ─── Inject missing hidden UTM fields into a form ───────────────────────────

  function ensureHiddenField(form, name) {
    var el = form.querySelector('input[name="' + name + '"]');
    if (!el) {
      el = document.createElement("input");
      el.type = "hidden";
      el.name = name;
      form.appendChild(el);
    }
    return el;
  }

  function populateUtmFields(form) {
    UTM_KEYS.forEach(function (key) {
      var el = ensureHiddenField(form, key);
      if (!el.value) el.value = getStoredUtm(key);
    });
  }

  // ─── reCAPTCHA v3 ───────────────────────────────────────────────────────────

  function loadRecaptcha(siteKey, callback) {
    if (window.grecaptcha && window.grecaptcha.execute) {
      callback();
      return;
    }
    var script = document.createElement("script");
    script.src =
      "https://www.google.com/recaptcha/api.js?render=" +
      encodeURIComponent(siteKey);
    script.onload = function () {
      window.grecaptcha.ready(callback);
    };
    document.head.appendChild(script);
  }

  function getRecaptchaToken(siteKey, action, cb) {
    window.grecaptcha.execute(siteKey, { action: action }).then(cb);
  }

  // ─── Form serialisation ──────────────────────────────────────────────────────

  function serializeForm(form) {
    var data = {};
    var elements = form.elements;
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      if (!el.name || SKIP_FIELDS.has(el.name)) continue;
      if ((el.type === "radio" || el.type === "checkbox") && !el.checked)
        continue;
      if (el.type === "submit" || el.type === "button") continue;
      data[el.name] = el.value;
    }
    return data;
  }

  // ─── Success / error UI ─────────────────────────────────────────────────────

  function showSuccess(form) {
    // Pattern 1: explicit success element via data attribute
    var successId = form.dataset.successTarget;
    if (successId) {
      var el = document.getElementById(successId);
      if (el) {
        el.style.display = "";
        el.hidden = false;
      }
    }

    // Pattern 2: sibling success divs (beaulieu-piscines: #formSuccess / #formSuccessFinal)
    var formId = form.id;
    if (formId) {
      var suffix = formId.replace("leadForm", "");
      var successEl = document.getElementById("formSuccess" + suffix);
      if (successEl) {
        // Fill name/phone placeholders if present
        var payload = form._pixPayload || {};
        var nameEl = document.getElementById("successName" + suffix);
        var phoneEl = document.getElementById("successPhone" + suffix);
        if (nameEl && payload.name) nameEl.textContent = payload.name;
        if (phoneEl && payload.phone) phoneEl.textContent = payload.phone;
        successEl.style.display = "";
        successEl.hidden = false;
        form.style.display = "none";
        return;
      }
    }

    // Pattern 3: generic — hide form, show any .form-success sibling
    var parent = form.parentElement;
    var genericSuccess =
      parent && parent.querySelector(".form-success, [data-form-success]");
    if (genericSuccess) {
      genericSuccess.style.display = "";
      genericSuccess.hidden = false;
      form.style.display = "none";
      return;
    }

    // Fallback: replace form content with a thank-you message
    form.innerHTML =
      '<p style="text-align:center;padding:24px 0;font-weight:600;color:inherit">Merci ! Nous vous contacterons très bientôt.</p>';
  }

  function showError(form, message) {
    var errEl = form.querySelector(".pix-form-error");
    if (!errEl) {
      errEl = document.createElement("p");
      errEl.className = "pix-form-error";
      errEl.style.cssText =
        "color:#dc2626;font-size:.8rem;margin-top:8px;text-align:center";
      var btn = form.querySelector('[type="submit"]');
      if (btn) btn.parentNode.insertBefore(errEl, btn.nextSibling);
      else form.appendChild(errEl);
    }
    errEl.textContent =
      message || "Une erreur est survenue. Veuillez réessayer.";
  }

  function setSubmitting(form, isSubmitting) {
    var btn = form.querySelector('[type="submit"]');
    if (!btn) return;
    btn.disabled = isSubmitting;
    if (!form._pixOrigBtnText) form._pixOrigBtnText = btn.textContent;
    btn.textContent = isSubmitting ? "Envoi en cours…" : form._pixOrigBtnText;
  }

  // ─── Core submit handler ─────────────────────────────────────────────────────

  function handleSubmit(form, e) {
    e.preventDefault();
    e.stopPropagation();

    // Clear previous error
    var errEl = form.querySelector(".pix-form-error");
    if (errEl) errEl.textContent = "";

    populateUtmFields(form);

    var payload = serializeForm(form);
    form._pixPayload = payload;

    var siteKey = window.PIX_RECAPTCHA_KEY;

    function doSubmit(recaptchaToken) {
      if (recaptchaToken) payload["g-recaptcha-response"] = recaptchaToken;

      setSubmitting(form, true);

      var xhr = new XMLHttpRequest();
      xhr.open("POST", API_ENDPOINT, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.timeout = 15000;

      xhr.onload = function () {
        setSubmitting(form, false);
        if (xhr.status >= 200 && xhr.status < 300) {
          showSuccess(form);
          // Fire GTM event if dataLayer is available
          if (window.dataLayer) {
            window.dataLayer.push({
              event: "pix_form_success",
              page_name: payload.page_name,
            });
          }
        } else {
          showError(form);
        }
      };

      xhr.onerror = xhr.ontimeout = function () {
        setSubmitting(form, false);
        showError(form);
      };

      xhr.send(JSON.stringify(payload));
    }

    if (siteKey) {
      loadRecaptcha(siteKey, function () {
        getRecaptchaToken(siteKey, "submit", doSubmit);
      });
    } else {
      doSubmit(null);
    }
  }

  // ─── Attach to forms ─────────────────────────────────────────────────────────

  function attachForm(form) {
    if (form._pixAttached) return;
    form._pixAttached = true;

    // Clear any inline onsubmit blocker (e.g. onsubmit="return false;")
    form.onsubmit = null;

    form.addEventListener(
      "submit",
      function (e) {
        handleSubmit(form, e);
      },
      true,
    ); // capture phase — runs before any bubbling listeners
  }

  function init() {
    captureUtmParams();

    // Explicit opt-in: forms with [data-pix-form] attribute or the .cf class
    // (beaulieu-piscines uses its own inline handler and is NOT targeted here)
    var selectors = ["form[data-pix-form]", "form.cf"];
    var seen = new Set();
    selectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (form) {
        if (!seen.has(form)) {
          seen.add(form);
          attachForm(form);
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
