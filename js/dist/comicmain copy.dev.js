"use strict";

alert("comic");
document.querySelectorAll(".bangumi-button").forEach(function (item) {
  item.addEventListener('click', function (e) {
    anzhiyu.scrollToDest(0);
  });
});
var img_pic_cdn = "https://jsd.cdn.zzko.cn/gh/Azumic/blog_pic@main/comic/cover/";
var img_pic_cloudflare = "https://jsd.cdn.zzko.cn/gh/Azumic/blog_pic@main/comic/cover/";
var img_pic_bendi = '/img/comic/cover/';

function btn_detail_show(element) {
  anzhiyu.scrollToDest(0); // document.querySelector("span.breakpage-btn").setAttribute("scrollY", document.documentElement.scrollTop || window.pageYOffset)

  var parent_node = element.closest('.bangumi-item');
  var background_image_url = parent_node.querySelector('.bangumi-picture a').getAttribute('href').replace('https://i0.hdslb.com/bfs/bangumi/image/', "/img/comic/cover/") + "@400w_400h.webp";
  var comic_title = parent_node.querySelector('.bangumi-title a').textContent;
  var comic_href = parent_node.querySelector('.bangumi-title a').getAttribute('href');
  var comic_tags = parent_node.querySelector('.bangumi-title').getAttribute('comic-tags');
  var comic_impress = parent_node.querySelector('.bangumi-comments p').textContent;
  var comic_release_date = parent_node.querySelector('.bangumi-title').getAttribute("comic-release_date");
  var comicmain_intordu;

  try {
    comicmain_intordu = bgm_info[comic_title]["intordu"];
  } catch (error) {
    comicmain_intordu = null;
  }

  var img_sort_list;

  try {
    img_sort_list = sortLists(bgm_info[comic_title]["imglist"]);
  } catch (error) {
    img_sort_list = null;
  }

  var img_sort_source;

  try {
    img_sort_source = sortLists(bgm_info[comic_title]["img_source"]);
  } catch (error) {
    img_sort_source = null;
  }

  var audio_href;

  try {
    audio_href = bgm_info[comic_title]["audio"];
  } catch (error) {
    audio_href = null;
  }

  comicmain_intordu = comicmain_intordu ? comicmain_intordu : "主人暂无点评呢，稍后再来看吧~";
  console.group("background_image_url: ".concat(background_image_url, "\ncomic_title: ").concat(comic_title, "\ncomic_impress: ").concat(comic_impress, "\ncomic_href: ").concat(comic_href, "\ncomic_release_date: ").concat(comic_release_date, "\ncomic_tags: ").concat(comic_tags, "\ncomicmain_intordu: ").concat(comicmain_intordu, "\naudio_href: ").concat(audio_href));
  console.info("img_sort_list:");
  console.info(img_sort_list);
  console.info("img_sort_source:");
  console.info(img_sort_source);
  console.groupEnd(); // sendComicInfo(background_image_url, comic_title, comic_impress, comic_href, comic_tags, comic_release_date, `点评：${comicmain_intordu}`, img_sort_list, img_sort_source, audio_href)

  sendComicInfoPre(background_image_url, comic_title, comic_impress, comic_href, comic_tags, comic_release_date, "\u70B9\u8BC4\uFF1A".concat(comicmain_intordu), img_sort_list, img_sort_source, audio_href, document.documentElement.scrollTop || window.pageYOffset); // imgsCon();
}

