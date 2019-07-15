var smallBox = document.getElementsByName("box");
var x;//定义定时的变量。
var startDiv;//定义开始按钮所在地盒子有在的变量

function rgb(){//rgb颜色随机
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    var rgb = 'rgb('+r+','+g+','+b+')';
    return rgb;
}

function reset() {//重新设置颜色
    for (var j = 0;j < 9;j++) {
        smallBox[j].style.backgroundColor = "#ffff00";
    }
}

function a () {//在1~9中随机取三个数
    var arr1 = [];
    var arr = [0,1,2,3,4,5,6,7,8];
    for (var x = 0;x < 3;x++) {
        var index = Math.floor((Math.random() * arr.length));
        arr1.push(arr[index]);
        arr.splice(index,1);
    }
    return arr1;
}

function  staticState () {
    reset();
    var umber = a();
    var colora = rgb();
    var colorb = rgb();
    var colorc = rgb();
    if (colora != colorb && colora != colorc) {
        for (var i = 0;i < umber.length;i++) {
            smallBox[umber[i]].style.backgroundColor = rgb();
        }
    }
    
}

function start () {
    startDiv = document.getElementById("start");
    startDiv.style.background = "#ffff00";
    clearInterval(x);
    x = setInterval("staticState()",1000);
}

function stop () {
    reset();
    clearInterval(x);
    startDiv.style.background = "";//重置开始键的背景
}
    