var btn = document.getElementById("btn");

btn.onclick = function () {
    var user = document.getElementById("user_name").value,
        password = document.getElementById("password").value,
        result = document.getElementById("result");
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
    }

    if (user === "" || password === "") {
        alert("未输入用户名或密码");
    } else {
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.status == 200 && xmlhttp.readyState == 4) {
                var cheacking = JSON.parse(xmlhttp.responseText);
                console.log(cheacking);
                if (cheacking.message === 'success') {
                    location.href = 'http://dev.admin.carrots.ptteng.com/';
                } else {
                    result.innerHTML = cheacking.message;
                }
            }
        }
        xmlhttp.open("POST", "/carrots-admin-ajax/a/login", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("name=" + user + "&pwd=" + password);
    }

}

