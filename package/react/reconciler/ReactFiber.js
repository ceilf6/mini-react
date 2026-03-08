import {
    Placement,
    isStr,
    isFn,
    isUndefined
} from "../../shared/utils"
import {
    FunctionComponent,
    ClassComponent,
    HostComponent,
    HostText,
    Fragment
} from "./ReactWorkTags"

/**
 * 
 * @param {*} vnode 当前的 vnode 节点
 * @param {*} returnFiber 父 FiberNode 节点
 */
function createFiber(vnode, returnFiber) {
    const fiber = {
        // FiberNode类型
        type: vnode.type,
        key: vnode.key,
        props: vnode.props,
        // 当前 FiberNode对象 所对应的 DOM节点
        stateNode: null,
        // 链表串连从而支持打断和接续
        // 子FiberNode
        child: null,
        // 兄弟FiberNode
        sibling: null,
        // 父FiberNode
        return: returnFiber,
        // 用于表示当前 FiberNode 对象要做操作的标志 // 位运算 二进制
        flags: Placement,
        // 记录当前节点在当前层级下的位置
        // (编译期分析、运行时使用？)
        index: null,
        // Fiber ping-pong双缓冲 => 复用
        alternate: null
    }

    // fiber节点对象上还有一个属性tag，是从 type 推得
    // tag用于区分不同类别的组件、进行分支处理
    const type = vnode.type
    // 如果是字符串，那么就是原生DOM节点
    if (isStr(type)) {
        fiber.tag = HostComponent
    }
    // 函数组件 和 类组件 的type都是function
    else if (isFn(type)) {
        // 通过判断 type 上是否有 isReactComponent
        if (type.prototype.isReactComponent) {
            fiber.tag = ClassComponent
        } else {
            fiber.tag = FunctionComponent
        }
    }
    // 文本节点 type为undefined
    else if (isUndefined(type)) {
        fiber.tag = HostText
        // 手动设置文本节点 props 属性 children 为文本内容字符串
        fiber.props = {
            children: vnode
        }
    }
    else {
        fiber.tag = Fragment
    }

    return fiber
}

export default createFiber