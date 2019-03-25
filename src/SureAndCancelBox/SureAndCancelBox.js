import React , {Component} from 'react';
import './index.less';
const closeIcon = require("./img/close_ic.png");

export default class SureAndCancelBox extends Component{
  constructor(props){
    super(props);
    this.state=({

    });
  }

  render(){
    return(
      <div className="gy-confirm" ref={r => this.sureAndCancelBox = r}>
        <div className="sureAndCancelInner">
          <div className="title">
            <span className="boxName">提示</span>
            <img src={closeIcon} alt="" className="closeBtn" style={this.props.noBtn?{"display":"none"}:{}} ref={r => this.close = r}/>
          </div>
          <div className="section">
            <div className="alertText">{this.props.text}</div>
            <div className="opBtn">
              <span className="cancel" style={this.props.noBtn?{"display":"none"}:{}} ref={r => this.cancel = r}>取消</span>
              <span className="sure" ref={r => this.sure = r}>确定</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

