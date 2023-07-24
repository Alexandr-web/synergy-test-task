import Tabs from "../classes/Tabs";

export default () => {
    new Tabs(
        ".how-work-section__header-step .js-tab-step-btn",
        ".js-tab-step-content",
        "step-btn--active",
        "how-work-section__mobile-screen--active"
    ).init();

    new Tabs(
        ".how-work-section__step-header .js-tab-step-btn",
        ".js-tab-step-content",
        "step-btn--active",
        "how-work-section__mobile-screen--active"
    ).init();
};