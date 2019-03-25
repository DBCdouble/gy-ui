import React, {Component} from 'react';
import './index.less';
const closeIcon = require("./img/close_ic.png");
const ic_update_done = require("./img/ic_update_done.png");


export default class CommonAlertBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg:"",
      gougouShow:true
    }
  }

  componentDidMount(){
    this.setState({
      msg:this.props.text
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      msg:nextProps.text,
      gougouShow:nextProps.gougouShow
    })
  }

  render() {
    var msg = this.state.msg;
    var msgText = "";
    if (msg) {
      if(msg.length>6 && msg.substr(0,6)==="repeat"){
        var newMsg = msg.substring(6);
        var newMsgArr = newMsg.split("#");
        msgText = (<span className="containText">
        {newMsgArr.map((item,i) => {
            return (
              <span>{item}<br/></span>
            );
          })}
        </span>);
      }else{
        msgText = (<span className="containText">
          {msg}
        </span>);
      }
    }
    var show = {"display":"inline-block"};
    var hide = {"display":"none"};
    return (
      <div className="gy-alert" ref={r => this.commonAlertBox = r}>
        <div className="middle">
          <div className="innerBox">
            <div className="title">
              <span className="boxName">提示</span>
              <img src={closeIcon} alt="" className="closeBtn" ref={r => this.close = r}/>
            </div>
            <div className="editContainer">
              <div className="contain">
                <img src={ic_update_done} style={this.state.gougouShow?{"display":"inline-block"}:{"display":"none"}} alt="" className="containIcon"/>
                {msgText}
              </div>
            </div>
            <div className="btn" ref={r => this.sure = r}>
              确定
            </div>
          </div>
        </div>
      </div>
    );
  }
}