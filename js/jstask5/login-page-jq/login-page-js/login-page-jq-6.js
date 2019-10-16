$(document).ready(function () {

    $("#btn").click(function () {
        var information = "name=" + $("#user_name").val() + "&pwd=" + $("#password").val();
        if ($("#user_name").val() === "" || $("#password").val() === "") {
            alert("未输入用户名或密码");
        } else {
            $.ajax({
                type: "POST",//发送的方式；
                url: "/carrots-admin-ajax/a/login", //发送的连接；
                dataType: "json",//返回的数据类型；
                data: information,//发送的数据；
                success: function (d) {
                    var cheacking = d;
                    if (cheacking.message === "success") {
                        location.href = 'http://dev.admin.carrots.ptteng.com/#/dashboard';
                    } else {
                        $("#result").html(cheacking.message);
                    }
                },
                error: function () {
                    alert("验证出现错误，请稍后重试");
                }
            })
        }
    });

});