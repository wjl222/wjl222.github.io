var play = JSON.parse(sessionStorage.getItem("player")),//接收分配人数页面的身份数据
    people_word = JSON.parse(sessionStorage.getItem("people_word")),//获取身份内容
    ghost_word = JSON.parse(sessionStorage.getItem("ghost_word")),
    a = 0; //a为点击次数


$("#sumbit").click(function () {//点击一次执行一次。
    ++a;//点击一次，a的数就多一次。a在未点击时为0，点击第一次为1即；
    if (a % 2 == 1) { //点击第一次即查看身份的第一次，以后奇数次都是身份页
        $("#identity").css("display", "inline-block");
        $("#seeIdentity").css("display", "none");
        let nextPlayerNumber = a / 2 + 1.5;
        $("#sumbit").text("隐藏并传给" + nextPlayerNumber + "号");
    }

    if (a % 2 == 0) { //偶数次都是请查看；
        let newPlayerNumber = a / 2 + 1;
        $("#identity").css("display", "none");
        $("#seeIdentity").css("display", "inline-block");
        $("#yellowCardNum").text(newPlayerNumber);
        $("#sumbit").text("查看" + newPlayerNumber + "号身份");
    }

    if (a / 2 == play.length) { //点击次数除以二等于任务身份时，即人数都看完了
        window.location.href = "../html-judgeDiary/index.html";
    }

    if (a / 2 + 0.5 == play.length) { //在传阅完的最后一次，下方的字变为传阅完毕。
        $("#sumbit").text("传阅完毕，将手机交给法官");
    }

    $("#role").text(play[a / 2 - 0.5]);//按点击次数修改角色名；

    if ($("#role").text() === "水民") {
        $("#phrase").text(people_word);
    }
    else {
        $("#phrase").text(ghost_word);
    }
});

$("#return_key").click(function () {//返回按键；
    window.location.href = "../html-number-setting/index.html";
});

$("#close_key").click(function () {//关闭按键
    var result = confirm("是否要结束游戏");
    if (result === true) {
        window.location.href = "../html-homepage/index.html";
        sessionStorage.clear();
    }
});