import qs from '../modules/query-string/index'
import { replacePage, back } from "../utils/wxJsMethods"


// 登录返回原页面
export default function backMethod (pageObj) {
    let _onLoad = pageObj.onLoad ? pageObj.onLoad : undefined;

    pageObj.onLoad = function (options) {
        let backUrl = ''
        if (options.from) {
            const query = { ...options }
            const route = query.from
            delete query.from
            backUrl = `?from=${route}&${qs.stringify(query)}`
        }
        this.setData({ backUrl })
        if (_onLoad) {
            _onLoad.call(this, options);
        }
    }
    pageObj._back = function () {
        if (this.options.type && this.options.type == 'back') {
            return back()
        }

        const pages = getCurrentPages()
        let { route: rootPath } = pages[0]
        rootPath = `/${rootPath}`
        if (this.data.backUrl) {
            const query = { ...this.options }
            const route = query.from
            delete query.from
            const path = `${route}?${qs.stringify(query)}`
            replacePage(path)
        } else {
            replacePage(rootPath)
        }
    }
    return pageObj
}