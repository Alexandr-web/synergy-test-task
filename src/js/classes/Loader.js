import $ from "jquery";

export default class Loader {
    constructor() {
        this.loader = $(".loader");
        this.page = $(document.body);
    }

    show() {
        this.loader.removeClass("loader--hide");
        this.page.css("overflow", "hidden");
    }

    hide() {
        this.loader.addClass("loader--hide");
        this.page.css("overflow", "auto");
    }
}