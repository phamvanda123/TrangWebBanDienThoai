var sanpham = document.querySelector("#ContentSanPham")
window.addEventListener("load",function(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  const dataSQL = urlParams.get('data');
  console.log(id)
  var queryStringSql=""
  if(id==null){
    queryStringSql="select *  from sanpham"
  }
  else if(id==="1"){
    queryStringSql="select *  from sanpham where MaHang = '"+dataSQL+"'"
  }
  else if(id==="2"){
    switch(dataSQL){
      case "1":
        queryStringSql="select *  from sanpham where GiaTien >= 2000000 and GiaTien <=4000000"
        break;
      case "2":
        queryStringSql="select *  from sanpham where GiaTien >= 4000000 and GiaTien <=6000000"
        break;
      case "3":
        queryStringSql="select *  from sanpham where GiaTien >= 6000000"
        break;
    }
  }
  else if(id==="3"){
    switch(dataSQL){
      case "1":
        queryStringSql="select *  from sanpham,cauhinh where sanPham.maSP = cauHinh.maSP and ram=2"
        break;
      case "2":
        queryStringSql="select *  from sanpham,cauhinh where sanPham.maSP = cauHinh.maSP and ram=3"
        break;
      case "3":
        queryStringSql="select *  from sanpham,cauhinh where sanPham.maSP = cauHinh.maSP and ram=4"
        break;
      case "4":
        queryStringSql="select *  from sanpham,cauhinh where sanPham.maSP = cauHinh.maSP and ram=6"
        break;
      case "5":
        queryStringSql="select *  from sanpham,cauhinh where sanPham.maSP = cauHinh.maSP and ram=8"
        break;
      case "6":
        queryStringSql="select *  from sanpham,cauhinh where sanPham.maSP = cauHinh.maSP and ram=12"
        break;
    }
  }
  else if(id==="4"){
    switch(dataSQL){
      case "1":
        queryStringSql="select *  from sanpham,cauhinh where sanPham.maSP = cauHinh.maSP and dungluong=32"
        break;
      case "2":
        queryStringSql="select *  from sanpham,cauhinh where sanPham.maSP = cauHinh.maSP and dungluong=64"
        break;
      case "3":
        queryStringSql="select *  from sanpham,cauhinh where sanPham.maSP = cauHinh.maSP and dungluong=128"
        break;
      case "4":
        queryStringSql="select *  from sanpham,cauhinh where sanPham.maSP = cauHinh.maSP and dungluong=256"
        break;
      case "5":
        queryStringSql="select *  from sanpham,cauhinh where sanPham.maSP = cauHinh.maSP and dungluong=512"
        break;
    }
  }
  else if(id==="5"){
    switch(dataSQL){
      case "1":
        queryStringSql="select *  from sanpham,cauhinh where sanPham.maSP = cauHinh.maSP and pin<=5000"
        break;
      case "2":
        queryStringSql="select *  from sanpham,cauhinh where sanPham.maSP = cauHinh.maSP and pin>5000"
        break;
    }
  }

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
    $.post(
      "http://localhost:8080/PHP/API/ThemHang.php",
      {
          action: "LayHang"
      },function (data){
          var listRes = JSON.parse(data)
          var Combo = document.getElementById("TenHang")
          for (let index = 0; index < listRes.ListHang.length; index++) {
              Combo.innerHTML +=`
              <li><a class="dropdown-item" href="?id=1&data=`+listRes.ListHang[index].MaHang+`">`+listRes.ListHang[index].TenHang+`</a></li>
              `;
              
          }
         
      }
  )
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
document.getElementById("reload").addEventListener("click",function(){
  window.location.href = "indexSanPham.html";
})