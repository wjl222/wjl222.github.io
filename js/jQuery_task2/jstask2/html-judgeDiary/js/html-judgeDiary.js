var play = JSON.parse(sessionStorage.getItem("player")), //获取设置人数也随机的身份。
    whoBeKilled = JSON.parse(sessionStorage.getItem("whoBeKilled")),//接受被杀的人的下标
    times;//判断点进来的次数；

(function () {
    for (let i = 0; i < play.length - 1; i++) {//遍历生成子元素li；
        var ulLastChildClone = $("#option_line .option:first").clone();
        $("#option_line").append(ulLastChildClone);
    }

    $(".option").each(function (i) {//遍历更改身份和序号；
        $(this).find('.option-identity').text(play[i]);
        $(this).find('.option-number').text(i + 1);

    })

    if (whoBeKilled != null) {//如果被杀的人的数组不为空，则将被杀的人的背景改了；
        $(".option").each(function (i) {
            if (whoBeKilled.indexOf(i) !== -1) {
                $(this).find('.option-identity').css('backgroundColor', '#92b7a5');
            }
        })
    }
})();



(function () {//判断是否是第一次点进来；

    times = JSON.parse(sessionStorage.getItem("judgeDiaryTime")) || 0;

    times ++;

    if (times == 1) {
        $("#start").text("开始游戏");
    } else {
        $("#start").text("返回");
    };
    sessionStorage.setItem("judgeDiaryTime", JSON.stringify(times));
})();


$("#start").click(function() {//开始键和返回键；
    if (times == 1) {
        window.location.href = '../html-judgeBench/index.html';
    } else {
        window.history.back();
    }
});

$("#return").click(function () {//返回键
    history.back(-1);
    sessionStorage.removeItem("tim");
});

$("#close").click(function () {//关闭键；
    var result = confirm("是否要结束游戏");
    if (result === true) {
        window.location.href = "../html-homepage/index.html";
        sessionStorage.clear();
    }
});