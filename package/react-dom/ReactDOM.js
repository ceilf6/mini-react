import createFiber from "../reconciler/ReactFiber"
import scheduleUpdateOnFiber from "../reconciler/ReactFiberWorkLoop"

/**
 * 更新容器
 * @param {vnode} element 要挂载的虚拟树
 * @/docs/Node.md
 * @param {*} container 容器的根DOM节点
 */
function updateContainer(element, container) {
    const fiber = createFiber(element, {
        // 手动设置根的父FiberNode对象
        type: container.nodeName.toLowerCase(),
        stateNode: container
    })
    scheduleUpdateOnFiber(fiber)
    // 规划 更新
}

class ReactDOMRoot {
    constructor(container) {
        this._internalRoot = container // 根DOM节点
    }

    /**
     * 
     * @param {vnode} children Virtual Nodes Tree 要挂载到根DOM节点上的虚拟树
     */
    render(children) {
        updateContainer(children, this._internalRoot) // 更新容器
    }
}

const ReactDOM = {
    /**
     * 
     * @param {*} container 要挂载的根DOM节点
     * @returns 返回值是一个对象，从而支持链式、装饰器模式
     */
    createRoot(container) {
        return new ReactDOMRoot(container)
    }
}

export default ReactDOM;