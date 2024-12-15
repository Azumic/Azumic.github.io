// let v1 = "1";
// console.log(v1);

// // docker run --gpus all -p 8080:8080 -v $HOME/.tabby:/data tabbyml/tabby serve --model TabbyML/SantaCoder-1B --device cuda

// // 写一个冒泡排序
// function bubbleSort(arr) {
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = 0; j < arr.length - i - 1; j++) {
//             if (arr[j] > arr[j + 1]) {
//                 [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//             }
//         }
//     }
// }

// // 写一个读取图片的尺寸
// function readImageSize(url) {
//     return new Promise(resolve => {
//         const img = new Image()
//         img.onload = () => {
//             resolve({
//                 width: img.width,
//                 height: img.height
//             })
//         }
//         img.src = url
//     })
// }