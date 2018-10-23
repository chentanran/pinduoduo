$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    // 侧边栏ajax请求获取数据
   $.ajax({
       url:"/category/queryTopCategory",
       type:"get",
       success: function(res){
        
           var sidebar =  template("data1",res);
           $("#pdd_sidebar").html(sidebar);

            var id = res.rows[0].id;
            $("#pdd_sidebar").find("a").eq(0).addClass("active");

            // getAjaxData(id);
       }
   })

   //内容页
//    var id = 1;
   $("#pdd_sidebar").on("tap","a",function(){
       console.log(1);
      var id =  $(this).data("id");
        $("#pdd_sidebar").find("a").eq(id-1).addClass("active").siblings("a").removeClass("active");
      $.ajax({
          url: "/category/querySecondCategory",
          type: "get",
          data: {
              id : id
          },
          success: function(res){
              console.log(res);

              var data2 = template("data2",res);

              $("#pdd_right_ul").html(data2);
          }
      })
        getAjaxData(id);
   });

});

function getAjaxData(id) {
    $.ajax({
        url: "/category/querySecondCategory",
        type: "get",
        data: {
            id : id
        },
        success: function(res){
            console.log(res);

            var data2 = template("data2",res);

            $("#pdd_right_ul").html(data2);
        }
    })
}
