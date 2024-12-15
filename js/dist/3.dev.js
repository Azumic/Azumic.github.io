"use strict";

var https = require('https');

var fs = require('fs');

var util = require('util'); // const Axios = require('axios');
// const path = require('path');


var path = require('path');

var readdir = util.promisify(fs.readdir);
var directoryPath = 'source/img/comic/cover/';
var webpFiles = [];
var covers = [];

var imageLinks = require('../_data/bangumis.json');

var options = {
  timeout: 1000 // 设置超时时间为1秒

}; // async function getLocalWebps() {
//     // 读取目录下的所有文件名
//     await fs.readdir(directoryPath, async function (err, files) {
//         if (err) {
//             console.error('读取目录失败:', err);
//             return;
//         }
//         // 筛选出目录下所有的 .webp 格式文件名
//         webpFiles = await files.filter(function (file) {
//             return fs.statSync(path.join(directoryPath, file)).isFile() && path.extname(file).toLowerCase() === '.webp';
//         });
//         console.log('所有 .webp 文件名:', webpFiles);
//     });
// }

function getLocalWebps() {
  var files;
  return regeneratorRuntime.async(function getLocalWebps$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(readdir(directoryPath));

        case 3:
          files = _context2.sent;
          // 筛选出目录下所有的 .webp 格式文件名
          webpFiles = files.filter(function _callee(file) {
            var fileStat;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(fs.statSync(path.join(directoryPath, file)));

                  case 2:
                    fileStat = _context.sent;
                    return _context.abrupt("return", fileStat.isFile() && path.extname(file).toLowerCase() === '.webp');

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });
          console.log("---------------------------\u6240\u6709 .webp \u6587\u4EF6\u540D: ".concat(webpFiles.length), webpFiles);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error('读取目录失败:', _context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

function delay(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

function processCovers() {
  var values1, index, cover_url;
  return regeneratorRuntime.async(function processCovers$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(getLocalWebps());

        case 2:
          // console.log(`webpFiles length: ${webpFiles.length}`);
          values1 = Object.values(imageLinks);
          covers = values1.flatMap(function (element) {
            return element.map(function (element1) {
              return element1.cover;
            });
          }).filter(function (url) {
            var cover_url_name = url.replace("https://i0.hdslb.com/bfs/bangumi/", "").replace('image/', '').concat('@400w_400h.webp'); // console.log(`cover_url_name: ${webpFiles.includes(cover_url_name)} ${cover_url_name}`);

            return !webpFiles.includes(cover_url_name);
          });
          console.log("============================covers length: ".concat(covers.length), covers); // return

          index = 0;

        case 6:
          if (!(index < covers.length)) {
            _context3.next = 18;
            break;
          }

          cover_url = covers[index] + "@400w_400h.webp";
          console.log(cover_url);
          _context3.next = 11;
          return regeneratorRuntime.awrap(sysAD(cover_url));

        case 11:
          if (!(index % 20 === 0 && index !== 0)) {
            _context3.next = 15;
            break;
          }

          console.log('is delaying 5s, is ' + index + ' pictures, now progress: ' + index / covers.length * 100 + '%');
          _context3.next = 15;
          return regeneratorRuntime.awrap(delay(5000));

        case 15:
          index++;
          _context3.next = 6;
          break;

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function sysAD(cover_url) {
  var imgname;
  return regeneratorRuntime.async(function sysAD$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          imgname = cover_url.replace("https://i0.hdslb.com/bfs/bangumi/", "").replace("image/", "");
          _context4.next = 3;
          return regeneratorRuntime.awrap(downloadImg(cover_url, imgname));

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function downloadImg(url, imgname) {
  return new Promise(function (resolve, reject) {
    https.get(url, options, function (res) {
      var imgData = "";
      res.setEncoding("binary"); // 下载图片需要设置为 binary, 否则图片会打不开

      res.on('data', function (chunk) {
        imgData += chunk;
      });
      res.on('end', function () {
        fs.writeFileSync("source/img/comic/cover/".concat(imgname), imgData, "binary");
        console.log('ok ' + imgname);
        resolve();
      });
      res.on('error', function (error) {
        reject(error);
      });
    });
  });
}

processCovers(); // // const https = require('https');
// // const fs = require('fs');
// // const Axios = require('axios');
// // const path = require('path');
// // const imageLinks = require('./bangumis.json');
// // var options = {
// //     timeout: 1000 // 设置超时时间为1秒
// // };
// // const values1 = Object.values(imageLinks);
// // const covers = values1.flatMap((element) =>
// //     element.map((element1) => element1.cover)
// // );
// // function delay(ms) {
// //     return new Promise((resolve) => setTimeout(resolve, ms));
// // }
// // async function processCovers() {
// //     for (let index = 0; index < covers.length; index++) {
// //         const cover_url = covers[index];
// //         console.log(cover_url);
// //         sysAD(cover_url);
// //         if (index % 20 === 0 && index !== 0) {
// //             console.log('Delaying for 2 seconds. Current progress: ' + (index / covers.length * 100) + '%');
// //             await delay(2000);
// //         }
// //     }
// // }
// // function sysAD(cover_url) {
// //     let imgname = cover_url.replace("https://i0.hdslb.com/bfs/bangumi/", "").replace("image/", "")
// //     downloadImg(cover_url, imgname);
// // }
// // function downloadImg(url, imgname) {
// //     https.get(url, options, (res) => {
// //         var imgData = "";
// //         res.setEncoding("binary");  // 下载图片需要设置为 binary, 否则图片会打不开
// //         res.on('data', (chunk) => {
// //             imgData += chunk;
// //         });
// //         res.on('end', () => {
// //             fs.writeFileSync(`./comic/cover/${imgname}`, imgData, "binary");
// //             console.log('ok ' + imgname);
// //         });
// //     });
// // }
// // processCovers();
// var url = 'https://www.baidu.com/img/bd_logo1.png';
// console.log("heelo");
// downloadImg(url, "test.png");
// function downloadImg(url, imgname) {
//     return new Promise((resolve, reject) => {
//         https.get(url, (res) => {
//             var imgData = "";
//             res.setEncoding("binary");  // 下载图片需要设置为 binary, 否则图片会打不开
//             res.on('data', (chunk) => {
//                 imgData += chunk;
//             });
//             res.on('end', () => {
//                 fs.writeFileSync(`source/${imgname}`, imgData, "binary");
//                 console.log('ok ' + imgname);
//                 resolve();
//             });
//             res.on('error', (error) => {
//                 console.log(error);
//                 reject(error);
//             });
//         });
//     });
// }