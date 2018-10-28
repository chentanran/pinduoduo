userinfo();

$(function(){
   
    $("#search").on("tap",function(){
    //    获取表单数据
        var value = $(this).siblings().val();
        //跳转页面

        if(!value){
            return;
        }
           if(localStorage.getItem("keyword")){
                var keyword = JSON.parse(localStorage.getItem("keyword"));
                // console.log(keyword);
                keyword.unshift(value);
                 localStorage.setItem("keyword",JSON.stringify(keyword));

           }else{
            localStorage.setItem("keyword",JSON.stringify([value]));
        }

        window.location.href = "./search-result.html?keyword="+value;
    })
    //添加数据
    if(localStorage.getItem("keyword")){
        var str = JSON.parse(localStorage.getItem("keyword"));
        
        var html = template("template",{result:str});

        $(".history-two").html(html);

        // console.log(html);
    }
    // 删除数据
    $(".del").on("tap",function(){
        localStorage.removeItem("keyword");
        $(".history-two").html("");
        // console.log(1);
    })

})