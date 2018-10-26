 userinfo();

$(function(){
    var id = null; //数据的id
    var urls = null; //ajax的接口地址

    var url = Number(getParamsByUrl(location.href,"id"));

    //如果url = 1 更新数据  url = 0 添加数据
    if(url == 1){
    //更新数据
        var updateData = JSON.parse(localStorage.getItem("data"));
        
        id = updateData.id;
        urls = "/address/updateAddress";
        $(".mui-title").html("修改地址");
    }else{
        var updateData = {};
        urls = "/address/addAddress";
    }
    var html = template("updateData",updateData);
    $("#form").html(html);

  
    // 添加地址
    $("#affirm").on("click",function(){
        var recipients = $("[name='recipients']").val();
        var postcode = $("[name='postcode']").val();
        var address = $("[name='address']").val();
        var addressDetail = $("[name='addressDetail']").val();

        if(!$.trim(recipients)){
            mui.toast("用户名不能为空");
            return;
        }
        if(!$.trim(postcode)){
            mui.toast("邮编不能为空");
            return;
        }
        if(!$.trim(address)){
            mui.toast("省市区不能为空");
            return;
        }
        if(!$.trim(addressDetail)){
            mui.totas("请填写详细地址");
            return;
        }

        $.ajax({
            url: urls,
            type: "post",
            data:{
                id: id,
                address: address,
                addressDetail: addressDetail,
                recipients: recipients,
                postcode: postcode
            },
            success: function(res){

                if(res.success){
              
                (url == 1) ?  mui.toast("修改地址成功") : mui.toast("添加地址成功");

                    setTimeout(function(){
                        location.href = "address.html";
                    },1000);
                }else{
                  
                    url == 1 ? mui.toast("修改地址失败") : mui.toast("添加地址失败");

                    return;
                }
            }
        })
        
    })

  
  //初始化
  var picker = new mui.PopPicker({layer:3});
  // 添加数据
  picker.setData(cityData); 
  // 添加数据
  $("#address").on("tap",function(){
      picker.show(function (cityData) {
          cityData[2].text = cityData[2].text || "";
          $("#address").val(cityData[0].text + cityData[1].text + cityData[2].text);
        })
  })

})