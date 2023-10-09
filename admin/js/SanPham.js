function loadDataTable(){
    $.post(
        "http://localhost:8080/PHP/API/GetCSDL.php",
        {
            action: "getListSanPham"
        },function (data){
            var listRes = JSON.parse(data)
            var table = document.getElementById("dataTable")
            table.innerHTML=""
            for (let index = 0; index < listRes.ListSanPham.length; index++) {
                table.innerHTML +=`
                    <tr>
                            <td>`+listRes.ListSanPham[index].MaSP+`</td>
                            <td>`+listRes.ListSanPham[index].TenSp+`</td>
                            <td><img style="max-width: 50px;" src="`+((listRes.ListSanPham[index].Image.length>30)?(listRes.ListSanPham[index].Image):("../images/ImagesUpLoad/"+listRes.ListSanPham[index].Image))+`" alt=""></td>
                            <td>`+listRes.ListSanPham[index].DanhGia+`</td>
                            <td>`+listRes.ListSanPham[index].GiaTien+`</td>
                            <td>`+listRes.ListSanPham[index].KhuyenMai+`%</td>
                            <td><a href="#" MaSP="`+listRes.ListSanPham[index].MaSP+`" onclick="SuaSP(this)">Sữa</a></td>
                            <td><a href="#" MaSP="`+listRes.ListSanPham[index].MaSP+`" onclick="XoaSP(this)">Xóa</a></td>
                        </tr>`;
                
            }
           
        }
    )
    $.post(
        "http://localhost:8080/PHP/API/ThemHang.php",
        {
            action: "LayHang"
        },function (data){
            var listRes = JSON.parse(data)
            var Combo = document.getElementById("ThemMaHang")
            for (let index = 0; index < listRes.ListHang.length; index++) {
                Combo.innerHTML +=`
                <option value="`+listRes.ListHang[index].MaHang+`">`+listRes.ListHang[index].TenHang+`</option>
                `;
                
            }
           
        }
    )
}
function LoadDataTimKiem(tenSP){
    var query = "select * from sanpham where tenSP like '%"+tenSP+"%'"
    $.post(
        "http://localhost:8080/PHP/API/GetCSDL.php",
        {
            action: "getListSanPhamCoDK",
            query: query
        },function (data){
            var listRes = JSON.parse(data)
            var table = document.getElementById("dataTable")
            table.innerHTML=""
            for (let index = 0; index < listRes.ListSanPham.length; index++) {
                table.innerHTML +=`
                    <tr>
                            <td>`+listRes.ListSanPham[index].MaSP+`</td>
                            <td>`+listRes.ListSanPham[index].TenSp+`</td>
                            <td><img style="max-width: 50px;" src="`+((listRes.ListSanPham[index].Image.length>30)?(listRes.ListSanPham[index].Image):("../images/ImagesUpLoad/"+listRes.ListSanPham[index].Image))+`" alt=""></td>
                            <td>`+listRes.ListSanPham[index].DanhGia+`</td>
                            <td>`+listRes.ListSanPham[index].GiaTien+`</td>
                            <td>`+listRes.ListSanPham[index].KhuyenMai+`%</td>
                            <td><a href="#" MaSP="`+listRes.ListSanPham[index].MaSP+`" onclick="SuaSP(this)">Sữa</a></td>
                            <td><a href="#" MaSP="`+listRes.ListSanPham[index].MaSP+`" onclick="XoaSP(this)">Xóa</a></td>
                        </tr>`;
                
            }
           
        }
    )
}
loadDataTable()
document.getElementById("btntimkiem").addEventListener("click",()=>{
    console.log()
    if (document.getElementById("timkiem").value==""){
        loadDataTable()
    }else{
        LoadDataTimKiem(document.getElementById("timkiem").value)    

    }
})

document.querySelector(".them").addEventListener("click",()=>{
    var MaSP = $("#MaSP1").val();
    var TenSP = $("#TenSP1").val();
    var Image = $("#Image1").val().split("\\").pop();
    var DanhGia = $("#DanhGia1").val();
    var GiaTien = $("#GiaTien1").val();
    var KhuyenMai = $("#KhuyenMai1").val();
    var MaHang = $("#ThemMaHang").val()
    // Lấy file từ input
    var file_data = $('#Image1').prop('files')[0]; 

    // Tạo đối tượng form data
    var form_data = new FormData(); 

    // Thêm file vào form data
    form_data.append('file', file_data);
    // Gửi request ajax
    $.ajax({
        url: 'http://localhost:8080/PHP/API/UploadFile.php',
        type: 'post',
        data: form_data,
        contentType: false,
        processData: false,
        success: function(response){
            console.log("UpThanhcon")
        },
        error: function(xhr, status, error){
            console.log("Up thất bại")
        }
    });
        $.post(
            "http://localhost:8080/PHP/API/ThemSuaXoa.php",
            {
                action: "Them",
                MaSP: MaSP,
                TenSP:TenSP,
                Image:Image,
                DanhGia:DanhGia,
                GiaTien:GiaTien,
                KhuyenMai:KhuyenMai,
                MaHang:MaHang
            },function (data){
                try {
                var dataRes = JSON.parse(data)
                } catch (error) {
                    alert("Thêm Không thành công mã Sản phẩm đã tồn tại")
                }
                alert(dataRes.mess)
            }
        )
    
})

