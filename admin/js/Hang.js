loadDataTable()
function loadDataTable(){
    $.post(
        "http://localhost:8080/PHP/API/ThemHang.php",
        {
            action: "LayHang"
        },function (data){
            var listRes = JSON.parse(data)
            var table = document.getElementById("dataTable")
            for (let index = 0; index < listRes.ListHang.length; index++) {
                table.innerHTML +=`
                    <tr>
                            <td>`+listRes.ListHang[index].MaHang+`</td>
                            <td>`+listRes.ListHang[index].TenHang+`</td>
                            <td><a href="#" maHang="`+listRes.ListHang[index].MaHang+`" onclick="SuaTaiKhoanClick(this)">Sữa</a></td>
                            <td><a href="#" maHang="`+listRes.ListHang[index].MaHang+`" onclick="XoaTaiKhoanClick(this)">Xóa</a></td>
                            
                        </tr>`;
                
            }
           
        }
    )
}
document.querySelector(".them").addEventListener("click",()=>{
    var MaHang = $("#MaHang").val();
    var TenHang = $("#TenHang").val();
  
        $.post(
            "http://localhost:8080/PHP/API/ThemHang.php",
            {
                action: "ThemHang",
                MaHang: MaHang,
                TenHang:TenHang
            },function (data){
                try {
                    var dataRes = JSON.parse(data)
                    
                } catch (error) {
                    alert("Thêm Không thành công mã hãng đã tồn tại")
                }
                alert(dataRes.mess)
                location.reload()
            }
        )
    
})
function SuaHang(){
    if(confirm("Bạn có chắc muốn sửa")){
        $.post(
            "http://localhost:8080/PHP/API/ThemHang.php",
            {
                action: "SuaHang",
                MaHang:document.getElementById("MaHang1").value,
                TenHang:document.getElementById("TenHang1").value,
            },function (data){
                try {
                var listRes = JSON.parse(data)
                    alert(listRes.mess)
                    location.reload()
                } catch (error) {
                    alert("Sửa không thành công")
                }
                
               
            }
        )
    }
    
}
function XoaTaiKhoanClick(a){
    if(confirm("Bạn có chắc muốn xóa")){
        $.post(
            "http://localhost:8080/PHP/API/ThemHang.php",
            {
                action: "XoaHang",
                MaHang:a.getAttribute("maHang")
            },function (data){
                try {
                var listRes = JSON.parse(data)
                    alert(listRes.mess)
                    location.reload()
                } catch (error) {
                    alert("Xóa không thành công")
                }
                
               
            }
        )
    }
   
}
function SuaTaiKhoanClick(a){
    $("#myModalSua").modal("show")
    document.getElementById("MaHang1").value = a.getAttribute("maHang")
}
