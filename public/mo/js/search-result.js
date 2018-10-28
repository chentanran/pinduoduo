userinfo();

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
    
        // prices = prices == 1 ? 2 : 1;
        nums = null;
        // html = "";
        // page = 1;
        // //重置上拉加载
        // mui('#refreshContainer').pullRefresh().refresh(true);

        // dataAtAjax();
        sorts(prices);
   })
   //产品库存排序
    $(".sales").on("tap",function(){

        // nums = nums == 1 ? 2 : 1;
        prices = null;
        // html = "";
        // page = 1;
        // //重置上拉加载
        // mui('#refreshContainer').pullRefresh().refresh(true);
    
        // dataAtAjax();
        sorts(nums);
    })
   
    //点击购买按钮,获取id 跳转到详情页面
    $(".pdd-brand1-body1").on("click",".button",function(){
        var buttonId = $(this).data("id");
        location.href = "detail.html?buttonId="+buttonId;
    })
})

function sorts(ele){
    ele = ele == 1 ? 2 : 1;
    html = "";
    page = 1;
    //重置上拉加载
    mui('#refreshContainer').pullRefresh().refresh(true);

    dataAtAjax();
}

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
          
            console.log(res);
            
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

