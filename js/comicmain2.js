alert("comic")

// if (window.location.href.includes("bangumis")) {
//     // return
//     var script1 = document.createElement("script");
//     script1.src = "/js/biliBg/biliBg.js";
//     script1.setAttribute("data-pjax", "");
//     document.head.appendChild(script1);

//     document.querySelector("#page-header.not-top-img").style.height = "100%"
//     document.querySelector("#content-inner").style.transform = "translateY(-60px)"
//     document.querySelector("h1.page-title").style.textAlign = "center"
// }

// if (document.querySelector("h1.page-title").textContent == "茶话会") {
//     // return

//     var script1 = document.createElement("script");
//     script1.src = "/js/biliBg/biliBg.js";
//     script1.setAttribute("data-pjax", "");
//     document.head.appendChild(script1);

//     document.querySelector("#page-header.not-top-img").style.height = "100%"
//     document.querySelector("#content-inner").style.transform = "translateY(-60px)"
//     document.querySelector("h1.page-title").style.textAlign = "center"

//     document.querySelector("#aside-content").style.display = "none"
//     document.querySelector("#page").style.width = "100%"


//     // document.querySelector("#nav").appendChild()

//     // let qo1 =
//     //         `
//     //         <div id="page-site-info">
//     //             <h1 id="site-title" style="animation: 10s linear 0s infinite normal none running light_15px;">茶话会！</h1>
//     //         </div>
//     //     `


//     // let page_site_info = document.createElement("div")
//     // page_site_info.id = "page-site-info"
//     // page_site_info.innerHTML = `<h1 id="site-title" style="animation: 10s linear 0s infinite normal none running light_15px;">茶话会！</h1>`

//     // document.querySelector("#page").removeChild(document.querySelector("h1.page-title"))
//     // // let nav1 = document.querySelector("nav#nav")
//     // // document.querySelector("#page-header").insertBefore(page_site_info, nav1.nextSibling)

//     // document.querySelector("div.bldbanner").appendChild(page_site_info)
// }


// document.addEventListener('DOMContentLoaded', async function fun() {

//     if (document.querySelector("h1.page-title").textContent == "茶话会") {
//         let page_site_info = document.createElement("div")
//         page_site_info.id = "page-site-info"
//         page_site_info.innerHTML = `<h1 id="site-title" style="animation: 10s linear 0s infinite normal none running light_15px;">茶话会！</h1>`

//         document.querySelector("#page").removeChild(document.querySelector("h1.page-title"))
//         // let nav1 = document.querySelector("nav#nav")
//         // document.querySelector("#page-header").insertBefore(page_site_info, nav1.nextSibling)
//     }

// })



// -------------------------------------------------------------
// @ addtobutton.js
let displaybtn = document.createElement("button")
displaybtn.id = "detail-display"
displaybtn.textContent = "显示"
// displaybtn.onclick = btn_detail_show(this)
// displaybtn.click = btn_detail_show(this)

// document.querySelectorAll(".bangumi-info .bangumi-title").forEach(function (item) {
//     item.appendChild(displaybtn)
// })

// document.querySelectorAll(".bangumi-info .bangumi-title").forEach(e => {
//     console.log("1");
//     console.log(e);
//     console.log(e.innerHTML)
// })


// $(".bangumi-info .bangumi-title").forEach(function (item) {
//     item.appendChild(displaybtn)
// })

// document.querySelector(".bangumi-info .bangumi-title").appendChild(displaybtn)

// --------------------------------------------------------------


// document.head.insertAdjacentHTML('beforeBegin', `<script data-pjax src="/js/biliBg/biliBg.js"></script>`);

// document.querySelector("head").insertAdjacentHTML('beforeBegin', `<script data-pjax data1 src="/js/biliBg/biliBg.js"></script>`);





