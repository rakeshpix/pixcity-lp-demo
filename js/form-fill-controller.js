import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["modal", "textarea", "error", "counter", "chevron"]
  static values  = { groupClass: String }

  connect() {
    this._bsModal = new bootstrap.Modal(this.modalTarget)

    // Keep chevron in sync with Bootstrap collapse events
    const collapseEl = this.element.querySelector(".collapse")
    if (collapseEl) {
      collapseEl.addEventListener("hide.bs.collapse", () => this._setChevron(true))
      collapseEl.addEventListener("show.bs.collapse", () => this._setChevron(false))
    }
  }

  disconnect() {
    this._bsModal?.dispose()
  }

  // ── Actions ──────────────────────────────────────────

  open(event) {
    event.stopPropagation()
    const current = this._inputs().map(i => i.value).join("\n").replace(/\n+$/, "")
    this.textareaTarget.value = current
    this._clearError()
    this._updateCounter()
    this._bsModal.show()
    this.modalTarget.addEventListener("shown.bs.modal", () => this.textareaTarget.focus(), { once: true })
  }

  confirm() {
    const lines  = this.textareaTarget.value.split("\n")
    const result = this._validate(lines)
    if (!result.ok) {
      this._showError(result.msg)
      return
    }
    const inputs  = this._inputs()
    const trimmed = lines.at(-1) === "" ? lines.slice(0, -1) : lines
    trimmed.forEach((line, i) => { if (inputs[i]) inputs[i].value = line })
    this._bsModal.hide()
  }

  updateCounter() {
    this._updateCounter()
    this._clearError()
  }

  // ── Private ──────────────────────────────────────────

  _inputs() {
    return [...document.querySelectorAll(`.${this.groupClassValue}`)]
  }

  _validate(lines) {
    const inputs  = this._inputs()
    const trimmed = lines.at(-1) === "" ? lines.slice(0, -1) : lines

    if (trimmed.length > inputs.length) {
      return {
        ok:  false,
        msg: `Too many lines — you entered ${trimmed.length} but only ${inputs.length} field${inputs.length !== 1 ? "s are" : " is"} available.`
      }
    }

    for (let i = 0; i < trimmed.length; i++) {
      const max = parseInt(inputs[i]?.getAttribute("maxlength") ?? "-1", 10)
      if (max > 0 && trimmed[i].length > max) {
        return {
          ok:  false,
          msg: `Line ${i + 1} is too long — ${trimmed[i].length} / ${max} characters. Please shorten it.`
        }
      }
    }

    return { ok: true }
  }

  _showError(msg) {
    this.errorTarget.textContent = msg
    this.errorTarget.classList.remove("d-none")
    this.textareaTarget.classList.add("is-invalid")
  }

  _clearError() {
    this.errorTarget.classList.add("d-none")
    this.textareaTarget.classList.remove("is-invalid")
  }

  _updateCounter() {
    const inputs = this._inputs()
    const val    = this.textareaTarget.value
    const count  = val === "" ? 0 : val.split("\n").length
    const max    = inputs.length
    this.counterTarget.textContent = `${count} / ${max} lines`
    this.counterTarget.classList.toggle("text-danger", count > max)
    this.counterTarget.classList.toggle("text-muted",  count <= max)
  }

  _setChevron(collapsed) {
    if (this.hasChevronTarget) {
      this.chevronTarget.classList.toggle("collapsed", collapsed)
    }
  }
}
