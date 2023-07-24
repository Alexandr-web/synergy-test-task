import $ from "jquery";

export default () => {
    const menu = $(".modal-menu");
    const btnOpenMenu = $("#burger-modal-menu");
    const btnCloseMenu = $("#btn-close-modal-menu");

    btnOpenMenu.on("click", () => menu.addClass("modal-menu--show"));
    btnCloseMenu.on("click", () => menu.removeClass("modal-menu--show"));
};