//获取修改密码验证码
$("#code1").on("click",function(){
    // console.log(1);
    getCode("/user/vCodeForUpdatePassword",$("#code1"));
})

var userinfo = userinfo();
// console.log(userinfo);

$(function(){
    $("#button").on("click",function(){
        var oldPassword = $('[name="oldPassword"]').val();
        var newPassword = $('[name="newPassword"]').val();
        var confirm = $('[name="newPassword"]').val();
        var code = $('[name="code"]').val();

        if(!$.trim(oldPassword)){
            mui.toast("密码输入为空");
            return;
        }
        if(!$.trim(newPassword)){
            mui.toast("密码输入为空");
            return;
        }
        if(confirm != newPassword){
            mui.toast("密码输入不一致");
            return;
        }
        if(!$.trim(code)){
            mui.toast("验证码为空");
        }
        
        $.ajax({
            url: "/user/updatePassword",
            type: "post",
            data: {
                oldPassword: oldPassword,
                newPassword: newPassword,
                vCode: code
            },
            success: function(res){
                console.log(res);
                if(res.success){
                    mui.toast("密码修改成功");

                    setTimeout(function(){
                        location.href = "login.html";
                    },1000);
                }else{
                    mui.toast("密码修改失败");
                }
            }
        })
    })

   
})