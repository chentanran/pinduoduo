$(function(){
    $('body').on('tap','a',function(){
        mui.openWindow({
            url: $(this).attr('href')
        })
    })

        
})
  //获取验证码
  var  flag = true;
  function getCode(url,ele){
    //   console.log(url);
    $.ajax({
        url: url,
        type: "get",
        beforeSend: function(){
            ele.html("等待5秒...").css("color","#ccc");
        },
        success: function(res){
            if(flag){
                console.log(res.vCode);
            }
            flag = false;

         setTimeout(function(){
            ele.html("获取验证码").css("color","orange");
            flag=true;
         },5000);
        }
    })
};

 //获取用户信息
function userinfo(){
    var userinfo = null;
    //获取用户信息
     $.ajax({
      url: "/user/queryUserMessage",
      type: "get",
      async: false,
      beforeSend: function(){
         // location.href = "login.html";
      },
      success: function(res){
      //    console.log(res);
         if(res.error && res.error === 400){
             location.href = "login.html";
         }
         userinfo = res;
         
      }
    })

    return userinfo;
}



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