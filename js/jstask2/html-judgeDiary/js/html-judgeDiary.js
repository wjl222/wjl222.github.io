var return_key = document.getElementById("return_key"),
    close_key = document.getElementById("close_key"),
    play = JSON.parse(sessionStorage.getItem("player")), //获取设置人数也随机的身份。
    option_line = document.getElementById("option_line"), //获取最上方ul 
    ulLastChild = option_line.lastElementChild,//获取ul中最后一个子元素li的值
    newArr2 = JSON.parse(sessionStorage.getItem("newArr2")),//接受被杀的人的下标
    option = document.getElementsByClassName("option"),//获取所有选项
    times,//判断点进来的次数；
    start_key = document.getElementById("start");

(function () {
    for (let i = 0; i < play.length - 1; i++) {//遍历生成子元素li；
        var ulLastChildClone = ulLastChild.cloneNode(true);
        option_line.appendChild(ulLastChildClone);
    }

    for (let i = 0; i < option.length; i++) {//更改生成的选项中的内容
        option[i].getElementsByClassName("option-text")[0].getElementsByClassName("option-identity")[0].innerHTML = play[i];//更改身份
        option[i].getElementsByClassName("option-text")[0].getElementsByClassName("option-number")[0].innerHTML = i + 1;//更改身份的数字。
    }
    if (newArr2 != null) {//如果被杀的人的数组不为空，则将被杀的人的背景改了；
        for (let i = 0; i < newArr2.length; i++) {
            option[newArr2[i]].getElementsByClassName("option-text")[0].getElementsByClassName("option-identity")[0].style.background = "#92b7a5";
        }
    }
})();



(function () {
    times = JSON.parse(sessionStorage.getItem("tim"));
    if (times == null) {
        times = 0;
    };

    times = times + 1;

    if (times == 1) {
        start_key.innerHTML = "开始游戏";
    } else {
        start_key.innerHTML = "返回";
    };
    sessionStorage.setItem("tim", JSON.stringify(times));
})();


function start() {
    if (times == 1) {
        window.location.href = '../html-judgeBench/index.html';
    } else {
        window.history.back();
    }
};

return_key.onclick = function() {
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