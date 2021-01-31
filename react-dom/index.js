/**
 * index.js
 * @author wangbo
 * @since 2021/1/26
 */
import Component from "../react/component";

/**
 * 函数/类 组件创建
 * @param component
 * @param props
 */
const createComponent = (component, props) => {
    // 类组件，创建实例，携带props返回
    if (component.prototype && component.prototype.render) {
        return new component(props);
    }
    // 函数组件，将函数组件扩展为类组件，便于后续统一s管理
    const inst = new Component(props);
    inst.constructor = component;
    inst.render = function () {
        return this.constructor(props);
    }
    return inst;
}

/**
 * 组件渲染
 * @param component
 */
const renderComponent = component => {
    // todo undefined
    const renderer = component.render();
    component.basic = _render(renderer);
}

/**
 * 设置组件属性
 * @param component
 * @param props
 */
const setComponentProps = (component, props) => {
    component.props = props;
    renderComponent(component);
}

/**
 * 渲染dom节点
 * @param vNode
 * @returns {Text|*}
 * @private
 */
const _render = vNode => {
    if (!vNode) {
        return;
    }
    // 字符串类型
    if (typeof vNode === 'string') {
        // 创建文本节点
        return document.createTextNode(vNode);
    }

    // 函数
    if (typeof vNode.tag === 'function') {
        // 创建组件
        const component = createComponent(vNode.tag, vNode.attrs);
        // 设置组件属性
        setComponentProps(component, vNode.attrs);
        // 返回组件渲染节点对象
        return component.basic;
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
    vNode.children.forEach(child => render(child, dom));
    return dom;
}

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
    return container.appendChild(_render(vNode));
};

const ReactDOM = {
    render
};

export default ReactDOM;
