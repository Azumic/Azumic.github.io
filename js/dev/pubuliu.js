// 假设你有一个包含图片 URL 的数组
const imageUrls = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
    // ...
];

// 假设你有一个容器元素，用于展示图片瀑布流布局
const container = document.getElementById('image-container');

// 定义每列的宽度和间距
const columnWidth = 200; // 每列的宽度
const columnGap = 20; // 列之间的间距

// 定义一个数组来保存每列的高度
const columnHeights = [0, 0, 0]; // 初始时每列的高度都为 0

// 遍历图片 URL 数组
imageUrls.forEach((imageUrl) => {
    // 创建一个图片元素
    const image = new Image();
    image.src = imageUrl;

    // 当图片加载完成后
    image.onload = () => {
        // 找到最短的列
        const shortestColumnHeight = Math.min(...columnHeights);
        const shortestColumnIndex = columnHeights.indexOf(shortestColumnHeight);

        // 计算图片容器的高度
        const imageContainerHeight = image.height * (columnWidth / image.width);

        // 设置图片容器的样式
        const imageContainer = document.createElement('div');
        imageContainer.style.width = `${columnWidth}px`;
        imageContainer.style.height = `${imageContainerHeight}px`;
        imageContainer.style.marginBottom = `${columnGap}px`;
        imageContainer.classList.add('img-card');
        imageContainer.appendChild(image);

        // 将图片容器添加到最短的列
        container.appendChild(imageContainer);

        // 更新最短列的高度
        columnHeights[shortestColumnIndex] += imageContainerHeight + columnGap;
    };
});
