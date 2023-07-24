import $ from "jquery";
import initSlider from "./scripts/initSlider";
import changeStateModalMenu from "./scripts/changeStateModalMenu";
import initScrollAnim from "./scripts/initScrollAnim";
import initServiceCalculator from "./scripts/initServiceCalculator";
import initTabs from "./scripts/initTabs";
import Loader from "./classes/Loader";

const loader = new Loader();

$(window).on("DOMContentLoaded", () => loader.show());

$(window).on("load", () => {
    loader.hide();

    initScrollAnim();
    changeStateModalMenu();
    initTabs();
    initServiceCalculator();

    initSlider(".speakers-section__slider", {
        type: "carousel",
        gap: 20,
        breakpoints: {
            767: { perView: 1, },
            768: { perView: 4, },
            1920: { perView: 5, },
        },
    });

    initSlider(".reviews-section__slider", {
        type: "carousel",
        gap: 20,
        breakpoints: {
            767: { perView: 1, },
            768: { perView: 2, },
            1024: { perView: 2, },
            1920: {
                perView: 1,
                peek: { before: 0, after: 250, },
            },
        },
    });
});