function sendComicInfoPre(background_image_url, comic_title, comic_impress, comic_href, commic_tags, comicmain_release_date, comicmain_intordu, img_sort_list, img_sort_source, comic_audio_href, scrolly) {
  var comic_contain = "\n        <div class=\"comicmain-contain\">\n            <div class=\"comicmain-contain-bg animate__animated animate__lightSpeedInLeft\">\n                <div id=\"comicmain-contain-bg-url\"\n                    style=\"background-image:url(".concat(background_image_url, ");\">\n                </div>\n            </div>\n            <div class=\"comicmain-contain-context animate__animated animate__lightSpeedInRight\">\n                <div class=\"comicmain-cover \">\n                    <img id=\"comicmain-cover-url\"\n                        src=\"").concat(background_image_url, "\"\n                        data-lazy-src=\"").concat(background_image_url, "\"\n                        data-src=\"").concat(background_image_url, "\"\n                        referrerpolicy=\"no-referrer\" \n                        data-ll-status=\"loaded\" \n                        class=\"entered loaded\">\n                </div>\n                <div class=\"comicmain-info\">\n                    <h3 id=\"comicmain-title\">").concat(comic_title, "</h3>\n                    <ul class=\"comicmain-else\">\n                        <li><span>\u53D1\u884C\u65E5\u671F</span>\n                            <p id=\"comicmain-release_date\">").concat(comicmain_release_date.replace("-", ".").replace("-", "."), "</p>\n                        </li>\n                    </ul>\n                    <ul id=\"comicmain-tips\" class=\"comicmain-tips\">\n                        ").concat(commic_tags.split(",").map(function (tag) {
    return "<li class=\"".concat(tag, "\">").concat(tag, "</li>");
  }).join(""), "\n                    </ul>\n                    <div id=\"comicmain-impress\" class=\"comicmain-impress paragraph-truncate\">\n                        ").concat(comic_impress, "\n                    </div>\n                    <div class=\"comicmain-intordu paragraph-truncate\" id=\"comicmain-intordu\">\n                        \u70B9\u8BC4\uFF1A").concat(comicmain_intordu, "    \n                    </div>\n                    <a id=\"comicmain-href\" class=\"comic-video_source\"\n                        href=\"").concat(comic_href, "\" target=\"_blank\">\n                        <span class=\"comicmain-href el-icon-data-line\">\u770B\u756A</span>\n                    </a>\n                    <a id=\"comicmain-href\" href=\"").concat(comic_audio_href, "\" class=\"comic-audio_source\" style=\"bottom: 10px; left: calc(100% - 128px); border-radius: 20px; width: 100px; height: 40px;\">\n                        <span class=\"comicmain-href el-icon-data-line\">K-ON</span>\n                    </a>\n                </div>\n            </div>\n        </div>\n    ");
  var comic_imglist = "\n        <div class=\"comicmain-imglist\">\n            ".concat(img_sort_list == null ? "<span id=\"comic-no_migs\" style=\"color: white; margin: 0px auto; display:\"block\"> \u554A\u561E\uFF0C\u4E3B\u4EBA\u597D\u50CF\u8FD8\u6CA1\u627E\u5230\u559C\u6B22\u7684\u56FE\u7247\u5462~</span>\" " : "".concat(genImgHtml(img_sort_list, img_sort_source)), "\n        </div>\n    ");
  document.querySelector("#body-wrap").insertAdjacentHTML("beforeend", "\n        <div class=\"botload self-enter-active\" id=\"comic\">\n            <div class=\"comicmain\">\n                <span class=\"breakpage-btn\" scrolly=\"".concat(scrolly, "\" onclick=\"closetInfo(this)\">\n                    <i class=\"el-icon-close\"></i>\n                </span>\n                ").concat(comic_contain, "\n                ").concat(comic_imglist, "\n            </div>\n    "));
}

