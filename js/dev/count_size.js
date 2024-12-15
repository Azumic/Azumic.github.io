const config = {
    "arer_size": {
        "中国大陆": 52,
        "日本": 192,
        "未知": 2
    }
}

// var count_size = 0
// Object.values(config.arer_size).forEach(v => {
//     count_size += v
// })


var count_size = Object.values(config.arer_size).reduce((total, v) => total + v, 0);
console.log(count_size);