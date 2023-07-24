import $ from "jquery";

export default class ServiceCalculator {
    constructor() {
        this.btnsControls = $(".btn[data-service-calc-btn]");
        this.inputMin = $(".services-section__service-calculator-input[data-calculator-input='value']");
        this.outputRes = $(".services-section__service-calculator-input[data-calculator-input='result']");

        this.min = 50;
        this.num = 49;
        this.result = 0;
    }

    _displayMin() {
        this._checkMin();

        this.inputMin.val(this.min);

        this._displayResult();
    }

    _displayResult() {
        this.result = this.min * this.num;

        this.outputRes.val(this.result);
    }

    _checkMin() {
        this.min = this.min < 0 ? 0 : this.min;
    }

    _setBtnsControlsEvent() {
        this.btnsControls.each((idx, btn) => {
            $(btn).on("click", () => {
                const dataBtn = $(btn).data("service-calc-btn");

                switch (dataBtn) {
                    case "increase":
                        this.min += 1;
                        break;
                    case "decrease":
                        this.min -= 1;
                        break;
                }

                this._displayMin();
            });
        });
    }

    _setEventForInputMin() {
        this.inputMin.on("input", () => {
            const val = parseInt(this.inputMin.val().trim() || "0");

            if (isNaN(val)) {
                return;
            }

            this.min = val;

            this._checkMin();
            this._displayResult();
        });
    }

    init() {
        this._displayMin();
        this._setBtnsControlsEvent();
        this._setEventForInputMin();
    }
}