var play = JSON.parse(sessionStorage.getItem("player")), //获取设置人数也随机的身份。
    option_line = document.getElementById("option_line"), //获取最上方ul 
    ulLastChild = option_line.lastElementChild,  //获取ul中最后一个子元素li的值
    option = document.getElementsByClassName("option"),//所有按键的节点
    vote_die = document.getElementById("vote_die"),//投死按键
    time,//设置点击进入的次数
    whoKill = document.getElementById("whoKill"),//获取上方白色横幅的节点；
    title = document.getElementById("title"),//获取最上方的标题的节点
    close_key = document.getElementById("return_key"),
    whoBeKilledNumber,//被选中的选项的下标；
    newArr2,//被杀人的数组；
    whoChoice,//储存被点击的节点；
    remaining_ghosts,//剩余鬼的数量
    remaining_people,//剩余人的数量
    game_result;//设置游戏结果变量

setTimeout(function () {//遍历之前被杀的人,还原其被杀的状态,改变被杀人的背景色；
    whoBeKilled = JSON.parse(sessionStorage.getItem("newArr2"));
    if (whoBeKilled != null) {
        for (let i = 0; i < whoBeKilled.length; i++) {
            let x = whoBeKilled[i];
            option[x].getElementsByClassName("option-text")[0].getElementsByClassName("option-identity")[0].style.background = "#83b09a";
        }
    }
}, 0);


time = JSON.parse(sessionStorage.getItem("time"));//接收点击的次数；

(function () {//判断点击的次数，然后判断是那一步点进来，更改文字；
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

for (let i = 0; i < option.length; i++) {//通过更改class，知道选择的是谁；
    let newArr = [];//newArr为 一个新数组用来存所有的选项；
    option[i].onclick = function () {
        whoChoice = document.getElementsByClassName("option active");//获取class为active的节点
        if (whoChoice != null) {//如果存在已经为classactive的节点，的话就将其复原
            reset();
        };

        this.className = "option active";//再为选中的添加class

        for (let j = 0; j < option.length; j++) {//这一步是为了将节点对象转换为数组；
            newArr.push(option[j]);
        }

        whoBeKilledNumber = newArr.indexOf(this);//获取被选中的节点在option中的下标；
    }
};

function reset() {//遍历其class还原
    for (let i = 0; i < option.length; i++) {
        option[i].className = "option";
    }
}

function search(x, z) {//这个函数是为了遍历最终剩余人的身份，获得剩下来的人的身份数组；
    var noneBeKilled = [];
    for (let i = 0; i < x.length; i++) {
        if (x[i] === z) {
            noneBeKilled.push(x[i]);
        }
    }
    return noneBeKilled;
};

function endGame() {//从人数中删除已经死亡的人数  
    if (newArr2 != null) {
        for (let i = 0; i < newArr2.length; i++) {
            delete play[newArr2[i]];
        }
    };
};

function vote() {

    if (time % 2 != 0 && play[whoBeKilledNumber] == "幽灵") {

        alert("幽灵不能杀掉同身份的人")

    } else {
        newArr2 = JSON.parse(sessionStorage.getItem("newArr2")) || [];//接受被杀的人的下标，第一次点击的时候newArr2是空的，因为还没有保存被杀人的下标，所以要定义为空数组

        if (newArr2.indexOf(whoBeKilledNumber) == -1) {//在被杀的人中搜寻要杀的人，如果已经被杀，则弹出警告；
            newArr2.push(whoBeKilledNumber);
            sessionStorage.setItem("newArr2", JSON.stringify(newArr2)) //保存被杀的人的下标

            endGame()//在newArr2删除了死亡的人数；
            //根据点进来的次数，判断能不能杀幽灵；
            remaining_ghosts = search(play, "幽灵");//获取剩下来人中鬼身份的数量；
        
            remaining_people = search(play, "水民");//获取剩下来人中水民身份的数量；
            
            if (remaining_ghosts.length === remaining_people.length) {
                window.location.href = ("../html-end/index.html");//游戏结束页面
            }
            else if (remaining_ghosts.length === 0 || remaining_people.length < remaining_ghosts.length) {//判断游戏结束；
                window.location.href = ("../html-end/index.html");//游戏结束页面
            } else {
                window.location.href = "../html-judgeBench/index.html"; //游戏天数页面；
            }

        } else {
            alert("这个人已经被杀了")
        }

        if (remaining_ghosts.length === remaining_people.length || remaining_people.length < remaining_ghosts.length) {
            game_result = "幽灵胜利";
        } else {
            game_result = "水民胜利";
        }
        sessionStorage.setItem("game_result",game_result);
    }
    sessionStorage.setItem("remaining_people", JSON.stringify(remaining_people));
    sessionStorage.setItem("remaining_ghosts", JSON.stringify(remaining_ghosts));
}
close_key.onclick = function () {
    var result = confirm("该回合不能跳过，如果点击确定，则重新开始游戏。");
    if (result === true) {
        window.location.href = "../html-homepage/index.html";
        sessionStorage.clear();
    }
}
