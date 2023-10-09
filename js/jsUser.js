var listUserString = localStorage.getItem("ThongTinKH")
var listTT = JSON.parse(listUserString)
document.getElementById("TenKH").innerHTML = listTT.Ten
try {
    document.getElementById("Ten").innerHTML = listTT.Ten
    document.getElementById("Email").innerHTML = listTT.Email
    document.getElementById("SDT").innerHTML = listTT.SDT
    document.getElementById("DiaChi").innerHTML = listTT.DiaChiGiaoHang
    document.getElementById("InPutHoTen").value = listTT.Ten
    document.getElementById("InputEmail").value = listTT.Email
    document.getElementById("InputSDT").value = listTT.SDT
    document.getElementById("InPutDiaChi").value = listTT.DiaChiGiaoHang
    $.post(
      "http://localhost:8080/PHP/API/Login.php",
      {
        action: "login",
        taiKhoan: listTT.TaiKhoan,
        matKhau: listTT.MatKhau,
      },
      function (data) {
          resData1 = JSON.parse(data);
          console.log(resData1.ListKH[0])
          localStorage.setItem("ThongTinKH",JSON.stringify(resData1.ListKH[0]))
      }
    );
    document.getElementById("chinhSuaTen").addEventListener("click",function(){
    $("#ModalSua").modal("show");
    })
    document.getElementById("OK").addEventListener("click",()=>{
      if (confirm('Bạn có chắc muốn sửa?')) {
        var TaiKhoan =  listTT.TaiKhoan
        var MatKhau = listTT.MatKhau
        var Ten = $("#InPutHoTen").val();
        var Email = $("#InputEmail").val();
        var SDT = $("#InputSDT").val();
        var DiaChiGiaoHang = $("#InPutDiaChi").val();
            $.post(
                "http://localhost:8080/PHP/API/user.php",
                {
                    action: "Suauser",
                    TaiKhoan: TaiKhoan,
                    MatKhau:MatKhau,
                    Ten:Ten,
                    Email:Email,
                    SDT:SDT,
                    DiaChiGiaoHang:DiaChiGiaoHang,

                },function (data){
                    try {
                    var dataRes = JSON.parse(data)
                    alert(dataRes.mess)
                    location.reload()
                    
                    } catch (error) {
                    }
                }
            )
            
           
      } else {
        // Nếu người dùng chọn No (không đồng ý)
        // thực hiện các hành động ở đây
      }
      
    })
} catch (error) {
    
}
    loadDonDatHang()
function loadDonDatHang(){
    var query = "select * from dondathang where taiKhoan = '"+listTT.TaiKhoan+"'"
    $.post("http://localhost:8080/PHP/API/GetCSDL.php",
    {
        action:"GetCSDL",
        query: query
        
    }
    ,function(data){
        try {

            var listRes = JSON.parse(data)
            var donhang = document.getElementById("DonHang")
            for (let index = 0; index < listRes.ListSanPham.length; index++) {
                donhang.innerHTML+=`
                <div class="card my-3" style="background-color: antiquewhite">
                  <div class="card-header" style="color: red"><b>Đơn hàng</b></div>
                  <div class="card-body" style="color: black">
            <table class="table table-striped" style="width: 100%">
                      <tr>
                        <td>Mã Đơn Hàng</td>
                        <td class="text-end">`+listRes.ListSanPham[index].MaDon+`</td>
                      </tr>
                      <tr>
                        <td>Ngày Đặt</td>
                        <td class="text-end">`+listRes.ListSanPham[index].NgayDat+`</td>
                      </tr>
                      <tr>
                        <td>Ngày Giao</td>
                        <td class="text-end">`+listRes.ListSanPham[index].NgayGiao+`</td>
                      </tr>
                      <tr>
                        <td>Sản Phẩm</td>
                        <td class="text-end">
                          <div class="row">
                            <div class="col-sm-3"></div>
                            <div class="col-sm-3 text-center">Tên SP</div>
                            <div class="col-sm-3 text-center">Số lượng</div>
                            <div class="col-sm-3 text-center">Tổng Giá</div>
                          </div>
                          <div class="row">
                            <div class="col-sm-3">
                              <img
                                src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/250257/iphone-13-midnight-1-600x600.jpg"
                                alt=""
                                style="max-width: 50px"
                              />
                            </div>
                            <div class="col-sm-3">SamSung GalaXy</div>
                            <div class="col-sm-3 text-center">2</div>
                            <div class="col-sm-3 text-center">200000đ</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Tổng Tiền</td>
                        <td class="text-end">`+convertGia(listRes.ListSanPham[index].TongGiaTri)+`đ</td>
                      </tr>
                      <tr>
                        <td>Trạng Thái</td>
                        <td class="text-end">`+listRes.ListSanPham[index].TrangThai+`</td>
                      </tr>
                      <tr>
                        <td>Trạng Thái</td>
                        <td class="text-end"><div class="btn btn-danger" MaDon="`+listRes.ListSanPham[index].MaDon+`" onclick="HuyDon(this)">Hủy đơn</div></td>
                      </tr>
                    </table>
                    </div>
                </div>
            `
            }
        } catch (error) {
            
        }
       
        
    })
}
function HuyDon(MaDon){
  if(confirm("Bạn có chắc muốn Hủy đơn hàng này không")){
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
                  alert("Hủy đơn thành Công")
                  location.reload()
              } catch (error) {
                  alert("Hủy thành Công")
                  
              }
              
             
          }
      )
  }
}
function getListSP(masp){
  var queryStringSql = "select * form sanpham where masp ='"+masp+"'"
  $.post("http://localhost:8080/PHP/API/GetCSDL.php",
    {
        action:"getListSanPhamCoDK",
        query:queryStringSql
    }
    ,
    function(res){
        data = JSON.parse(res)
        var kq= ""
           kq +=`      
            `
        });
}