import React, {Component} from 'react';
import './index.less';
// import { Spin } from 'antd';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount(){
   
  }

  componentWillReceiveProps(nextProps) {
   
  }
  
  render(){
    return (
      <div className='gy-loading' ref={r => this.loadingBox = r}>
        {/* <Spin size="large" className="content" /> */}
      </div>
    );
  }
}
export default Loading;