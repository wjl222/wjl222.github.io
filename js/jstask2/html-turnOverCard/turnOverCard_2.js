var playerIdentity = JSON.parse(localStorage.getItem("player"));//接收分配人数页面的身份数据
// var playerOrder = JSON.parse(localStorage.getItem("playerOrder"));//接收分配人数页面的人物身份数组的序号。
var role = document.getElementById("role");//获取角色中的可以更改的身份内容的标签，以作为修改的前提。
var phrase = document.getElementById("phrase");
var people_word = JSON.parse(sessionStorage.getItem("people_word"));//获取身份内容
var ghost_word = JSON.parse(sessionStorage.getItem("ghost_word"));
var sumbitText = document.getElementById("sumbit");//获取存放下面提交按钮中下一个使用者的数字序号的标签
var a = 0;  //a为点击次数


function hide() { //点击隐藏自己的身份
    var sumbit = document.getElementById("sumbit");
    role.style.display = "none";
    sumbit.innerHTML = "点击查看自己的角色与词组"
}

function sumbit() {//点击一次执行一次。
    var identity = document.getElementById("identity");
    var seeIdentity = document.getElementById("seeIdentity");
    ++a;//点击一次，a的数就多一次。a在未点击时为0，点击第一次为1即；
    if (a % 2 == 1) { //点击第一次即查看身份的第一次，以后奇数次都是身份页
        identity.style.display = "inline-block";
        seeIdentity.style.display = "none";
        var nextPlayerNumber = a / 2 + 1.5;
        sumbitText.innerHTML = "隐藏并传给" + nextPlayerNumber + "号";
    }

    if (a % 2 == 0) { //偶数次都是请查看；
        var nowPlayNumber = document.getElementById("yellowCardNum");//获取黄色卡片上面存放数字的圆圈的标签
        var newPlayerNumber = a / 2 + 1;
        identity.style.display = "none";
        seeIdentity.style.display = "inline-block";
        nowPlayNumber.innerHTML = newPlayerNumber;
        sumbitText.innerHTML = "查看" + newPlayerNumber + "号身份"
    }

    if (a / 2 == playerIdentity.length) { //点击次数除以二等于任务身份时，即人数都看完了
        window.location.href = "../html-judgeDiary/index.html";
    }

    if (a / 2 + 0.5 == playerIdentity.length) { //在传阅完的最后一次，下方的字变为传阅完毕。
        sumbitText.innerHTML = "传阅完毕，将手机交给法官";
    }

    role.innerHTML = playerIdentity[a / 2 - 0.5];//按点击次数修改角色名；
    if (role.innerHTML === "水民") {
        phrase.innerHTML = people_word;
    }
    else {
        phrase.innerHTML = ghost_word;
    }
}