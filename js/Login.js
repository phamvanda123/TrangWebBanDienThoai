document.querySelector(".dang-ky").addEventListener("click", function() {
    document.querySelector(".from-dang-nhap").style.position = "absolute"
    document.querySelector(".from-dang-ky").style.position = "relative"
})
document.querySelector(".dang-nhap").addEventListener("click", function() {
    document.querySelector(".from-dang-ky").style.position = "absolute"
    document.querySelector(".from-dang-nhap").style.position = "relative"
})

$(function() {
    $("#form1").submit(function() {
        var taiKhoan = $("[name=taiKhoan]").val();
        var matKhau = $("[name=matKhau]").val();
        if (taiKhoan === "admin" && "1234") {
            window.location.href = "./admin/home.html";
        }
        $.post(
            "http://localhost:8080/PHP/API/Login.php", {
                action: "login",
                taiKhoan: taiKhoan,
                matKhau: matKhau,
            },
            function(data) {
                try {
                    resData = JSON.parse(data);
                    if (resData.status === 1) {
                        document.querySelector("#msg").innerHTML = resData.mess;
                        $("#myModalDangNhap").modal("show");
                        localStorage.setItem("isDangNhap", "true")
                        localStorage.setItem("ThongTinKH", JSON.stringify(resData.ListKH[0]))
                        window.location.href = "indexUser.html"
                    } else {
                        document.querySelector("#msg").innerHTML = resData.mess;
                        $("#myModalDangNhap").modal("show");
                        document.querySelector("#pwd").value = "";
                    }
                } catch {
                    document.querySelector("#msg").innerHTML = "Đăng nhập không thành công";
                    $("#myModalDangNhap").modal("show");
                    document.querySelector("#pwd").value = "";
                }

            }
        );
        return false;
    });
    $("#form2").submit(function() {
        var taiKhoan = $("[name=DKtaiKhoan]").val();
        var matKhau = $("[name=DKmatKhau]").val();
        var email = $("[name=email]").val();
        if (taiKhoan === "" || matKhau === "" || email === "") {
            document.querySelector("#msg").innerHTML = "Hãy nhập đầy đủ thông tin để đăng ký";
            $("#myModalDangNhap").modal("show");
            document.querySelector("#pwd").value = "";
        }
        $.post(
            "http://localhost:8080/PHP/API/Login.php", {
                action: "register",
                taiKhoan: taiKhoan,
                matKhau: matKhau,
                email: email,
            },
            function(data) {
                try {
                    resData = JSON.parse(data);
                    if (resData.status === 1) {
                        document.querySelector("#msg").innerHTML = resData.mess;
                        $("#myModalDangNhap").modal("show");
                    } else {
                        document.querySelector("#msg").innerHTML = resData.mess;
                        $("#myModalDangNhap").modal("show");
                        document.querySelector("#pwd").value = "";
                    }
                } catch (error) {
                    document.querySelector("#msg").innerHTML = "Tài Khoản đã tồn tại";
                    $("#myModalDangNhap").modal("show");
                    document.querySelector("#pwd").value = "";
                }

            }
        );
        return false;
    });
});

function openCity(evt, cityName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("city");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " w3-red";
}