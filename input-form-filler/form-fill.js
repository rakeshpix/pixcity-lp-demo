/**
 * FormFill — independent module
 * Fills a group of inputs from a single textarea (one line per input).
 *
 * Usage:
 *   import { FormFill } from './form-fill.js';
 *   const ff = new FormFill({ groupClass: 'form-fill-headlines', modalId: 'formFillModal' });
 *   ff.init();
 *   document.querySelector('#openFormFill').addEventListener('click', () => ff.open());
 */

export class FormFill {
  constructor({ groupClass, modalId = 'formFillModal' }) {
    this.groupClass  = groupClass;
    this.modalId     = modalId;
    this._bsModal    = null;
    this._textarea   = null;
    this._errorEl    = null;
    this._counterEl  = null;
  }

  /* ── private helpers ── */

  _inputs() {
    return [...document.querySelectorAll(`.${this.groupClass}`)];
  }

  _validate(lines) {
    const inputs = this._inputs();

    // Ignore a single trailing empty line (natural newline at end of textarea)
    const trimmed = (lines.at(-1) === '') ? lines.slice(0, -1) : lines;

    if (trimmed.length > inputs.length) {
      return {
        ok: false,
        msg: `Too many lines — you entered ${trimmed.length} but only ${inputs.length} field${inputs.length !== 1 ? 's are' : ' is'} available.`
      };
    }

    for (let i = 0; i < trimmed.length; i++) {
      const input  = inputs[i];
      const maxLen = parseInt(input?.getAttribute('maxlength') ?? '-1', 10);
      if (maxLen > 0 && trimmed[i].length > maxLen) {
        return {
          ok: false,
          msg: `Line ${i + 1} is too long — ${trimmed[i].length} / ${maxLen} characters. Please shorten it.`
        };
      }
    }

    return { ok: true };
  }

  _updateCounter() {
    const inputs = this._inputs();
    const lines  = this._textarea.value.split('\n');
    const count  = this._textarea.value === '' ? 0 : lines.length;
    const max    = inputs.length;
    this._counterEl.textContent = `${count} / ${max} lines`;
    this._counterEl.classList.toggle('text-danger', count > max);
    this._counterEl.classList.toggle('text-muted',  count <= max);
  }

  _showError(msg) {
    this._errorEl.textContent = msg;
    this._errorEl.classList.remove('d-none');
    this._textarea.classList.add('is-invalid');
  }

  _clearError() {
    this._errorEl.classList.add('d-none');
    this._textarea.classList.remove('is-invalid');
  }

  /* ── public API ── */

  open() {
    const current = this._inputs().map(i => i.value).join('\n').replace(/\n+$/, '');
    this._textarea.value = current;
    this._clearError();
    this._updateCounter();
    this._bsModal.show();

    document.getElementById(this.modalId).addEventListener(
      'shown.bs.modal',
      () => { this._textarea.focus(); this._textarea.setSelectionRange(9999, 9999); },
      { once: true }
    );
  }

  confirm() {
    const lines  = this._textarea.value.split('\n');
    const result = this._validate(lines);

    if (!result.ok) {
      this._showError(result.msg);
      return;
    }

    const inputs  = this._inputs();
    const trimmed = (lines.at(-1) === '') ? lines.slice(0, -1) : lines;

    trimmed.forEach((line, i) => { if (inputs[i]) inputs[i].value = line; });
    this._bsModal.hide();
  }

  init() {
    const modalEl       = document.getElementById(this.modalId);
    this._bsModal       = new bootstrap.Modal(modalEl);
    this._textarea      = modalEl.querySelector('[data-ff-textarea]');
    this._errorEl       = modalEl.querySelector('[data-ff-error]');
    this._counterEl     = modalEl.querySelector('[data-ff-counter]');

    modalEl.querySelector('[data-ff-confirm]')
      .addEventListener('click', () => this.confirm());

    // Clear error on edit
    this._textarea.addEventListener('input', () => {
      this._clearError();
      this._updateCounter();
    });

    return this;
  }
}
