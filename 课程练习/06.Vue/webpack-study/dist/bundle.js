/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/_babel-loader@8.0.6@babel-loader/lib/index.js):\\nSyntaxError: D:\\\\Study\\\\课程练习\\\\06.Vue\\\\webpack-study\\\\src\\\\main.js: Support for the experimental syntax 'classProperties' isn't currently enabled (62:15):\\n\\n\\u001b[0m \\u001b[90m 60 | \\u001b[39m  \\u001b[90m// 所谓的静态属性，就是可以直接通过类名，直接进行访问的属性\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 61 | \\u001b[39m  \\u001b[90m// 实例属性： 只能通过类的实例，来访问的属性，叫做实例属性\\u001b[39m\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 62 | \\u001b[39m  static info \\u001b[33m=\\u001b[39m { name\\u001b[33m:\\u001b[39m \\u001b[32m'zs'\\u001b[39m\\u001b[33m,\\u001b[39m age\\u001b[33m:\\u001b[39m \\u001b[35m20\\u001b[39m }\\u001b[0m\\n\\u001b[0m \\u001b[90m    | \\u001b[39m              \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 63 | \\u001b[39m}\\u001b[0m\\n\\u001b[0m \\u001b[90m 64 | \\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 65 | \\u001b[39m\\u001b[90m// 访问 Person 类身上的 info 静态属性\\u001b[39m\\u001b[0m\\n\\nAdd @babel/plugin-proposal-class-properties (https://git.io/vb4SL) to the 'plugins' section of your Babel config to enable transformation.\\n    at Parser.raise (D:\\\\Study\\\\课程练习\\\\06.Vue\\\\webpack-study\\\\node_modules\\\\_@babel_parser@7.5.5@@babel\\\\parser\\\\lib\\\\index.js:6325:17)\\n    at Parser.expectPlugin (D:\\\\Study\\\\课程练习\\\\06.Vue\\\\webpack-study\\\\node_modules\\\\_@babel_parser@7.5.5@@babel\\\\parser\\\\lib\\\\index.js:7647:18)\\n    at Parser.parseClassProperty (D:\\\\Study\\\\课程练习\\\\06.Vue\\\\webpack-study\\\\node_modules\\\\_@babel_parser@7.5.5@@babel\\\\parser\\\\lib\\\\index.js:10830:12)\\n    at Parser.pushClassProperty (D:\\\\Study\\\\课程练习\\\\06.Vue\\\\webpack-study\\\\node_modules\\\\_@babel_parser@7.5.5@@babel\\\\parser\\\\lib\\\\index.js:10795:30)\\n    at Parser.parseClassMemberWithIsStatic (D:\\\\Study\\\\课程练习\\\\06.Vue\\\\webpack-study\\\\node_modules\\\\_@babel_parser@7.5.5@@babel\\\\parser\\\\lib\\\\index.js:10734:14)\\n    at Parser.parseClassMember (D:\\\\Study\\\\课程练习\\\\06.Vue\\\\webpack-study\\\\node_modules\\\\_@babel_parser@7.5.5@@babel\\\\parser\\\\lib\\\\index.js:10668:10)\\n    at D:\\\\Study\\\\课程练习\\\\06.Vue\\\\webpack-study\\\\node_modules\\\\_@babel_parser@7.5.5@@babel\\\\parser\\\\lib\\\\index.js:10623:14\\n    at Parser.withTopicForbiddingContext (D:\\\\Study\\\\课程练习\\\\06.Vue\\\\webpack-study\\\\node_modules\\\\_@babel_parser@7.5.5@@babel\\\\parser\\\\lib\\\\index.js:9702:14)\\n    at Parser.parseClassBody (D:\\\\Study\\\\课程练习\\\\06.Vue\\\\webpack-study\\\\node_modules\\\\_@babel_parser@7.5.5@@babel\\\\parser\\\\lib\\\\index.js:10600:10)\\n    at Parser.parseClass (D:\\\\Study\\\\课程练习\\\\06.Vue\\\\webpack-study\\\\node_modules\\\\_@babel_parser@7.5.5@@babel\\\\parser\\\\lib\\\\index.js:10574:22)\\n    at Parser.parseStatementContent (D:\\\\Study\\\\课程练习\\\\06.Vue\\\\webpack-study\\\\node_modules\\\\_@babel_parser@7.5.5@@babel\\\\parser\\\\lib\\\\index.js:9871:21)\\n    at Parser.parseStatement (D:\\\\Study\\\\课程练习\\\\06.Vue\\\\webpack-study\\\\node_modules\\\\_@babel_parser@7.5.5@@babel\\\\parser\\\\lib\\\\index.js:9829:17)\\n    at Parser.parseBlockOrModuleBlockBody (D:\\\\Study\\\\课程练习\\\\06.Vue\\\\webpack-study\\\\node_modules\\\\_@babel_parser@7.5.5@@babel\\\\parser\\\\lib\\\\index.js:10405:25)\\n    at Parser.parseBlockBody (D:\\\\Study\\\\课程练习\\\\06.Vue\\\\webpack-study\\\\node_modules\\\\_@babel_parser@7.5.5@@babel\\\\parser\\\\lib\\\\index.js:10392:10)\\n    at Parser.parseTopLevel (D:\\\\Study\\\\课程练习\\\\06.Vue\\\\webpack-study\\\\node_modules\\\\_@babel_parser@7.5.5@@babel\\\\parser\\\\lib\\\\index.js:9758:10)\\n    at Parser.parse (D:\\\\Study\\\\课程练习\\\\06.Vue\\\\webpack-study\\\\node_modules\\\\_@babel_parser@7.5.5@@babel\\\\parser\\\\lib\\\\index.js:11270:17)\\n    at parse (D:\\\\Study\\\\课程练习\\\\06.Vue\\\\webpack-study\\\\node_modules\\\\_@babel_parser@7.5.5@@babel\\\\parser\\\\lib\\\\index.js:11306:38)\\n    at parser (D:\\\\Study\\\\课程练习\\\\06.Vue\\\\webpack-study\\\\node_modules\\\\_@babel_core@7.5.5@@babel\\\\core\\\\lib\\\\transformation\\\\normalize-file.js:170:34)\\n    at normalizeFile (D:\\\\Study\\\\课程练习\\\\06.Vue\\\\webpack-study\\\\node_modules\\\\_@babel_core@7.5.5@@babel\\\\core\\\\lib\\\\transformation\\\\normalize-file.js:138:11)\\n    at runSync (D:\\\\Study\\\\课程练习\\\\06.Vue\\\\webpack-study\\\\node_modules\\\\_@babel_core@7.5.5@@babel\\\\core\\\\lib\\\\transformation\\\\index.js:44:43)\\n    at runAsync (D:\\\\Study\\\\课程练习\\\\06.Vue\\\\webpack-study\\\\node_modules\\\\_@babel_core@7.5.5@@babel\\\\core\\\\lib\\\\transformation\\\\index.js:35:14)\\n    at D:\\\\Study\\\\课程练习\\\\06.Vue\\\\webpack-study\\\\node_modules\\\\_@babel_core@7.5.5@@babel\\\\core\\\\lib\\\\transform.js:34:34\\n    at processTicksAndRejections (internal/process/task_queues.js:75:11)\");\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });