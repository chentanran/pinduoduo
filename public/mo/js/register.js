      //获取验证码
      var  flag = true;
   $("#code").on("click",function(){
    $.ajax({
        url: "/user/vCode",
        type: "get",
        beforeSend: function(){
            $("#code").html("等待5秒...").css("color","#ccc");
        },
        success: function(res){
            if(flag){
                console.log(res.vCode);
            }
            flag = false;

         setTimeout(function(){
            $("#code").html("获取验证码").css("color","orange");
            flag=true;
         },5000);
        }
    })
})

$(function(){
  //注册页面
   $("#button").on("click",function(){
       var user = $('[name="user"]').val();
       var tel = $('[name="tel"]').val();
       var password = $('[name="password"]').val();
       var confirm = $('[name="confirm"]').val();
       var code = $('[name="code"]').val();

       if(!user){
           mui.toast("账号为空");
           return;
       }
       if(!(tel) || !(tel.length == 11)){
           mui.toast("手机号格式不正确")
           return;
       }
       if(!password){
           mui.toast("密码不能为空");
           return;
       }
       if(confirm !== password){
           mui.toast("密码输入不一致");
           return;
       }
       if(!code){
           mui.toast("验证码为空");
           return;
       }

       $.ajax({
           url: "/user/register",
           type: "post",
            data: {
                username: user,
                password: password,
                mobile: tel,
                vCode: code
            },
            success: function(res){
               if(res.success){
                mui.toast("注册成功");

                setTimeout(function(){
                    location.href = "login.html";
                },1000);
               }else{
                   mui.toast("注册失败");
               }
              
            }
       })
      
   })
 
   
})


    
