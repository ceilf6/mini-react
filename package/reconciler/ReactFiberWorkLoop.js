// 负责整个 React 的执行流程

// work in progress 表示正在工作的 FiberNode 对象
let wip = null

// 保存当前工作的根节点的 FiberNode 对象
let wipRoot = null

function scheduleUpdateOnFiber(fiber) {
    wip = fiber
    wipRoot = fiber

    // https://github.com/ceilf6/Lab/commit/f060289c20bf74a4bf4dc36a3b5e94e54a997ca0
    // 虽然 rIC 限定了运行环境在浏览器，
    // TODO: 但是目前我先完成一个最小可行版本，先用这个 API 进行调度，后面再改为 MessageChannel、用 Scheduler 包进行调用
    // 在每一帧的空余时间执行 workloop
    requestIdleCallback(workloop)
}

function commitRoot() { }

/**
 * 在每一帧有剩余时间时执行
 * @param {*} deadline 
 */
function workloop(deadline) {
    while (wip && deadline.timeRemaining() > 0) {
        // 有需要处理的FiberNode节点 并且 还有剩余时间
        performUnitOfWork(); // 用于处理一个FiberNode节点
    }
    // Fiber树上的节点都处理完了 或者 没有剩余时间
    if (!wip) {
        // 都处理完后，commit => 渲染
        commitRoot() // 将 wipRoot 提交到 DOM 节点上
    }
}

/**
 * 用于处理一个FiberNode节点
 * 1. 处理当前的 FiberNode 节点对象
 * 2. 深度优先遍历子节点，生成子节点的FiberNode对象、继续处理
 * 3. 副作用（hook链）
 * 4. 进行渲染
 */
function performUnitOfWork() {
    beginWork(wip)

    // 深度优先
    if (wip.child) {
        wip = wip.child
        return
    }

    completeWork(wip)

    // 如果没有子节点，就找兄弟节点
    let next = wip
    while (next) {
        if (next.sibling) {
            wip = next.sibling
            return
        }

        // 没进入上面分支 - 没有兄弟节点
        // 将父节点设置为当前正在工作的节点，然后在父节点那一层继续寻找兄弟
        next = next.return

        // 在寻找父亲层的兄弟节点之前，先执行 completeWork 方法
        completeWork(next)
    }

    // 到这里时，没有节点需要处理了
    wip = null
}

export default scheduleUpdateOnFiber