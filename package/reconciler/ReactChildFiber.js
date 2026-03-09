import { isStr, isArray } from '../shared/utils'
import createFiber from './ReactFiber'

/**
 * 用于协调子节点，涉及 diff 算法
 * @param {*} returnFiber 处理子节点，传入的 fiber 是父FiberNode
 * @param {*} children 子节点vnodes数组
 */
export function reconcileChildren(returnFiber, children) {
    if (isStr(children)) return
    // 字符串、文本节点 在 updateNode 方法中处理过了

    // ===准备工作
    // 1. 确保后面的 Children 为数组
    const newChildren = isArray(children) ? children : [children]
    // 2. 声明变量
    // 上一个 Fiber 对象
    let previousNewFiber = null
    // 缓冲对象
    let oldFiber = returnFiber.alternate?.child
    // 记录 children 数组的下标索引
    let i = 0
    // 上一次 DOM 节点插入的最远位置
    let lastPlacedIndex = 0
    // boolean: 是否需要追踪副作用, true 代表组件更新、false 代表组件初次渲染
    let shouldTrackSideEffects = !!returnFiber.alternate

    // 总共两轮遍历
    // 1. 第一轮遍历：尝试复用节点
    for (; oldFiber && i < newChildren.length; ++i) {
        // 初次渲染不会进入循环，因为没有 oldFiber
    }

    // 从上面循环出来有两种可能
    // a. i === newChildren.length 即更新
    if (i === newChildren.length) {
        // b情况需要清理剩余的旧的缓冲Fiber节点
    }

    // b. oldFiber 为 null，即初次渲染
    if (!oldFiber) {
        // a情况初次渲染，需要将 newChildren 数组中的每一个元素都生成一个 fiber 对象
        // 然后将这些 fiber 对象串联成 fiber链表
        for (; i < newChildren.length; ++i) {
            const newChildVNode = newChildren[i]

            if (newChildVNode === null) continue

            // 根据vnode元素创建新的FiberNode对象
            const newFiber = createFiber(newChildVNode, returnFiber)
            // 更新 lastPlacedIndex
            lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, i, shouldTrackSideEffects)

            // 将新生成FiberNode插入到Fiber链表中
            if (previousNewFiber === null) {
                // 是第一个子节点
                returnFiber.child = newFiber
            } else {
                previousNewFiber.sibling = newFiber
            }
            // 更新当前节点为上一个节点
            previousNewFiber = newFiber
        }
    }
}

/**
 * 用于更新 lastPlacedIndex
 * @param {*} newFiber 刚创建的新的FiberNode
 * @param {*} lastPlacedIndex 上次插入的最远位置 lastPlacedIndex
 * @param {*} newIndex 当前下标
 * @param {*} shouldTrackSideEffects 用于判断 returnFiber 是初次渲染还是更新
 */
function placeChild(newFiber, lastPlacedIndex, newIndex, shouldTrackSideEffects) {
    newFiber.index = newIndex
    if (!shouldTrackSideEffects) {
        // 初次渲染，不需要记录节点位置
        return lastPlacedIndex
    }
    // TODO: （更新时需要节点位置来判断复用）
}