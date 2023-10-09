loadGioHang()
function loadGioHang(){
    var listitemString = localStorage.getItem("listSP");
    var listitem = JSON.parse(listitemString)
    console.log(listitem.length)
    var query = "select maSp,Image,tenSP,GiaTien,KhuyenMai from sanpham where maSP in (";
    for (let index = 0; index < listitem.length; index++) {

        if(index==(listitem.length-1)){
            query+= "'"+listitem[index].MaSP+"')"
        }
        else{
            query+= "'"+listitem[index].MaSP+"',"
        }

    }
    $.post("http://localhost:8080/PHP/API/GetCSDL.php",
    {
        action:"getListSanPhamCoDK",
        query: query
    }
    ,function(data){
        var listRes = JSON.parse(data)
        var kq = "";
        var table = document.querySelector(".temp1")
        var listitemString = localStorage.getItem("listSP");
        var listitem = JSON.parse(listitemString)
        console.log(listitem[0].soLuong)

        for (let index = 0; index < listRes.ListSanPham.length; index++) {
            kq+=`
            <div class="row my-2" >
            <div class="col-sm-2 d-flex justify-content-center flex-column"><img src="`+((listRes.ListSanPham[index].Image.length>30)?(listRes.ListSanPham[index].Image):("../images/ImagesUpLoad/"+listRes.ListSanPham[index].Image))+`" style="width: 100%;"></div>
            <div class="col-sm-2 d-flex justify-content-center flex-column ten-hang">`+listRes.ListSanPham[index].tenSP+`</div>
            <div class="col-sm-2 d-flex justify-content-center flex-column text-center">`+((listRes.ListSanPham[index].KhuyenMai!=null)?convertGia((parseInt(listRes.ListSanPham[index].GiaTien)-(parseInt(listRes.ListSanPham[index].GiaTien)*(parseInt(listRes.ListSanPham[index].KhuyenMai)/100))).toString()):(convertGia(listRes.ListSanPham[index].GiaTien)))+`đ</div>
            <div class="col-sm-2 d-flex justify-content-center flex-column text-center"><div class='d-flex justify-content-center'><i class='fa-solid fa-plus pt-1 them-item' data-maSP="`+listRes.ListSanPham[index].maSp+`" style='cursor: pointer;'></i><div class="mx-2">`+getSoLuong(listRes.ListSanPham[index].maSp)+`</div><i class='fa-solid fa-minus pt-1 xoa-item' data-maSP="`+listRes.ListSanPham[index].maSp+`" style='cursor: pointer;'></i></div></div>
            <div class="col-sm-2 d-flex justify-content-center flex-column text-center">`+((listRes.ListSanPham[index].KhuyenMai!=null)?convertGia(((parseInt(listRes.ListSanPham[index].GiaTien)-(parseInt(listRes.ListSanPham[index].GiaTien)*(parseInt(listRes.ListSanPham[index].KhuyenMai)/100)))*getSoLuong(listRes.ListSanPham[index].maSp)).toString()):(convertGia((parseInt(listRes.ListSanPham[index].GiaTien)*getSoLuong(listRes.ListSanPham[index].maSp)).toString())))+`</div>
            <div class="col-sm-2 d-flex justify-content-center flex-column text-center"><i class='fa-solid fa-trash-can thung-rac' data-maSP="`+listRes.ListSanPham[index].maSp+`" style='cursor: pointer;'></i></div>
            </div>

            `
        }
        table.innerHTML = kq;
    })
    
}
document.querySelector(".table-cart").addEventListener("click", function(event) {
    if(event.target.classList.contains("them-item")) {
        themXoaSP(event.target.getAttribute("data-masp"),"Tang")
        
    }
    if(event.target.classList.contains("xoa-item")){
        themXoaSP(event.target.getAttribute("data-masp"),"Giam")

    }
    if(event.target.classList.contains("thung-rac")){

        themXoaSP(event.target.getAttribute("data-masp"),"Xoa")
    }
  });
function themXoaSP(maSP,HanhDong){
    listitemString = localStorage.getItem("listSP")
    listitem = JSON.parse(listitemString)
    soluongSPString = localStorage.getItem("SoLuongSP")
    soLuongSP = parseInt(soluongSPString)
    for (let index = 0; index < listitem.length; index++) {
        if(listitem[index].MaSP===maSP){
            switch(HanhDong){
                case "Tang" :
                    listitem[index].soLuong +=1;
                    soLuongSP +=1;
                    break;
                case "Giam" :
                    listitem[index].soLuong -=1;
                    soLuongSP -=1;
                    if(listitem[index].soLuong==0){
                        listitem.splice(index,1)
                    }
                    break;
                case "Xoa" :
                    soLuongSP -= listitem[index].soLuong;
                    listitem.splice(index,1)
                    break;
            }
            
            break
        } 
      }
    localStorage.setItem("listSP",JSON.stringify(listitem))
    localStorage.setItem("SoLuongSP",JSON.stringify(soLuongSP))
    loadGioHang()
}
function getSoLuong(maSP){
    listitemString = localStorage.getItem("listSP")
    listitem = JSON.parse(listitemString)
    for (let index = 0; index < listitem.length; index++) {
        if(listitem[index].MaSP===maSP){
           return listitem[index].soLuong
           break;
        }
      }
    
}