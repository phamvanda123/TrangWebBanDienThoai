var table = document.getElementById("CauHinh")
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const maSP = urlParams.get('idSP');


query = "select * from sanPham,cauhinh where sanPham.MaSP=cauhinh.MaSP and sanpham.masp='"+maSP+"'";
$.post("http://localhost:8080/PHP/API/GetCSDL.php",
{
    action:"getListSanPhamCoDK",
    query: query
},function(data){
    listRes=JSON.parse(data)
    console.log(listRes)
    var temp =0;
    var listAnh = convertHinhAnh(listRes.ListSanPham[0].ImageChiTiet);
    var DanhGia = listRes.ListSanPham[0].DanhGia
    let DanhGiaString ="";
    for (let index = 1; index < 6; index++) {
      if(index<=parseInt(DanhGia)){
        DanhGiaString+=`<i class="fa-solid fa-star"></i>`;
      }
      else{
        DanhGiaString+=`<i class="fa-regular fa-star"></i>`;
      }
    }
    document.getElementById("DanhGia").innerHTML = DanhGiaString
    document.getElementById("MoTa1").innerHTML = convertMoTa(listRes.ListSanPham[0].MoTa)[0]
    document.getElementById("MoTa2").innerHTML = convertMoTa(listRes.ListSanPham[0].MoTa)[1]
    document.getElementById("ImageMoTa1").setAttribute("src",convertHinhAnh(listRes.ListSanPham[0].ImageMoTa)[0])
    document.getElementById("ImageMoTa2").setAttribute("src",convertHinhAnh(listRes.ListSanPham[0].ImageMoTa)[1])
    document.getElementById("NameSP").innerHTML = listRes.ListSanPham[0].TenSp
    document.getElementById("GiaKM").innerHTML = convertGia((parseInt(listRes.ListSanPham[0].GiaTien)-(parseInt(listRes.ListSanPham[0].GiaTien)*(parseInt(listRes.ListSanPham[0].KhuyenMai)/100))).toString())+"đ"
    document.getElementById("expandedImg").setAttribute("src",listAnh[0])
    document.getElementById("GiaCKM").innerHTML = convertGia(listRes.ListSanPham[0].GiaTien)+"đ"
    document.querySelectorAll(".ImageChiTiet").forEach(element => {
        element.setAttribute("src",listAnh[temp])
        console.log(element.getAttribute("src"))
        temp++
    });
    table.innerHTML = `<tr>
    <td>Màn hình:</td>
    <td class="text-end">`+listRes.ListSanPham[0].ManHinh+`</td>
    </tr>
    <tr>
    <td>Hệ Điều Hành:</td>
    <td class="text-end">`+listRes.ListSanPham[0].HeDieuHanh+`</td>
    </tr>
    <tr>
    <td>Camera Sau:</td>
    <td class="text-end">`+listRes.ListSanPham[0].CameraSau+`</td>
    </tr>
    <tr>
    <td>Camera Trước:</td>
    <td class="text-end">`+listRes.ListSanPham[0].CameraTruoc+`</td>
    </tr>
    <tr>
    <td>Chip:</td>
    <td class="text-end">`+listRes.ListSanPham[0].Chip+`</td>
    </tr>
    <tr>
    <td>Ram:</td>
    <td class="text-end">`+listRes.ListSanPham[0].Ram+`GB</td>
    </tr>
    <tr>
    <td>Dung Lượng Lưu Trữ:</td>
    <td class="text-end">`+listRes.ListSanPham[0].DungLuong+` GB</td>
    </tr>
    <tr>
    <td>Pin</td>
    <td class="text-end">`+listRes.ListSanPham[0].Pin+` mAh</td>
    </tr>`
})
function convertHinhAnh(Str){
    return Str.split(",");
}
function convertMoTa(Str){
    return Str.split("^");
}