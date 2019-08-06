var inputNumber = document.getElementById("number"),//获取输入框的值为全局变量
    rangeNumber = document.getElementById("rangeNumber"),//获取滑动条的值为全局变量
    return_key = document.getElementById("return"),//获取返回键；
    ghostNumber_container = document.getElementById("ghost"),//获取行上的存放ghost数量值的容器
    peopleNumber_container = document.getElementById("people"),//获取行上的存放people数量值的容器
    people_word,
    ghost_word,
    random_text_identity;//随机文本身份

return_key.onclick = function () {//返回键的设置；
    window.location.href = "../html-homepage/index.html";
}


function p() { //通过输入的文本输出人数；
    //因为幽灵的数量都是以人员递增3个增加1个，所以分为了两种情况
    //第一种：人员除以3等与0的情况
    if (inputNumber.value % 3 == 0 && inputNumber.value < 19 && inputNumber.value >= 4) {
        ghostNumber_container.innerHTML = inputNumber.value / 3;
        peopleNumber_container.innerHTML = inputNumber.value - inputNumber.value / 3;
    }
    //第二种：人员除以3不等于0的情况
    else if (inputNumber.value % 3 != 0 && inputNumber.value < 19 && inputNumber.value >= 4) {
        ghostNumber_container.innerHTML = Math.floor(inputNumber.value / 3)
        peopleNumber_container.innerHTML = inputNumber.value - Math.floor(inputNumber.value / 3);
    }

    else {
        rangeChange.value = 1;
        alert("请输入4~18的数字");//如果输出的值不在4~18中，将弹出警告
    }
    return [+ghostNumber_container.innerHTML, +peopleNumber_container.innerHTML]//返回幽灵和水民的数量,为数字；
}

var ghost_Text_And_People_Text = function () {//将数字转换为文本
    var playerNumber = p();//接受分配函数中返回的值，准备将值转化为数组
    ghostNumber = playerNumber[0];//将幽灵的数量转换为数值类型
    peopleNumber = playerNumber[1];//将水民的数量转换为数值类型
    ghostText = [];//创建幽灵的数组存放幽灵身份。
    peopleText = [];//创建水民身份存放水民身份。
    for (var i = 0; i < ghostNumber; i++) {
        ghostText.push('幽灵');//向幽灵数组中遍历
    }
    for (var i = 0; i < peopleNumber; i++) {
        peopleText.push('水民');//向水民数组中遍历
    }

    var player_identity = ghostText.concat(peopleText);
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
    people_word = document.getElementById("people_word").value;//保存水民词汇
    ghost_word = document.getElementById("ghost_word").value;//保存ghost词汇
    if (people_word === "" || ghost_word === "") {
        alert("词汇不能为空");
    }
    else if (people_word === ghost_word) {
        alert("水民词汇和幽灵词不能相同");
    }

    else if (people_word !== 0 || ghost_word !== 0) {
        random_text_identity = shuffle(ghost_Text_And_People_Text());
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
    inputNumber.value = rangeNumber.value;//在滑轮的值发生改变是，将滑轮的值赋给输入框的值
    p();//运行改变上方数字的值，实现同步。
}

function inputChange() {
    rangeNumber.value = inputNumber.value;//在输入框发生改变时，将值赋予给滑轮实现同步。
    p();
}

function addNumber() {//加
    rangeNumber.value++;//点击时滑轮的值发生改变
    rangeChange();//运行函数实现同步
}

function reduce() {//减
    rangeNumber.value--;
    rangeChange();
}