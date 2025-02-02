document.addEventListener('DOMContentLoaded', async function fun() {
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

    const isSupportWebp = (() => {
        try {
            return document.createElement('canvas').toDataURL('image/webp', 0.5).indexOf('data:image/webp') === 0;
        } catch (ignore) {
            return false;
        }
    })()
    const root = '/comic/'
    const config = await (await fetch(`${root}config.json`)).json()
    const sizeList = config.size
    // 单页卡片数量限制
    const maxCount = 10
    const dataAmount = config.amount
    // JSON
    const jsonMap = {
        wantWatch: new ApartJson(`${root}wantWatch`, maxCount, dataAmount, sizeList.wantWatch),
        watching: new ApartJson(`${root}watching`, maxCount, dataAmount, sizeList.watching),
        watched: new ApartJson(`${root}watched`, maxCount, dataAmount, sizeList.watched)
    }

    /** 处理参数 */
    const parseArg = () => {
        const url = location.href
        let arg
        if (url.endsWith('/')) {
            arg = { id: 'watching', page: 1 }
        } else {
            arg = JSON.parse(decodeURIComponent(location.hash.substring(1)))
            // 校对参数
            if (!arg.id || (arg.id !== 'watching' &&
                arg.id !== 'wantWatch' && arg.id !== 'watched'))
                arg.id = 'watching'
            if (!arg.page || arg.page < 1) arg.page = 1
        }
        sessionStorage.setItem('bangumis', JSON.stringify(arg))
        return arg
    }

    const arg = await parseArg()
    let tagFilter = null
    const top = document.querySelector('#bangumi-top')
    const areas = top.querySelector('#areas')
    const tags = top.querySelector('#tags')
    const tabs = document.querySelector('.bangumi-tabs')

    /** 更新列表内容 */
    async function update(updateURL = true) {
        tabs.querySelectorAll('button').forEach(button => button.classList.add('disable'))
        top.querySelectorAll('div').forEach(div => div.classList.add('disable'))
        for (let value of areas.querySelector('.list').children) {
            if (value.classList.contains(arg.id)) value.classList.add('active')
            else value.classList.remove('active')
        }
        const json = jsonMap[arg.id]
        json.setPage(arg.page - 1)

        function buildCard(title, img, href, follow, type, area, play, coin, danmaku, score, tagList, index) {
            if (!img.startsWith('http')) img = `https://i0.hdslb.com/bfs/bangumi/${img}${isSupportWebp ? '@220w_280h.webp' : ''}`
            let tags = ''
            for (let name of tagList) tags += `<p>${name}</p>`
            // noinspection HtmlUnknownAttribute,HtmlRequiredAltAttribute
            return `<div class="card" link="${href}" index="${index}"><img src="${img}" referrerpolicy="no-referrer"><div class="info"><a class="title">${title}</a><div class="details"><span class="area"><p>${type}</p><em>${area}</em></span><span class="play"><p>播放量</p><em>${play}</em></span><span class="follow"><p>追番</p><em>${follow}</em></span><span class="coin"><p>硬币</p><em>${coin}</em></span><span class="danmaku"><p>弹幕</p><em>${danmaku}</em></span><span class="score"><p>评分</p><em>${score}</em></span></div><div class="tags">${tags}</div></div></div>`
        }

        const inner = document.getElementById('inner')
        inner.innerHTML = ''
        if (updateURL) location.hash = JSON.stringify(arg)
        for (let i = 0; i !== maxCount;) {
            const value = await json.readNext()
            if (!value) break
            if (tagFilter && !tagFilter(value)) continue
            const id = value.id ?? 0
            const href = id === 0 ? '' : (typeof id !== 'number' ? id : `https://www.bilibili.com/bangumi/media/md${id}/`)
            inner.innerHTML += buildCard(value.title, value.cover, href ?? 0,
                value.follow ?? '-', value.type ?? '番剧', value.area ?? '日本', value.view ?? '-',
                value.coin ?? '-', value.danmaku ?? '-', value.score ?? '-', value.tags ?? [], value.index ?? 0)
            ++i
        }

        const pageNum = document.getElementById('bottom-num')
        appendText(pageNum, tagFilter ? 'disabled' : `${arg.page} / ${json.size()}`, true)
        tabs.querySelectorAll('button').forEach(button => button.classList.remove('disable'))
        top.querySelectorAll('div').forEach(div => div.classList.remove('disable'))

        const pre = document.getElementById('bottom-pre').classList
        const next = document.getElementById('bottom-next').classList
        if (arg.page === 1) pre.add('disable')
        if (json.isLastPage(arg.page - 1)) next.add('disable')
    }

    const init = () => {
        const bulidDIv = (name) => `<div class="${name}">${name}</div>`

        const areaList = areas.querySelector('.list')
        for (let area of config.areas) {
            areaList.innerHTML += bulidDIv(area)
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
            const name = target.className
            tagFilter = name === 'all' ? null : card => card.tags?.includes(name)
            classList.add('active')
            update(false)
        }
        areas.addEventListener('click', event => {
            const target = event.target
            const classList = target.classList
            if (!target.parentNode?.classList?.contains('list') ||
                classList.contains('active') || classList.contains('disable')) return
            arg.id = target.className
            arg.page = 1
            update()
        })

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

    /** 注册点击事件 */
    function initClick(arg) {
        const top = document.getElementById('bangumi-top')
        top.addEventListener('click', event => {
            const element = event.target.id ? event.target : event.target.parentNode
            if (element.nodeName !== 'BUTTON') return
            const classList = element.classList
            if (classList.contains('active') || classList.contains('disable')) return
            classList.add('active')
            for (let value of top.children) {
                if (value.id !== element.id) value.classList.remove('active')
            }
            arg.id = element.id
            arg.page = 1
            sessionStorage.setItem('bangumis', JSON.stringify(arg))
            update()
        })
        const bottom = document.getElementById('bangumi-bottom')
        const height = document.getElementById('page-header').clientHeight
        bottom.addEventListener('click', event => {
            const element = event.target.id ? event.target : event.target.parentNode
            if (element.nodeName !== 'BUTTON' || element.classList.contains('disable')) return
            btf.scrollToDest(height)
            switch (element.id) {
                case 'bottom-first':
                    arg.page = 1
                    break
                case 'bottom-end':
                    arg.page = jsonMap[arg.id].size()
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
        const card = document.getElementById('inner')
        card.addEventListener('click', event => {
            let element = event.target.id ? event.target : event.target.parentNode
            if (!element.classList.contains('descr')) {
                while (!element.classList.contains('card')) element = element.parentElement
                const link = element.getAttribute('link')
                if (link.length > 1) open(link)
                else btf.snackbarShow('博主没有为这个番剧设置链接~')
            }
        })
    }

    init()
    const hashchangeTask = () => {
        const newArg = parseArg()
        if (newArg.id !== arg.id && newArg.page !== arg.page) {
            arg.id = newArg.id
            arg.page = newArg.page
            update(false)
        }
    }
    addEventListener('hashchange', hashchangeTask)
    for (let key in sizeList) {
        appendText(areas.querySelector(`.${key}`), sizeList[key], false)
    }
    initClick(arg)
    // noinspection ES6MissingAwait
    update(false)
})