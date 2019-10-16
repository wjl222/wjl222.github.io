var z;
var startColor;
var bdiv = document.getElementById("bigbox");//获取大盒子的节点值
var div = bdiv.getElementsByTagName("div");//获取小盒子节点的值

function color() {  //赋值十六位进制的颜色值
    var r = Math.floor(Math.random() * 256).toString(16); 
    var g = Math.floor(Math.random() * 256).toString(16);
    var b = Math.floor(Math.random() * 256).toString(16);
    var Rgb = "#" + r + g + b;
    return Rgb;
}

function reset() { //遍历盒子重置颜色
    for (var i = 0; i < 9; i++) {
        div[i].style.backgroundColor = "yellow";
    }
}

// function number() {
//     var num = [0, 1, 2, 3, 4, 5, 6, 7, 8];
//     var sNum = Math.round(Math.random() * num.length);
//     return sNum;
// }

function aaa() {
    reset();
    startColor = document.getElementById("start");
    startColor.style.backgroundColor = "yellow";
    var x = [];
    var y = 0;
    while (y < 3){
        var num = Math.floor(Math.random() * 9);
        if(x.indexOf(num) == -1) {//用indexOf函数查询数组中是否已经有数字，确保每个数字不同
            x.push(num);
            y++;
        }
    }
    //console.log(x[1],x[2],x[0]);实验保证每个数字不同
    div[x[0]].style.backgroundColor = color();
    div[x[1]].style.backgroundColor = color();
    div[x[2]].style.backgroundColor = color();
    // for (var i = 0; i < 3; i++) {
    //     y = Math.floor(Math.random() * 10);
    //     if (x.indexOf(y) == -1) {
    //         x.push(y);
    //     }
    //     console.log(x[i]);
    // }//随机三个数放在x的数组中
}

function start() {
    aaa();
    clearInterval(z);
    z = setInterval("aaa()", 1000);
}

function stop() {
    startColor.style.backgroundColor = ("");
    clearInterval(z);
    reset();
}
