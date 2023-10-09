var query = "select count(*) as SoLuong from dondathang"
$.post(
    "http://localhost:8080/PHP/API/GetCSDL.php",
    {
        action: "getListSanPhamCoDK",
        query: query
    },function (data){
        var listRes = JSON.parse(data)
       document.getElementById("SoLuongDonHang").innerHTML = listRes.ListSanPham[0].SoLuong
    }
)
var query = "select count(*) as SoLuong from user"
$.post(
    "http://localhost:8080/PHP/API/GetCSDL.php",
    {
        action: "getListSanPhamCoDK",
        query: query
    },function (data){
        var listRes = JSON.parse(data)
       document.getElementById("SoUser").innerHTML = listRes.ListSanPham[0].SoLuong
    }
)
var query = "select sum(tonggiatri) as SoLuong from dondathang"
$.post(
    "http://localhost:8080/PHP/API/GetCSDL.php",
    {
        action: "getListSanPhamCoDK",
        query: query
    },function (data){
        var listRes = JSON.parse(data)
       document.getElementById("DoanhThu").innerHTML = convertGia(listRes.ListSanPham[0].SoLuong) +"đ"
    }
)
function convertGia(Gia){
    const strPrice = Gia; // Chuyển giá trị nhập vào thành chuỗi
    let convertGia = ''; // Khởi tạo chuỗi định dạng giá tiền
  
    // Lặp qua từng ký tự trong chuỗi giá trị nhập vào, bắt đầu từ ký tự cuối cùng
    for (let i = strPrice.length - 1, j = 0; i >= 0; i--, j++) {
      // Nếu đã lặp qua 3 ký tự và chưa đến ký tự đầu tiên, thêm dấu chấm vào chuỗi định dạng giá tiền
      if (j > 0 && j % 3 === 0) {
        convertGia = '.' + convertGia;
      }
      // Thêm ký tự hiện tại vào chuỗi định dạng giá tiền
      convertGia = strPrice[i] + convertGia;
    }
  
    return convertGia;
  }
