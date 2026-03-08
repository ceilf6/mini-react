import { updateNode } from "../shared/utils"

/**
 * 
 * @param {*} wip 当前正在处理的FiberNode，且是原生标签
 */
export function updateHostComponent(wip) {
    // 1. 创建真实的 DOM 节点对象
    if (!wip.stateNode) {
        wip.stateNode = document.createElement(wip.type)
        // 更新节点上的属性
        updateNode(wip.stateNode, {}, wip.props)
        // console.log("===更新属性后", wip.stateNode)
    }
}

export function updateHostText(wip) {
    // createFiber 中手动设置了文本节点 props 属性 children 为文本内容字符串
    wip.stateNode = document.createTextNode(wip.props.children)
}