// ---------------------------------------------------------------
// @ addtocomic.js
let background_image_url = 'https://api.adicw.cn/images/6149d0521a778.jpg?path=ComicImg/106&amp;w=400&amp;h=400'
// let background_image_url = '/img/comic/07a2fa07836e0006ba9d6a2d5d0552b23463bb2b.jpg'
// let background_image_url = 'https://i0.hdslb.com/bfs/bangumi/image/07a2fa07836e0006ba9d6a2d5d0552b23463bb2b.jpg'
// let background_image_url = 'https://i0.hdslb.com/bfs/bangumi/image/07a2fa07836e0006ba9d6a2d5d0552b23463bb2b.jpg@260w_350h.webp'
let comic_title = '轻音少女（けいおん！）'
let comic_impress = '简介：新学年开始，高中一年级新生平泽唯在误将“轻音乐”当做了“轻便、简易的音乐”，而由于自己小时候玩响板得到老师表扬，于是萌发申请入部的想法。另一方面，樱丘高中“轻音部”因原来的部员全部毕业离校，此时轻音部新成员只有秋山澪和田井中律两人，无法满足部员至少四人的最低人数要求即将废部，这下该如何是好呢？此外，温柔可爱的千金小姐琴吹䌷被律强拉进入轻音部。于是，这四名高一女生机缘巧合聚在了一起，便有了吉他手平泽唯、贝司手秋山澪、鼓手田井中律以及键盘手琴吹䌷，轻音部的故事也由此展开。'

document.querySelector("#body-wrap").appendChild(addtocomic(`url(${background_image_url})`, background_image_url, comic_title, comic_impress))

function addtocomic(background_image_url, comicmain_cover_url, comic_title, comic_impress) {
    let comicmain = document.createElement("div")
    comicmain.className = 'botload hidden'
    comicmain.id = 'comic'
    comicmain.innerHTML = `
        <div class="comicmain" >
        <span class="breakpage-btn" >
            <i class="el-icon-close"></i>
        </span>
        <div class="comicmain-contain" >
            <div class="comicmain-contain-bg animate__animated animate__lightSpeedInLeft" >
                <div  id="comicmain-contain-bg-url"
                style="background-image:${background_image_url};"
                >
                <!-- style="background-image:${background_image_url};" -->
                <!--    <img src="${comicmain_cover_url}" alt=""> -->
                </div>
            </div>
            <div class="comicmain-contain-context animate__animated animate__lightSpeedInRight" >
                <div class="comicmain-cover "  >
                    <img 
                        id="comicmain-cover-url"
                        src="${comicmain_cover_url}"
                        data-lazy-src="${comicmain_cover_url}"
                        data-src="${comicmain_cover_url}"
                        referrerpolicy="no-referrer"
                        data-ll-status="loaded"
                        class="entered loaded"
                        
                    >
                </div>
                <div class="comicmain-info" >
                    <h3  id="comicmain-title">${comic_title}</h3>
                    <ul class="comicmain-else" >
                        <li ><span >发行日期</span>
                            <p id="comicmain-release_date" >2009.04.02</p>
                        </li>
                    </ul>
                    <ul id="comicmain-tips" class="comicmain-tips" >
                        <li >青春</li>
                        <li >音乐</li>
                        <li >芳文</li>
                        <li >京阿尼</li>
                    </ul>
                    <div id="comicmain-impress" class="comicmain-impress paragraph-truncate" >
                        ${comic_impress}
                    </div>
                    <div class="comicmain-intordu paragraph-truncate"  id="comicmain-intordu"> 点评：K-ON!
                        芳文社、京阿尼代表作之一，呆唯、梓喵、搞事律队、胆小mio、神一般的忧、呆萌大小姐䌷。纯纯的少女与青春，轻音永不散会！
                    </div>
                    <a id="comicmain-href" class="comic-video_source" href="#" target="_blank">
                        <span class="comicmain-href el-icon-data-line" >看番</span>
                    </a>

                    <a id="comicmain-href" class="comic-audio_source" href="/music/?id=812754&server=netease"
                        style="    bottom: 10px;
                        left: calc(100% - 128px);
                        border-radius: 20px;
                    
                        width: 100px;
                        height: 40px;"    
                    >
                        <span class="comicmain-href el-icon-data-line">K-ON</span>
                    </a>
                    
                </div>
            </div>
        </div>
        <div class="comicmain-imglist imgs-unvis" >
            <span id="comic-no_migs" style="color: white;margin: 0 auto;"> 啊嘞，主人好像还没找到喜欢的图片呢~</span>
            <ul class="comicmain-imglist_imgs" id="comicmain-imglist_imgs">
                <li class="comicmain-imglist_imgs_li comicmain-imglist1">
                    <div class="img-card comicmain-imglist_imgs-item " data-fancybox="gallery"  style="height: 215.644px;">
                        <img
                            src="https://api.adicw.cn/images/6149d0521a778.jpg?path=ComicImg/106&amp;w=600&amp;h=600"
                            data-lazy-src="https://api.adicw.cn/images/6149d0521a778.jpg?path=ComicImg/106&amp;w=600&amp;h=600"
                            data-src="https://api.adicw.cn/images/6149d0521a778.jpg?path=ComicImg/106&amp;w=600&amp;h=600"
                            referrerpolicy="no-referrer"
                            data-ll-status="loaded"
                             
                            class="detail-img unvis entered loaded"
                        >


                    </div>
                    <div class="img-card comicmain-imglist_imgs-item" 
                        style="height: 525.95px;"><!----></div>
                    <div class="img-card comicmain-imglist_imgs-item" 
                        style="height: 487.869px;"><!----></div>
                </li>
                <li class="comicmain-imglist_imgs_li comicmain-imglist2">
                    <div class="img-card comicmain-imglist_imgs-item " data-fancybox="gallery" 
                        style="height: 376.51px;"><img
                            src="https://api.adicw.cn/images/6149d06d7a6a9.jpg?path=ComicImg/106&amp;w=600&amp;h=600"
                             class="detail-img unvis"></div>
                    <div class="img-card comicmain-imglist_imgs-item" 
                        style="height: 526.338px;"><!----></div>
                </li>
                <li class="comicmain-imglist_imgs_li comicmain-imglist3">
                    <div class="img-card comicmain-imglist_imgs-item " data-fancybox="gallery" 
                        style="height: 253.037px;"><img
                            src="https://api.adicw.cn/images/6149d06dcaba9.jpg?path=ComicImg/106&amp;w=600&amp;h=600"
                             class="detail-img unvis"></div>
                    <div class="img-card comicmain-imglist_imgs-item" 
                        style="height: 646.957px;"><!----></div>
                    <div class="img-card comicmain-imglist_imgs-item" 
                        style="height: 449.49px;"><!----></div>
                </li>
            </ul>
        </div>
    </div>
    `

    return comicmain
}


