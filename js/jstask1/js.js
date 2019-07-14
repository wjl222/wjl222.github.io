var smallBox = document.getElementsByName("box");
var x;//定义定时的变量。
var startDiv;//定义开始按钮所在地盒子有在的变量

function color () {
    var a,b,c;//定义三个自变量来储存三个颜色值
    var arr = [a,b,c];
    for (var i = 0;i < arr.length;i++){
        arr[i] = Math.floor(Math.random() * 256).toString(16);
    }
    var newColor = "#" + arr[1] + arr[2] + arr[0];
    return newColor;
}

function reset() {//重新设置颜色
    for (var j = 0;j < 9;j++) {
        smallBox[j].style.backgroundColor = "yellow";
    }
}

function a () {//在1~9中随机取三个数
    var arr1 = [];
    var arr = [0,1,2,3,4,5,6,7,8];
    for (var x = 0;x < 3;x++) {
        var index = ~~(Math.random() * arr.length);
        arr1.push(arr[index]);
        arr.splice(index,1);
    }
    return arr1;
}

function staticState () {
    reset();
    var umber = a();
    var setColor1 = color();
    var setColor2 = color();
    var setColor3 = color();
    smallBox[umber[0]].style.backgroundColor = setColor1;
    smallBox[umber[1]].style.backgroundColor = setColor2;
    smallBox[umber[2]].style.backgroundColor = setColor3;
}



function start () {
    startDiv = document.getElementById("start");
    startDiv.style.background = "yellow";
    staticState ();
    clearInterval(x);
    x = setInterval("staticState()",1000);
}

function stop () {
    reset();
    clearInterval(x);
    startDiv.style.background = "";//重置开始键的背景
}
    