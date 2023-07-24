import $ from "jquery";

export default class Tabs {
    constructor(tabBtnsSelector, tabContentSelector, activeClassForBtn, activeClassForContent, showFirstContentEl = true) {
        this.tabBtns = $(tabBtnsSelector);
        this.tabsContent = $(tabContentSelector);
        this.activeClassForBtn = activeClassForBtn;
        this.activeClassForContent = activeClassForContent;
        this.showFirstContentEl = showFirstContentEl;

        this.allElements = [this.tabBtns, this.tabsContent];
        this.activeTabNum = 0;
    }

    _hideActiveClass(els, className) {
        els.each((idx, el) => $(el).removeClass(className));
    }

    _showActiveClass(els, idx, className) {
        $(els.get(idx)).addClass(className);
    }

    _setEventsForBtns() {
        this.tabBtns.each((idx, btn) => {
            $(btn).on("click", () => {
                const dataIdxContent = parseInt($(btn).data("tab-num-content"));

                this._hideActiveClass(this.tabBtns, this.activeClassForBtn);
                this._showActiveClass(this.tabBtns, idx, this.activeClassForBtn);

                this._hideActiveClass(this.tabsContent, this.activeClassForContent);
                this._showActiveClass(this.tabsContent, dataIdxContent, this.activeClassForContent);
            });
        });
    }

    init() {
        if (!this.allElements.every(Boolean)) {
            return;
        }
        
        if (this.showFirstContentEl) {
            this._showActiveClass(this.tabsContent, 0, this.activeClassForContent);
            this._showActiveClass(this.tabBtns, 0, this.activeClassForBtn);
        }

        this._setEventsForBtns();
    }
}