// $("#body-wrap").ready(function () {
// document.querySelector("#page").appendChild(addtocomic(`url(${background_image_url})`, background_image_url, comic_title, comic_impress))

// // let meta1 =  <meta name="referrer" content="no-referrer"></meta>
// let meta2 = document.createElement("meta")
// meta2.name = "referrer"
// meta2.content = "no-referrer"

// document.querySelector("body").appendChild(meta2)
// // })

// document.querySelector("#body-wrap").appendChild()


// document.querySelector("h1#site-title").addEventListener('click', e => {
//     console.log("yes")
//     document.querySelector("main.layout").appendChild(comicmain)
// })

// $('#site-title').click(e => {
//     // alert("yes-addtocomic.js")
//     console.log("yes-addtocomic.js")

//     document.querySelector("#body-wrap").appendChild(comicmain)

//     console.log("yes2");

//     // alert("yes2")


// })
// -----------------------------------------------------------

// $(".bangumi-pagination")

// document.querySelector(".bangumi-pagination").childNodes.forEach(item => {
//     item.addEventListener('click', e => {
//         anzhiyu.scrollToDest(0)
//     })
// })

// document.querySelector(".bangumi-pagination").addEventListener('click', e => {
//     anzhiyu.scrollToDest(0)
// })

document.querySelectorAll(".bangumi-button").forEach(item => {
    item.addEventListener('click', e => {
        anzhiyu.scrollToDest(0)
    })
})

// document.querySelector(".bangumi-pagination").childNodes.forEach(item => {
//     item.addEventListener('click', e => {
//         anzhiyu.scrollToDest(0)
//     })
// })



// -------------------------------------------------------------
// @ commicmain.js
const displayButton = document.getElementById('display');
const comicMain = document.getElementById('comic');

