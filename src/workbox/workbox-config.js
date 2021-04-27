module.exports = {
 globDirectory: "../../dist/base-project",
 globPatterns: [
  "*.{png,svg,jpg,txt,gif,css,js,ico,eot,ttf,woff,json,html,webmanifest}",
  "assets/app/**/*.{png,svg,jpg,ico,gif}"
 ],
 globFollow: true,
 globStrict: true,
 globIgnores: [
  `**/*-es5.js*`,
  "sw.js"
 ],
  // Don't need to cachebust angular files
 dontCacheBustURLsMatching: new RegExp(".+.[a-f0-9]{20}..+"),
 maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
 swDest: "../../dist/base-project/sw.js",
 swSrc: "./swtemplate.js"
};