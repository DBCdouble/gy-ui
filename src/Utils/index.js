import * as math from 'mathjs'
var Uitil = {
	pointReg: function (value, digit) {
		//digit为需要保存的小数点后的位数
		value=value.replace(/[^\d^\.]+/g,'');
		if(value.indexOf(".")!=-1){
      value=value.substring(0, (value.indexOf(".")+digit+1));
    }
		return value;
	},
	priceRE:function (value) {
		//只允许输入数字和小数点 保留两位小数
		value=value.replace(/[^\d^\.]+/g,'');
		if(value.indexOf(".")!=-1){
      value=value.substring(0,(value.indexOf(".")+3));
    }
		return value;
	},
	intRE:function (value) {
		//保留整数位
		value=value.replace(/[^\-^\d^\.]+/g,'');
		if(value.indexOf(".")!=-1){
      value=value.substring(0,value.indexOf("."));
    }
		return value;
	},
	rebateRE:function (value) {
		//只允许输入数字和小数点 保留一位小数
		value=value.replace(/[^\d^\.]+/g,'');
		if(value.indexOf(".")!=-1){
      value=value.substring(0,(value.indexOf(".")+2));
    }
		return value;
	},
	percentRE:function (value) {
		//只允许输入数字和小数点 保留四位小数
		value=value.replace(/[^\d^\.]+/g,'');
		if(value.indexOf(".")!=-1){
      value=value.substring(0,(value.indexOf(".")+4));
    }
		return value;
	},
	numRE:function (value) {
		//只允许输入数字
		value=value.replace(/[^\d]/g,'');
		return value;
	},
	rateRE: function (value) {
		//只允许输入数字和小数点 保留四位小数
		value=value.replace(/[^\d^\.]+/g,'');
		if(value.indexOf(".")!=-1){
      value=value.substring(0,(value.indexOf(".")+5));
    }
		return value;
	},
	titleRE:function (value) {
		//商品名称验证 不允许输入空格
		value=value.replace(/^ +$/g,"");
		return value;
	},
	stringify: function (object) {
		//用于在发送网络请求时在url中传值
		if (object instanceof Object) {
			const obj = JSON.parse(JSON.stringify(object));
			let str="";
			for (var i in obj) {
				str+=`&${i}=${obj[i]}`;
			}
			return str;
		}	else {
			return null;
		}
	},
	// 回车字符串分割
  stringSplit: function (str) {
    var temp = str.split(/[\n,]/g);
      for(var i =0;i<temp.length;i++){
      if(temp[i] == ""){
        temp.splice(i, 1);
        //删除数组索引位置应保持不变
        i--;
      }
    }
    return temp;
	},
	// 空格字符串分割
  spaceSplit: function (str) {
    var temp = str.split(/[\s,]/g);
      for(var i =0;i<temp.length;i++){
      if(temp[i] == ""){
        temp.splice(i, 1);
        //删除数组索引位置应保持不变
        i--;
      }
    }
    return temp;
	},
	//控制精度计算
	countAccuracy: function (value) {
		var precision = 14
    return Number(math.format(value, precision))
	},
	downloadFile:function (fileName,fileUrl){
		//文件下载 txt，png，jpg
		var element = document.createElement('a');
		element.setAttribute('href', fileUrl);
		element.setAttribute('download', fileName);
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	},
	myRequest:function(url, data, async, type, dataType, successfn) {
		//数据请求函数
    async = (async==null || async=="" || typeof(async)=="undefined") ? "true" : async;
    type = (type==null || type=="" || typeof(type)=="undefined")? "post" : type;
    dataType = (dataType==null || dataType=="" || typeof(dataType)=="undefined")? "json" : dataType;
    data = (data==null || data=="" || typeof(data)=="undefined")? {} : data;
    $.ajax({
      type: type,
      async: async,
      data: data,
      url: url,
      dataType: dataType,
      success: function(d){
        successfn(d);
      },
      error: function(e){
        console.log(e);
      }
    })
  }
}
export default Uitil;