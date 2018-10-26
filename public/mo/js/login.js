$(function(){
    $("#btn").on("click",function(){
        var username = $('[name="username"]').val();
        var password = $('[name="password"]').val();

        if(!username){
            mui.toast("账号输入为空");
            return;
        }
        if(!password){
            mui.toast("密码为空");
            return;
        }

       $.ajax({
           url: "/user/login",
           type: "post",
           data: {
                username: username,
                password: password
           },
           beforeSend: function(){
                
           },
           success: function(res){
              if(res.success){
                $("#btn").html("登陆中").css("backgroundColor","#ccc");
                  mui.toast("登录成功");

                  setTimeout(function(){
                      location.href = "user.html";
                  },3000)
              }else{
                  mui.toast("登录失败");
              }
           }
       })
    })
})