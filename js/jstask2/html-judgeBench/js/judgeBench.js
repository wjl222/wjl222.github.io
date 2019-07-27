var day = document.getElementsByClassName("day"),
    small_list = document.getElementsByClassName("small_list_container"),//获取下方需要隐藏的
    killPeople = document.getElementsByClassName("killPeople")[0],//第一个按钮，杀人；
    undeadSay = document.getElementsByClassName("undeadSay")[0],//第二个按钮，亡灵发言；
    everySay = document.getElementsByClassName("everySay")[0],//第三个按钮，讨论；
    vote = document.getElementsByClassName("vote")[0],//第四个按钮，投票；
    blue_box = document.getElementsByClassName("blue_box"),
    blue_triangle = document.getElementsByClassName("blue_triangle"),
    play = JSON.parse(localStorage.getItem("player")),//获取随机设置的人数
    blankText = document.getElementsByClassName("blank"),
    big_list = document.getElementById("big_list"),
    li_box = document.getElementsByClassName("li_box")[0],
    gameDay = 1,//设置存放天数的变量；
    times;//设置进入页面的次数判断修改哪一个



window.onload = function () {
    if (gameDayNew != null) {
        gameDay = gameDayNew;
    }
    if (gameDay > 1) {
        for (let i = 0; i < gameDay - 1; i++) {
            var big_list_clone = li_box.cloneNode(true);
            big_list.appendChild(big_list_clone);
        }
    };
};

var whoBeKilled = [];

whoBeKilled = JSON.parse(sessionStorage.getItem("whoBeKilled"));//获取谁被杀了

(function () {
    if (whoBeKilled != null) {
        for (let i = 0; i < whoBeKilled.length; i++) {
            if (i % 2 == 0) {
                blankText[i].innerHTML = "今晚被杀的是" + (i + 1) + "号，他的身份是" + play[whoBeKilled[i]];
            } else {
                blankText[i].innerHTML = "投票杀掉的是" + (i + 1) + "号，他的身份是" + play[whoBeKilled[i]];
            }
            blankText[i].style.marginTop = "15px";
        }
    }
})()

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
        { name: "vote", from: "say", to: "oneDayEnd" }
    ],
    //改变颜色
    methods: {
        onKillPeople: function () {
            blue_box[0].style.backgroundColor = "#92b7a5";
            blue_triangle[0].style.borderRight = "6px solid #92b7a5";
        },

        onundeadSay: function () {
            blue_box[1].style.backgroundColor = "#92b7a5";
            blue_triangle[1].style.borderRight = "6px solid #92b7a5";
        },

        oneveryoneSay: function () {
            blue_box[2].style.backgroundColor = "#92b7a5";
            blue_triangle[2].style.borderRight = "6px solid #92b7a5";
        },

        onvote: function () {
            blue_box[3].style.backgroundColor = "#92b7a5";
            blue_triangle[3].style.borderRight = "6px solid #92b7a5";
            // window.location.href = "../html-killPeople/index.html";
        }
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
            window.location.href = '../html-killPeople/index.html';
            sessionStorage.setItem("statea", fsm.state);//保存状态
            break;
        default:
            alert("请依次进行。");
    }
};

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
        gameDay++;
        break;
}

sessionStorage.setItem("gameDay", JSON.stringify(gameDay));
var gameDayNew = JSON.parse(sessionStorage.getItem("gameDay"));