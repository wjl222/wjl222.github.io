var rangeNumber = $("#rangeNumber").get(0).value;//获取滑轮的值；

$("#return").click(function () {//返回键的设置；
    window.location.href = "../html-homepage/index.html";
});

function returnPlayerIdentity() { //通过输入的文本输出人数；
    //因为幽灵的数量都是以人员递增3个增加1个，所以分为了两种情况
    //第一种：人员除以3等与0的情况
    var inputNumber = $("#number").get(0).value;
    if (inputNumber % 3 === 0 && inputNumber < 19 && inputNumber >= 4) {
        $("#ghost").text(inputNumber / 3);
        $("#people").text(inputNumber - inputNumber / 3);
    }
    //第二种：人员除以3不等于0的情况
    else if (inputNumber % 3 != 0 && inputNumber < 19 && inputNumber >= 4) {
        
        $("#ghost").text(Math.floor(inputNumber / 3));

        $("#people").text(inputNumber - Math.floor(inputNumber / 3));
    }

    else {
        rangeNumber = 4;//当输入的数字过大，滑轮上的数字会跳到最大，这一步是为了让滑轮上的数字保持不动；
        alert("请输入4~18的数字");//如果输出的值不在4~18中，将弹出警告
    }
    return [+$("#ghost").text(), +$("#people").text()]//返回幽灵和水民的数量,为数字；
}

var ghost_Text_And_People_Text = function () {//数量转换为文本身份的函数

    var playerNumber = returnPlayerIdentity(),//接受分配函数中返回的值，准备将值转化为数组
        ghostNumber = playerNumber[0],
        peopleNumber = playerNumber[1],
        ghostText = [],//创建幽灵的数组存放幽灵身份。
        peopleText = [],//创建水民身份存放水民身份。
        player_identity;//玩家身份，最后返回；

    for (var i = 0; i < ghostNumber; i++) {
        ghostText.push('幽灵');//向幽灵数组中遍历
    }

    for (var i = 0; i < peopleNumber; i++) {
        peopleText.push('水民');//向水民数组中遍历
    }

    player_identity = ghostText.concat(peopleText);//连接为完成数组；

    return player_identity;//返回带值的数组准备用于随机分配
}

function shuffle(a) {//随机分配人员的身份的函数。
    var random_identity = [];
    while (a.length) {
        var index = ~~(Math.random() * a.length);
        random_identity.push(a[index]);
        a.splice(index, 1);
    }
    return random_identity;
}

function sumbit() {
    var people_word = $("#people_word").val();
    var ghost_word = $("#ghost_word").val();
    if (people_word === "" || ghost_word === "") {
        alert("词汇不能为空");
    }
    else if (people_word === ghost_word) {
        alert("水民词汇和幽灵词不能相同");
    }

    else if (people_word !== 0 || ghost_word !== 0) {
        var random_text_identity = shuffle(ghost_Text_And_People_Text());
        sessionStorage.setItem("player", JSON.stringify(random_text_identity));
        window.location.href = '../html-turnOverCard/turnOverCard_2.html'
    }
    else {
        alert("请输入十个字以内的词汇")
    }

    sessionStorage.setItem("people_word", JSON.stringify(people_word));//储存词汇
    sessionStorage.setItem("ghost_word", JSON.stringify(ghost_word));
}

function rangeChange() {
    $("#number").val( $("#rangeNumber").val() );
    //在滑轮的值发生改变是，将滑轮的值赋给输入框的值
    returnPlayerIdentity();//运行改变上方数字的值，实现同步。
}

function inputChange() {
    $("#rangeNumber").val($("#number").val());//在输入框发生改变时，将值赋予给滑轮实现同步。
    returnPlayerIdentity();
}

function addNumber() {//加
    rangeNumber = +(rangeNumber) + 1; //滑轮的值是字符串，先将字符串转换为数字，点击时滑轮的值发生改变
    rangeChange();//运行函数实现同步
}

function reduce() {//减
    rangeNumber = +(rangeNumber) - 1;
    rangeChange();
}