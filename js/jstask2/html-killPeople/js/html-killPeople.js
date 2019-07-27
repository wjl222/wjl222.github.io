var play = JSON.parse(localStorage.getItem("player")), //获取设置人数也随机的身份。
    option_line = document.getElementById("option_line"), //获取最上方ul 
    ulLastChild = option_line.lastElementChild,  //获取ul中最后一个子元素li的值
    option = document.getElementsByClassName("option"),
    vote_die = document.getElementById("vote_die"),
    time = 0,//设置点击次数
    whoKill = document.getElementById("whoKill"),
    title = document.getElementById("title");

window.onload = function () {//遍历之前被杀的人；
    var whoBeKilled = JSON.parse(sessionStorage.getItem("whoBeKilled"));
    if (whoBeKilled != null) {
        for (let i = 0; i < whoBeKilled.length; i++) {
            var x = whoBeKilled[i];
            option[x].getElementsByClassName("option-text")[0].getElementsByClassName("option-identity")[0].style.background = "#83b09a";
        }
    }
}

time = JSON.parse(sessionStorage.getItem("time"));//接收点击的次数；

(function () {//判断点击的次数，然后判断是那一步点进来；
    time++;
    if (time % 2 == 0) {
        title.innerHTML = "投票";
        whoKill.innerHTML = "点击票数最多的人"
    } else {
        title.innerHTML = "杀手杀人";
        whoKill.innerHTML = "杀手请睁眼，选择要杀的人"
    }
    sessionStorage.setItem("time", JSON.stringify(time));
})();

(function () {
    for (var i = 0; i < play.length - 1; i++) {//克隆li；

        var ulLastChildClone = ulLastChild.cloneNode(true);

        option_line.appendChild(ulLastChildClone);
    }

    for (var j = 0; j < option.length; j++) {//添加内容

        option[j].getElementsByClassName("option-text")[0].getElementsByClassName("option-identity")[0].innerHTML = play[j];//更改身份

        option[j].getElementsByClassName("option-text")[0].getElementsByClassName("option-number")[0].innerHTML = j + 1;//更改身份的数字。

    }
})();

var whoChoice;
for (let i = 0; i < option.length; i++) {//通过更改class，知道选择的是谁；
    option[i].onclick = function () {
        whoChoice = document.getElementsByClassName("option active");
        if (whoChoice != null) {
            reset();
        };
        this.className = "option active";
        var newArr = [];
        for (let j = 0; j < option.length; j++) {
            newArr.push(option[j]);
        }
        ddd = newArr.indexOf(this);
    }
};

function reset() {//遍历其class还原
    for (let i = 0; i < option.length; i++) {
        option[i].className = "option";
    }
}

var newArr2;

function vote() {
    newArr2 = JSON.parse(sessionStorage.getItem("newArr2"));//还原数组
    if (newArr2 == null) {
        newArr2 = [];
    }
    newArr2.push(ddd);
    sessionStorage.setItem("newArr2",JSON.stringify(newArr2));
    window.location.href = "../html-judgeBench/index.html";//打开新页面
    whoChoice[0].getElementsByClassName("option-text")[0].getElementsByClassName("option-identity")[0].style.background = "#83b09a";
    sessionStorage.setItem("whoBeKilled", JSON.stringify(newArr2));
}

var gameDay = JSON.parse(sessionStorage.getItem("gameDay"));

var kill = new StateMachine({
    init: "alive",

    transitions: [{ name: "kill", from: "alive", to: "dealth" }],

    methods: {
        onkill: function (z) {
            option[z].getElementsByClassName("option-text")[0].getElementsByClassName("option-identity")[0].style.background = "#fff";
        }
    }
});

// vote_die.onclick = function () {
    // switch (kill.state) {
    //     case ("alive"):
    //         kill.kill();
    //         kill.onkill(3);
    //         break;
    //     default: {
    //         alert("这个人已经被杀了");
    //     }
    // }

// }

