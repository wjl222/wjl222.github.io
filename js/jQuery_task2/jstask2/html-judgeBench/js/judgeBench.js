var play = JSON.parse(sessionStorage.getItem("player")),//获取随机设置的人数
    gameDay;//设置原始天数；

$("#close").click(function () {//关闭按钮的设置，也就是那个叉；
    var result = confirm("是否要结束游戏");
    if (result === true) {
        window.location.href = "../html-homepage/index.html";
        sessionStorage.clear();
    }
});

$("#end_game").click(function () {//结束游戏
    var result = confirm("是否确定结束游戏？");
    if (result === true) {
        window.location.href = "../html-homepage/index.html";
        sessionStorage.clear();
    }
});

$("#judge_diary").click(function () {//法官日记；
    window.location.href = "../html-judgeDiary/index.html";
});


(function () {//根据天数克隆li；
    gameDay = JSON.parse(sessionStorage.getItem("gameDay")) || 1;

    if (gameDay >= 2) {
        for (let i = 0; i < gameDay - 1; i++) {
            var li_box_clone = $("#li_box").clone();
            li_box_clone.attr('id','');//取消克隆后的id
            li_box_clone.attr('class',"li_box lastDay") ;//设置克隆的背景颜色不变；
            li_box_clone.find(".small_list_container").css("display","none");//初始状态为隐藏
            li_box_clone.find(".blue_box").attr('id','');//取消克隆的id；
            $("#li_box").before(li_box_clone);
        }
    };
})();

$("#big_list").find(".day").each(function (i) {
//点击显示；点击影藏的按钮；
    $(this).click(function () {
        if ($(this).next().css("display") === "none") {
            $(this).next().css("display", "block");
        } else {
            $(this).next().css("display", "none");
        }
    })

    let num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    let chinaeseNum = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八"];
    let x = num.indexOf(i + 1);//x为天数在1-9的数字中的下标；
    $(this).children(".day_text").text(chinaeseNum[x])//改写内部的数字；
})

var whoBeKilled = JSON.parse(sessionStorage.getItem("whoBeKilled"));//被杀者的

(function () {//设置详情；
    if (whoBeKilled !== null) {
        for (let i = 0; i < whoBeKilled.length; i++) {
            var blankText = $(".blank").get(i);
            if (i % 2 == 0) {
                blankText.innerHTML = "今晚被杀的是" + (whoBeKilled[i] + 1) + "号，他的身份是" + play[whoBeKilled[i]];
            } else {
                blankText.innerHTML = "投票杀掉的是" + ((whoBeKilled[i] + 1)) + "号，他的身份是" + play[whoBeKilled[i]];
            }
            blankText.style.marginTop = "15px";
        }
    }
})();

var statea = sessionStorage.getItem("statea") || "start";//或是判断statea是否为空，第一次进的时候为空；

//状态机

var fsm = new StateMachine({
    init: statea,

    transitions: [
        { name: "killPeople", from: "start", to: "ghostKillPeople" },
        { name: "undeadSay", from: "ghostKillPeople", to: "UndeadSaySomething" },
        { name: "everyoneSay", from: "UndeadSaySomething", to: "say" },
        { name: "vote", from: "say", to: "start" }
    ],
    //改变颜色
    methods: {
        onKillPeople: function () {
            $("#killPeople").css("backgroundColor", "#92b7a5");
            $("#killPeople .blue_triangle:first").css("borderRight", "6px solid #92b7a5");
        },

        onundeadSay: function () {
            $("#undeadSay").css("backgroundColor", "#92b7a5");
            $("#undeadSay .blue_triangle:eq(0)").css("borderRight", "6px solid #92b7a5");
        },

        oneveryoneSay: function () {
            $("#everySay").css("backgroundColor", "#92b7a5");
            $("#everySay .blue_triangle:first").css("borderRight", "6px solid #92b7a5");
        },

        onvote: function () {
            $("#vote").css("backgroundColor", "#92b7a5");
            $("#vote .blue_triangle:first").css("borderRight", "6px solid #92b7a5");
        },

    }
});

//四个按钮的设置；

$("#killPeople").click(function () {
    switch (fsm.state) {
        case "start":
            fsm.killPeople();
            sessionStorage.setItem("statea", fsm.state);//保存状态
            window.location.href = '../html-killPeople/index.html';
            break;
        default: {
            alert("请依次执行！");
        }
    }
});

$("#undeadSay").click(function () {
    switch (fsm.state) {
        case "ghostKillPeople":
            fsm.undeadSay();
            fsm.onundeadSay();
            alert("请被杀的人发表最后讲话");
            sessionStorage.setItem("statea", fsm.state);//保存状态
            break;
        default:
            alert("请依次进行。");
    }
});

$("#everySay").click(function () {
    switch (fsm.state) {
        case "UndeadSaySomething":
            fsm.everyoneSay();
            fsm.oneveryoneSay();
            alert("请大家依次开始讨论！");
            sessionStorage.setItem("statea", fsm.state);//保存状态
            break;
        default:
            alert("请依次进行。");
    }
});

$("#vote").click(function () {
    switch (fsm.state) {
        case "say":
            fsm.vote();
            fsm.onvote();
            gameDay++;//点击投票时，天数增加；
            sessionStorage.setItem("gameDay", JSON.stringify(gameDay));//保存天数
            window.location.href = '../html-killPeople/index.html';
            sessionStorage.setItem("statea", fsm.state);//保存状态
            break;
        default:
            alert("请依次进行。");
    }
});

//加载之前的状态

switch (fsm.state) {
    case "ghostKillPeople":
        fsm.onKillPeople();
        break;
    case "UndeadSaySomething":
        fsm.onKillPeople();
        fsm.onundeadSay();
        break;
    case "say":
        fsm.onKillPeople();
        fsm.onundeadSay();
        fsm.oneveryoneSay();
        break;
    case "oneDayEnd":
        fsm.onKillPeople();
        fsm.onundeadSay();
        fsm.oneveryoneSay();
        fsm.onvote();
        break;
}