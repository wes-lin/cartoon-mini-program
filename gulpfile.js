const path = require('path');
const gulp = require('gulp');
const del = require('del');
const preprocess = require('gulp-preprocess');
// css优化模块
const cssnano = require('gulp-cssnano');
// 重命名模块
const rename = require('gulp-rename');
const gulpLess = require('gulp-less');
const gulpIf = require('gulp-if');
const nodemon = require('gulp-nodemon');
const aliases = require('gulp-wechat-weapp-src-alisa');
const ci = require('miniprogram-ci');

const { src, dest, series, parallel, watch } = gulp;

const jsPath = ['src/**/*.js', '!src/config/index.js'];
const imgPath = ['src/**/*(*.png|*.jpg|*.jpeg|*.svg|*.gif)'];
const lessPath = ['src/pages/**/*.less', 'src/templates/**/*.less', 'src/components/**/*.less', 'src/app.less'];
const copyPath = [
  'src/app.json', 'src/sitemap.json', 'src/components/**/**.json', 'src/pages/**/**.json',
  'src/**/**.wxss', 'src/templates/**/**.wxss'
];

const wxmlPath = ['src/**/**.wxml'];

const distPath = 'dist';

const pwd = process.cwd();

const _join = (_path = '') => {
  return path.join(pwd, 'src', _path);
};

const aliasConfig = {
  '@Api':_join('api'),
  '@Components':_join('components'),
  '@Utils':_join('utils')
};

const isLessApp = (file) => {
  // file.extname, file.path
  return file.path.indexOf('app') >= 0;
};
const isLess = (file) => {
  return file.path.indexOf('app') < 0;
};

const clean = () => {
  return del([`${distPath}/*`]);
};

const copy = () => {
  return src(copyPath, {base:'src'})
    .pipe(aliases(aliasConfig))
    .pipe(dest(distPath));
};

const templates = () => {
  return src(wxmlPath, {base:'src'})
    .pipe(aliases(aliasConfig))
    .pipe(dest(distPath));
};

const js = () => {
  return src(jsPath, {base:'src'})
    .pipe(aliases(aliasConfig))
    .pipe(dest(distPath));
};

const img = () => {
  return src(imgPath, {base:'src'})
    .pipe(dest(distPath));
};

const less = () => {
  return src(lessPath, {base: 'src'})
    .pipe(gulpLess())
    .pipe(gulpIf(isLessApp, cssnano()))
    .pipe(gulpIf(isLess, cssnano({autoprefixer: false})))
    .pipe(aliases(aliasConfig))
    .pipe(rename(function(path) {
      path.extname = '.wxss';
    }))
    .pipe(dest(distPath));
};

const environment = () => {
  const ENV = process.env.NODE_ENV || 'development';
  const config = require(`./env/${ENV}.js`);
  return src(['src/config/index.js'], {base:'src'})
    .pipe(preprocess({
      context:config
    }))
    .pipe(dest(distPath));
};

const devWatch = () => {
  watch(lessPath, less);
  watch(jsPath, js);
  watch(imgPath, img);
  watch(wxmlPath, templates);
  watch(copyPath, copy);
  // watcher.on('change', function(event) {
  //   // 删除的时候，也更新删除任务到目标文件夹
  //   if (event.type === 'deleted') {
  //     var filepath = event.path;
  //     var filePathFromSrc = path.relative(path.resolve('src'), filepath);
  //     // Concatenating the 'build' absolute path used by gulp.dest in the scripts task
  //     var destFilePath = path.resolve('dist', filePathFromSrc);
  //     del.sync(destFilePath);
  //   }
  // });
};

const demon = (cb) => {
  nodemon({
    script: 'mock/index.js',
    ext: 'js',
    watch:'mock'
  });
  cb();
};

const mock = (cb) => {
  devWatch();
  demon(cb);
};

const miniprogramNpm = () =>  {
  return ci.packNpmManually({
    packageJsonPath: './package.json',
    miniprogramNpmDistDir: `./${distPath}`
  });
};

module.exports = {
  default:series(clean, environment, parallel(less, js, copy, templates, img, miniprogramNpm), devWatch),
  mock:series(clean, environment, parallel(less, js, copy, templates, img, miniprogramNpm), mock),
  build:series(clean, environment, parallel(less, js, copy, templates, img, miniprogramNpm)),
  clean:series(clean)
};