var day = document.getElementsByClassName("day"),
    return_key = document.getElementById("return"),
    close_key = document.getElementById("close"),
    small_list = document.getElementsByClassName("small_list_container"),//获取下方需要隐藏的
    killPeople = document.getElementById("killPeople"),//第一个按钮，杀人；
    undeadSay = document.getElementById("undeadSay"),//第二个按钮，亡灵发言；
    everySay = document.getElementById("everySay"),//第三个按钮，讨论；
    vote = document.getElementById("vote"),//第四个按钮，投票；
    blue_box = document.getElementsByClassName("blue_box"),
    blue_triangle = document.getElementsByClassName("blue_triangle"),
    play = JSON.parse(sessionStorage.getItem("player")),//获取随机设置的人数
    blankText = document.getElementsByClassName("blank"),
    big_list = document.getElementById("big_list"),
    li_box_class = big_list.children,
    li_box = document.getElementById("li_box"),
    gameDay,//设置原始天数；
    gameDayNew,//接收新的天数；
    times,//设置进入页面的次数判断修改哪一个
    li_box_clone;//被克隆的天数；

return_key.onclick = function () {
    history.back(-1);
    sessionStorage.removeItem("tim");
};

close_key.onclick = function () {
    var result = confirm("是否要结束游戏");
    if (result === true) {
        window.location.href = "../html-homepage/index.html";
        sessionStorage.clear();
    }
};

(function () {
    gameDayNew = JSON.parse(sessionStorage.getItem("gameDay"));
    if (gameDayNew != null) {
        gameDay = gameDayNew;
    } else {
        gameDay = 1;
    };

    if (gameDay >= 2) {
        for (let i = 0; i < gameDay - 1; i++) {
            li_box_clone = li_box.cloneNode(true);
            li_box_clone.id = "";//取消克隆后的id
            li_box_clone.className = "li_box" + " " + "lastDay";
            li_box_clone.getElementsByClassName("small_list_container")[0].style.display = "none";//将克隆的内容默认的display设置为隐藏；
            var buttonClone = li_box_clone.getElementsByClassName("small_list_container")[0].getElementsByClassName("small_list")[0].getElementsByClassName("blue_box");
            for (let j = 0; j < buttonClone.length; j++) {
                buttonClone[j].id = "";
            }
            big_list.insertBefore(li_box_clone, li_box);
        }
    };
})();

for (let i = 0; i < li_box_class.length; i++) {//实现点击显示，点击隐藏；
    li_box_class[i].getElementsByClassName("day")[0].addEventListener("click", function () {
        if (li_box_class[i].getElementsByClassName("small_list_container")[0].style.display === "none") {
            li_box_class[i].getElementsByClassName("small_list_container")[0].style.display = "block";
        } else {
            li_box_class[i].getElementsByClassName("small_list_container")[0].style.display = "none";
        }
    });
    //根据天数的节点的长度，更改文字天数；
    let num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    let chinaeseNum = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八"];
    let x = num.indexOf(i + 1);//x为天数在1-9的数字中的下标；
    li_box_class[i].getElementsByClassName("day_text")[0].innerHTML = chinaeseNum[x];
}

var newArr2;

newArr2 = JSON.parse(sessionStorage.getItem("newArr2"));//获取谁被杀了

(function () {
    if (newArr2 != null) {
        for (let i = 0; i < newArr2.length; i++) {
            if (i % 2 == 0) {
                blankText[i].innerHTML = "今晚被杀的是" + (newArr2[i] + 1) + "号，他的身份是" + play[newArr2[i]];
            } else {
                blankText[i].innerHTML = "投票杀掉的是" + ((newArr2[i] + 1)) + "号，他的身份是" + play[newArr2[i]];
            }
            blankText[i].style.marginTop = "15px";
        }
    }
})();

var statea = sessionStorage.getItem("statea");//获取之前的状态；
if (statea == null) {
    statea = "start";
}

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
            killPeople.style.backgroundColor = "#92b7a5";
            killPeople.getElementsByClassName("blue_triangle")[0].style.borderRight = "6px solid #92b7a5";
        },

        onundeadSay: function () {
            undeadSay.style.backgroundColor = "#92b7a5";
            undeadSay.getElementsByClassName("blue_triangle")[0].style.borderRight = "6px solid #92b7a5";
        },

        oneveryoneSay: function () {
            everySay.style.backgroundColor = "#92b7a5";
            everySay.getElementsByClassName("blue_triangle")[0].style.borderRight = "6px solid #92b7a5";
        },

        onvote: function () {
            vote.style.backgroundColor = "#92b7a5";
            vote.getElementsByClassName("blue_triangle")[0].style.borderRight = "6px solid #92b7a5";
        },

    }
});

//四个按钮的设置；

killPeople.onclick = function () {
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
};

undeadSay.onclick = function () {
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
};

everySay.onclick = function () {
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
};

vote.onclick = function () {
    switch (fsm.state) {
        case "say":
            fsm.vote();
            fsm.onvote();
            gameDay++;//点击投票时，天数增加；
            sessionStorage.setItem("gameDay", JSON.stringify(gameDay));
            window.location.href = '../html-killPeople/index.html';
            sessionStorage.setItem("statea", fsm.state);//保存状态
            break;
        default:
            alert("请依次进行。");
    }
};

function judge_diary_key() {
    window.location.href = "../html-judgeDiary/index.html";
}

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