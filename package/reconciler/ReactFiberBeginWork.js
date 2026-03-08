// beginWork 中，根据 FiberNode 对象的 tag 值，调用不同的方法进行处理
import {
    FunctionComponent,
    ClassComponent,
    HostComponent,
    HostText,
    Fragment
} from "./ReactWorkTags"
import {
    updateHostComponent
} from './ReactFiberReconciler'

/**
 * 根据 wip FiberNode 不同 tag 值调用不同方法
 * @param {*} wip 
 */
function beginWork(wip) {
    const tag = wip.tag

    switch (tag) {
        case FunctionComponent: {
            break
        }
        case ClassComponent: {
            break;
        }
        case HostComponent: {
            updateHostComponent(wip)
            break
        }
        case HostText: {
            updateHostText(wip)
            break
        }
        case Fragment: {
            break
        }
    }
}

export default beginWork