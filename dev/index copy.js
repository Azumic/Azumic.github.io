alert("index")

// document.addEventListener('DOMContentLoaded', async function fun() {
//     alert("async")
// })

// async function fun() { 
//     alert("async fun")
// }



// window.onload = async function fun() {
//     alert("window.onload")
// }

// document.addEventListener('pjax:complete', async function fun() {
//     alert("pjax:complete")

// })


// document.addEventListener('DOMContentLoaded', async function fun() {
//     alert("async")

async function fun() {

// })

// document.addEventListener('pjax:complete', async function fun() {
    // document.removeEventListener('pjax:complete', fun)
        // alert("async")
    


    /**
     * 分离Json的读取器
     *
     * @param root {string} 根目录，不以`/`结尾
     * @param amount {number} 每页的数量
     * @param dataAmount {number} 每个文件中数据的数量
     * @param size {number} 项目总量
     * @constructor
     */
    function ApartJson(root, amount, dataAmount, size) {
        // 下一个要读取项目编号
        let readIndex = 0
        // 读取的文件列表
        const fileList = new Map()
        // 标记最后一个index
        const lastIndex = Math.ceil(size / dataAmount) - 1

        /**
         * 读取指定下标的文件
         * @param index {number} 文件下标
         * @return {Promise}
         */
        const readFile = index => new Promise(resolve => {
            if (index > lastIndex || index < 0) throw `${index} not in [0, ${lastIndex}]`
            if (fileList.has(index)) {
                let id
                const task = () => {
                    const cache = fileList.get(index)
                    if (cache) {
                        if (id) clearInterval(id)
                        resolve(cache)
                    }
                }
                task()
                id = setInterval(task, 100)
            } else {
                fileList.set(index, null)
                fetch(`${root}/${index}.json`)
                    .then(response => response.json().then(json => {
                        fileList.set(index, json)
                        resolve(json)
                    }))
            }
        })

        const readHelper = id => new Promise(resolve => {
            if (size && id > size) return resolve(null)
            const fileIndex = Math.floor(id / dataAmount)
            const innerIndex = id % dataAmount
            readFile(fileIndex).then(json => {
                const keys = Object.keys(json)
                resolve(json[keys[innerIndex]])
            })
        })

        // noinspection JSUnusedGlobalSymbols
        /**
         * 读取上一项
         * @return {Promise}
         */
        this.readNext = () => readHelper(readIndex++)

        /**
         * 读取上一项
         * @return {Promise}
         */
        //this.readPrev = () => readHelper(readIndex--)

        // noinspection CommaExpressionJS,JSUnusedGlobalSymbols
        /**
         * 设置页码，从0开始
         * @param page {number} 页面编号
         */
        this.setPage = page => {
            readIndex = page * amount
        }

        /** 获取页码数量 */
        this.size = () => Math.ceil(size / amount)

        /** 获取数据总量 */
        this.amount = () => size

        // noinspection JSUnusedGlobalSymbols
        /**
         * 判断指定页面是否为末页
         * @param page {number} 指定页面编号，留空为当前页面编号
         * @return {boolean}
         */
        this.isLastPage = (page = null) => {
            if (page === null) page = Math.floor(readIndex / amount)
            return page === this.size() - 1
        }
    }

    const root = '/comic/'
    const config = await (await fetch(`${root}config.json`)).json()
    const sizeList = config.arer_size
    // 单页卡片数量限制
    const maxCount = 10
    const dataAmount = config.amount
    // JSON
    const jsonMap = {
        所有: new ApartJson(`${root}所有`, maxCount, dataAmount, sizeList["日本"] + sizeList["中国大陆"] + sizeList["未知"]),
        日本: new ApartJson(`${root}日本`, maxCount, dataAmount, sizeList["日本"]),
        中国大陆: new ApartJson(`${root}中国大陆`, maxCount, dataAmount, sizeList["中国大陆"]),
        未知: new ApartJson(`${root}未知`, maxCount, dataAmount, sizeList["未知"]),
    }

    /** 处理参数 */
    const parseArg = () => {
        const url = location.href
        let arg
        if (url.endsWith('/')) {
            arg = { area: '日本', page: 1 }
        } else {
            arg = JSON.parse(decodeURIComponent(location.hash.substring(1)))

            console.group('parseArg')
            console.groupEnd()
            console.group(arg)
            console.groupEnd()

            // 校对参数

            if (!arg.area || (arg.area !== '日本' &&
                arg.area !== '中国大陆' && arg.area !== '未知')) {

                if (arg.area == "all") {
                    arg.area = "所有"
                    // document.querySelector("#areas").querySelector(".all").classList.add('active')
                } else {
                    arg.area = '日本'
                }
            }

            if (!arg.page || arg.page < 1) {
                arg.page = 1
            }
        }
        sessionStorage.setItem('comics', JSON.stringify(arg))
        return arg
    }

    const arg = await parseArg()
    let tagFilter = null
    const top = document.querySelector('#comic-top')
    const areas = top.querySelector('#areas')
    const tags = top.querySelector('#tags')
    const tabs = document.querySelector('.comic-tabs')

    /** 更新列表内容 */
    async function update(updateURL = true) {
        if (updateURL) location.hash = JSON.stringify(arg)

        console.info("hhelo")

        // return

        tabs.querySelectorAll('button').forEach(button => button.classList.add('disable'))
        top.querySelectorAll('div').forEach(div => div.classList.add('disable'))
        for (let value of areas.querySelector('.list').children) {
            if (value.classList.contains(arg.area)) value.classList.add('active')
            else value.classList.remove('active')
        }

        // 修正all的jsonMap arg.area
        // arg.area = arg.area == "all" ? "所有" : arg.area
        if (arg.area == "all") {
            arg.area = "所有"
            document.querySelector("#areas").querySelector(".all").classList.add('active')
        }
        // alert(arg.area)
        const json = jsonMap[arg.area]
        json.setPage(arg.page - 1)



        // function buildCard(title, img, href, follow, type, area, play, coin, danmaku, score, tagList, index) {
        //     if (!img.startsWith('http')) img = `https://i0.hdslb.com/bfs/bangumi/${img}${isSupportWebp ? '@220w_280h.webp' : ''}`
        //     let tags = ''
        //     for (let name of tagList) tags += `<p>${name}</p>`
        //     // noinspection HtmlUnknownAttribute,HtmlRequiredAltAttribute
        //     return `<div class="card" link="${href}" index="${index}"><img src="${img}" referrerpolicy="no-referrer"><div class="info"><a class="title">${title}</a><div class="details"><span class="area"><p>${type}</p><em>${area}</em></span><span class="play"><p>播放量</p><em>${play}</em></span><span class="follow"><p>追番</p><em>${follow}</em></span><span class="coin"><p>硬币</p><em>${coin}</em></span><span class="danmaku"><p>弹幕</p><em>${danmaku}</em></span><span class="score"><p>评分</p><em>${score}</em></span></div><div class="tags">${tags}</div></div></div>`
        // }

        const inner = document.getElementById('inner')
        inner.innerHTML = ''

        for (let i = 0; i !== maxCount;) {
            const value = await json.readNext()

            // console.info(value)


            // console.info("is value?")
            if (!value) break
            if (tagFilter && !tagFilter(value)) continue

            const id = value.id ?? 0
            const href = id === 0 ? '' : (typeof id !== 'number' ? id : `https://www.bilibili.com/bangumi/media/md${id}/`)
            inner.innerHTML += buildCardOri(value.title, value.des, value.cover, value.tags, value.releaseDate, href, value.totalCount, value.type, value.area, value.view, value.follow, value.coin, value.danmaku, value.score)
            ++i

        }

        const pageNum = document.getElementById('bottom-num')
        // alert(`${arg.area} ${arg.page} / ${json.size()}`)
        // alert(json)
        console.group(`${arg.area} ${arg.page} / ${json.size()}`)
        console.groupEnd()
        console.group(json)
        console.groupEnd()


        appendText(pageNum, tagFilter ? 'disabled' : `${arg.page} / ${json.size()}`, true)
        // appendText(pageNum, `${arg.page} / ${json.size()}`, true)
        tabs.querySelectorAll('button').forEach(button => button.classList.remove('disable'))
        top.querySelectorAll('div').forEach(div => div.classList.remove('disable'))

        const pre = document.getElementById('bottom-pre').classList
        const next = document.getElementById('bottom-next').classList
        if (arg.page === 1) pre.add('disable')
        if (json.isLastPage(arg.page - 1)) next.add('disable')


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
                        <button id="detail-display" onclick="btn_detail_show(this)">显示</button>
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
    }

    /** 追加文本 */
    function appendText(element, text, clean) {
        text = `(${text})`
        if (navigator.userAgent.includes('Firefox')) {
            if (!clean && element.textContent.endsWith(')')) return
            element.textContent = clean ? text : element.textContent + text
        } else {
            if (!clean && element.innerText.endsWith(')')) return
            element.innerText = clean ? text : element.innerText + text
        }
    }

    const init = () => {
        // ---------------------------------------------------------------
        // @ addtocomic.js
        let background_image_url = 'https://api.adicw.cn/images/6149d0521a778.jpg?path=ComicImg/106&amp;w=400&amp;h=400'
        // let background_image_url = '/img/comic/07a2fa07836e0006ba9d6a2d5d0552b23463bb2b.jpg'
        // let background_image_url = 'https://i0.hdslb.com/bfs/bangumi/image/07a2fa07836e0006ba9d6a2d5d0552b23463bb2b.jpg'
        // let background_image_url = 'https://i0.hdslb.com/bfs/bangumi/image/07a2fa07836e0006ba9d6a2d5d0552b23463bb2b.jpg@260w_350h.webp'
        let comic_title = '轻音少女（けいおん！）'
        let comic_impress = '简介：新学年开始，高中一年级新生平泽唯在误将“轻音乐”当做了“轻便、简易的音乐”，而由于自己小时候玩响板得到老师表扬，于是萌发申请入部的想法。另一方面，樱丘高中“轻音部”因原来的部员全部毕业离校，此时轻音部新成员只有秋山澪和田井中律两人，无法满足部员至少四人的最低人数要求即将废部，这下该如何是好呢？此外，温柔可爱的千金小姐琴吹䌷被律强拉进入轻音部。于是，这四名高一女生机缘巧合聚在了一起，便有了吉他手平泽唯、贝司手秋山澪、鼓手田井中律以及键盘手琴吹䌷，轻音部的故事也由此展开。'

        document.querySelector("#body-wrap").appendChild(addtocomic(`url(${background_image_url})`, background_image_url, comic_title, comic_impress))
        document.querySelector("#areas").querySelector(".all").textContent += `(${config.comic_size})`

        const bulidDIv = (name) => `<div class="${name}">${name}</div>`

        const areaList = areas.querySelector('.list')
        for (let area of config.areas) {
            areaList.innerHTML += bulidDIv(area)
        }
        areaList.onclick = event => {

            // const target = event.target
            // const classList = target.classList
            // if (!target.parentNode?.classList?.contains('list') ||
            //     classList.contains('active') || classList.contains('disable')) return
            // arg.area = target.className
            // arg.page = 1
            // update()

            const target = event.target
            const parent = target.parentNode
            const classList = target.classList
            if (!parent.classList?.contains('list') ||
                classList.contains('active') || classList.contains('disable')) return
            for (let node of parent.children) {
                node.classList.remove('active')
            }
            // const name = target.className
            // tagFilter = name === 'all' ? null : card => card.tags?.includes(name)

            arg.area = target.className
            arg.page = 1

            classList.add('active')

            update()
        }

        const tagList = tags.querySelector('.list')
        for (let tag of config.tags) {
            tagList.innerHTML += bulidDIv(tag)
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
            const name = target.className
            tagFilter = name === 'all' ? null : card => card.tags?.includes(name)
            classList.add('active')

            update(false)
        }
    }

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

    /** 注册点击事件 */
    function initClick(arg) {
        const top = document.getElementById('comic-top')
        top.addEventListener('click', event => {
            const element = event.target.id ? event.target : event.target.parentNode
            if (element.nodeName !== 'BUTTON') return
            const classList = element.classList
            if (classList.contains('active') || classList.contains('disable')) return
            classList.add('active')
            for (let value of top.children) {
                if (value.id !== element.id) value.classList.remove('active')
            }
            arg.area = element.id
            arg.page = 1
            sessionStorage.setItem('comics', JSON.stringify(arg))
            update()
        })
        const bottom = document.getElementById('comic-bottom')
        const height = document.getElementById('page-header').clientHeight
        bottom.addEventListener('click', event => {
            const element = event.target.id ? event.target : event.target.parentNode
            if (element.nodeName !== 'BUTTON' || element.classList.contains('disable')) return
            anzhiyu.scrollToDest(height)
            switch (element.id) {
                case 'bottom-first':
                    arg.page = 1
                    break
                case 'bottom-end':
                    arg.page = jsonMap[arg.area].size()
                    break
                case 'bottom-next':
                    ++arg.page
                    break
                case 'bottom-pre':
                    --arg.page
                    break
            }
            setTimeout(() => update(arg), 200)
        })
        // const card = document.getElementById('inner')
        // card.addEventListener('click', event => {
        //     let element = event.target.id ? event.target : event.target.parentNode
        //     if (!element.classList.contains('descr')) {
        //         while (!element.classList.contains('card')) element = element.parentElement
        //         const link = element.getAttribute('link')
        //         if (link.length > 1) open(link)
        //         else btf.snackbarShow('博主没有为这个番剧设置链接~')
        //     }
        // })
    }

    init()

    const hashchangeTask = () => {
        const newArg = parseArg()
        if (newArg.area !== arg.area && newArg.page !== arg.page) {
            arg.area = newArg.area
            arg.page = newArg.page
            update(false)
        }
    }
    addEventListener('hashchange', hashchangeTask)

    for (let key in sizeList) {
        // alert(key)
        appendText(areas.querySelector(`.${key}`), sizeList[key], false)
    }

    initClick(arg)


    update(false)


}
// )

fun();