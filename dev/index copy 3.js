async function fun() {

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
         * 读取下一项
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
    // const jsonMap = {
    //     所有: new ApartJson(`${root}所有`, maxCount, dataAmount, sizeList["日本"] + sizeList["中国大陆"] + sizeList["未知"]),
    //     日本: new ApartJson(`${root}日本`, maxCount, dataAmount, sizeList["日本"]),
    //     中国大陆: new ApartJson(`${root}中国大陆`, maxCount, dataAmount, sizeList["中国大陆"]),
    //     未知: new ApartJson(`${root}未知`, maxCount, dataAmount, sizeList["未知"]),
    // }

    /** 处理参数 */
    const parseArg = () => {
        const url = location.href
        let arg
        if (url.endsWith('/')) {
            arg = { area: '日本', page: 1 }
        } else {
            arg = JSON.parse(decodeURIComponent(location.hash.substring(1)))

            // 校对参数

            if (!arg.area || (arg.area !== '日本' &&
                arg.area !== '中国大陆' && arg.area !== '未知')) {

                if (arg.area == "all") {
                    arg.area = "所有"
                } else {
                    arg.area = '日本'
                }
            }

            if (!arg.page || arg.page < 1) {
                arg.page = 1
            }
        }
        return arg
    }

    // const arg = await parseArg()
    let tagFilter = null
    const top = document.querySelector('#comic-top')
    const areas = top.querySelector('#areas')
    const tags = top.querySelector('#tags')
    const tabs = document.querySelector('.comic-tabs')

    /** 更新列表内容 */
    async function update(updateURL = true) {
        // console.group(`sessionStorage.comics :`)
        // console.info(sessionStorage.getItem('comics'))
        // console.groupEnd()

        if (updateURL) location.hash = JSON.stringify(arg)

        tabs.querySelectorAll('button').forEach(button => button.classList.add('disable'))
        top.querySelectorAll('div').forEach(div => div.classList.add('disable'))
        for (let value of areas.querySelector('.list').children) {
            if (value.classList.contains(arg.area)) value.classList.add('active')
            else value.classList.remove('active')
        }

        if (arg.area == "all") {
            arg.area = "所有"
            document.querySelector("#areas").querySelector(".all").classList.add('active')
        }
        const json = jsonMap[arg.area]
        json.setPage(arg.page - 1)


        const inner = document.getElementById('inner')
        inner.innerHTML = ''

        console.group(`is xunhuan : ${maxCount}`)
        for (let i = 0; i !== maxCount;) {
            const value = await json.readNext()


            if (!value) break
            if (tagFilter && !tagFilter(value)) continue

            console.info(value.title)

            const id = value.id ?? 0
            const href = id === 0 ? '' : (typeof id !== 'number' ? id : `https://www.bilibili.com/bangumi/media/md${id}/`)
            inner.innerHTML += buildCardOri(value.title, value.des, value.cover, value.tags, value.releaseDate, href, value.totalCount, value.type, value.area, value.view, value.follow, value.coin, value.danmaku, value.score)
            ++i

        }
        console.groupEnd()

        const pageNum = document.getElementById('bottom-num')

        appendText(pageNum, tagFilter ? 'disabled' : `${arg.page} / ${json.size()}`, true)
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
        // console.info(`sessionStorage.comics : ${sessionStorage.getItem('comics')}`)

        document.querySelector("#areas").querySelector(".all").textContent += `(${config.size})`

        const bulidDIv = (class_name, title) => `<div class="${class_name}">${title}</div>`

        const areaList = areas.querySelector('.list')
        for (const [key, value] of Object.entries(config.areas)) {
            areaList.innerHTML += bulidDIv(key, `${key == "undefined" ? "未知" : key}(${value})`)
        }

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

            update()
        }

        const tagList = tags.querySelector('.list')
        for (let tag of Object.keys(config.tags)) {
            tagList.innerHTML += bulidDIv(tag, tag)
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



    /** 注册点击事件 */
    function initClick(arg) {
        // console.info(`sessionStorage.comics : ${sessionStorage.getItem('comics')}`)

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

    // addEventListener('hashchange', hashchangeTask)

    for (let key in sizeList) {
        appendText(areas.querySelector(`.${key}`), sizeList[key], false)
    }

    // initClick(arg)

    // update(false)

}

// return

fun();