// 查询用户是否登录
var userinfo = userinfo();

$(function () {
  //定义一个数组
  var  address = null;
  //查询地址
  $.ajax({
    url: "/address/queryAddress",
    type: "get",
    success: function (res) {
      
      address = res;
      console.log(address);
      if (res) {
        var html = template("template", { data: res });
        $("#userinfo").html(html);
      }

    }
  })

  //删除地址
  $("#userinfo").on("click", ".deleteAddress", function () {
    var li = this.parentNode.parentNode;

    var id = $(this).data("id");
    // var id = $(this).attr("data-id"); ///两种方式皆可
    mui.confirm("确认删除吗?", function (message) {
      if (message.index == 1) {
        $.ajax({
          url: "/address/deleteAddress",
          type: "post",
          data: {
            id: id
          },
          success: function (res) {
            if (res.success) {
              // var html = template("template", { data: res });
              // $("#userinfo").html(html);
              location.href = "address.html";
            }
          }
        })
      }else{
        mui.swipeoutClose(li);
      }
    })
  })

  //编辑地址
  $("#userinfo").on("click",".updateAddress",function(){
    var updateId = $(this).data("id");
      for(var i = 0; i < address.length; i++){
        if(updateId == address[i].id){
          var data = address[i];
          localStorage.setItem("data",JSON.stringify(data));
          location.href = "addAddress.html?id=1";
          break;
        }
      }
  })

})