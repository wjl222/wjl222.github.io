var play = JSON.parse(sessionStorage.getItem("player")), //获取设置人数也随机的身份。
    time,//设置点击进入的次数
    whoBeKilledNumber,//被选中的选项的下标；
    whoChoice,//储存被点击的节点；
    remaining_ghosts,//剩余鬼的数量
    remaining_people,//剩余人的数量
    game_result,//设置游戏结果变量
    whoBeKilled = JSON.parse(sessionStorage.getItem("whoBeKilled")) || [];


time = JSON.parse(sessionStorage.getItem("killPeopleTime"));//接收点击的次数；
//如果点击进来的是 第一次；则time为null；null++也就是0；

$("#close").click(function () {  //返回键；
    var result = confirm("该回合不能跳过，如果点击确定，则重新开始游戏。");
    if (result === true) {
        window.location.href = "../html-homepage/index.html";
        sessionStorage.clear();
    }
});

(function () {//判断点击的次数，然后判断是那一步点进来，更改文字；
    time++;
    if (time % 2 == 0) {
        $("#title").text("投票");
        $("#whoKill").text("点击票数最多的人");
    } else {
        $("#title").text("杀手杀人");
        $("#whoKill").text("杀手请睁眼，选择要杀的人");
    }
    sessionStorage.setItem("killPeopleTime", JSON.stringify(time));
})();

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

            if (whoBeKilled.indexOf(i) !== -1) {//如果已经被杀；则改变其背景色；和取消他的点击图片显示；
                $(this).find('.option-identity').css('backgroundColor', '#92b7a5');
                $(this).hover(function () {
                    $(this).find(".option-img").css("opacity", "0");
                }
                );
            } else {
                $(this).hover(
                    function () {
                        $(this).find(".option-img").css("opacity", "1");
                    },
                    function () {
                        $(this).find(".option-img").css("opacity", "0");
                    }
                );
            }

        })
    }
})();

(function () {

    $(".option").find(".option-img").css("opacity", "0");

    $(document).click(function () {//点击选项外部取消class的改变；
        $(".option").each(function () {
            $(this).attr("class", "option");
        })
        whoBeKilledNumber = null;
    })

    newArr = [];//newArr为 一个新数组用来存所有的选项；

    $(".option").each(function () {

        $(this).click(function () {

            whoChoice = $(".option.active");//获取class为active的节点

            if (whoChoice != null) {//如果存在已经为classactive的节点，的话就将其复原
                reset();
            };

            $(this).attr("class", "option active");//再为选中的添加class

            for (let j = 0; j < $(".option").length; j++) {
                let option = $(".option").get(j);
                newArr.push(option);
            }

            whoBeKilledNumber = newArr.indexOf($(".option.active").get(0));//获取被选中的节点在option中的下标；

            return false;//处理冒泡事件；
        })
    })




})();



function reset() {//遍历其class还原
    $(".option").each(function () {
        $(this).attr("class", "option")
    })
}

function search(play, playWord) {//传入的是剩下玩家序号，和玩家的身份，获得剩下玩家的身份；
    var noBeKilled = [];
    for (let i = 0; i < play.length; i++) {
        if (play[i] === playWord) {
            noBeKilled.push(play[i]);
        }
    }
    return noBeKilled;
};

function deleteWhoBeKilled() {//从人数中删除已经死亡的人数  
    if (whoBeKilled != null) {
        for (let i = 0; i < whoBeKilled.length; i++) {
            delete play[whoBeKilled[i]];
        }
    };
};

$("#vote_die").click(function () {

    if (time % 2 !== 0 && play[whoBeKilledNumber] == "幽灵") {//当点进来是双数时，说明是幽灵点进来的；

        alert("幽灵不能杀掉同身份的人")

    } else if (whoBeKilledNumber === null || whoBeKilledNumber === undefined) {//当未选择时，弹出未选择的警告框；

        alert("还未选择要杀的人");

    } else if (whoBeKilled.indexOf(whoBeKilledNumber) == -1) {
        whoBeKilled = JSON.parse(sessionStorage.getItem("whoBeKilled")) || [];
        //接受被杀的人的下标，第一次点击的时候whoBeKilled是空的，因为还没有保存被杀人的下标，所以要定义为空数组

        whoBeKilled.push(whoBeKilledNumber);

        sessionStorage.setItem("whoBeKilled", JSON.stringify(whoBeKilled)) //保存被杀的人的下标

        deleteWhoBeKilled()//先删除了死亡的人数；

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

        if (remaining_ghosts.length === remaining_people.length || remaining_people.length < remaining_ghosts.length) {//判断游戏结果；
            game_result = "幽灵胜利";
        } else {
            game_result = "水民胜利";
        }

        sessionStorage.setItem("game_result", game_result);

    } else {
        alert("这个人已经被杀了");
    }

    sessionStorage.setItem("remaining_people", JSON.stringify(remaining_people));
    sessionStorage.setItem("remaining_ghosts", JSON.stringify(remaining_ghosts));
});