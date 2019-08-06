var newArr2 = JSON.parse(sessionStorage.getItem("newArr2")),//获取被杀的人的身份
    play = JSON.parse(sessionStorage.getItem("player")),//获取所有人的身份
    killDetail = document.getElementsByClassName("day"),//获取杀人内容的节点
    gameDay = JSON.parse(sessionStorage.getItem("gameDay")),//获取游戏时长
    ul = document.getElementsByClassName("rounds-details")[0],
    li_first = ul.children[0],//第一天的节点；
    li = ul.children,//所有li节点
    dayNumber = document.getElementsByClassName("dayNumber"),//获取第一个li准备复制；
    remaining_ghosts = JSON.parse(sessionStorage.getItem("remaining_ghosts")),//获取死掉的幽灵数量；
    remaining_people = JSON.parse(sessionStorage.getItem("remaining_people")),//获取死掉的幽灵数量；
    ghost_number = document.getElementById("ghost_number"),//获取输出剩余幽灵数量的节点
    people_number = document.getElementById("people_number"),//获取输入剩余水民数量的节点；
    people_word = JSON.parse(sessionStorage.getItem("people_word")),//获取身份内容;
    ghost_word = JSON.parse(sessionStorage.getItem("ghost_word")),
    people_word_container = document.getElementById("people_word"),//存放身份的节点
    ghost_word_container = document.getElementById("ghost_word"),
    homepage = document.getElementById("homepage"),//获取主页按钮
    play_again = document.getElementById("play-again"),
    game_result = sessionStorage.getItem("game_result"),//获取游戏结果
    game_result_container = document.getElementById("game_result");

(function () {
    var blank = /^\s*$/;
    if (gameDay >= 2) {//克隆天数节点li
        for (let i = 0; i < gameDay - 1; i++) {
            var li_clone = li_first.cloneNode(true);
            ul.appendChild(li_clone);
        }

        for (let i = 0; i < dayNumber.length; i++) {
            dayNumber[i].innerHTML = i + 1;//输出天数
        }


        for (let i = 0; i < newArr2.length; i++) {//输出每天发生的事；
            if (i % 2 === 0) {
                killDetail[i].innerHTML = "晚上：" + (i + 1) + "号被杀手杀死，身份是" + play[newArr2[i]];
            } else {
                killDetail[i].innerHTML = "白天：" + (i + 1) + "号被杀手杀死，身份是" + play[newArr2[i]];
            }
        }

        if (blank.test(ul.lastChild.getElementsByTagName("p")[1].innerHTML)) {
            ul.lastChild.style.display = "none";
        }
    }
    ghost_number.innerHTML = remaining_ghosts.length;//剩余人数
    people_number.innerHTML = remaining_people.length;
    ghost_word_container.innerHTML = ghost_word;
    people_word_container.innerHTML = people_word;
})();

homepage.onclick = function () {
    if (confirm("是否回到主页") === true) {
        window.location.href = "../html-homepage/index.html";
    };
}

play_again.onclick = function () {
    if (confirm("是否再来一局") === true) {
        sessionStorage.clear()
        window.location.href = "../html-number-setting/index.html";
    };
}

game_result_container.innerHTML = game_result;