function genImgHtml(img_sort_list, img_sort_source) {
  var innerHTML1 = "";
  img_sort_list.forEach(function (img_url_list, index) {
    var innerHTML = "";
    img_sort_list[index].forEach(function (img_url, index1) {
      innerHTML += img_url == "" ? "" : "\n                            <div class=\"img-card comicmain-imglist_imgs-item \" data-thumb=\"".concat(img_url, "\">\n                                <img data-fancybox=\"gallery\"\n                                    src=\"").concat(img_url, "\"\n                                    data-lazy-src=\"").concat(img_url, "\"\n                                    data-src=\"").concat(img_url, "\"\n                                    referrerpolicy=\"no-referrer\"\n                                    data-ll-status=\"loaded\"\n                                    class=\"detail-img entered loaded\"\n                                >\n\n                                <a href=\"").concat(img_sort_source[index][index1], "\" class=\"img_source\">\n                                    <span>\n                                        \u6765\u6E90\n                                    </span>\n                                </a>\n                            </div>\n                        ");
    });
    var liHtml = "<li class=\"comicmain-imglist_imgs_li comicmain-imglist".concat(index, "\">").concat(innerHTML, "</li>");
    innerHTML1 += liHtml;
  });
  return "\n        <ul class=\"comicmain-imglist_imgs\" id=\"comicmain-imglist_imgs\" style=\"display:\"flex\";\">\n            ".concat(innerHTML1, "\n        </ul>\n    "); // return Array.from(imglist_html.getElementsByClassName("comicmain-imglist_imgs_li")).forEach((li, index) => {
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
  document.getElementById("comicmain-contain-bg-url").style.backgroundImage = "url(".concat(background_image_url, ")");
  document.getElementById("comicmain-cover-url").setAttribute('src', background_image_url);
  document.getElementById("comicmain-title").innerText = comic_title;
  document.querySelector("a.comic-video_source").setAttribute('href', comic_href);
  document.querySelector("a.comic-audio_source").setAttribute('href', comic_audio_href);
  document.getElementById("comicmain-impress").innerText = comic_impress;
  document.getElementById("comicmain-release_date").textContent = comicmain_release_date.replace("-", ".").replace("-", ".");
  document.getElementById("comicmain-intordu").textContent = comicmain_intordu;
  var tips = document.getElementById("comicmain-tips");

  while (tips.firstChild) {
    tips.removeChild(tips.lastChild);
  }

  commic_tags.split(",").forEach(function (tag) {
    var li1 = document.createElement("li");
    li1.textContent = tag;
    tips.appendChild(li1);
  }); // var tags = ""
  // commic_tags.split(",").forEach(tag => {
  // tags += `<li class="${tag}">${tag}</li>`
  // })
  // var tags = commic_tags.split(",").map(tag => `<li class="${tag}">${tag}</li>`).join("");
  // `${commic_tags.split(",").map(tag => `<li class="${tag}">${tag}</li>`).join("")}`

  var imglist_html = document.getElementById("comicmain-imglist_imgs");

  if (img_sort_list == null) {
    document.getElementById("comic-no_migs").style.display = "block";
    document.getElementById("comicmain-imglist_imgs").style.display = "none";
  } else {
    document.getElementById("comic-no_migs").style.display = "none";
    document.getElementById("comicmain-imglist_imgs").style.display = "flex";
    Array.from(imglist_html.getElementsByClassName("comicmain-imglist_imgs_li")).forEach(function (li, index) {
      var innerHTML = "";
      img_sort_list[index].forEach(function (img_url, index1) {
        innerHTML += img_url == "" ? "" : "\n                                <div class=\"img-card comicmain-imglist_imgs-item \" data-thumb=\"".concat(img_url, "\">\n                                    <img data-fancybox=\"gallery\"\n                                        src=\"").concat(img_url, "\"\n                                        data-lazy-src=\"").concat(img_url, "\"\n                                        data-src=\"").concat(img_url, "\"\n                                        referrerpolicy=\"no-referrer\"\n                                        data-ll-status=\"loaded\"\n                                        class=\"detail-img unvis entered loaded\"\n                                    >\n\n                                    <a href=\"").concat(img_sort_source[index][index1], "\" class=\"img_source\">\n                                        <span>\n                                            \u6765\u6E90\n                                        </span>\n                                    </a>\n                                </div>\n                            ");
      });
      li.innerHTML = innerHTML;
    });
  }
}

function sortLists(imglist) {
  var result = [];
  var extractedList1 = imglist.filter(function (element, index) {
    return index % 3 === 0;
  });
  result.push(extractedList1);
  var extractedList2 = imglist.filter(function (element, index) {
    return (index + 2) % 3 === 0;
  });
  result.push(extractedList2);
  var extractedList3 = imglist.filter(function (element, index) {
    return (index + 1) % 3 === 0;
  });
  result.push(extractedList3);
  return result;
}

function imgsConPre() {}

function closetInfo(element) {
  document.querySelector("#body-wrap").removeChild(document.querySelector("#comic"));
  anzhiyu.scrollToDest(element.getAttribute("scrollY"));
}

function imgsCon() {
  var comicMain = document.getElementById('comic');
  comicMain.classList.toggle('hidden');
  comicMain.classList.toggle('self-enter-active');

  if ($('.comicmain-imglist').hasClass('imgs-unvis')) {
    setTimeout(function () {
      $('.img-card img').each(function () {
        $(this).removeClass('unvis');
      });
    }, 600);
    $('.comicmain-imglist').removeClass('imgs-unvis');
  } else {
    $('.img-card img').each(function () {
      $(this).addClass('unvis');
    });
    $('.comicmain-imglist').addClass('imgs-unvis');
  }
}

