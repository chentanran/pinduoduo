

$(function(){
    $("#button").on("click",function(){
        var oldPassword = $('[name="oldPassword"]').val();
        var newPsaaword = $('[name="newPassword"]').val();
        var confirm = $('[name="newPassword"]').val();

        console.log(oldPassword,newPsaaword,confirm);
    })
})