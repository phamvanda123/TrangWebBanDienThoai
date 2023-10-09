loadSLGioHang()
function loadSLGioHang(){
    let soluong = localStorage.getItem("SoLuongSP")
    if(soluong!=null){
      document.querySelector(".myShoppingCart").setAttribute("count",soluong) 
    }
    else{
    localStorage.setItem("SoLuongSP",0)
      loadSLGioHang()
  
    }
  }
  // chuyển từ giá bth sang kiểu có dấu .
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
const button = document.querySelector('.ss-top'); // Chọn phần tử nút

window.addEventListener('scroll', () => { // Thêm lắng nghe sự kiện cuộn
  if (window.scrollY > 0) { // Kiểm tra vị trí cuộn của trang
    
    try {
      button.classList.add('mybackground1');
    } catch (error) {
      
    } // Thêm lớp active
  } else {
    try {
      
    } catch (error) {
      button.classList.remove('mybackground1');
    }
     // Xóa lớp active
  }
});