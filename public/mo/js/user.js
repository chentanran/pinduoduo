//   var userinfo = null;
//   //获取用户信息
//    $.ajax({
//     url: "/user/queryUserMessage",
//     type: "get",
//     async: false,
//     beforeSend: function(){
//        // location.href = "login.html";
//     },
//     success: function(res){
//     //    console.log(res);
//        if(res.error && res.error === 400){
//            location.href = "login.html";
//        }
//        userinfo = res;
//     }
// })

var userinfo = userinfo();
// console.log(userinfo);

$(function(){
    // 退出登录
   $("#exit").on("click",function(){
        // 退出登录
        $.ajax({
            url: "/user/logout",
            type: "get",
            success: function(res){
                if(res.success){
                    mui.toast("退出登录成功");

                    setTimeout(function(){
                        location.href = "index.html"; 
                    },1000)
                }else{
                    mui.toast("退出登录失败");
                } 
            }
        })
   })

    var html = template("usertemp", userinfo);
    $("#user").html(html);
  
})