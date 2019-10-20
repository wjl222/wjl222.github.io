var picture_container = document.getElementsByClassName('picture-container')[0],
    picture = picture_container.children,
    banner_picture = document.getElementsByClassName('banner-picture')[0],
    rotation_chart_left = document.getElementById('rotation_chart_left'),
    rotation_chart_right = document.getElementById('rotation_chart_right'),
    picture_w = picture_container.children[0].offsetWidth,
    offsetTime = -1,
    spot_ul = document.getElementById('spot'),
    spot_li = spot_ul.children,
    index = 0,
    animated = false,
    timed,
    img = picture_container.children;


window.onload = function () {
    rotationed();
    banner_picture.style.height = (picture[0].offsetWidth * 0.3125) + 'px';//图片的高宽比是.3125;
    for (var i = 0; i < picture.length; i++) {
        picture[i].style.height = (picture[i].offsetWidth * 0.3125) + 'px';
    }
    picture_container.style.left = -picture_w + 'px';

};

window.onresize = function () {//监控浏览器大小变化时的轮播图大小变化；
    banner_picture.style.height = (picture[0].offsetWidth * 0.3125) + 'px';//因为设置了绝对定位，其夫元素高度无法设置，用js设置较为方便
    for (var i = 0; i < picture.length; i++) {
        picture[i].style.height = (picture[i].offsetWidth * 0.3125) + 'px';//图片的高度
    }
    picture_container.style.left = offsetTime * picture_container.children[0].offsetWidth + 'px';//宽度缩小时，因为下方的位移距离是按照宽度设置；所以在位移时将其同步；
    picture_w = picture_container.children[0].offsetWidth;//同步变量值
}

document.addEventListener('visibilitychange',function() {//当用户切换出去时停止轮播，用户在此进入时开始；
    if (!document.hidden) {
        stop();
    } else {
        rotationed();
    }
})

function rotationed() {
    timed = setInterval(function () {
        rotation_chart_right.onclick()
    }, 5000);
}

function stop() {
    clearInterval(timed);
}

function showSpot(number) {//同步下方小点；
    for (let i = 0; i < spot_li.length; i++) {
        spot_li[i].setAttribute('class', '');
    }
    spot_li[number].setAttribute('class', 'active');
}

function animate(num) {//动画函数，传入的值是要位移的距离；
    var new_left = parseInt(picture_container.style.left) + num;//绝对定位左边的距离；
    var time = 2000;//总时间
    var interval = 10;//每隔多久调用；
    var speed = num / (time / interval);//每次的位移量；

    animated = true;
    function go() {

        if ((speed < 0 && parseInt(picture_container.style.left) > new_left) || (speed > 0 && parseInt(picture_container.style.left) < new_left)) {
            picture_container.style.left = parseInt(picture_container.style.left) + speed + 'px';
            setTimeout(go, interval);
        }
        else {
            animated = false;

            if (new_left < - 4 * picture_w) {
                picture_container.style.left = -picture_w + 'px';
            } else if (new_left > -picture_w) {
                picture_container.style.left = - 4 * picture_w + 'px';
            } else {
                picture_container.style.left = new_left + 'px';
            }
            offsetTime = parseInt(picture_container.style.left) / picture_w;//这边是得到轮播图偏移了多少次
        }
    }
    go();
}

for (let i = 0; i < spot_li.length; i++) {//每个小点添加点击事件；
    spot_li[i].onclick = function () {
        
        if (this.className === 'active') {//取消重复点击次数；
            return;
        }

        if (animated == false) {//当动画在运动时，小点无法点击；
            var x = (-offsetTime) - (i + 1);//现有的位置减去小点目标的位置；
            index = i;
            showSpot(i);//同步下方小点；
            //x是现在所处的位置减去点击的小点所处的位置的大小；也就是要移动的页面数量
            animate(x * picture_w);//位移的距离
        }

        //除了当前和目标的，其他都隐藏；

    }
}

rotation_chart_right.onclick = function () {//按键往右

    if (!animated) {
        animate(- picture_w);
        if (index >= 3) {
            index = -1;
        }
        index += 1;
        showSpot(index)
    } else {
        return;
    }
};

rotation_chart_left.onclick = function () {//按键往左
    if (!animated) {
        if (index <= 0) {
            index = 4;
        }
        index -= 1;
        showSpot(index)
        animate(picture_w);
    } else {
        return;
    }
};

banner_picture.onmouseover = function() {
    clearInterval(timed)
};
banner_picture.onmouseout = rotationed;