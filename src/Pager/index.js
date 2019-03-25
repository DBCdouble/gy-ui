import React , {Component} from 'react';
import './index.less';

const next = require("./img/next_ic.png");
const prew = require("./img/back_ic.png");

export default class Pager extends Component{
  constructor(props){
    super(props);
    this.state=({
      total:0,
      current:1,
      pagerArr:[],
      showAllCount:false
    });
    this.pageClick = this.pageClick.bind(this);
    this.pageChange = this.pageChange.bind(this);
    this.turnTo = this.turnTo.bind(this);
  }
  componentDidMount(){
    var total = parseInt(this.props.total);
    var pagerArr = [];
    for (var i = 1; i <= total; i++) {
      pagerArr.push(i);
    }
    this.setState({
      total:total,
      current:parseInt(this.props.current),
      pagerArr:pagerArr,
      showAllCount:this.props.showAllCount
    })
  }

  //页码点击
  pageClick(page){
    if (page != this.props.current) {
      this.props.getPage(page);
      this.setState({
        current:page
      })
    }
  }

  //上下页切换
  pageChange(opWay){
    var newCurrent = 0;
    switch (opWay) {
      case "prew":
        newCurrent = this.props.current - 1;
        break;
      case "next":
        newCurrent = this.props.current + 1;
        break;
      default:
        break;
    }
    this.props.getPage(newCurrent);
    this.setState({
      current:newCurrent
    })
  }

  //点击跳转
  turnTo(){
    var pageNum = parseInt(this.refs.pageNum.value);
    var result = (pageNum.toString()).indexOf(".");
    if(result != -1 || pageNum > this.props.total || pageNum.length == 0 || pageNum < 1 ) {
      alert("请输入正确的页码！");
      this.refs.pageNum.value = "";
    }else{
      if (pageNum != this.props.current) {
        this.props.getPage(pageNum);
        this.setState({
          current:pageNum
        })
      }
    }
  }

  render(){
    var pageArr = [];
    var total = parseInt(this.props.total);
    var current = parseInt(this.props.current);
    var pagerArr = [];
    for (var i = 1; i <= total; i++) {
      pagerArr.push(i);
    }
    var showToggle = true;
    var show = {"display":"block"};
    var hide = {"display":"none"};
    return (
      <div className="gy-pagerBox" style={total > 0?show:hide}>
        <ul>
          <li className="totalNum" style={this.props.totalCount?show:hide}>共有:{this.props.totalCount}单</li>
          <li className="totalNum" style={this.props.selCount?show:hide}>已选{this.props.selCount}个商品</li>
          <li className="pagerItem prew" style={current != 1?show:hide} onClick={this.pageChange.bind(this,"prew")}><img src={prew} alt=""/></li>
          {
            pagerArr.map((item,i) =>{
              var liEle = "";
              if ( total < 8 ) {
                if (item == current) {
                  liEle = (<li key={i} style={showToggle?show:hide} className="pagerItem current" onClick={this.pageClick.bind(this,item)}>{item}</li>);
                }else{
                  liEle = (<li key={i} style={showToggle?show:hide} className="pagerItem" onClick={this.pageClick.bind(this,item)}>{item}</li>);
                }
              }else{
                if (current < 4) {
                  if (item == current) {
                    liEle = (<li key={i} style={showToggle?show:hide} className="pagerItem current" onClick={this.pageClick.bind(this,item)}>{item}</li>);
                  }else if (item < 6) {
                    liEle = (<li key={i} style={showToggle?show:hide} className="pagerItem" onClick={this.pageClick.bind(this,item)}>{item}</li>);
                  }else if (item == total){
                    showToggle = true;
                    liEle = (<li key={i} style={showToggle?show:hide} className="pagerItem" onClick={this.pageClick.bind(this,item)}>{item}</li>);
                  }else{
                    liEle = (<li key={i} style={showToggle?show:hide} className="pagerItem">...</li>);
                    showToggle = false;
                  }
                }else if (current > total - 3){
                  if (item == current) {
                    showToggle = true;
                    liEle = (<li key={i} style={showToggle?show:hide} className="pagerItem current" onClick={this.pageClick.bind(this,item)}>{item}</li>);
                  }else if (item > total - 5) {
                    showToggle = true;
                    liEle = (<li key={i} style={showToggle?show:hide} className="pagerItem" onClick={this.pageClick.bind(this,item)}>{item}</li>);
                  }else if (item == 1){
                    showToggle = true;
                    liEle = (<li key={i} style={showToggle?show:hide} className="pagerItem" onClick={this.pageClick.bind(this,item)}>{item}</li>);
                  }else{
                    liEle = (<li key={i} style={showToggle?show:hide} className="pagerItem">...</li>);
                    showToggle = false;
                  }
                }else{
                  if (item == current) {
                    showToggle = true;
                    liEle = (<li key={i} style={showToggle?show:hide} className="pagerItem current" onClick={this.pageClick.bind(this,item)}>{item}</li>);
                  }else if ((item > current - 3) && (item < current + 3)) {
                    showToggle = true;
                    liEle = (<li key={i} style={showToggle?show:hide} className="pagerItem" onClick={this.pageClick.bind(this,item)}>{item}</li>);
                  }else if (item == 1 || item == total){
                    showToggle = true;
                    liEle = (<li key={i} style={showToggle?show:hide} className="pagerItem" onClick={this.pageClick.bind(this,item)}>{item}</li>);
                  }else{
                    liEle = (<li key={i} style={showToggle?show:hide} className="pagerItem">...</li>);
                    showToggle = false;
                  }
                }
              }
              return liEle;
            })
          }
          <li className="pagerItem next" style={current !== total?show:hide} onClick={this.pageChange.bind(this,"next")}><img src={next} alt=""/></li>
        </ul>
        <span className="pageEle turnTo" style={total == 1?hide:show} onClick={this.turnTo}>跳转</span>
        <div className="pageEle" style={total == 1?hide:show}><input type="number" max={total} ref="pageNum"/>页</div>
      </div>
    )
  }
}

