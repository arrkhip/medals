const template = (key, value) => `
<p class="order-step__personal-item order-step__personal-item--name">
  <b>${key}:</b> ${value}
</p>
`;

export default class StepsController {
  constructor($form) {
    this.$form = $form;
    this.$steps = [...this.$form.querySelectorAll('.j_step')];
    this.$editBtns = [...this.$form.querySelectorAll('.j_stepEdit')];

    this.$currentStep = this.$steps.find(($step) => $step.classList.contains('current')) || this.$steps[0];
    this.currentIndex = this.$steps.indexOf(this.$currentStep) || 0;

    this.init();
  }

  init() {
    this.open(this.currentIndex);

    this.$form.addEventListener('submit', this.submit.bind(this));
    this.$editBtns.forEach(($editBtn, i) => $editBtn.addEventListener('click', this.open.bind(this, i)));
  }

  submit(e) {
    if (e.submitter.classList.contains('j_stepSubmit')) return false;

    e.preventDefault();

    this.open(this.currentIndex + 1);
    this.addInfo();
  }

  open(index) {
    if (index > this.$steps.length) return;

    this.$steps.forEach(($step, i) => {
      $step.classList.remove('completed', 'current');

      if (i < index) {
        $step.classList.add('completed');
      }

      if (i === index) {
        $step.classList.remove('completed');
        $step.classList.add('current');
      }
    });

    this.currentIndex = index;
    this.$currentStep = this.$steps[this.currentIndex];

    if (index >= this.$steps.length) return;

    this.setRequires();
  }

  setRequires() {
    const $requires = this.$form.querySelectorAll('[data-required]');
    const $currRequires = this.$currentStep.querySelectorAll('[data-required]');

    $requires.forEach(($require) => $require.removeAttribute('required'));
    $currRequires.forEach(($require) => $require.setAttribute('required', 'required'));
  }

  addInfo() {
    const $prevStep = this.$steps[this.currentIndex - 1];
    const $info = $prevStep.querySelector('.j_stepInfo');
    const $html = document.createElement('div');

    const keys = $prevStep.getAttribute('data-keys').split('||');

    keys.forEach((key) => {
      const splitKey = key.split(':');
      const currKey = splitKey[0];
      const separator = splitKey[1];

      const $similarInputs = $prevStep.querySelectorAll(`[data-key="${currKey}"]`);
      let value = '';

      $similarInputs.forEach(($input) => {
        if ($input.type === 'radio' && !$input.checked) {
          return;
        }

        if ($input.tagName === 'SELECT') {
          value += separator + $input.selectedOptions[0].value;
          return;
        }

        value += $input.value + separator;
      });

      $html.innerHTML += template(currKey, value);
    });

    $info.innerHTML = '';
    $info.appendChild($html);
  }

  static init() {
    const $form = document.querySelector('.j_stepsController');

    if ($form) {
      const stepsController = new StepsController($form);
      window.stepsController = stepsController;
    }
  }
}

StepsController.init();
