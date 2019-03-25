import React from 'react';
import './index.less';
// API:
// children为按钮内的文本 -> nolimited
// onClick为绑定的点击事件 -> Function 
// type为按钮的表现类型,现有 primary,danger两种形式,如需新添加按钮的类型请在Button.less中添加对应的样式 -> String
// style为外部传入的样式对象用来给按钮自定义样式属性 -> Object
const Button  = ({children,onClick,type,style}) =>{
  return (
    <div className={`gy-btn ${type || `primary`}`} onClick={onClick} style={style}>{children}</div>
  );
};
export default Button;