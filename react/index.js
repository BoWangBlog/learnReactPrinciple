/**
 * index.js
 * @author wangbo
 * @since 2021/1/26
 */

/**
 * 创建doms
 * @param tag
 * @param attrs
 * @param childrens
 * @returns {{childrens: *[], tag, attrs}}
 */
const createElement = (tag, attrs, ...childrens) => {
    return {
        tag,
        attrs,
        childrens
    }
}

const React = {
    createElement
};

export default React;
