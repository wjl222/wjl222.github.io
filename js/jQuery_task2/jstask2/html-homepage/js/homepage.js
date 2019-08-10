$("#simplified-edition").click (function () {
    window.location.href = "../html-number-setting/index.html";
});

var a = 0;

$("#menu").click(function() {
    a++;
    if (a % 2 === 1){
        $("#option_top").animate({
            "marginLeft" : "0"
        })
    } else {
        $("#option_top").animate({
            "marginLeft" : "-100%"
        })
    }
});

$("#announcement").click(function(){
    window.location.href = "../html-Announcement/index.html";
})