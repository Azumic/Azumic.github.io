const https = require('https');
const fs = require('fs');
const util = require('util');
// const Axios = require('axios');
const path = require('path');
const readdir = util.promisify(fs.readdir);
const imageLinks = require('../_data/bangumis.json');

const directoryPath = 'source/img/comic/cover/';
let webpFiles = [], covers = []
var options = {
    timeout: 1000 // 设置超时时间为1秒
};

// async function getLocalWebps() {
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

async function getLocalWebps() {
    try {
        // 读取目录下的所有文件名
        // const files = await fs.readdir(directoryPath);
        const files = await readdir(directoryPath);

        // 筛选出目录下所有的 .webp 格式文件名
        webpFiles = files.filter(async function (file) {
            const fileStat = await fs.statSync(path.join(directoryPath, file))
            // const fileStat = await fs.stat(path.join(directoryPath, file));
            // const fileStat = fs.stat(path.join(directoryPath, file));
            return fileStat.isFile() && path.extname(file).toLowerCase() === '.webp';
        });


        console.log(`---------------------------所有 .webp 文件名: ${webpFiles.length}`, webpFiles);
    } catch (err) {
        console.error('读取目录失败:', err);
    }
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function processCovers() {
    await getLocalWebps();
    // console.log(`webpFiles length: ${webpFiles.length}`);

    const values1 = Object.values(imageLinks);
    covers = values1.flatMap((element) =>
        element.map((element1) => element1.cover)
    ).filter(url => {
        let cover_url_name = url.replace("https://i0.hdslb.com/bfs/bangumi/", "").replace('image/', '').concat('@400w_400h.webp');
        // console.log(`cover_url_name: ${webpFiles.includes(cover_url_name)} ${cover_url_name}`);
        return !webpFiles.includes(cover_url_name)
    });

    console.log(`============================covers length: ${covers.length}`, covers);


    // return
    for (let index = 0; index < covers.length; index++) {
        const cover_url = covers[index] + "@400w_400h.webp";
        console.log(cover_url);

        await sysAD(cover_url);

        if (index % 20 === 0 && index !== 0) {
            console.log('is delaying 5s, is ' + index + ' pictures, now progress: ' + (index / covers.length * 100) + '%');
            await delay(5000);
        }
    }
}

async function sysAD(cover_url) {
    let imgname = cover_url.replace("https://i0.hdslb.com/bfs/bangumi/", "").replace("image/", "");

    await downloadImg(cover_url, imgname);
}

function downloadImg(url, imgname) {
    return new Promise((resolve, reject) => {
        https.get(url, options, (res) => {
            var imgData = "";
            res.setEncoding("binary");  // 下载图片需要设置为 binary, 否则图片会打不开

            res.on('data', (chunk) => {
                imgData += chunk;
            });

            res.on('end', () => {
                fs.writeFileSync(`source/img/comic/cover/${imgname}`, imgData, "binary");
                console.log('ok ' + imgname);
                resolve();
            });

            res.on('error', (error) => {
                reject(error);
            });
        });
    });
}

processCovers();







// // const https = require('https');
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