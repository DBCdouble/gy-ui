import React , {Component} from 'react';
import './index.less';
const sel = require("./img/yuanxingduihao1.png");
const selNor = require("./img/yuanxingduihao2.png");

export default class TimeLine extends Component{
  constructor(props){
    super(props);
    this.state=({

    });
  }
  componentDidMount(){
    
  }

  render(){
    return(
      <div className="gy-steps">
        <ul>
          {
            this.props.titles.map((item,i) =>{
              var nowTitle = parseInt(this.props.nowTitle);
              var leftImg = 126*i + "px";
              var leftLine = 126*i + 20 + "px";
              var styleLine = {};
              var styleImg = {"left":leftImg};
              var styleText = {"left":leftLine};
              if ( i == (this.props.titles.length - 1)) {
                styleLine = {"left":styleLine,"display":"none"}
              }else{
                styleLine = {"left":leftLine}
              }
              if ( i < nowTitle ) {
                return (
                  <li key={i}>
                    <div className="imgBox">
                      <img src={sel} alt="" className="sel" style={styleImg}/>
                      <div className="line" style={styleLine}></div>
                    </div>
                    <div className="text" style={styleText}>{item}</div>
                  </li>
                )
              }else{
                return (
                  <li key={i}>
                    <div className="imgBox">
                      <img src={selNor} alt="" className="sel" style={styleImg}/>
                      <div className="line lineNor" style={styleLine}></div>
                    </div>
                    <div className="text textNor" style={styleText}>{item}</div>
                  </li>
                )
              }
            })
          }
        </ul>
      </div>
    );
  }
}

