var bigbox = document.getElementById("bigbox");
var box = document.getElementsByClassName("box");
var start = document.getElementById("start");
var end = document.getElementById("end");
var clickNumber = 0;
var i;//i为定时返回的名称；
function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var rgb = 'rgb' + '(' + r + ',' + g + ',' + b + ')';
    return rgb;
}

function randomNumber() {//返回三个随机的数字
    var arr = [0,1,2,3,4,5,6,7,8];
    var newarr = [];
    for (let i = 0;i < 3;i++) {
        var a = Math.floor(Math.random() * arr.length);
        newarr.push(arr[a]);
        arr.splice(a,1);
    }
    return newarr;
}

function changeColor() {//设置随机的颜色
    resetColor();
    var randomNum = randomNumber();
    for (let i = 0;i < 3;i++) {
        box[randomNum[i]].style.backgroundColor = randomColor();
    }
}

function resetColor() {
    for (let i = 0;i < box.length;i++) {
        box[i].style.backgroundColor = "yellow";
    }
}

start.onclick = function start() {
    if (clickNumber === 0) {
        clickNumber = 1;
        i = setInterval(changeColor,1000);
    }
}

end.onclick = function () {
    resetColor();
    clearInterval(i);
    clickNumber = 0;
}