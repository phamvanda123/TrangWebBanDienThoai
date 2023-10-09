var queryStringSql = "select * from sanpham where khuyenmai>0"
var sanpham = document.querySelector("#ContentSanPham")

$.post("http://localhost:8080/PHP/API/GetCSDL.php",
    {
        action:"getListSanPhamCoDK",
        query:queryStringSql
    }
    ,
    function(res){
        data = JSON.parse(res)
        var kq= ""
        kq += `<div class="row d-flex justify-content-center">`
        let temp = 0;
        data.ListSanPham.forEach(element => {
          if(temp === 3){
            kq+=`
            </div>
            <div class="row d-flex justify-content-center">
            `
            temp=0;
          }
          let maSP = element.MaSP
            let tenSP = element.TenSp
            let Image = element.Image
            let DanhGia = element.DanhGia
            let GiaTien = element.GiaTien
            let KhuyenMai = element.KhuyenMai
            let DanhGiaString ="";
            for (let index = 1; index < 6; index++) {
              if(index<=parseInt(DanhGia)){
                DanhGiaString+=`<i class="fa-solid fa-star"></i>`;
              }
              else{
                DanhGiaString+=`<i class="fa-regular fa-star"></i>`;
              }
            }
           kq +=`      
            <div class="col-sm-3 my-2">
              <div class="card card-item" khuyenmai="Giảm -`+((KhuyenMai!=null)?KhuyenMai:"0")+`%">
                <div class="card-body">
                  <div class="image-item mb-5">
                    <img src="`+((Image.length>30)?(Image):("../images/ImagesUpLoad/"+Image))+`" alt="" />
                  </div>
                  <div
                    index="0"
                    data-bs-toggle="modal"
                    data-maSP=`+maSP+`
                    data-bs-target="#myModalThemVaoGioHang"
                    class="add-to-cart btn-my-basic mt-3 btn"
                  >
                    Thêm vào giỏ hàng
                  </div>
                  <div data-maSP=`+maSP+` class="btn btn-my-basic btn-xem-chi-tiet mt-2">
                    Xem chi tiết
                  </div>
                  <div class="my-3" style="opacity: 0">.</div>
                  <div class="name-item mt-1">
                    `+tenSP+`
                  </div>
                  <div class="danh-gia mt-1 mycolorMain">
                  `+
                  DanhGiaString
                  +`
                    
                  
                  </div>
                  <div class="don-gia-item mt-2">
                    <span id="donGia">`+((KhuyenMai!=null)?convertGia((parseInt(GiaTien)-(parseInt(GiaTien)*(parseInt(KhuyenMai)/100))).toString()):(convertGia(GiaTien)))+`</span>đ
                    <span class="text-danger text-gach"> `+((KhuyenMai!=null)?(convertGia(GiaTien)+"đ"):"")+`</span>
                  </div>
                </div>
              </div>
            </div>
            `
            temp++;
        });
        kq+= `</div>`;
        sanpham.innerHTML+=kq;
    })
    document.querySelector("#ContentSanPham").addEventListener("click", function(event) {
        if(event.target.classList.contains("add-to-cart")) {
            loadSPLocal(event.target.getAttribute("data-masp"))
        }
        if(event.target.classList.contains("btn-xem-chi-tiet")){
          console.log(event.target)
          window.location.href = "indexChiTietSanPham.html?idSP="+event.target.getAttribute("data-masp");
        }
      });
      
      function loadSPLocal(maSP){
          if(localStorage.getItem("listSP")===null){
            localStorage.setItem("listSP",JSON.stringify([]))
          }
          let listitemString = localStorage.getItem("listSP")
          let listitem = JSON.parse(listitemString)
          let isExist= false;
          for (let index = 0; index < listitem.length; index++) {
            if(listitem[index].MaSP===maSP){
              isExist=true;
              listitem[index].soLuong +=1
            } 
          }
          if(!isExist){
            listitem.push({MaSP:maSP,soLuong:1})
          }
          localStorage.setItem("listSP",JSON.stringify(listitem))
          let soluong = localStorage.getItem("SoLuongSP")
          localStorage.setItem("SoLuongSP",parseInt(soluong)+1)
          loadSLGioHang()
      }