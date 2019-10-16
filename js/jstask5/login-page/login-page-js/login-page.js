var btn = document.getElementById("btn");
btn.onclick = function () {
    var user_name = document.getElementById("user_name"),
        password = document.getElementById("password");
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
    }

    xmlhttp.onreadystatechange = function () {
        // console.log("aaa");
        if (xmlhttp.readyState == 4 && xmlhttp.states == 200) {
            window.location.href = "www.baidu.com";
            console.log("aaa");
        }
    }

    xmlhttp.open("POST", "/carrots-admin-ajax/a/login", true);
    xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("name=" + user_name.value + "&pwd" + password.value);
}

