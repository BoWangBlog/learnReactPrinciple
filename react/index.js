/**
 * index.js
 * @author wangbo
 * @since 2021/1/26
 */

/**
 * 创建doms
 * @param tag
 * @param attrs
 * @param children
 * @returns {{children: *[], tag, attrs}}
 */
const createElement = (tag, attrs, ...children) => {
    return {
        tag,
        attrs,
        children
    }
}

const React = {
    createElement
};

export default React;
