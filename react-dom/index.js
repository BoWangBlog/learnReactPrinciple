/**
 * index.js
 * @author wangbo
 * @since 2021/1/26
 */

/**
 * 属性设置
 * @param dom dom节点
 * @param key 属性名
 * @param value 属性值
 */
const setAttribute = (dom, key, value) => {
    // class
    if (key === 'className') {
        key = 'class';
    }

    // event
    if (key.startsWith('on') || /on\w+/.test(key)) {
        // 转小写
        key = key.toLowerCase();
        dom[key] = value || '';
    }

    // style
    if (key === 'style') {
        // style = 'width: 100'
        if (!value || typeof value === 'string') {
            dom.style.cssText = value || '';
            return;
        }
        // style = {{width: 100}}
        if (value && typeof value === 'object') {
            for (let k in value) {
                // 数值类型默认添加px
                if (typeof value[k] === "number") {
                    dom.style[k] = `${value[k]}px`;
                    return;
                }
                dom.style[k] = value[k];
            }
        }
        return;
    }

    // other attribute
    if (key in dom) {
        dom[key] = value || '';
    }
    if (value) {
        dom.setAttribute(key, value);
        return;
    }
    dom.removeAttribute(key);
};

/**
 * render渲染函数
 * @param vNode 虚拟dom
 * @param container dom容器
 * @returns {*|ActiveX.IXMLDOMNode}
 */
const render = (vNode, container) => {
    if (vNode === undefined) {
        return;
    }
    // 字符串类型
    if (typeof vNode === 'string') {
        // 创建文本节点
        const textNode = document.createTextNode(vNode);
        container.appendChild(textNode);
        return container;
    }

    // 虚拟dom对象
    const { tag, attrs } = vNode;
    // 创建dom对象
    const dom = document.createElement(tag);
    // 存在属性则进行设置
    if (attrs) {
        Object.keys(attrs).forEach(key => {
            const value = attrs[key];
            setAttribute(dom, key, value);
        })
    }
    // 递归调用渲染子节点
    vNode.childrens.forEach(child => render(child, dom));

    return container.appendChild(dom);
};


const ReactDOM = {
    render
};

export default ReactDOM;
