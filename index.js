/**
 * index.js
 * @author wangbo
 * @since 2021/1/26
 */
import React from "./react";
import ReactDOM from './react-dom';

const Home = () => {
    return (
        <div>这里是home组件</div>
    )
}

const ele = (
    <div className="active" title="react">
        {<Home name="Home组件的name"/>}
        hello, <span style={{ color: 'red' }}>learning react</span>
    </div>
);

ReactDOM.render(ele, document.querySelector('#root'));
