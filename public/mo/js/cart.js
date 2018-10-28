userinfo();

$(function(){
    var data = null;
    var searchSize = null; //选择尺码
    var num = null;  //保存总库存数量
    var productNum = null; //选择的商品数量
    // 查询购物车
    $.ajax({
        url: "/cart/queryCart",
        type: "get",
        success: function(res){
            // console.log(res);

            data = res;

            var html = template("cartTpl",{data:res});
            $("#cartBox").html(html);
        }
    })

    // 删除购物车
    $("#cartBox").on("tap",".deleteBtn",function(){
        var deteleId = $(this).data("id");
        // console.log(deleteId);  
        $.ajax({
            url: "/cart/deleteCart",
            type: "get",
            data: {
                id: deteleId
            },
            success: function(res){
                if(res.success){
                    mui.toast("删除成功");
                    setTimeout(function(){
                        location.href = "cart.html";
                    },1000);
                }else{
                    mui.toast("删除失败");
                    return;
                }
            }
        })
    })

    // 修改购物车
    $("#cartBox").on("tap",".editBtn",function(){
        var productId = $(this).data("id");
        var dataSize = null; //获取id对应的对象
    
       
        for(var i = 0; i < data.length; i++){
            if(data[i].id == productId){
                dataSize = data[i];
            }
        }
       
        num = dataSize.productNum;
    
        //开始尺码和结束尺码
        var start = parseInt(dataSize.productSize.split("-")[0]);
        var end = parseInt(dataSize.productSize.split("-")[1]);
        //定义一个数组,存储尺码
        dataSize.customSize = [];

        for(var i = start; i <= end; i++){
            dataSize.customSize.push(i);
        }
        var sizehtml = template("detailTpl",{data: dataSize}) //.replace(/\n/g, " ")
        
        var btnValue = "编辑商品";
        
        mui.confirm(sizehtml,btnValue,function(mes){
            if(mes.index == 1){
                $.ajax({
                    url: "/cart/updateCart",
                    type: "post",
                    data: {
                        id: productId,
                        size: searchSize,
                        num: productNum

                    },
                    success: function(res){
                        if(res.success){
                            location.reload();
                        }
                    }
                })
                
            }
        })
    })

    //选择尺码
    $("body").on("tap",".detail-size span",function(){
         $(this).addClass("active").siblings("span").removeClass("active");
         var number = $(this).html();
        // console.log(number);
        searchSize = number;
    })

    //选择数量
    $("body").on("tap",".reduce",function(){
        var i = $(".num").val();
        i--;
        productNum = i;
        if(i < 1){
            i = 1;
        }
        $(".num").val(i);
    })
    //选择数量
    $("body").on("tap",".plus",function(){
        var j = $(".num").val();
        j++;
        productNum = j;
        if(j > num){
            j = num;
        }
          $(".num").val(j);  
    })

  
    var str = 0;
    $("body").on("tap",".check",function(){
      
    //    console.log($(this).val());

       var checked = $(this).prop("checked");
        if(checked){
            str -= parseFloat($(this).val());
        }else{
            str += parseFloat($(this).val());
        }
        
        $("#span").html(str);
     
    })
})

