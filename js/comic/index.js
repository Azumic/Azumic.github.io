
async function fun() {
    const root = '/comic/'
    const data = await (await fetch(`${root}all.json`)).json()
    const config = await (await fetch(`${root}config.json`)).json()

    var detail
    // // const detail = await (await fetch(`${root}detail.json`)).json()
    // const detail = await (await fetch(`https://raw.githubusercontent.com/Azumic/blog-comic_pic/main/data/comic_detail.json`)).json()
    // // const detail = await (await fetch(`https://cdn.staticaly.com/gh/Azumic/blog-comic_pic@main/data/comic_detail.json`)).json()


    // 单页卡片数量限制
    const maxCount = 10
    const defaultFilter = {
        area: "日本",
        page: 1,
        tag: "音乐",
        totalpage: 0,
    }
    // const width = (1908 * 0.7 - 16 * (3 + 1)) / 3
    const width = 423.86
    // console.info(`clientWidth:${document.body.clientWidth}`)
    // console.info(`width:${width}`)

    let tagFilter = null
    const top = document.querySelector('#comic-top')
    const areas = top.querySelector('#areas')
    const tags = top.querySelector('#tags')
    const tabs = document.querySelector('.comic-tabs')

    const arg = await parseArg()
    const length1 = parseFilter()[0]
    const YTotal1 = Math.ceil(length1 / maxCount)
    const pageTotal1 = YTotal1 < 1 ? 1 : YTotal1
    arg.totalpage = pageTotal1

    init()
    update()





    function init() {
        /**
         * 打印参数
         */
        alertArg()

        /**
         * 初始化头部信息
         */
        initTop()

        /**
         * 更新数据
         */
        update()

        /**
         * 注册头部筛选事件
         */
        initTopClick()

        /**
         * 注册底部更新事件
         */
        initBottomClick()
    }

    function initTop() {
        document.querySelector("#areas").querySelector(".all").textContent += `(${config.size})`

        const bulidDIv = (class_name, title) => `<div class="${class_name}">${title}</div>`

        const areaList = areas.querySelector('.list')
        for (const [key, value] of Object.entries(config.areas)) {
            areaList.innerHTML += bulidDIv(key, `${key == "undefined" ? "未知" : key}(${value})`)
        }

        const tagList = tags.querySelector('.list')
        for (let tag of Object.keys(config.tags)) {
            tagList.innerHTML += bulidDIv(tag, tag)
        }
    }

    function initTopClick() {
        const areaList = areas.querySelector('.list')
        const tagList = tags.querySelector('.list')

        areaList.onclick = event => {

            const target = event.target
            const parent = target.parentNode
            const classList = target.classList
            if (!parent.classList?.contains('list') ||
                classList.contains('active') || classList.contains('disable')) return
            for (let node of parent.children) {
                node.classList.remove('active')
            }
            arg.area = target.className
            arg.page = 1

            classList.add('active')

            alertArg()
            update()
        }

        tagList.onclick = event => {
            const target = event.target
            const parent = target.parentNode
            const classList = target.classList
            if (!parent.classList?.contains('list') ||
                classList.contains('active') || classList.contains('disable')) return
            for (let node of parent.children) {
                node.classList.remove('active')
            }
            arg.tag = target.className
            arg.page = 1

            classList.add('active')

            alertArg()
            update()

        }
    }

    function initBottomClick() {
        const bottom = document.getElementById('comic-bottom')
        const height = document.getElementById('page-header').clientHeight

        bottom.childNodes.forEach(node => {
            node.addEventListener('click', e => {
                const element = e.target
                // console.info(element)
                switch (element.id) {
                    case 'bottom-first':
                        arg.page = 1
                        break
                    case 'bottom-end':
                        arg.page = arg.totalpage
                        break
                    case 'bottom-next':
                        ++arg.page
                        break
                    case 'bottom-pre':
                        --arg.page
                        break
                }
                parPageInfo()
                anzhiyu.scrollToDest(height)
                setTimeout(() => update(), 200)
            })
        })
    }

    function parseArg() {
        const url = location.href
        let arg
        if (url.endsWith('/')) {
            arg = { area: defaultFilter.area, page: defaultFilter.page, tag: defaultFilter.tag }
        } else {
            oldArg = JSON.parse(decodeURIComponent(location.hash.substring(1)))
            arg = updateArg(oldArg)
        }
        return arg
    }

    async function update(updateURL = true) {

        /**
         * 更新url参数
         */
        if (updateURL) location.hash = JSON.stringify(arg)

        /**
         * 更新筛选标签的状态
         */
        parseDiv(areas, 'area')
        parseDiv(tags, 'tag')

        /**
         * 更新列表
         */
        const filterLabel = parseFilter()
        parListDiv(filterLabel[1])

        /**
         * 注册列表的点击事件
         */
        initDetailBtn()

        /**
         * @todo 更新页脚信息
         */
        parBottomInfo(filterLabel)

        /**
         * 更新url参数
         */
        if (updateURL) location.hash = JSON.stringify(arg)
    }

    function parPageInfo() {
        if (!arg.page || arg.page < 1) {
            arg.page = 1
        }
        if (arg.page > arg.totalpage) {
            arg.page = arg.totalpage
        }
    }

    function parBottomInfo(filterLabel) {
        const pageNum = document.getElementById('bottom-num')
        const bottom = document.getElementById('comic-bottom')
        const pre = document.getElementById('bottom-pre').classList
        const next = document.getElementById('bottom-next').classList
        const first = document.getElementById('bottom-first').classList
        const end = document.getElementById('bottom-end').classList

        const length = filterLabel[0]
        const YTotal = Math.ceil(length / maxCount)
        const pageTotal = YTotal < 1 ? 1 : YTotal
        arg.totalpage = pageTotal
        pageNum.textContent = `${arg.page}/${arg.totalpage}`



        // var bol = false

        // if (arg.page === 1) {
        //     pre.add('disable')
        //     first.add('disable')
        //     bol = true
        // }
        // if (arg.page === arg.totalpage) {
        //     next.add('disable')
        //     end.add('disable')
        //     bol = true
        // }
        // if (bol) return

        // bottom.querySelectorAll('button').forEach(button => button.classList.remove('disable'))


        // switch (arg.page) {
        //     default:
        //         bottom.querySelectorAll('button').forEach(button => button.classList.remove('disable'))
        //     case 1:
        //         pre.add('disable')
        //         first.add('disable')
        //     case arg.totalpage:
        //         next.add('disable')
        //         end.add('disable')
        // }

    }

    function parListDiv(filterLabel) {
        const filterData = collectedData(filterLabel, data)

        alertPar(`filterData: [${arg.area}]${arg.tag}`, filterData)

        var dataQ = Object.values(filterData)
        const inner = document.getElementById('inner')
        inner.innerHTML = ''
        for (let i = 0; i < (maxCount > dataQ.length ? dataQ.length : maxCount); i++) {
            const value = dataQ[i];

            const id = value.id ?? 0
            const href = id === 0 ? '' : (typeof id !== 'number' ? id : `https://www.bilibili.com/bangumi/media/md${id}/`)
            inner.innerHTML += buildCardOri(value.title, value.des, value.cover, value.tags, value.releaseDate, href, value.totalCount, value.type, value.area, value.view, value.follow, value.coin, value.danmaku, value.score)
        }
    }

    function updateArg(oldArg) {
        var newArg = oldArg

        switch (newArg.area) {
            case 'all':
                // newArg.area = '所有'
                break;
            default:
                if (!Object.keys(config.areas).includes(newArg.area)) {
                    newArg.area = defaultFilter.area
                }
                break;
        }

        switch (newArg.tag) {
            case "all":
                // newArg.tag = "所有"
                break;
            default:
                if (!Object.keys(config.tags).includes(newArg.tag)) {
                    newArg.tag = defaultFilter.tag
                }
                break;
        }

        if (!newArg.page || newArg.page < 1) {
            newArg.page = 1
        }

        alertPar(`updataArg`, oldArg, newArg)

        return newArg
    }

    function parseDiv(divPar, label) {
        const listChildren = divPar.querySelector('.list').children;
        for (let value of listChildren) {
            value.classList.toggle('active', value.classList.contains(arg[label]));
        }
    }

    function buildCardOri(title, des, coverl_url, tags, release_date, video_url, totalCount, type, area, view, follow, coin, danmaku, score) {
        return `
        <div class="bangumi-item">
            <div class="bangumi-picture">
                <a href="${coverl_url}" data-caption="" data-thumb="${coverl_url}" data-fancybox="gallery">
                    <img
                        src="${coverl_url}"
                        data-lazy-src="${coverl_url}"
                        data-fancybox="gallery"
                        referrerpolicy="no-referrer" width="110" style="width:110px;margin:20px auto;" data-ll-status="loaded"
                        class="entered loaded">
                </a>
            </div>
            <div class="bangumi-info">
                <div class="bangumi-title" comic-tags=${tags ? tags.join(",") : "-"} comic-release_date=${release_date}>
                    <a target="_blank" href="${video_url}" draggable="false">${title}</a>
                    <button id="detail-display">显示</button>
                </div>
                <div class="bangumi-meta">
                    <span class="bangumi-info-items">
                        <span class="bangumi-info-item">
        
                            <span class="bangumi-info-total">${totalCount}</span><em class="bangumi-info-label-em">0</em>
                        </span>
        
        
                        <span class="bangumi-info-item bangumi-area">
                            <span class="bangumi-info-label">${type}</span> <em>${area}</em>
                        </span>
        
                        <span class="bangumi-info-item bangumi-play">
                            <span class="bangumi-info-label">总播放</span> <em>${view}</em>
                        </span>
                        <span class="bangumi-info-item bangumi-follow">
                            <span class="bangumi-info-label">追番人数</span> <em>${follow}</em>
                        </span>
                        <span class="bangumi-info-item bangumi-coin">
                            <span class="bangumi-info-label">硬币数</span> <em>${coin}</em>
                        </span>
                        <span class="bangumi-info-item bangumi-danmaku">
                            <span class="bangumi-info-label">弹幕总数</span> <em>${danmaku}</em>
                        </span>
                        <span class="bangumi-info-item bangumi-info-item-score">
                            <span class="bangumi-info-label">评分</span> <em>${score}</em>
                        </span>
                    </span>
                </div>
                <div class="bangumi-comments">
                    <p>简介：${des}
                    </p>
                </div>
            </div>
        </div>
        `
    }

    function parseFilter() {
        var filterList = []
        // arg.page
        if (arg.area == "all" && arg.tag == "all") {
            // return [...config.areas_comic["日本"], ...config.areas_comic["中国大陆"], ...config.areas_comic["undefined"]]
            filterList = Object.values(config.areas_comic).flatMap(values => Object.values(values));
        } else {
            if (arg.area == "all") {
                filterList = config.tags_comic[arg.tag]
            } else if (arg.tag == "all") {
                filterList = config.areas_comic[arg.area]
            } else {
                filterList = config.filter_comic[`[${arg.area}]${arg.tag}`]
            }
        }

        alertPar(`filterList: [${arg.area}]${arg.tag} ${arg.page} ${filterList.length}`, filterList)

        return [filterList.length, filterList.slice(arg.page == 1 ? 0 : (arg.page - 1) * maxCount, arg.page * maxCount)];
    }

    function collectedData(keysToCollect, data) {
        return keysToCollect.reduce((result, key) => {
            if (data.hasOwnProperty(key)) {
                result[key] = data[key];
            }
            return result;
        }, {});
    }

    function alertArg() {
        alertPar('parseArg', arg)
    }

    function alertPar(title, ...data) {
        console.group(title)
        for (const iterator of data) {
            console.info(iterator)
        }
        console.groupEnd()
    }










    // 详细信息卡片的操作 
    // ---------------------------------------------------------------------------------------------------------------------

    async function initDetailBtn() {
        if (!detail) {
            // detail = await (await fetch(`${root}detail.json`)).json()
            detail = await (await fetch(`https://raw.githubusercontent.com/Azumic/blog-comic_pic/main/data/comic_detail.json`)).json()
            // detail = await (await fetch(`https://cdn.staticaly.com/gh/Azumic/blog-comic_pic@main/data/comic_detail.json`)).json()
        }
        document.querySelectorAll("#detail-display").forEach(element => {
            element.onclick = function () {
                btn_detail_show(this)
            }
        })
    }

    function initClosetDetailBtn() {
        $('.breakpage-btn').click(function () {
            closetInfo(this)
        })
    }

    function btn_detail_show(element) {

        const parent_node = element.closest('.bangumi-item');
        const ori_image_url = parent_node.querySelector('.bangumi-picture a').getAttribute('href')
        const comic_title = parent_node.querySelector('.bangumi-title a').textContent
        const comic_href = parent_node.querySelector('.bangumi-title a').getAttribute('href')
        const comic_tags = parent_node.querySelector('.bangumi-title').getAttribute('comic-tags')
        const comic_impress = parent_node.querySelector('.bangumi-comments p').textContent
        const comic_release_date = parent_node.querySelector('.bangumi-title').getAttribute("comic-release_date")

        let background_image_url = `/img/comic/cover/${ori_image_url.substring(ori_image_url.lastIndexOf("/") + 1)}@400w_400h.webp`
        let comicmain_intordu = detail[comic_title]?.intordu || "主人暂无点评呢，稍后再来看吧~"
        let img_sort_list = sortLists(detail[comic_title]?.imglist)
        let img_sort_source = sortLists(detail[comic_title]?.img_source)
        let img_info_list = sortImgInfo(detail[comic_title]?.imgInfo)
        let audio_href = detail[comic_title]?.audio || null

        console.group(`background_image_url: ${background_image_url}\ncomic_title: ${comic_title}\ncomic_impress: ${comic_impress}\ncomic_href: ${comic_href}\ncomic_release_date: ${comic_release_date}\ncomic_tags: ${comic_tags}\ncomicmain_intordu: ${comicmain_intordu}\naudio_href: ${audio_href}`)
        console.info("img_sort_list:")
        console.info(img_sort_list)
        console.info("img_sort_source:")
        console.info(img_sort_source)
        console.info("img_info_list:")
        console.info(img_info_list)
        console.groupEnd()

        sendComicInfoPre(background_image_url, comic_title, comic_impress, comic_href, comic_tags, comic_release_date, comicmain_intordu, img_sort_list, img_sort_source, audio_href, document.documentElement.scrollTop || window.pageYOffset, img_info_list)
        imgVisCon()
        anzhiyu.scrollToDest(0)

        initClosetDetailBtn()
    }

    function sendComicInfoPre(background_image_url, comic_title, comic_impress, comic_video_href, commic_tags, comicmain_release_date, comicmain_intordu, img_sort_list, img_sort_source, comic_audio_href, scrolly, img_info_list) {
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
                        <a id="comicmain-video_href" class="comic-video_source comicmain-href"
                            href="${comic_video_href}" target="_blank">
                            <span class="comicmain-href el-icon-data-line">看番</span>
                        </a>
                        ${comic_audio_href ? `
                            <a id="comicmain-audio_href" href="${comic_audio_href}" class="comic-audio_source comicmain-href" style="bottom: 10px; left: calc(100% - 128px); border-radius: 20px; width: 100px; height: 40px;">
                                <span class="comicmain-href el-icon-data-line">K-ON</span>
                            </a>` : ""
            }
                    </div>
                </div>
            </div>
        `
        var comic_imglist = `
            <div class="comicmain-imglist">
                ${img_sort_list ? genImgHtml(img_sort_list, img_sort_source, img_info_list) : `<span id="comic-no_migs" style="color: white; margin: 0px auto; display:"block"> 啊嘞，主人好像还没找到喜欢的图片呢~</span>" `}
            </div>
        `
        document.querySelector("#body-wrap").insertAdjacentHTML("beforeend", `
            <div class="botload self-enter-active" id="comic">
                <div class="comicmain">
                    <span class="breakpage-btn" scrolly="${scrolly}">
                        <i class="el-icon-close"></i>
                    </span>
                    ${comic_contain}
                    ${comic_imglist}
                </div>
        `)
    }

    function genImgHtml(img_sort_list, img_sort_source, img_info_list) {
        const ulHtml = img_sort_list.map((img_url_list, index) => {
            const liHtml = img_url_list.map((img_url, index1) => {
                if (img_url === "") return "";
                let height = (width - 8) / img_info_list[index][index1].width * (img_info_list[index][index1].height) + 8
                return `
                    <div class="img-card comicmain-imglist_imgs-item" style="height:${height}px" data-thumb="${img_url}">
                        <img data-fancybox="gallery"
                            src="${img_url}"
                            data-lazy-src="${img_url}"
                            data-src="${img_url}"
                            referrerpolicy="no-referrer"
                            data-ll-status="loaded"
                            class="detail-img unvis entered loaded"
                            style="border-radius: 0px"
                        >
                        <a href="${img_sort_source[index][index1]}" class="img_source">
                            <span>来源</span>
                        </a>
                    </div>
                `;
            }).join("");

            return `<li class="comicmain-imglist_imgs_li comicmain-imglist${index}">${liHtml}</li>`;
        }).join("");

        return `<ul class="comicmain-imglist_imgs" id="comicmain-imglist_imgs" style="display:flex;">${ulHtml}</ul>`;
    }

    function sortLists(imglist) {
        if (!imglist) return null

        return imglist.reduce((result, element, index) => {
            result[index % 3].push(element);
            return result;
        }, [[], [], []]);
    }

    function sortImgInfo(img_info_list) {
        if (!img_info_list) return null

        return Object.values(img_info_list).reduce((result, element, index) => {
            result[index % 3].push(element);
            return result;
        }, [[], [], []]);
    }

    function closetInfo(element) {
        document.querySelector("#body-wrap").removeChild(document.querySelector("#comic"))
        anzhiyu.scrollToDest(element.getAttribute("scrollY"))
    }

    function imgVisCon() {
        setTimeout(function () {
            $('.img-card img').each(function () {
                $(this).removeClass('unvis');
            });
        }, 600)
    }
}



fun();