parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"clu1":[function(require,module,exports) {

},{}],"jZPh":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.fetchTrendingMovies=t,exports.fetchMoviesByName=c,exports.fetchMovieByID=n;const e="https://api.themoviedb.org/3",o="8b67a89c3b3cf87de76d1484537ca872";async function t(){return(await fetch(`${e}/trending/movie/week?api_key=${o}`)).json()}async function c(){console.log("fetchMoviesByName работает")}async function n(){console.log("fetchMovieByID работает")}
},{}],"dqXu":[function(require,module,exports) {
"use strict";var e=require("./fetch_movies");function o(){(0,e.fetchTrendingMovies)().then(e=>console.log(e)).catch(e=>console.error(e))}o();
},{"./fetch_movies":"jZPh"}],"WEsN":[function(require,module,exports) {
"use strict";var e=require("./fetch_movies");(0,e.fetchMoviesByName)();
},{"./fetch_movies":"jZPh"}],"jSeZ":[function(require,module,exports) {
"use strict";var e=require("./fetch_movies");(0,e.fetchMovieByID)();
},{"./fetch_movies":"jZPh"}],"Focm":[function(require,module,exports) {
"use strict";require("./sass/main.scss"),require("./js/section-header"),require("./js/section-gallery"),require("./js/section-footer"),require("./js/fetch_trending_movies"),require("./js/fetch_movies_by_name"),require("./js/fetch_movie_by_id"),require("./js/modal"),require("./js/loader");
},{"./sass/main.scss":"clu1","./js/section-header":"clu1","./js/section-gallery":"clu1","./js/section-footer":"clu1","./js/fetch_trending_movies":"dqXu","./js/fetch_movies_by_name":"WEsN","./js/fetch_movie_by_id":"jSeZ","./js/modal":"clu1","./js/loader":"clu1"}]},{},["Focm"], null)
//# sourceMappingURL=/filmoteka/src.d54e82ab.js.map