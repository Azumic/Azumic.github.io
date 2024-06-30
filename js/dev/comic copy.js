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

    const root = '/comic/'
    const config = await (await fetch(`${root}config.json`)).json()
    const sizeList = config.size
    // 单页卡片数量限制
    const maxCount = 10
    const dataAmount = config.amount
    // JSON



    const arg = await parseArg()
    let tagFilter = null
    const top = document.querySelector('#bangumi-top')
    const areas = top.querySelector('#areas')
    const tags = top.querySelector('#tags')
    const tabs = document.querySelector('.bangumi-tabs')

    /** 更新列表内容 */


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
        }
        // areas.addEventListener('click', event => {
        //     const target = event.target
        //     const classList = target.classList
        //     if (!target.parentNode?.classList?.contains('list') ||
        //         classList.contains('active') || classList.contains('disable')) return
        //     arg.id = target.className
        //     arg.page = 1
        // })

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
        }
    }

    init()

})