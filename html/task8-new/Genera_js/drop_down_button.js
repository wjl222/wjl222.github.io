var drop_down_option = document.getElementsByClassName('navigation-option')[0];

var drop_down = document.getElementById('drop_down');

drop_down.onclick = function () {
    if (drop_down_option.style.display === '') {
        drop_down_option.style.display = 'none';
    }

    if (drop_down_option.style.display === 'none') {
        drop_down_option.style.display = 'inline-block';
    } else {
        drop_down_option.style.display = 'none';
    }

};

window.onresize = function () {
    var offsetWid = document.documentElement.clientWidth;
    if (offsetWid >= 640) {
        drop_down_option.style.display = 'inline-block';
    } else {
        drop_down_option.style.display = 'none'
    }
}