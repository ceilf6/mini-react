// 存放工具方法

/**
 * FiberNode 中的操作标记 flags
 */
// 没有任何操作
export const NoFlags = 0b00000000000000000000;
// 节点新增、插入、移动
export const Placement = 0b0000000000000000000010; // 2
// 节点更新属性
export const Update = 0b0000000000000000000100; // 4
// 删除节点
export const Deletion = 0b0000000000000000001000; // 8

/**
 * 判断参数 s 是否为字符串
 * @param {*} s
 * @returns
 */
export function isStr(s) {
    return typeof s === "string";
}

/**
 * 判断参数 fn 是否为函数
 * @param {*} fn
 * @returns
 */
export function isFn(fn) {
    return typeof fn === "function";
}

/**
 * 判断参数 s 是否为 undefined
 * @param {*} s
 * @returns
 */
export function isUndefined(s) {
    return s === undefined;
}

/**
 * 用于更新 DOM 节点上的属性
 * @param {*} node 真实的 DOM 节点
 * @param {*} preVal 旧值
 * @param {*} nextVal 新值
 */
export function updateNode(node, preVal, nextVal) {
    // 1. 对旧值处理
    Object.keys(preVal).forEach(key => {
        if (key === 'children') {
            if (isStr(preVal[key])) {
                // 文本节点，children为字符串，需要设置为空字符串
                node.textContext = ''
            }
        }
        else if (key.startsWith('on')) {
            // on 开头 绑定事件，那么需要移除该旧值
            const eventName = key.slice(2).toLowerCase // 获取到事件名
            if (eventName === 'change') {
                // 如果是 onChange 那么绑定的是 input 事件
                eventName = 'input'
            }
            node.removeEventListener(eventName, preVal[key])
        }
        else {
            // 普通属性，如 id, className
            // 只清除不在新值中的部分
            node[key] = ""
        }
    })

    // 2. 对新值处理
    Object.keys(nextVal).forEach((k) => {
        if (k === "children") {
            // 需要判断是否是文本节点
            if (isStr(nextVal[k])) {
                node.textContent = nextVal[k];
            }
        } else if (k.startsWith("on")) {
            // 说明是绑定事件
            let eventName = k.slice(2).toLowerCase();

            if (eventName === "change") {
                eventName = "input";
            }

            node.addEventListener(eventName, nextVal[k]);
        } else {
            // 进入此分支，说明是普通的属性
            node[k] = nextVal[k];
        }
    });
}

/**
 * 判断参数 arr 是否为数组
 * 封装一层，统一、并且减少后面开发的代码量
 * @param {*} arr
 * @returns
 */
export function isArray(arr) {
    return Array.isArray(arr);
}