    userinfo();

$(function () {
    var number = null; // 最大商品数量
    var size = null; //选择的尺码
    var nums = null; //选择的商品数量

    var url = Number(getParamsByUrl(location.href, "buttonId"));
    //获取数据
    $.ajax({
        url: "/product/queryProductDetail",
        type: "get",
        data: {
            id: url
        },
        success: function (res) {
            // console.log(res);
            number = res.num;
            var html = template("template", res);
            
            $("#content").html(html);

            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider();
        }
    })

    //添加尺码
    $("#content").on("tap",".size span", function(){
        $(this).addClass("active").siblings("span").removeClass("active");
        size = $(this).html();
    })
 
    //添加数量
    $("#content").on("tap",".right",function(){
        var num = $("#input").val();
       
        if(num < number){
            $("#input").val(++num);
        }
    })
    //减少数量
    $("#content").on("tap",".left",function(){
         var num = $("#input").val();
         
        if(num > 1){
            $("#input").val(--num);
        }
    })
    //加入购物车
   $("#content").on("tap","#addshop",function(){
       if(!size){
            mui.toast("尺码不能为空");
            return;
       }
      var input = $("#input").val();

      $.ajax({
          url: "/cart/addCart",
          type: "post",
          data: {
            productId: url,
            num: input,
            size: size
          },
          success: function(res){
            if(res.success){
                mui.confirm("加入成功,要进入购物车吗?",function(message){
                    // console.log(message);
                    if(message.index == 1){
                        location.href = "shoppingCart.html";
                    }
                })
            }
          }
      })
   })
})