// displayButton.addEventListener('click', function () {
//     imgsCon();
// });

// import '/js/addtocomic.js'
// import '/js/addtobutton.js'

// import './addtocomic.js'
// import './addtobutton.js'

$('span.breakpage-btn').click(function () {
    imgsCon();
    anzhiyu.scrollToDest(this.getAttribute("scrollY"))
})

const img_pic_cdn = "https://jsd.cdn.zzko.cn/gh/Azumic/blog_pic@main/comic/cover/"
const img_pic_cloudflare = "https://jsd.cdn.zzko.cn/gh/Azumic/blog_pic@main/comic/cover/"
const img_pic_bendi = '/img/comic/cover/'

function btn_detail_show(element) {
    anzhiyu.scrollToDest(0)
    document.querySelector("span.breakpage-btn").setAttribute("scrollY", document.documentElement.scrollTop || window.pageYOffset)

    const parent_node = element.closest('.bangumi-item');
    let background_image_url = parent_node.querySelector('.bangumi-picture a').getAttribute('href').replace('https://i0.hdslb.com/bfs/bangumi/image/', "/img/comic/cover/") + "@400w_400h.webp"
    let comic_title = parent_node.querySelector('.bangumi-title a').textContent
    let comic_href = parent_node.querySelector('.bangumi-title a').getAttribute('href')
    let comic_tags = parent_node.querySelector('.bangumi-title').getAttribute('comic-tags')
    let comic_impress = parent_node.querySelector('.bangumi-comments p').textContent
    let comic_release_date = parent_node.querySelector('.bangumi-title').getAttribute("comic-release_date")

    let comicmain_intordu

    try {
        comicmain_intordu = bgm_info[comic_title]["intordu"]
    } catch (error) {
        comicmain_intordu = null
    }

    var img_sort_list
    try {
        img_sort_list = sortLists(bgm_info[comic_title]["imglist"])
    } catch (error) {
        img_sort_list = null
    }


    var img_sort_source
    try {
        img_sort_source = sortLists(bgm_info[comic_title]["img_source"])
    } catch (error) {
        img_sort_source = null
    }

    var audio_href
    try {
        audio_href = bgm_info[comic_title]["audio"]
    } catch (error) {
        audio_href = null
    }


    comicmain_intordu = comicmain_intordu ? comicmain_intordu : "主人暂无点评呢，稍后再来看吧~"

    console.group(`background_image_url: ${background_image_url}\ncomic_title: ${comic_title}\ncomic_impress: ${comic_impress}\ncomic_href: ${comic_href}\ncomic_release_date: ${comic_release_date}\ncomic_tags: ${comic_tags}\ncomicmain_intordu: ${comicmain_intordu}\naudio_href: ${audio_href}`)
    console.info("img_sort_list:")
    console.info(img_sort_list)
    console.info("img_sort_source:")
    console.info(img_sort_source)

    console.groupEnd()

    sendComicInfo(background_image_url, comic_title, comic_impress, comic_href, comic_tags, comic_release_date, `点评：${comicmain_intordu}`, img_sort_list, img_sort_source, audio_href)
    imgsCon();

    // url: $0.parentNode.parentNode.previousElementSibling.firstChild.href
}

