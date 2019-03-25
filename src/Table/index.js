import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListNone from '../ListNone';
import Pager from '../Pager';
import './index.less';
// API
// columns为表格定义数据格式,title字段为表格标题,dataIndex为传入的数据源中需要显示的字段一致,可以通过render函数来渲染当前列的数据 -> Array
// dataSource为数据源 -> Array
// rowSelection列表项是否可选 -> Object | null
// pagination为分页器 -> Object | false
// onRowClick为单行点击事件
export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowAllSelect: false,//全选按钮
      rowCheck: [],//单项勾选框
      rowSelId: [], //选中的id
      sortArr: [], //排序标志数组
    };
  }

  static propTypes = {
    columns: PropTypes.array.isRequired, //表头名称
    dataSource: PropTypes.array.isRequired, //数据列表
    emptyText: PropTypes.string, //列表为空时表格缺省状态
    pagination: PropTypes.object, //表格分页对象，包含当前页码,总共页数,分页器的点击事件,
    rowSelection: PropTypes.object, //表格单选全选的配置对象,onChange为单选全选框的状态改变事件，可以得到选中的列的数据
    style: PropTypes.object, //表格的样式对象
    isLastNoOp: PropTypes.bool //表格最后一行不需要渲染操作样式
  }

  static defaultProps = {
    dataSource: [],
    columns: [],
    pagination: {},
    emptyText: '暂无相关信息'
  };

  componentWillReceiveProps(nextProps) {
    let { dataSource } = nextProps;
    let { rowCheck } = this.state;
    let sortArr = [];
    if (dataSource != this.props.dataSource) {
      dataSource.map((item, i) => {
        rowCheck[i] = false;
      });
      this.props.columns.map(item => {
        sortArr.push("");
      });
      const rowSelId = [];
      this.props.rowSelection && this.props.rowSelection.onChange(rowSelId);
      this.setState({
        rowAllSelect: false,//全选按钮
        rowCheck,//单项勾选框
        rowSelId, //选中的id
        sortArr
      });
    }
  }

  //单选
  goodsChange = (item, index, event) => {
    let { rowCheck } = this.state;
    let status = false;
    let { rowSelId } = this.state;
    if (event.target.checked) {
      rowCheck[index] = true;
      rowSelId.push(item);
    } else {
      rowCheck[index] = false;
      for (let i = 0; i < rowSelId.length; i++) {
        if (rowSelId[i].id == item.id) {
          rowSelId.splice(i, 1);
          break;
        }
      }
      // rowSelId.splice($.inArray(item.id,rowSelId),1);
    }
    for (let i = 0; i < rowCheck.length; i++) {
      if (rowCheck[i]) {
        status = true;
      } else {
        status = false;
        break;
      }
    }
    if (status) {
      let all = [];
      for (let i = 0; i < rowCheck.length; i++) {
        all.push(true);
      }
      rowCheck = all;
    }
    this.setState({
      rowCheck,
      rowAllSelect: status,
      rowSelId
    });
    this.props.rowSelection && this.props.rowSelection.onChange(rowSelId);
  }

  //全选
  goodsAllChange = (event) => {
    var all = [];
    var rowSelId = [];
    const { dataSource } = this.props;
    var status = false;
    if (event.target.checked) {
      for (var i = 0; i < dataSource.length; i++) {
        all.push(true);
        rowSelId.push(dataSource[i]);
      }
      status = true;
    } else {
      for (var i = 0; i < dataSource.length; i++) {
        all.push(false);
        rowSelId = [];
      }
      status = false;
    }
    this.setState({
      rowCheck: all,
      rowAllSelect: status,
      rowSelId
    });
    this.props.rowSelection && this.props.rowSelection.onChange(rowSelId);
    event.stopPropagation();
  }

  trClick = (data, event) => {
    this.props.onRowClick && this.props.onRowClick(data, event);
  }

  sort = (item, type, index, event) => {
    let { sortArr } = this.state;
    for (let i = 0; i < sortArr.length; i++) {
      sortArr[i] = "";
    }
    sortArr[index] = type;
    this.setState({
      sortArr
    });
    item.sorter(type, item.dataIndex);
  }

  //列筛选
  colFilter = (item,event) =>{
    item.colFilter.eventL(event.target.value);
  }

  //递归columns的children
  retColumns = (columns) => {
    const { sortArr, rowAllSelect } = this.state;
    const { rowSelection, bordered } = this.props;
    return (
      <thead className={bordered && 'bordered'}>
        {this.convertToRows(columns).map((row,j) =>{
          return (
            <tr key={j}>
            {rowSelection && <th><input type="checkbox" className={rowAllSelect ? 'checked' : ''} checked={rowAllSelect} onChange={this.goodsAllChange} /></th>}
            {row.map((item, i) => {
              return (
                <th key={i} {...item} className={bordered && 'bordered'}>
                  <div className={item.sorter?"marginL":""}>{item.title}</div>
                  {item.sorter &&
                    <div>
                      <span className={`sort up${sortArr[i] === 'asc' ? ` top` : ``}`} onClick={this.sort.bind(this, item, "asc", i)}></span>
                      <span className={`sort down${sortArr[i] === 'desc' ? ` bottom` : ``}`} onClick={this.sort.bind(this, item, "desc", i)}></span>
                    </div>
                  }
                  {item.colFilter && 
                    <span className="colFilter">
                      <select onChange={this.colFilter.bind(this,item)}>
                      {
                        item.colFilter.data.map((filterItem,k) =>{
                          return (<option value={filterItem.val} key={k}>{filterItem.name}</option>)
                        })
                      }
                      </select>
                    </span>
                  }
                </th>
              )
            })}
            </tr>
          )
        })}
      </thead>
    )
  }
  getAllColumns = (columns) => {
    const result = [];
    columns.forEach((column) => {
      if (column.children) {
        result.push(column);
        result.push.apply(result, this.getAllColumns(column.children));
      } else {
        result.push(column);
      }
    });
    return result;
  }

  convertToRows = (originColumns) => {
    let maxLevel = 1;
    const traverse = (column, parent) => {
      if (parent) {
        column.level = parent.level + 1;
        if (maxLevel < column.level) {
          maxLevel = column.level;
        }
      }
      if (column.children) {
        let colSpan = 0;
        column.children.forEach((subColumn) => {
          traverse(subColumn, column);
          colSpan += subColumn.colSpan;
        });
        column.colSpan = colSpan;
      } else {
        column.colSpan = 1;
      }
    };
  
    originColumns.forEach((column) => {
      column.level = 1;
      traverse(column);
    });
  
    const rows = [];
    for (let i = 0; i < maxLevel; i++) {
      rows.push([]);
    }
  
    const allColumns = this.getAllColumns(originColumns);
  
    allColumns.forEach((column) => {
      if (!column.children) {
        column.rowSpan = maxLevel - column.level + 1;
      } else {
        column.rowSpan = 1;
      }
      rows[column.level - 1].push(column);
    });
    return rows;
  };

  retRows = (columns, data, index, isLastNoOp, length) =>{
    return (
      this.getAllColumns(columns).map((col, i) => {
        if (col.dataIndex !== undefined) {
          if (data[col.dataIndex] !== undefined) {
            return (<td key={i} width={col.width && col.width}>{col.render ? col.render(data[col.dataIndex], data, index) : data[col.dataIndex]}</td>)
          } else {
            return (<td key={i} width={col.width && col.width}></td>)
          }
        } else {
          if (col.children && col.children.length > 0 ) {
            this.retRows(col.children, data);
          } else {
            let renderEle = "";
            if (col.render) {
              renderEle = col.render(data, index);
              if(isLastNoOp && index === length - 1){
                renderEle = "";
              }
            }
            return (<td key={i} width={col.width && col.width}>{col.render && renderEle}</td>);
          }
        }
      })
    ); 
  }

  render () {
    const {
      className, 
      columns, 
      dataSource, 
      pagination, 
      rowSelection, 
      style, 
      emptyText, 
      isLastNoOp
    } = this.props;
    const { rowCheck } = this.state;
    return (
      <div className={`gy-table ${className}`}>
        <table style={style}>
          {/* 表头部分 */}
          {this.retColumns(columns)}
          <tbody>
            {
              dataSource.map((data, i) => {
                return (
                  <tr key={i} onClick={this.trClick.bind(this, data)}>
                    {rowSelection && <td><input type="checkbox" className={rowCheck[i] ? 'checked' : ''} checked={rowCheck[i]} onChange={this.goodsChange.bind(this, data, i)} /></td>}
                    {this.retRows(columns, data, i, isLastNoOp, dataSource.length)}
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <ListNone list={dataSource} text={emptyText} />
        <Pager {...pagination} />
      </div>
    );
  }
}