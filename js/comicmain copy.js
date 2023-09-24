alert("comic")

document.querySelectorAll(".bangumi-button").forEach(item => {
    item.addEventListener('click', e => {
        anzhiyu.scrollToDest(0)
    })
})




var img_pic_cdn = "https://cdn.staticaly.com/gh/Azumic/blog_pic@main/comic/cover/"
var img_pic_cloudflare = "https://cdn.staticaly.com/gh/Azumic/blog_pic@main/comic/cover/"
var img_pic_bendi = '/img/comic/cover/'

function btn_detail_show(element) {
    anzhiyu.scrollToDest(0)
    // document.querySelector("span.breakpage-btn").setAttribute("scrollY", document.documentElement.scrollTop || window.pageYOffset)

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

    // sendComicInfo(background_image_url, comic_title, comic_impress, comic_href, comic_tags, comic_release_date, `点评：${comicmain_intordu}`, img_sort_list, img_sort_source, audio_href)
    sendComicInfoPre(background_image_url, comic_title, comic_impress, comic_href, comic_tags, comic_release_date, `点评：${comicmain_intordu}`, img_sort_list, img_sort_source, audio_href, document.documentElement.scrollTop || window.pageYOffset)
    // imgsCon();
}

function sendComicInfoPre(background_image_url, comic_title, comic_impress, comic_href, commic_tags, comicmain_release_date, comicmain_intordu, img_sort_list, img_sort_source, comic_audio_href, scrolly) {
    var comic_contain = `
        <div class="comicmain-contain">
            <div class="comicmain-contain-bg animate__animated animate__lightSpeedInLeft">
                <div id="comicmain-contain-bg-url"
                    style="background-image:url(${background_image_url});">
                </div>
            </div>
            <div class="comicmain-contain-context animate__animated animate__lightSpeedInRight">
                <div class="comicmain-cover ">
                    <img id="comicmain-cover-url"
                        src="${background_image_url}"
                        data-lazy-src="${background_image_url}"
                        data-src="${background_image_url}"
                        referrerpolicy="no-referrer" 
                        data-ll-status="loaded" 
                        class="entered loaded">
                </div>
                <div class="comicmain-info">
                    <h3 id="comicmain-title">${comic_title}</h3>
                    <ul class="comicmain-else">
                        <li><span>发行日期</span>
                            <p id="comicmain-release_date">${comicmain_release_date.replace("-", ".").replace("-", ".")}</p>
                        </li>
                    </ul>
                    <ul id="comicmain-tips" class="comicmain-tips">
                        ${commic_tags.split(",").map(tag => `<li class="${tag}">${tag}</li>`).join("")}
                    </ul>
                    <div id="comicmain-impress" class="comicmain-impress paragraph-truncate">
                        ${comic_impress}
                    </div>
                    <div class="comicmain-intordu paragraph-truncate" id="comicmain-intordu">
                        点评：${comicmain_intordu}    
                    </div>
                    <a id="comicmain-href" class="comic-video_source"
                        href="${comic_href}" target="_blank">
                        <span class="comicmain-href el-icon-data-line">看番</span>
                    </a>
                    <a id="comicmain-href" href="${comic_audio_href}" class="comic-audio_source" style="bottom: 10px; left: calc(100% - 128px); border-radius: 20px; width: 100px; height: 40px;">
                        <span class="comicmain-href el-icon-data-line">K-ON</span>
                    </a>
                </div>
            </div>
        </div>
    `
    var comic_imglist = `
        <div class="comicmain-imglist">
            ${img_sort_list == null ? `<span id="comic-no_migs" style="color: white; margin: 0px auto; display:"block"> 啊嘞，主人好像还没找到喜欢的图片呢~</span>" ` : `${genImgHtml(img_sort_list, img_sort_source)}`}
        </div>
    `
    document.querySelector("#body-wrap").insertAdjacentHTML("beforeend", `
        <div class="botload self-enter-active" id="comic">
            <div class="comicmain">
                <span class="breakpage-btn" scrolly="${scrolly}" onclick="closetInfo(this)">
                    <i class="el-icon-close"></i>
                </span>
                ${comic_contain}
                ${comic_imglist}
            </div>
    `)
}