var background_image_url = 'https://api.adicw.cn/images/6149d0521a778.jpg?path=ComicImg/106&amp;w=400&amp;h=400';
var comic_title = '轻音少女（けいおん！）';
var comic_impress = '简介：新学年开始，高中一年级新生平泽唯在误将“轻音乐”当做了“轻便、简易的音乐”，而由于自己小时候玩响板得到老师表扬，于是萌发申请入部的想法。另一方面，樱丘高中“轻音部”因原来的部员全部毕业离校，此时轻音部新成员只有秋山澪和田井中律两人，无法满足部员至少四人的最低人数要求即将废部，这下该如何是好呢？此外，温柔可爱的千金小姐琴吹䌷被律强拉进入轻音部。于是，这四名高一女生机缘巧合聚在了一起，便有了吉他手平泽唯、贝司手秋山澪、鼓手田井中律以及键盘手琴吹䌷，轻音部的故事也由此展开。'; // document.querySelector("#body-wrap").appendChild(addtocomic(`url(${background_image_url})`, background_image_url, comic_title, comic_impress))

function addtocomic() {
  var background_image_url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var comicmain_cover_url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var comic_title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  var comic_impress = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  var comicmain = document.createElement("div");
  comicmain.className = 'botload hidden';
  comicmain.id = 'comic';
  comicmain.innerHTML = "\n        <div class=\"comicmain\" >\n        <span class=\"breakpage-btn\" >\n            <i class=\"el-icon-close\"></i>\n        </span>\n        <div class=\"comicmain-contain\" >\n            <div class=\"comicmain-contain-bg animate__animated animate__lightSpeedInLeft\" >\n                <div  id=\"comicmain-contain-bg-url\"\n                style=\"background-image:".concat(background_image_url, ";\"\n                >\n                <!-- style=\"background-image:").concat(background_image_url, ";\" -->\n                <!--    <img src=\"").concat(comicmain_cover_url, "\" alt=\"\"> -->\n                </div>\n            </div>\n            <div class=\"comicmain-contain-context animate__animated animate__lightSpeedInRight\" >\n                <div class=\"comicmain-cover \"  >\n                    <img \n                        id=\"comicmain-cover-url\"\n                        src=\"").concat(comicmain_cover_url, "\"\n                        data-lazy-src=\"").concat(comicmain_cover_url, "\"\n                        data-src=\"").concat(comicmain_cover_url, "\"\n                        referrerpolicy=\"no-referrer\"\n                        data-ll-status=\"loaded\"\n                        class=\"entered loaded\"\n                        \n                    >\n                </div>\n                <div class=\"comicmain-info\" >\n                    <h3  id=\"comicmain-title\">").concat(comic_title, "</h3>\n                    <ul class=\"comicmain-else\" >\n                        <li ><span >\u53D1\u884C\u65E5\u671F</span>\n                            <p id=\"comicmain-release_date\" >2009.04.02</p>\n                        </li>\n                    </ul>\n                    <ul id=\"comicmain-tips\" class=\"comicmain-tips\" >\n                        <li >\u9752\u6625</li>\n                        <li >\u97F3\u4E50</li>\n                        <li >\u82B3\u6587</li>\n                        <li >\u4EAC\u963F\u5C3C</li>\n                    </ul>\n                    <div id=\"comicmain-impress\" class=\"comicmain-impress paragraph-truncate\" >\n                        ").concat(comic_impress, "\n                    </div>\n                    <div class=\"comicmain-intordu paragraph-truncate\"  id=\"comicmain-intordu\"> \u70B9\u8BC4\uFF1AK-ON!\n                        \u82B3\u6587\u793E\u3001\u4EAC\u963F\u5C3C\u4EE3\u8868\u4F5C\u4E4B\u4E00\uFF0C\u5446\u552F\u3001\u6893\u55B5\u3001\u641E\u4E8B\u5F8B\u961F\u3001\u80C6\u5C0Fmio\u3001\u795E\u4E00\u822C\u7684\u5FE7\u3001\u5446\u840C\u5927\u5C0F\u59D0\u4337\u3002\u7EAF\u7EAF\u7684\u5C11\u5973\u4E0E\u9752\u6625\uFF0C\u8F7B\u97F3\u6C38\u4E0D\u6563\u4F1A\uFF01\n                    </div>\n                    <a id=\"comicmain-href\" class=\"comic-video_source\" href=\"#\" target=\"_blank\">\n                        <span class=\"comicmain-href el-icon-data-line\" >\u770B\u756A</span>\n                    </a>\n\n                    <a id=\"comicmain-href\" class=\"comic-audio_source\" href=\"/music/?id=812754&server=netease\"\n                        style=\"    bottom: 10px;\n                        left: calc(100% - 128px);\n                        border-radius: 20px;\n                    \n                        width: 100px;\n                        height: 40px;\"    \n                    >\n                        <span class=\"comicmain-href el-icon-data-line\">K-ON</span>\n                    </a>\n                    \n                </div>\n            </div>\n        </div>\n        <div class=\"comicmain-imglist imgs-unvis\" >\n            <span id=\"comic-no_migs\" style=\"color: white;margin: 0 auto;\"> \u554A\u561E\uFF0C\u4E3B\u4EBA\u597D\u50CF\u8FD8\u6CA1\u627E\u5230\u559C\u6B22\u7684\u56FE\u7247\u5462~</span>\n            <ul class=\"comicmain-imglist_imgs\" id=\"comicmain-imglist_imgs\">\n                <li class=\"comicmain-imglist_imgs_li comicmain-imglist1\">\n                    <div class=\"img-card comicmain-imglist_imgs-item \" data-fancybox=\"gallery\"  style=\"height: 215.644px;\">\n                        <img\n                            src=\"https://api.adicw.cn/images/6149d0521a778.jpg?path=ComicImg/106&amp;w=600&amp;h=600\"\n                            data-lazy-src=\"https://api.adicw.cn/images/6149d0521a778.jpg?path=ComicImg/106&amp;w=600&amp;h=600\"\n                            data-src=\"https://api.adicw.cn/images/6149d0521a778.jpg?path=ComicImg/106&amp;w=600&amp;h=600\"\n                            referrerpolicy=\"no-referrer\"\n                            data-ll-status=\"loaded\"\n                             \n                            class=\"detail-img unvis entered loaded\"\n                        >\n\n\n                    </div>\n                    <div class=\"img-card comicmain-imglist_imgs-item\" \n                        style=\"height: 525.95px;\"><!----></div>\n                    <div class=\"img-card comicmain-imglist_imgs-item\" \n                        style=\"height: 487.869px;\"><!----></div>\n                </li>\n                <li class=\"comicmain-imglist_imgs_li comicmain-imglist2\">\n                    <div class=\"img-card comicmain-imglist_imgs-item \" data-fancybox=\"gallery\" \n                        style=\"height: 376.51px;\"><img\n                            src=\"https://api.adicw.cn/images/6149d06d7a6a9.jpg?path=ComicImg/106&amp;w=600&amp;h=600\"\n                             class=\"detail-img unvis\"></div>\n                    <div class=\"img-card comicmain-imglist_imgs-item\" \n                        style=\"height: 526.338px;\"><!----></div>\n                </li>\n                <li class=\"comicmain-imglist_imgs_li comicmain-imglist3\">\n                    <div class=\"img-card comicmain-imglist_imgs-item \" data-fancybox=\"gallery\" \n                        style=\"height: 253.037px;\"><img\n                            src=\"https://api.adicw.cn/images/6149d06dcaba9.jpg?path=ComicImg/106&amp;w=600&amp;h=600\"\n                             class=\"detail-img unvis\"></div>\n                    <div class=\"img-card comicmain-imglist_imgs-item\" \n                        style=\"height: 646.957px;\"><!----></div>\n                    <div class=\"img-card comicmain-imglist_imgs-item\" \n                        style=\"height: 449.49px;\"><!----></div>\n                </li>\n            </ul>\n        </div>\n    </div>\n    ");
  return comicmain;
}

$('span.breakpage-btn').click(function () {
  imgsCon();
  anzhiyu.scrollToDest(this.getAttribute("scrollY"));
});