// 修复链接卡片的指向问题(给出的链接是该站点的SiteIcon的链接)
document.addEventListener('DOMContentLoaded', async function fun() {
    document.querySelectorAll("a.tag-Link").forEach(element => {
        element.href = `${element.querySelector('div.tag-link-sitename').textContent}`
    });
});