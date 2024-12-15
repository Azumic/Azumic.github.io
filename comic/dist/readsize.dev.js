"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var fs = require('fs');

var path = require('path');

var sizeOf = require('image-size');

var pic_path = "E:/My-Buch/blog-pic";
var tuchuang_path = "https://jsd.cdn.zzko.cn/gh/Azumic/blog_pic@main";
var detail_file = "source/comic/detail.json";
var data;
fs.readFile(detail_file, 'utf8', function (err, data1) {
  if (err) {
    console.error('读取文件失败：', err);
    return;
  }

  data = data1;
  readImgSize(data);
});

function readImgSize(data) {
  var oldData;
  return regeneratorRuntime.async(function readImgSize$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          oldData = JSON.parse(data);
          Object.entries(oldData).forEach(function _callee(_ref) {
            var _ref2, key, value, imgwidth, imgInfo;

            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
                    imgwidth = [];
                    imgInfo = {};
                    value.imglist.forEach(function (url, index) {
                      var img_path = url.replace(tuchuang_path, pic_path);
                      var info = getImgSize(img_path);
                      imgInfo[index] = info;
                      imgwidth.push(info.width);
                    });
                    oldData[key].imgwidth = imgwidth;
                    oldData[key].imgInfo = imgInfo; // console.log(value);

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });
          fs.writeFile(detail_file, JSON.stringify(oldData), function (err) {
            if (err) {
              console.error('写入文件失败：', err);
              return;
            }

            console.log('JSON 文件已成功生成！');
          });

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function getImgSize(path1) {
  if (!path1) return "";
  var absolutePath = path.resolve(path1);
  var dimensions = sizeOf(absolutePath);
  return dimensions;
}

function getImageSizeFromFile(filePath) {
  try {
    var absolutePath = path.resolve(filePath);
    var dimensions = sizeOf(absolutePath);
    console.log('图片宽度：', dimensions.width);
    console.log('图片高度：', dimensions.height);
    console.log('图片高度：', dimensions);
  } catch (error) {
    console.error('获取图片尺寸失败：', error);
  }
}

function getImageSizeFromUrl(url) {
  var _ref3, fetch, response, buffer, dimensions;

  return regeneratorRuntime.async(function getImageSizeFromUrl$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Promise.resolve().then(function () {
            return _interopRequireWildcard(require('node-fetch'));
          }));

        case 3:
          _ref3 = _context3.sent;
          fetch = _ref3["default"];
          _context3.next = 7;
          return regeneratorRuntime.awrap(fetch(url));

        case 7:
          response = _context3.sent;
          _context3.next = 10;
          return regeneratorRuntime.awrap(response.buffer());

        case 10:
          buffer = _context3.sent;
          dimensions = sizeOf(buffer);
          console.log('图片宽度：', dimensions.width);
          console.log('图片高度：', dimensions.height);
          _context3.next = 19;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](0);
          console.error('获取图片尺寸失败：', _context3.t0);

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 16]]);
}