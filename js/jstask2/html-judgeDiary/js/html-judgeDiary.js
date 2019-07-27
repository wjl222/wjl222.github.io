var play = JSON.parse(localStorage.getItem("player")); //获取设置人数也随机的身份。
var option_line = document.getElementById("option_line"); //获取最上方ul 
var ulLastChild = option_line.lastElementChild;  //获取ul中最后一个子元素li的值

for (var i = 0;i < play.length;i++) {//遍历生成子元素li；
    var ulLastChildClone = ulLastChild.cloneNode(true);
    ulLastChildClone.getElementsByClassName("option-text")[0].getElementsByClassName("option-identity")[0].innerHTML = play[i];//更改身份
    ulLastChildClone.getElementsByClassName("option-text")[0].getElementsByClassName("option-number")[0].innerHTML = i + 1;//更改身份的数字。
    option_line.appendChild(ulLastChildClone);
}
ulLastChild.style.display = "none";//隐藏第一个被复制的li

function start() {
    window.location.href = '../html-judgeBench/index.html';
}