$.post(
    "http://localhost:8080/PHP/API/ThemHang.php",
    {
        action: "LayHang"
    },function (data){
        var listRes = JSON.parse(data)
        var kq =""
        var Combo = document.getElementById("myComboBox")
        for (let index = 0; index < listRes.ListHang.length; index++) {
            kq +=`
            <option value="`+listRes.ListHang[index].MaHang+`">`+listRes.ListHang[index].TenHang+`</option>
            `;
            
        }
        Combo.innerHTML=kq
        document.getElementById("myComboBoxSua").innerHTML = kq
       
    }
)
const myComboBox = document.getElementById('myComboBox');

myComboBox.addEventListener('change', (event) => {
    loadTheoComBo(myComboBox.value)
});
function loadTheoComBo(maHang){
    var query = "select * from sanpham where MaHang='"+maHang+"'";
    $.post(
        "http://localhost:8080/PHP/API/GetCSDL.php",
        {
            action: "getListSanPhamCoDK",
            query: query
        },function (data){
            var listRes = JSON.parse(data)
            var table = document.getElementById("dataTable")
            table.innerHTML=""
            for (let index = 0; index < listRes.ListSanPham.length; index++) {
                table.innerHTML +=`
                    <tr>
                            <td>`+listRes.ListSanPham[index].MaSP+`</td>
                            <td>`+listRes.ListSanPham[index].TenSp+`</td>
                            <td><img style="max-width: 50px;" src="`+((listRes.ListSanPham[index].Image.length>30)?(listRes.ListSanPham[index].Image):("../images/ImagesUpLoad/"+listRes.ListSanPham[index].Image))+`" alt=""></td>
                            <td>`+listRes.ListSanPham[index].DanhGia+`</td>
                            <td>`+listRes.ListSanPham[index].GiaTien+`</td>
                            <td>`+listRes.ListSanPham[index].KhuyenMai+`%</td>
                            <td><a href="#" MaSP="`+listRes.ListSanPham[index].MaSP+`" onclick="SuaSP(this)">Sữa</a></td>
                            <td><a href="#" MaSP="`+listRes.ListSanPham[index].MaSP+`" onclick="XoaSP(this)">Xóa</a></td>
                        </tr>`;
                
            }
           
        }
    )
}
function LayRowSanPham(MaSP){
    var query = "select * from sanpham where MaSP='"+MaSP+"'";
    $.post(
        "http://localhost:8080/PHP/API/GetCSDL.php",
        {
            action: "getListSanPhamCoDK",
            query: query
        },function (data){
            var listRes = JSON.parse(data)
            document.getElementById("MaSP2").value = listRes.ListSanPham[0].MaSP
            document.getElementById("TenSP2").value = listRes.ListSanPham[0].TenSp
            document.getElementById("DanhGia2").value = listRes.ListSanPham[0].DanhGia
            document.getElementById("GiaTien2").value = listRes.ListSanPham[0].GiaTien
            document.getElementById("KhuyenMai2").value = listRes.ListSanPham[0].KhuyenMai
           
        }
    )
}
function SuaSP(maSP){
    $("#myModalSua").modal("show")
    LayRowSanPham(maSP.getAttribute("MaSP"))
}
function XoaSP(maSP){
    if (confirm('Bạn có chắc muốn xóa sản phẩm?')) {
        $.post(
            "http://localhost:8080/PHP/API/cauhinh.php",
            {
                action: "Xoa",
                MaSP:maSP.getAttribute("MaSP")
            },function (data){
               try {
                res = JSON.parse(data)
                $.post(
                    "http://localhost:8080/PHP/API/ThemSuaXoa.php",
                    {
                        action: "Xoa",
                        MaSP:maSP.getAttribute("MaSP")
                    },function (data){
                       try {
                        res = JSON.parse(data)
                        alert(res.mess)
                        location.reload()
                       } catch (error) {
                        alert("Sản phẩm đang có đơn đặt hàng không thể xóa")
                       }
                       
                    }
                )
               } catch (error) {
               }
               
            }
        )
       
        
      } else {
        // Nếu người dùng chọn No (không đồng ý)
        // thực hiện các hành động ở đây
      }
      
}
document.getElementById("btnSua").addEventListener("click",function (){
    var MaSP = document.getElementById("MaSP2").value
    var TenSp = document.getElementById("TenSP2").value
    var DanhGia = document.getElementById("DanhGia2").value
    var GiaTien = document.getElementById("GiaTien2").value
    var KhuyenMai = document.getElementById("KhuyenMai2").value
    var Image = $("#Image2").val().split("\\").pop()
    var MaHang = document.getElementById("myComboBoxSua").value 

    if(confirm("Bạn có chắc muốn sửa")){
        $.post(
            "http://localhost:8080/PHP/API/ThemSuaXoa.php",
            {
                action: "Sua",
                MaSP:MaSP,
                TenSp:TenSp,
                DanhGia:DanhGia,
                GiaTien:GiaTien,
                KhuyenMai:KhuyenMai,
                Image:Image,
                MaHang:MaHang
            },function (data){
               try {
                res = JSON.parse(data)
                alert(res.mess)
                location.reload()
               } catch (error) {
                alert("Sửa không thành công vui lòng xem lại")
               }
               
            }
        )
    }else{

    }
    
})