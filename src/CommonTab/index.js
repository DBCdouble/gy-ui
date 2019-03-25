import React , {Component} from 'react';
import './index.less';
const tanhao = require("./img/tanhao.png");

export default class CommonTab extends Component{
  constructor(props){
    super(props);
    this.state=({
      tabList:[],
      actType:1
    });
    this.orderTypeTab = this.orderTypeTab.bind(this);
  }
  componentDidMount(){
    this.setState({
      tabList:this.props.tabList,
      actType:this.props.actType
    })
  }

  orderTypeTab(type){
    this.props.tabChange(type);
    this.setState({
      actType:type
    })
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      tabList:nextProps.tabList,
      actType:nextProps.actType
    });
  }

  render(){
    var show = {"display":"block"};
    var hide = {"display":"none"};
    var styleAct = {"borderColor":"#eb6767 #e4e4e4 #ffffff #e4e4e4","height":"41px","background":"#fff","color":"#eb6767"};
    return(
      <div className="gy-tab">
        <ul>
          {
            this.state.tabList.map((item,i)=>{
              return(
                <li className="selTypeTabItem" key={i} onClick={this.orderTypeTab.bind(this,item.type)} style={this.state.actType==item.type?styleAct
                :{}}>{item.tabName}<span style={item.normalNum?{}:{"display":"none"}}>({item.normalNum}{item.ciq})</span><span style={item.bubbleNum?{}:{"display":"none"}} className="tag">{item.bubbleNum}</span></li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

