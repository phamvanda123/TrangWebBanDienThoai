function loadDataTable(){
    $.post(
        "http://localhost:8080/PHP/API/user.php",
        {
            action: "getListuser"
        },function (data){
            var listRes = JSON.parse(data)
            var table = document.getElementById("dataTable")
            console.log(listRes)
            for (let index = 0; index < listRes.Listuser.length; index++) {
                table.innerHTML +=`
                    <tr>
                            <td>`+listRes.Listuser[index].TaiKhoan+`</td>
                            <td>`+listRes.Listuser[index].MatKhau+`</td>
                           
                            <td>`+listRes.Listuser[index].Ten+`</td>
                            <td>`+listRes.Listuser[index].Email+`</td>
                            <td>`+listRes.Listuser[index].SDT+`</td>
                            <td>`+listRes.Listuser[index].DiaChiGiaoHang+`</td>

                            <td><a href="#" taiKhoan="`+listRes.Listuser[index].TaiKhoan+`" onclick="SuaTaiKhoanClick(this)">Sữa</a></td>
                            <td><a href="#" taiKhoan="`+listRes.Listuser[index].TaiKhoan+`" onclick="XoaTaiKhoanClick(this)">Xóa</a></td>
                        </tr>`;
                
            }
           
        }
    )
    

    
}
loadDataTable();
var taiKhoan = document.getElementById("TaiKhoan1")
var MatKhau = document.getElementById("MatKhau1")
var Ten = document.getElementById("Ten1")
var Email = document.getElementById("Email1")
var SDT = document.getElementById("SDT1")
var DiaChi = document.getElementById("DiaChiGiaoHang1")

document.querySelector("#them").addEventListener("click",()=>{
    var TaiKhoan = $("#TaiKhoan").val();
    var MatKhau = $("#MatKhau").val();
    var Ten = $("#Ten").val();
    var Email = $("#Email").val();
    var SDT = $("#SDT").val();
    var DiaChiGiaoHang = $("#DiaChiGiaoHang").val();
  
        $.post(
            "http://localhost:8080/PHP/API/user.php",
            {
                action: "Themuser",
                TaiKhoan: TaiKhoan,
                MatKhau:MatKhau,
                Ten:Ten,
                Email:Email,
                SDT:SDT,
                DiaChiGiaoHang:DiaChiGiaoHang,

            },function (data){
                try {
                var dataRes = JSON.parse(data)
                    
                } catch (error) {
                    alert("Thêm Không thành công mã hãng đã tồn tại")
                }
                alert(dataRes.mess)
            }
        )
    
})

        
function LoadTableTimKiem(){
    var query = "select * from user where Ten like '%"+ document.querySelector(".timkiem").value+"%'";
    $.post(
        "http://localhost:8080/PHP/API/GetCSDL.php",
        {
            action: "getListSanPhamCoDK",
            query: query
        },function (data){
            var listRes = JSON.parse(data)
            var table = document.getElementById("dataTable")
            table.innerHTML =""
            for (let index = 0; index < listRes.ListSanPham.length; index++) {
                table.innerHTML +=`
                    <tr>
                            <td>`+listRes.ListSanPham[index].TaiKhoan+`</td>
                            <td>`+listRes.ListSanPham[index].MatKhau+`</td>
                            <td>`+listRes.ListSanPham[index].Ten+`</td>
                            <td>`+listRes.ListSanPham[index].Email+`</td>
                            <td>`+listRes.ListSanPham[index].SDT+`</td>
                            <td>`+listRes.ListSanPham[index].DiaChiGiaoHang+`</td>

                            <td><a href="#" taiKhoan="`+listRes.ListSanPham[index].TaiKhoan+`" onclick="SuaTaiKhoanClick(this)">Sữa</a></td>
                            <td><a href="#" taiKhoan="`+listRes.ListSanPham[index].TaiKhoan+`" onclick="XoaTaiKhoanClick(this)">Xóa</a></td>
                        </tr>`;
                
            }
        }
    )
}
function XoaTaiKhoanClick(a){
    if(confirm("Bạn có chắc muốn xóa user này")){
        $.post(
            "http://localhost:8080/PHP/API/user.php",
            {
                action: "Xoa",
                TaiKhoan: a.getAttribute("taiKhoan"),
    
            },function (data){
                try {
                var dataRes = JSON.parse(data)
                     alert(dataRes.mess)
                    location.reload()
                } catch (error) {
                    alert("Xóa không thành công")
                }
            }
        )
    }
}
function SuaTaiKhoan(){
    if(confirm("Bạn có chắc muốn sửa")){
        $.post(
            "http://localhost:8080/PHP/API/user.php",
            {
                action: "Suauser",
                TaiKhoan: taiKhoan.value,
                MatKhau:MatKhau.value,
                Ten:Ten.value,
                Email:Email.value,
                SDT:SDT.value,
                DiaChiGiaoHang:DiaChi.value,
    
            },function (data){
                try {
                var dataRes = JSON.parse(data)
                     alert("Sửa thành công")
                    
                } catch (error) {
                    alert("Sửa không thành công")
                }
            }
        )
    }
   
}
function SuaTaiKhoanClick(a){
    $("#myModalSua").modal("show")
    var query = "select * from user where TaiKhoan='"+ a.getAttribute("taiKhoan")+"'";
    $.post(
        "http://localhost:8080/PHP/API/GetCSDL.php",
        {
            action: "getListSanPhamCoDK",
            query: query
        },function (data){
            var listRes = JSON.parse(data)
            taiKhoan.value = listRes.ListSanPham[0].TaiKhoan
            MatKhau.value = listRes.ListSanPham[0].MatKhau
            Ten.value = listRes.ListSanPham[0].Ten
            Email.value = listRes.ListSanPham[0].Email
            SDT.value = listRes.ListSanPham[0].SDT
            DiaChi.value = listRes.ListSanPham[0].DiaChiGiaoHang
        }
    )

}
