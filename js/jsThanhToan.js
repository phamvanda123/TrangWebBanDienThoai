var globalTongTien = 0
function loadGioHang(){
    
    var listitemString = localStorage.getItem("listSP");
    var listitem = JSON.parse(listitemString)
    document.getElementById("Soluong").innerHTML = localStorage.getItem("SoLuongSP")
    var tongTien = 0
    
    var query = "select maSp,Image,tenSP,GiaTien,KhuyenMai from sanpham where maSP in (";
    for (let index = 0; index < listitem.length; index++) {

        if(index==(listitem.length-1)){
            query+= "'"+listitem[index].MaSP+"')"
        }
        else{
            query+= "'"+listitem[index].MaSP+"',"
        }

    }
    $.post("http://localhost:8080/PHP/API/GetCSDL.php",
    {
        action:"getListSanPhamCoDK",
        query: query
    }
    ,function(data){
        var listRes = JSON.parse(data)
        var kq = "";
        var table = document.querySelector("#temp1")
        var listitemString = localStorage.getItem("listSP");
        var listitem = JSON.parse(listitemString)
        console.log(listitem[0].soLuong)

        for (let index = 0; index < listRes.ListSanPham.length; index++) {
            tongTien += ((parseInt(listRes.ListSanPham[index].GiaTien)-(parseInt(listRes.ListSanPham[index].GiaTien)*(parseInt(listRes.ListSanPham[index].KhuyenMai)/100)))*getSoLuong(listRes.ListSanPham[index].maSp))
            kq+=`
            <div class="row my-2" >
            <div class="col-sm-2 d-flex justify-content-center flex-column"><img src="`+listRes.ListSanPham[index].Image+`" style="width: 100%;"></div>
            <div class="col-sm-2 d-flex justify-content-center flex-column ten-hang">`+listRes.ListSanPham[index].tenSP+`</div>
            <div class="col-sm-2 d-flex justify-content-center flex-column text-center">`+convertGia((parseInt(listRes.ListSanPham[index].GiaTien)-(parseInt(listRes.ListSanPham[index].GiaTien)*(parseInt(listRes.ListSanPham[index].KhuyenMai)/100))).toString())+`đ</div>
            <div class="col-sm-2 d-flex justify-content-center flex-column text-center"><div class='d-flex justify-content-center'><div class="mx-2">`+getSoLuong(listRes.ListSanPham[index].maSp)+`</div></div></div>
            <div class="col-sm-2 d-flex justify-content-center flex-column text-center">`+convertGia(((parseInt(listRes.ListSanPham[index].GiaTien)-(parseInt(listRes.ListSanPham[index].GiaTien)*(parseInt(listRes.ListSanPham[index].KhuyenMai)/100)))*getSoLuong(listRes.ListSanPham[index].maSp)).toString())+`</div>
            </div>

            `
        }
        table.innerHTML = kq;
        globalTongTien = tongTien
        document.getElementById("tong-tien").innerHTML = convertGia(tongTien.toString()) +"đ"
        document.getElementById("TongCong").innerHTML = convertGia((tongTien+20000).toString()) +"đ"
    })
    
}
loadGioHang()
function getSoLuong(maSP){
    listitemString = localStorage.getItem("listSP")
    listitem = JSON.parse(listitemString)
    for (let index = 0; index < listitem.length; index++) {
        if(listitem[index].MaSP===maSP){
           return listitem[index].soLuong
        }
      }
    
}

try {
var listUserString = localStorage.getItem("ThongTinKH")
var listTT = JSON.parse(listUserString)
document.getElementById("DiaChi").innerHTML = listTT.DiaChiGiaoHang

} catch (error) {
    
}
var listitemString = localStorage.getItem("listSP");
var listitem = JSON.parse(listitemString)
document.querySelector(".btn-DatHang").addEventListener("click",function(){
    if(listUserString===""){
        alert("Vui lòng đăng nhập để đặt hàng")
        window.location.href = "indexLogin.html";
        return;

    }
    if(listTT.DiaChiGiaoHang===""||listTT.SDT===""){
        alert("Vui lòng nhập thông tin của bạn để đặt hàng")
        window.location.href = "indexLogin.html";
        return;
    }
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();
    var daynow = year + "-" + month + "-" + day ;
    var dayGiaoHang =  year + "-" + month + "-" + (parseInt(day)+3).toString();
    console.log(daynow)
    console.log(dayGiaoHang)
    $.post("http://localhost:8080/PHP/API/DonDatHang.php",
    {
        action:"ThemHang",
        NgayDat: daynow,
        NgayGiao:dayGiaoHang,
        TrangThai:"Chờ xác nhận",
        TongGiaTri:globalTongTien,
        TaiKhoan:listTT.TaiKhoan,
        ListSP: JSON.stringify(listitem)
    }
    ,function(data){
        try {
            var listRes = JSON.parse(data)
        } catch (error) {
            
        }
        alert("Đặt Hàng Thành Công")
        localStorage.setItem("listSP","[]");
        localStorage.setItem("SoLuongSP",0)
        window.location.href = "indexUser.html";
    })
})