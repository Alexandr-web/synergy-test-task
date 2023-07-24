require("globalthis/polyfill")();

const { dest, parallel, watch, src, } = require("gulp");
const plumber = require("gulp-plumber");
const autoprefixer = require("gulp-autoprefixer");
const scss = require("gulp-sass")(require("sass"));
const cleanCss = require("gulp-clean-css");
const concat = require("gulp-concat");
const webpack = require("webpack-stream");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();

const paths = {
    scss: {
        from: "./src/scss/index.scss",
        to: "./dist/css/",
        watchSrc: "./src/scss/**/*.scss",
    },
    html: {
        from: "./src/index.html",
        to: "./dist/",
        watchSrc: "./src/*.html",
    },
    js: {
        from: "./src/js/index.js",
        to: "./dist/js/",
        watchSrc: "./src/js/**/*.js",
    },
    images: {
        from: "./src/images/**/*",
        to: "./dist/images/",
        watchSrc: "./src/images/**/*",
    },
};

const stylesTask = () => {
    return src(paths.scss.from)
        .pipe(plumber())
        .pipe(scss({ outputStyle: "expanded", }))
        .pipe(autoprefixer({
            cascade: true,
            overrideBrowserslist: ["last 5 versions"],
        }))
        .pipe(cleanCss({ level: { 1: { specialComments: 0, }, }, }))
        .pipe(concat("index.css"))
        .pipe(dest(paths.scss.to))
        .pipe(browserSync.stream());
};

const jsTask = () => {
    return src(paths.js.from)
        .pipe(plumber())
        .pipe(webpack({ mode: "development", }))
        .pipe(uglify())
        .pipe(concat("index.js"))
        .pipe(dest(paths.js.to))
        .pipe(browserSync.stream());
};

const htmlTask = () => {
    return src(paths.html.from)
        .pipe(dest(paths.html.to))
        .pipe(browserSync.stream());
};

const imagesTask = () => {
    return src(paths.images.from)
        .pipe(dest(paths.images.to))
        .pipe(browserSync.stream());
};

const server = () => {
    browserSync.init({
        server: {
            port: 3000,
            baseDir: "./dist/",
        },
    });
};

const watching = () => {
    watch(paths.scss.watchSrc, parallel(stylesTask));
    watch(paths.js.watchSrc, parallel(jsTask));
    watch(paths.html.watchSrc, parallel(htmlTask));
    watch(paths.images.watchSrc, parallel(imagesTask));
};

exports.default = parallel(jsTask, stylesTask, htmlTask, imagesTask, watching, server);