/**
 * Created by Yun on 2016/10/10.
 * E-mail：wushujia@vip.qq.com
 */

import React from 'react'
import ReactDOM from 'react-dom';

//React组件
var Example0 = React.createClass({
    render:function () {
        return <div>Hello React,这是一个React组件</div>
    }
});

ReactDOM.render(
    <Example0 />,
    document.getElementById('example0')
);


//React组件属性
var Example1 = React.createClass({
    render: function () {
        return <div>这是一个通过属性获取的值：{this.props.name}</div>
    }
});

ReactDOM.render(<Example1 name="shujia.wu"/>, document.getElementById('example1'));

//复合组件 + 组件属性
var SubComponent1 = React.createClass({
    render: function () {
        return (
            <div>{this.props.name}</div>
        );
    }
});

var SubComponent2 = React.createClass({
    render: function () {
        return (
            <div>{this.props.name}</div>
        );
    }
});

var Example2 = React.createClass({
    render: function () {
        return  (
        <div>
            <SubComponent1 name={this.props.name1}/>
            <SubComponent2 name={this.props.name2}/>
        </div>);
    }
});

ReactDOM.render(<Example2 name1="子模块一" name2="子模块二"/>,document.getElementById('example2'));

