function loadDataTable(){
    $.post(
        "http://localhost:8080/PHP/API/cauhinh.php",
        {
            action: "getListcauhinh"
        },function (data){
            var listRes = JSON.parse(data)
            var table = document.getElementById("dataTable")
            console.log(listRes)
            for (let index = 0; index < listRes.Listcauhinh.length; index++) {
                table.innerHTML +=`
                    <tr>
                            <td>`+listRes.Listcauhinh[index].MaCauHinh+`</td>
                            <td>`+listRes.Listcauhinh[index].MaSP+`</td>
                            <td>`+listRes.Listcauhinh[index].ManHinh+`</td>
                            <td>`+listRes.Listcauhinh[index].HeDieuHanh+`</td>
                            <td>`+listRes.Listcauhinh[index].CameraSau+`</td>
                            <td>`+listRes.Listcauhinh[index].CameraTruoc+`</td>
                            <td>`+listRes.Listcauhinh[index].Chip+`</td>
                            <td>`+listRes.Listcauhinh[index].DungLuong+`</td>
                            <td>`+listRes.Listcauhinh[index].Sim+`</td>
                            <td>`+listRes.Listcauhinh[index].Pin+`</td>
                            <td>`+listRes.Listcauhinh[index].Ram+`</td>
                            <td>Quá dài không thể hiển thị</td>
                            <td>Quá dài không thể hiển thị</td>
                            <td>`+listRes.Listcauhinh[index].MoTa+`</td>
                        </tr>`;
                
            }
           
        }
    )
}
function loadCombo(){
    var sanpham = document.getElementById("SanPhamCB")
    $.post(
        "http://localhost:8080/PHP/API/GetCSDL.php",
        {
            action: "getListSanPham"
        },function (data){
            var listRes = JSON.parse(data)
            for (let index = 0; index < listRes.ListSanPham.length; index++) {
                sanpham.innerHTML +=`
                <option value="`+listRes.ListSanPham[index].MaSP+`">`+listRes.ListSanPham[index].TenSp+`</option>
`                
            }
           
        }
    )
}
document.getElementById("ThemCauHinh").addEventListener("click",()=>{
    ThemCauHinh()
})

function ThemCauHinh(){
    var MaCauHinh = document.getElementById("MaCauHinh").value;
    var MaSP = document.getElementById("SanPhamCB").value;
    var ManHinh = document.getElementById("ManHinh").value;
    var HeDieuHanh = document.getElementById("HeDieuHanh").value;
    var CameraTruoc = document.getElementById("CameraTruoc").value;
    var CameraSau = document.getElementById("CameraSau").value;
    var Chip = document.getElementById("Chip").value;
    var DungLuong = document.getElementById("DungLuong").value;
    var Sim = document.getElementById("Sim").value;
    var Pin = document.getElementById("Pin").value;
    var Ram = document.getElementById("Ram").value;
    var ImageChiTiet = document.getElementById("ImageChiTiet").value;
    var ImageMoTa = document.getElementById("ImageMoTa").value;
    var MoTa = document.getElementById("MoTa").value;
    
    $.post(
        "http://localhost:8080/PHP/API/cauhinh.php",
        {
            action : "themcauhinh",
            MaCauHinh : MaCauHinh,
            MaSP : MaSP, 
            ManHinh : ManHinh, 
            HeDieuHanh : HeDieuHanh, 
            CameraTruoc : CameraTruoc, 
            CameraSau : CameraSau, 
            Chip : Chip, 
            DungLuong : DungLuong, 
            Sim : Sim, 
            Pin : Pin, 
            Ram : Ram, 
            ImageChiTiet : ImageChiTiet, 
            ImageMoTa : ImageMoTa, 
            MoTa : MoTa 
        },function (data){
            try {
            var listRes = JSON.parse(data)
                alert("Thêm thành công")
            } catch (error) {
                alert("Thêm không thành công")
                
            }
           
        }
    );
    
    

}
loadCombo()
loadDataTable();
