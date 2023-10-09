function loadDataTable(){
    $.post(
        "http://localhost:8080/PHP/API/dathang.php",
        {
            action: "getListdondathang"
        },function (data){
            var listRes = JSON.parse(data)
            var table = document.getElementById("dataTable")
            console.log(listRes)
            for (let index = 0; index < listRes.Listdondathang.length; index++) {
                table.innerHTML +=`
                    <tr>
                            <td>`+listRes.Listdondathang[index].MaDon+`</td>
                            <td>`+listRes.Listdondathang[index].NgayDat+`</td>                        
                            <td>`+listRes.Listdondathang[index].TongGiaTri+` đ</td>
                            <td>`+listRes.Listdondathang[index].NgayGiao+`</td>
                            <td>`+listRes.Listdondathang[index].TaiKhoan+`</td>
                            <td>`+listRes.Listdondathang[index].TrangThai+`</td>
                            <td><a href="#" MaDon="`+listRes.Listdondathang[index].MaDon+`" onclick="SuaTaiKhoanClick(this)">Sữa</a></td>
                            <td><a href="#" MaDon="`+listRes.Listdondathang[index].MaDon+`" onclick="XoaTaiKhoanClick(this)">Xóa</a></td>
                        </tr>`;
                
            }
           
        }
    )
}
loadDataTable();
function SuaDonDH(){
    if(confirm("Bạn có chắc muốn sửa không")){
       
        $.post(
            "http://localhost:8080/PHP/API/dathang.php",
            {
                action: "suadondathang",
                MaDon:  document.getElementById("MaDon").value,
                TrangThai: document.getElementById("TrangThai").value
            },function (data){
                try {
                    var listRes = JSON.parse(data)
                    alert("Sửa thành Công")
                    location.reload()
                } catch (error) {
                    alert("Sửa Không thành Công")
                    
                }
                
               
            }
        )
    }
}
function SuaTaiKhoanClick(MaDon){
    $("#myModal").modal("show")
    document.getElementById("MaDon").value = MaDon.getAttribute("MaDon")
}
function XoaTaiKhoanClick(MaDon){
    if(confirm("Bạn có chắc muốn Xóa không")){
        $.post(
            "http://localhost:8080/PHP/API/dathang.php",
            {
                action: "XOACTDON",
                MaDon:  MaDon.getAttribute("MaDon")
            },function (data){
                try {
                    var listRes = JSON.parse(data)
                } catch (error) {
                    alert("Xóa Không thành Công Chi tiết đơn")
                    
                }
                
               
            }
        )
        $.post(
            "http://localhost:8080/PHP/API/dathang.php",
            {
                action: "XOA",
                MaDon:  MaDon.getAttribute("MaDon")
            },function (data){
                try {
                    var listRes = JSON.parse(data)
                    alert("Xóa thành Công")
                    location.reload()
                } catch (error) {
                    alert("Xóa Không thành Công")
                    
                }
                
               
            }
        )
    }
}