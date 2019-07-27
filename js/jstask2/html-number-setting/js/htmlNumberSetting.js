var inputNumber = document.getElementById("number");//获取输入框的值为全局变量
var rangeNumber = document.getElementById("rangeNumber");//获取滑动条的值为全局变量


function p() {         //建立分配人数的函数，通过一定规律分配水民和幽灵的数量,并且会改变两个的数量。
    var ghostNumber = document.getElementById("ghost");//获取行上的存放ghost数量值的容器
    var peopleNumber = document.getElementById("people");//获取行上的存放people数量值的容器

    //因为幽灵的数量都是以人员递增3个增加1个，所以分为了两种情况
    //第一种：人员除以3等与0的情况
    if (inputNumber.value % 3 == 0 && inputNumber.value < 19 && inputNumber.value >= 4) {
        ghostNumber.innerHTML = inputNumber.value / 3;
        peopleNumber.innerHTML = inputNumber.value - inputNumber.value / 3;
    }
    //第二种：人员除以3不等于0的情况
    else if (inputNumber.value % 3 != 0 && inputNumber.value < 19 && inputNumber.value >= 4) {
        ghostNumber.innerHTML = Math.floor(inputNumber.value / 3)
        peopleNumber.innerHTML = inputNumber.value - Math.floor(inputNumber.value / 3);
    }

    else {
        alert("请输入4~18的数字");//如果输出的值不在4~18中，将弹出警告
    }
    return [ghostNumber, peopleNumber]//返回幽灵和水民的数量
}

var ghostTextAndPeopleText = function () {//获得文字的身份
    var playerNumber = p();//接受分配函数中返回的值，准备将值转化为数组
    var ghostNumber = +(playerNumber[0].innerHTML);//将幽灵的数量转换为数值类型
    var peopleNumber = +(playerNumber[1].innerHTML);//将水民的数量转换为数值类型
    var ghostText = [];//创建幽灵的数组存放幽灵身份。
    var peopleText = [];//创建水民身份存放水民身份。
    for (var i = 0; i < ghostNumber; i++) {
        ghostText.push('幽灵');//向幽灵数组中遍历
    }
    for (var i = 0; i < peopleNumber; i++) {
        peopleText.push('水民');//向水民数组中遍历
    }

    var player_identity = ghostText.concat(peopleText);
    return player_identity;//返回带值的数组准备用于随机分配
}

function shuffle(a) {//随机分配人员的身份。
    var random_identity = [];
    while (a.length) {
        var index = ~~(Math.random() * a.length);
        random_identity.push(a[index]);
        a.splice(index, 1);
    }
    return random_identity;
}

//错误想法：准备判断其字符长度，如果字符长度超过20，则弹出警告，后来看了软件操作才知道是用css设置了input["text"]的最大字数，如果超过输入不了
//弹出的警告仅仅是在最后一步判断是否输入。

// function byte_length_determination() {
//     var people_word = document.getElementById("people_word").value;//获取水民词汇input的值
//     var ghost_word = document.getElementById("ghost_word").value;//获取幽灵词汇
//     var a = 0, b = 0;//a，b为字节长度初始值

//     for (var i = 0; i < people_word.length; i++) {    //遍历字符串的每一位，通过阿斯克码来判断是中文字还是英文字
//（英文一个字节，中文两个字节且中文的阿斯克码大于255；英文小于255）
//         if (people_word.charAt(i).charCodeAt() <= 255) {
//             a = a + 1
//         }
//         if (people_word.charAt(i).charCodeAt() > 255) {
//             a = a + 2
//         }
//     }
//     for (var j = 0; j < ghost_word.length; j++) {
//         if (ghost_word.charAt(j).charCodeAt() <= 255) {
//             b = b + 1
//         }
//         if (ghost_word.charAt(j).charCodeAt() > 255) {
//             b = b + 2
//         }
//     }
//     if (a > 20 || b > 20) {
//         alert("请输入十个字以内");
//     }
// }

function sumbit() {
    var people_word = document.getElementById("people_word").value;//保存水民词汇为全局
    var ghost_word = document.getElementById("ghost_word").value;//保存ghost词汇为全局
    sessionStorage.setItem("people_word", JSON.stringify(people_word));
    sessionStorage.setItem("ghost_word", JSON.stringify(ghost_word));
    if (people_word != 0 || ghost_word != 0) {
        to_deal_cards()
    }
    else {
        alert("请输入十个字以内的汉字")
    }
}

function rangeChange() {
    inputNumber.value = rangeNumber.value;//在滑轮的值发生改变是，将滑轮的值赋给输入框的值
    p();//运行改变上方数字的值，实现同步。
}

function inputChange() {
    rangeNumber.value = inputNumber.value;//在输入框发生改变时，将值赋予给滑轮实现同步。
    p();
    // ghostTextAndPeopleText();
    // xxx = shuffle(ghostTextAndPeopleText())
    // return xxx;

}

function addNumber() {//加
    rangeNumber.value++;//点击时滑轮的值发生改变
    rangeChange();//运行函数实现同步
}

function reduce() {//减
    rangeNumber.value--;
    rangeChange();
}
var xx;//xx为随机后的身份列表
function to_deal_cards() {
    xx = shuffle(ghostTextAndPeopleText());
    ggg();
    window.location.href = '../html-turnOverCard/turnOverCard_2.html'
}

function ggg() {
    localStorage.setItem("player", JSON.stringify(xx));
}