function genImgHtml(img_sort_list, img_sort_source) {
    var innerHTML1 = "";
    img_sort_list.forEach((img_url_list, index) => {
        let innerHTML = "";
        img_sort_list[index].forEach((img_url, index1) => {
            innerHTML += img_url == "" ? "" : `
                            <div class="img-card comicmain-imglist_imgs-item " data-thumb="${img_url}">
                                <img data-fancybox="gallery"
                                    src="${img_url}"
                                    data-lazy-src="${img_url}"
                                    data-src="${img_url}"
                                    referrerpolicy="no-referrer"
                                    data-ll-status="loaded"
                                    class="detail-img entered loaded"
                                >

                                <a href="${img_sort_source[index][index1]}" class="img_source">
                                    <span>
                                        来源
                                    </span>
                                </a>
                            </div>
                        `
        })
        let liHtml = `<li class="comicmain-imglist_imgs_li comicmain-imglist${index}">${innerHTML}</li>`
        innerHTML1 += liHtml;
    })

    return `
        <ul class="comicmain-imglist_imgs" id="comicmain-imglist_imgs" style="display:"flex";">
            ${innerHTML1}
        </ul>
    `;

    // return Array.from(imglist_html.getElementsByClassName("comicmain-imglist_imgs_li")).forEach((li, index) => {

    //     let innerHTML = "";

    //     img_sort_list[index].forEach((img_url, index1) => {
    //         innerHTML += img_url == "" ? "" : `
    //                         <div class="img-card comicmain-imglist_imgs-item " data-thumb="${img_url}">
    //                             <img data-fancybox="gallery"
    //                                 src="${img_url}"
    //                                 data-lazy-src="${img_url}"
    //                                 data-src="${img_url}"
    //                                 referrerpolicy="no-referrer"
    //                                 data-ll-status="loaded"
    //                                 class="detail-img unvis entered loaded"
    //                             >

    //                             <a href="${img_sort_source[index][index1]}" class="img_source">
    //                                 <span>
    //                                     来源
    //                                 </span>
    //                             </a>
    //                         </div>
    //                     `
    //     })

    //     li.innerHTML = innerHTML;
    // })
}

function sendComicInfo(background_image_url, comic_title, comic_impress, comic_href, commic_tags, comicmain_release_date, comicmain_intordu, img_sort_list, img_sort_source, comic_audio_href) {
    document.getElementById("comicmain-contain-bg-url").style.backgroundImage = `url(${background_image_url})`
    document.getElementById("comicmain-cover-url").setAttribute('src', background_image_url)
    document.getElementById("comicmain-title").innerText = comic_title
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

    // var tags = ""
    // commic_tags.split(",").forEach(tag => {
    // tags += `<li class="${tag}">${tag}</li>`
    // })

    // var tags = commic_tags.split(",").map(tag => `<li class="${tag}">${tag}</li>`).join("");
    // `${commic_tags.split(",").map(tag => `<li class="${tag}">${tag}</li>`).join("")}`

    let imglist_html = document.getElementById("comicmain-imglist_imgs")

    if (img_sort_list == null) {
        document.getElementById("comic-no_migs").style.display = "block"
        document.getElementById("comicmain-imglist_imgs").style.display = "none"
    } else {
        document.getElementById("comic-no_migs").style.display = "none"
        document.getElementById("comicmain-imglist_imgs").style.display = "flex"

        Array.from(imglist_html.getElementsByClassName("comicmain-imglist_imgs_li")).forEach((li, index) => {

            let innerHTML = "";

            img_sort_list[index].forEach((img_url, index1) => {
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
}

function imgsConPre() {
    
}

function closetInfo(element) {
    document.querySelector("#body-wrap").removeChild(document.querySelector("#comic"))
    anzhiyu.scrollToDest(element.getAttribute("scrollY"))
}

function imgsCon() {
    const comicMain = document.getElementById('comic');

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
}

var background_image_url = 'https://api.adicw.cn/images/6149d0521a778.jpg?path=ComicImg/106&amp;w=400&amp;h=400'
var comic_title = '轻音少女（けいおん！）'
var comic_impress = '简介：新学年开始，高中一年级新生平泽唯在误将“轻音乐”当做了“轻便、简易的音乐”，而由于自己小时候玩响板得到老师表扬，于是萌发申请入部的想法。另一方面，樱丘高中“轻音部”因原来的部员全部毕业离校，此时轻音部新成员只有秋山澪和田井中律两人，无法满足部员至少四人的最低人数要求即将废部，这下该如何是好呢？此外，温柔可爱的千金小姐琴吹䌷被律强拉进入轻音部。于是，这四名高一女生机缘巧合聚在了一起，便有了吉他手平泽唯、贝司手秋山澪、鼓手田井中律以及键盘手琴吹䌷，轻音部的故事也由此展开。'

// document.querySelector("#body-wrap").appendChild(addtocomic(`url(${background_image_url})`, background_image_url, comic_title, comic_impress))

function addtocomic(background_image_url = "", comicmain_cover_url = "", comic_title = "", comic_impress = "") {
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

$('span.breakpage-btn').click(function () {
    imgsCon();
    anzhiyu.scrollToDest(this.getAttribute("scrollY"))
})