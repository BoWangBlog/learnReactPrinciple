/**
 * index.js
 * @author wangbo
 * @since 2021/1/26
 */
import React from "./react";
import ReactDOM from './react-dom';

const ele = (
    <div className="active" title="react">
        hello, <span style={{ color: 'red' }}>learning react</span>
    </div>
);

ReactDOM.render(ele, document.querySelector('#root'));
