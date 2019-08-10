var whoBeKilled = JSON.parse(sessionStorage.getItem("whoBeKilled")),//获取被杀的人的身份
    play = JSON.parse(sessionStorage.getItem("player")),//获取所有人的身份
    gameDay = JSON.parse(sessionStorage.getItem("gameDay")),//获取游戏时长
    remaining_ghosts = JSON.parse(sessionStorage.getItem("remaining_ghosts")),//获取死掉的幽灵数量；
    remaining_people = JSON.parse(sessionStorage.getItem("remaining_people")),//获取死掉的幽灵数量；
    people_word = JSON.parse(sessionStorage.getItem("people_word")),//获取身份内容;
    ghost_word = JSON.parse(sessionStorage.getItem("ghost_word")),
    game_result = sessionStorage.getItem("game_result");//获取游戏结果

(function () {

    if (gameDay >= 2) {//克隆天数节点li
        for (let i = 0; i < gameDay - 1; i++) {
            var li_clone = $(".rounds-details").children("li").clone();
            $(".rounds-details").append(li_clone);
        }

        $(".dayNumber").each(function (i) {
            $(this).text(i + 1)
        })

        $(".day").each(function (i) {

            if (play[whoBeKilled[i]] === undefined) {
                $(this).text("");
            }
            else if (i % 2 === 0) {
                $(this).text("晚上：" + (i + 1) + "号被杀手杀死，身份是" + play[whoBeKilled[i]]);
            } else {
                $(this).text("白天：" + (i + 1) + "号被杀手杀死，身份是" + play[whoBeKilled[i]]);
            }
            i++;

        })
    }

    if ($("#rounds-details").find("day:eq(0)").text() === "") {
        $("#rounds-details li:last-child").css("display", "none");
    }

    $("#ghost_number").text(remaining_ghosts.length);//剩余人数
    $("#people_number").text(remaining_people.length);
    $("#ghost_word").text(ghost_word);
    $("#people_word").text(people_word);
})();

$("#homepage").click(function () {
    if (confirm("是否回到主页") === true) {
        window.location.href = "../html-homepage/index.html";
        sessionStorage.clear();
    };
});

$("#play_again").click(function () {
    if (confirm("是否再来一局") === true) {
        window.location.href = "../html-number-setting/index.html";
        sessionStorage.clear()
    };
});

$("#game_result").text(game_result);//改变游戏结果；