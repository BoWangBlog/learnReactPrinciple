/**
 * index.js
 * @author wangbo
 * @since 2021/1/26
 */

const React = {
    createElement
};

const createElement = (tag, attrs, ...childrens) => {
    return {
        tag,
        attrs,
        childrens
    }
}

export default React;
