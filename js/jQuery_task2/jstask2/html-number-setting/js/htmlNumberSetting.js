function returnPlayerIdentity() { //分配人数
    var inputNumber = $("#number").val();
    if (inputNumber > 3 && inputNumber < 19) {
        $("#ghost").text(Math.floor(inputNumber / 3));
        $("#people").text(inputNumber - Math.floor(inputNumber / 3));
    }

    else {
        $("#rangeNumberChange").val(4);//当输入的数字过大，滑轮上的数字会跳到最大，这一步是为了让滑轮上的数字保持不动；
        $("#ghost").text("");//并且输入为空；
        $("#people").text("");
    }
    return [+$("#ghost").text(), +$("#people").text()]//返回幽灵和水民的数量,为数字；
}

var ghostTextAndPeopleText = function () {//数量转换为文本身份的函数
    var playerNumber = returnPlayerIdentity(),//接受分配函数中返回的值，准备将值转化为数组
        ghostText = [],//创建幽灵的数组存放幽灵身份。
        peopleText = [],//创建水民身份存放水民身份。
        player_identity;//玩家身份，最后返回；
    for (var i = 0; i < playerNumber[0]; i++) {
        ghostText.push('幽灵');//向幽灵数组中遍历
    }
    for (var i = 0; i < playerNumber[1]; i++) {
        peopleText.push('水民');//向水民数组中遍历
    }
    player_identity = ghostText.concat(peopleText);//连接为完成数组；
    return player_identity;//返回带值的数组准备用于随机分配
}

$("#licensing").click(function () {
    var people_word = $("#people_word").val(),
        ghost_word = $("#ghost_word").val(),
        input_number = $("#number").val();

    if ((people_word === "" && ghost_word === "") && (input_number < 4 || input_number > 18)) {
        alert("词汇未填写，并且数字不在规定范围");
    }

    else if (people_word === "" || ghost_word === "") {
        alert("词汇有未填写的");
    } else if (people_word === ghost_word) {
        alert("水民词汇和幽灵词不能相同");
    } else if (input_number < 4 || input_number > 18) {
        alert("请输入范围内数字");
    } else {

        var text_identity = ghostTextAndPeopleText();

        var random_identity = [];

        while (text_identity.length) {
            var index = ~~(Math.random() * text_identity.length);
            random_identity.push(text_identity[index]);
            text_identity.splice(index, 1);
        }

        sessionStorage.setItem("player", JSON.stringify(random_identity));
        sessionStorage.setItem("people_word", JSON.stringify(people_word));//储存词汇
        sessionStorage.setItem("ghost_word", JSON.stringify(ghost_word));
        window.location.href = '../html-turnOverCard/turnOverCard_2.html'
    }
});

function rangeNumberColor() {//实现滑轮的同步；
    var rangeNumber = $("#rangeNumberChange").val();
    var rangeNum100 = (+rangeNumber - 4) / 14 * 100;
    $("#rangeNumberChange").css("backgroundSize", rangeNum100 + "% " + "100%");
}

$("#rangeNumberChange").on ("input",function (){//滑轮
    $("#number").val($("#rangeNumberChange").val());
    //在滑轮的值发生改变是，将滑轮的值赋给输入框的值
    returnPlayerIdentity();//运行改变上方数字的值，实现同步。
    rangeNumberColor();
});

$("#number").on("input",function () {
    $("#rangeNumberChange").val($("#number").val());//在输入框发生改变时，将值赋予给滑轮实现同步。
    returnPlayerIdentity();
    rangeNumberColor()
});

$("#add").click(function () {//加
    $("#rangeNumberChange").val(
        +$("#rangeNumberChange").val() + 1
    ); //滑轮的值是字符串，先将字符串转换为数字，点击时滑轮的值发生改变
    rangeNumberColor()//实现同步；
});

$("#reduce").click(function () {//减
    $("#rangeNumberChange").val(
        +$("#rangeNumberChange").val() - 1
    ); //滑轮的值是字符串，先将字符串转换为数字，点击时滑轮的值发生改变
    rangeNumberColor()

});

$("#return").click(function () {//返回键的设置；
    window.location.href = "../html-homepage/index.html";
});