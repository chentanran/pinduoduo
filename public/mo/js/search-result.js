$(function(){
    var urlName = getURL(location.href,"keyword");
   
    $.ajax({
        url:"/product/queryProduct",
        type: "get",
        data: {
            page: 1,
            pageSize: 6
        },
        success: function(res){
            // console.log(res);

            var html = template("searchResult", res);
            $(".pdd-brand1-body1").html(html);
            // console.log(html);
        }
    })
})


//获取url传递的参数
function getURL(url,name){
    var url = url.split("?")[1];

    var arr = url.split("&");

    var str = [];
   for(var i = 0; i < arr.length; i++){

        str = arr[i].split("=");

        if(str[0] == name){
            return str[1];
        }
   }
  
   return null;
}