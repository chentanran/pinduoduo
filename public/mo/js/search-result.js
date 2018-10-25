var page = 1;
var urlName = getParamsByUrl(location.href,"keyword");
var html = "";
var prices = 1;
var nums = 1;
var that;

$(function(){
   
    //上拉获取数据
    mui.init({
        pullRefresh : {
          container:"#refreshContainer",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
          up : {
            height:50,//可选.默认50.触发上拉加载拖动距离
            auto:true,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback :dataAtAjax //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          }
        }
      });

   //点击排序
   $(".price").on("tap",function(){
    
        // sorts(prices);
        prices = prices == 1 ? 2 : 1;

        html = "";
        page = 1;
        //重置上拉加载
        mui('#refreshContainer').pullRefresh().refresh(true);

        dataAtAjax();
   })
   //产品库存排序
    $(".sales").on("tap",function(){
        // sorts(nums);
        nums = nums == 1 ? 2 : 1;
        html = "";
        page = 1;
        //重置上拉加载
        mui('#refreshContainer').pullRefresh().refresh(true);
    
        dataAtAjax();
    })
   
})

// function sorts(ele){
//     ele = ele == 1 ? 2 : 1;
//     html = "";
//     page = 1;
//     //重置上拉加载
//     mui('#refreshContainer').pullRefresh().refresh(true);

//     dataAtAjax();
// }

function dataAtAjax(){
    if(!that){
        that = this;
    }
    
    $.ajax({
        url:"/product/queryProduct",
        type: "get",
        data: {
            page: page++,
            pageSize: 3,
            proName: urlName,
            price: prices,
            num: nums
        },
        success: function(res){
          
            // console.log(res);
            
            if(res.data.length > 0){
                html += template("searchResult", res);
          
                $(".pdd-brand1-body1").html(html);
                that.endPullupToRefresh(false);
            }else{
                that.endPullupToRefresh(true);
            }
           
            
        }
    })

}

//获取url传递的参数
// function getURL(url,name){
//     if(!url){
//         return;
//     }

//     var url = url.split("?")[1];

//     var arr = url.split("&");

//     var str = [];
//    for(var i = 0; i < arr.length; i++){

//         str = arr[i].split("=");

//         if(str[0] == name){
//             return str[1];
//         }
//    }
  
//    return null;
// }

// 获取地址栏参数
function getParamsByUrl(url,name){

	var params = url.substr(url.indexOf('?')+1).split('&');

	for(var i=0;i<params.length;i++){

		var param = params[i].split('=');

		if(param[0] == name){

			return param[1];

		}

	}

	return null;

}