// // function resolveComicJson(title) {
// //     fetch(`/comic/comic_info.json`)
// //         .then(response => response.json().then(json => {
// //             console.info(title)
// //             console.info(json)
// //             console.info(json[title])
// //             return json[title]
// //         }))
// // }

// alert('comicmain.js')

// const detail = await (await fetch(`/comic/detail.json`)).json()
// // 详细信息卡片的操作 
// // ---------------------------------------------------------------------------------------------------------------------

// $('#detail-display').click(function () {
//     btn_detail_show(this)
// })

// async function btn_detail_show(element) {

//     const parent_node = element.closest('.bangumi-item');
//     const ori_image_url = parent_node.querySelector('.bangumi-picture a').getAttribute('href')
//     const comic_title = parent_node.querySelector('.bangumi-title a').textContent
//     const comic_href = parent_node.querySelector('.bangumi-title a').getAttribute('href')
//     const comic_tags = parent_node.querySelector('.bangumi-title').getAttribute('comic-tags')
//     const comic_impress = parent_node.querySelector('.bangumi-comments p').textContent
//     const comic_release_date = parent_node.querySelector('.bangumi-title').getAttribute("comic-release_date")

//     let background_image_url = `/img/comic/cover/${ori_image_url.substring(ori_image_url.lastIndexOf("/") + 1)}@400w_400h.webp`
//     let comicmain_intordu = detail[comic_title]?.intordu || "主人暂无点评呢，稍后再来看吧~"
//     let img_sort_list = sortLists(detail[comic_title]?.imglist)
//     let img_sort_source = sortLists(detail[comic_title]?.img_source)
//     let audio_href = detail[comic_title]?.audio || null

//     // console.info(resolveComicJson(comic_title))
//     // alert(resolveComicJson(comic_title).intordu)
//     // let pq1 = await resolveComicJson(comic_title)
//     // console.info("hello")
//     // console.info(pq1)

//     console.group(`background_image_url: ${background_image_url}\ncomic_title: ${comic_title}\ncomic_impress: ${comic_impress}\ncomic_href: ${comic_href}\ncomic_release_date: ${comic_release_date}\ncomic_tags: ${comic_tags}\ncomicmain_intordu: ${comicmain_intordu}\naudio_href: ${audio_href}`)
//     console.info("img_sort_list:")
//     console.info(img_sort_list)
//     console.info("img_sort_source:")
//     console.info(img_sort_source)
//     console.groupEnd()

//     sendComicInfoPre(background_image_url, comic_title, comic_impress, comic_href, comic_tags, comic_release_date, comicmain_intordu, img_sort_list, img_sort_source, audio_href, document.documentElement.scrollTop || window.pageYOffset)
//     anzhiyu.scrollToDest(0)
// }

// function sendComicInfoPre(background_image_url, comic_title, comic_impress, comic_video_href, commic_tags, comicmain_release_date, comicmain_intordu, img_sort_list, img_sort_source, comic_audio_href, scrolly) {
//     var comic_contain = `
//         <div class="comicmain-contain">
//             <div class="comicmain-contain-bg animate__animated animate__lightSpeedInLeft">
//                 <div id="comicmain-contain-bg-url"
//                     style="background-image:url(${background_image_url});">
//                 </div>
//             </div>
//             <div class="comicmain-contain-context animate__animated animate__lightSpeedInRight">
//                 <div class="comicmain-cover ">
//                     <img id="comicmain-cover-url"
//                         src="${background_image_url}"
//                         data-lazy-src="${background_image_url}"
//                         data-src="${background_image_url}"
//                         referrerpolicy="no-referrer" 
//                         data-ll-status="loaded" 
//                         class="entered loaded">
//                 </div>
//                 <div class="comicmain-info">
//                     <h3 id="comicmain-title">${comic_title}</h3>
//                     <ul class="comicmain-else">
//                         <li><span>发行日期</span>
//                             <p id="comicmain-release_date">${comicmain_release_date.replace("-", ".").replace("-", ".")}</p>
//                         </li>
//                     </ul>
//                     <ul id="comicmain-tips" class="comicmain-tips">
//                         ${commic_tags.split(",").map(tag => `<li class="${tag}">${tag}</li>`).join("")}
//                     </ul>
//                     <div id="comicmain-impress" class="comicmain-impress paragraph-truncate">
//                         ${comic_impress}
//                     </div>
//                     <div class="comicmain-intordu paragraph-truncate" id="comicmain-intordu">
//                         点评：${comicmain_intordu}    
//                     </div>
//                     <a id="comicmain-video_href" class="comic-video_source comicmain-href"
//                         href="${comic_video_href}" target="_blank">
//                         <span class="comicmain-href el-icon-data-line">看番</span>
//                     </a>
//                     ${comic_audio_href ? `
//                         <a id="comicmain-audio_href" href="${comic_audio_href}" class="comic-audio_source comicmain-href" style="bottom: 10px; left: calc(100% - 128px); border-radius: 20px; width: 100px; height: 40px;">
//                             <span class="comicmain-href el-icon-data-line">K-ON</span>
//                         </a>` : ""
//         }
//                 </div>
//             </div>
//         </div>
//     `
//     var comic_imglist = `
//         <div class="comicmain-imglist">
//             ${img_sort_list ? genImgHtml(img_sort_list, img_sort_source) : `<span id="comic-no_migs" style="color: white; margin: 0px auto; display:"block"> 啊嘞，主人好像还没找到喜欢的图片呢~</span>" `}
//         </div>
//     `
//     document.querySelector("#body-wrap").insertAdjacentHTML("beforeend", `
//         <div class="botload self-enter-active" id="comic">
//             <div class="comicmain">
//                 <span class="breakpage-btn" scrolly="${scrolly}" onclick="closetInfo(this)">
//                     <i class="el-icon-close"></i>
//                 </span>
//                 ${comic_contain}
//                 ${comic_imglist}
//             </div>
//     `)
// }

// function genImgHtml(img_sort_list, img_sort_source) {
//     const ulHtml = img_sort_list.map((img_url_list, index) => {
//         const liHtml = img_url_list.map((img_url, index1) => {
//             if (img_url === "") return "";
//             return `
//                 <div class="img-card comicmain-imglist_imgs-item" data-thumb="${img_url}">
//                     <img data-fancybox="gallery"
//                         src="${img_url}"
//                         data-lazy-src="${img_url}"
//                         data-src="${img_url}"
//                         referrerpolicy="no-referrer"
//                         data-ll-status="loaded"
//                         class="detail-img entered loaded"
//                     >
//                     <a href="${img_sort_source[index][index1]}" class="img_source">
//                         <span>来源</span>
//                     </a>
//                 </div>
//             `;
//         }).join("");

//         return `<li class="comicmain-imglist_imgs_li comicmain-imglist${index}">${liHtml}</li>`;
//     }).join("");

//     return `<ul class="comicmain-imglist_imgs" id="comicmain-imglist_imgs" style="display:flex;">${ulHtml}</ul>`;
// }

// function sortLists(imglist) {
//     if (!imglist) return null

//     return imglist.reduce((result, element, index) => {
//         result[index % 3].push(element);
//         return result;
//     }, [[], [], []]);
// }

// function closetInfo(element) {
//     document.querySelector("#body-wrap").removeChild(document.querySelector("#comic"))
//     anzhiyu.scrollToDest(element.getAttribute("scrollY"))
// }