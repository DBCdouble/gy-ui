import React , {Component} from 'react';
import './index.less';
const tanhao = require("./img/tanhao.png");

export default class ListNone extends Component{
  constructor(props){
    super(props);
    this.state=({
      list:[],
      text:""
    });
  }
  componentDidMount(){
    
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      list:nextProps.list,
      text:nextProps.text
    });
  }

  render(){
    var show = {"display":"block"};
    var hide = {"display":"none"};
    const { list, text } = this.props;
    return(
      <div className="gy-noneList" style={list.length?hide:show} ref={r => this.listNone = r}>
        <img className="tanhao" src={tanhao} alt=""/>{text}
      </div>
    );
  }
}