function sendComicInfo(background_image_url, comic_title, comic_impress, comic_href, commic_tags, comicmain_release_date, comicmain_intordu, img_sort_list, img_sort_source, comic_audio_href) {
    document.getElementById("comicmain-contain-bg-url").style.backgroundImage = `url(${background_image_url})`
    document.getElementById("comicmain-cover-url").setAttribute('src', background_image_url)
    document.getElementById("comicmain-title").innerText = comic_title
    // document.getElementById("comicmain-href").setAttribute('href', comic_href)
    document.querySelector("a.comic-video_source").setAttribute('href', comic_href)
    document.querySelector("a.comic-audio_source").setAttribute('href', comic_audio_href)
    document.getElementById("comicmain-impress").innerText = comic_impress
    document.getElementById("comicmain-release_date").textContent = comicmain_release_date.replace("-", ".").replace("-", ".")

    document.getElementById("comicmain-intordu").textContent = comicmain_intordu


    var tips = document.getElementById("comicmain-tips")
    while (tips.firstChild) {
        tips.removeChild(tips.lastChild);
    }
    commic_tags.split(",").forEach(tag => {
        let li1 = document.createElement("li")
        li1.textContent = tag
        tips.appendChild(li1)
    })

    // return  

    let imglist_html = document.getElementById("comicmain-imglist_imgs")

    if (img_sort_list == null) {
        document.getElementById("comic-no_migs").style.display = "block"
        document.getElementById("comicmain-imglist_imgs").style.display = "none"
    } else {
        document.getElementById("comic-no_migs").style.display = "none"
        document.getElementById("comicmain-imglist_imgs").style.display = "flex"

        // const imageUrl = 'https://example.com/image.jpg'; // 假设这是远程图片的 URL

        // const image = new Image();
        // image.onload = () => {
        //     const width = image.width; // 获取图片宽度
        //     const height = image.height; // 获取图片高度
        //     console.log(`图片宽度: ${width}px, 图片高度: ${height}px`);
        // };
        // image.src = imageUrl;

        // function getRenderHeight(width) {
        //     return 
        // }

        // const columnWidth = 416; // 每列的宽度
        Array.from(imglist_html.getElementsByClassName("comicmain-imglist_imgs_li")).forEach((li, index) => {

            let innerHTML = "";

            img_sort_list[index].forEach((img_url, index1) => {
                // const image = new Image();
                // image.src = img_url;

                // image.onload = () => {
                    // 计算图片容器的高度
                    // const imageContainerHeight = image.height * (columnWidth / image.width);

                    // console.group(`url: ${img_url}\n width: ${image.width}\n height: ${image.height}\n imageContainerHeight: ${imageContainerHeight}`)
                    // console.groupEnd()

                    innerHTML += img_url == "" ? "" : `
                                <div class="img-card comicmain-imglist_imgs-item " data-thumb="${img_url}">
                                    <img data-fancybox="gallery"
                                        src="${img_url}"
                                        data-lazy-src="${img_url}"
                                        data-src="${img_url}"
                                        referrerpolicy="no-referrer"
                                        data-ll-status="loaded"
                                        class="detail-img unvis entered loaded"
                                    >

                                    <a href="${img_sort_source[index][index1]}" class="img_source">
                                        <span>
                                            来源
                                        </span>
                                    </a>
                                </div>
                            `
                // }

                // console.group(`index: ${index}\n index1: ${index1}\n`)
                // console.groupEnd()
            })

            li.innerHTML = innerHTML;
        })
    }

}

function sortLists(imglist) {
    var result = []
    var extractedList1 = imglist.filter((element, index) => index % 3 === 0);
    result.push(extractedList1);
    var extractedList2 = imglist.filter((element, index) => (index + 2) % 3 === 0);
    result.push(extractedList2);
    var extractedList3 = imglist.filter((element, index) => (index + 1) % 3 === 0);
    result.push(extractedList3);
    return result

    // var imglist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    // var result = [[], [], []];

    // for (var i = 0; i < imglist.length; i++) {
    //     result[i % 3].push(imglist[i]);
    // }
    // return result

}

function imgsCon() {
    comicMain.classList.toggle('hidden');
    comicMain.classList.toggle('self-enter-active');

    if ($('.comicmain-imglist').hasClass('imgs-unvis')) {

        setTimeout(function () {
            $('.img-card img').each(function () {
                $(this).removeClass('unvis');
            });
        }, 600)

        $('.comicmain-imglist').removeClass('imgs-unvis');

    } else {

        $('.img-card img').each(function () {
            $(this).addClass('unvis');
        });

        $('.comicmain-imglist').addClass('imgs-unvis');

    }

    // document.querySelector("span.breakpage-btn").getAttribute("scrollY")
}

// $(document).ready(function () {
//   imgVisCon()
// })

function imgVisCon() {
    // anzhiyu.scrollToDest(document.querySelector("span.breakpage-btn").getAttribute("scrollY"))

    setTimeout(function () {
        $('.img-card img').each(function () {
            $(this).removeClass('unvis');
        });
    }, 600)
}
// -------------------------------------------------------------
