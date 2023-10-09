// var dstenhang = ["Cáp sạc 3 đầu Baseus Rapid Series 3-in-1 PD 20W",
//     "Dây đeo kim loại cho Apple Watch 44mm chính hãng Coteetci",
//     "Đồng hồ thời trang hãng oppo",
//     "Tai nghe Gaming cao cấp chính hãng HP DHL-8011U",
//     "Bọc tai nghe Airpods chất liệu silicon cao cấp đến từ nhật bản",
//     "Loa nghe nhạc Bluetooth Borofone BR4",
//     "Pin sạc dự phòng BASEUS Bipow Digital Display 20000mAh 20W",
//     "Thẻ nhớ SD SanDisk 128GB Class 10 chính hãng",
//     "Cáp sạc từ nam châm Micro-USB cho điện thoại, máy tính bảng chính hãng Baseus",
//     "Cáp sạc 2 in 1 Lightning và Micro USB chính hãng Baseus dài 23cm",
//     "Pin dự phòng chính hãng Arun Mini 3 10000mAh",
//     "Loa nghe nhạc Bluetooth T-2020A"

// ].push
// var dsdonGia = ["80.000", "120.000", "999.000", "380.000", "80.000", "300.000", "580.000", "950.000", "190.000", "80.000", "870.000", "800.000"]
// window.addEventListener("scroll", function() {
//         const x = this.pageYOffset
//         if (x > 1) {
//             document.querySelector(".navbar").classList.add("active")
//         } else {
//             document.querySelector(".navbar").classList.remove("active")
//         }
//     })
//     //trái tym đổi màu
// var tym = document.querySelectorAll("#tha-tym")
// for (let i = 0; i < tym.length; i++) {
//     tym[i].addEventListener("click", function(event) {
//         var btnTym = event.target
//         btnTym.classList.toggle("text-danger")
//     })
// }
// var dsItem = {
//     sp0: 0,
//     sp1: 0,
//     sp2: 0,
//     sp3: 0,
//     sp4: 0,
//     sp5: 0,
//     sp6: 0,
//     sp7: 0,
//     sp8: 0,
//     sp9: 0,
//     sp10: 0,
//     sp11: 0
// }
// try {
//     loadGioHang()
// } catch {

// }

// function loadGioHang() {
//     if (localStorage.getItem("dsItem") === null) {
//         localStorage.setItem("dsItem", JSON.stringify(dsItem))
//     }
//     var x = document.querySelector(".myShoppingCart")
//     if (localStorage.getItem("soLuongItem") === null) return
//     x.setAttribute("count", localStorage.getItem("soLuongItem"))
// }
// //xử lý ấn thêm giỏ hàng
// var btnAddToCart = document.querySelectorAll(".add-to-cart")
// for (let i = 0; i < btnAddToCart.length; i++) {
//     btnAddToCart[i].addEventListener("click", function(event) {
//         var btnCart = event.target
//         let soluonitem = localStorage.getItem("soLuongItem")
//         soluonitem = parseInt(soluonitem)
//         if (soluonitem) {
//             localStorage.setItem("soLuongItem", soluonitem + 1)
//         } else {
//             localStorage.setItem("soLuongItem", 1)
//         }
//         //sản phẩm
//         let temp = localStorage.getItem("dsItem")
//         temp = JSON.parse(temp)
//         temp["sp" + btnCart.getAttribute("index")] += 1
//         localStorage.setItem("dsItem", JSON.stringify(temp))
//         loadGioHang()
//     })
// }
// // them vao gio hang
// var dsThem = localStorage.getItem("dsItem")
// try {
//     loadItemGioHang()
// } catch {

// }

// function loadItemGioHang() {
//     dsThem = JSON.parse(dsThem)
//     for (let i = 0; i < 12; i++) {
//         if (dsThem["sp" + i.toString()] == 0) continue
//         document.querySelector(".table-cart").innerHTML +=
//             "<div class='row' index='" + i + "'><div class='col-sm-2 d-flex justify-content-center flex-column'><img src='/images/item Shop/item" + (i + 1).toString() + ".png' style='width: 100%;'></div>
{/* <div class='col-sm-2 d-flex justify-content-center flex-column ten-hang'>" + dstenhang[i] + "</div>
<div class='col-sm-2 d-flex justify-content-center flex-column text-center'>" + dsdonGia[i] + "đ</div>
<div class='col-sm-2 d-flex justify-content-center flex-column text-center'><div class='d-flex justify-content-center'><i class='fa-solid fa-minus pt-1 xoa-item' style='cursor: pointer;'></i> <div class='mx-2'>" + dsThem["sp" + i.toString()].toString() + "</div><i class='fa-solid fa-plus pt-1 them-item' style='cursor: pointer;'></i></div></div><div class='col-sm-2 d-flex justify-content-center flex-column text-center tong-tien-item'>" + dsThem["sp" + i.toString()] * parseInt(dsdonGia[i]) + ".000đ</div><div class='col-sm-2 d-flex justify-content-center flex-column text-center'><i class='fa-solid fa-trash-can thung-rac' style='cursor: pointer;'></i></div></div>" */}
//         document.querySelector(".table-cart").innerHTML += "<div class='d-flex justify-content-center'><hr style='width: 90%;'/></div>"

//     }
//     loadTongTien()
// }
// try {
//     loadTongTien()
// } catch {

// }

// function loadTongTien() {
//     var a = document.querySelectorAll(".tong-tien-item")
//     var gia = 0
//     for (let i = 0; i < a.length; i++) {
//         gia += parseInt(a[i].innerHTML)
//     }
//     document.getElementById("tong-tien").innerHTML = gia + ".000đ"
// }
// // xử lý thêm sửa xóa
// var btnThem = document.querySelectorAll(".them-item")
// var btnXoa = document.querySelectorAll(".xoa-item")
// var btnThungRat = document.querySelectorAll(".thung-rac")
// for (let i = 0; i < btnThem.length; i++) {
//     btnThungRat[i].addEventListener("click", function(e) {
//         let btnRac = e.target
//         let btnParanRac = btnRac.parentElement
//         btnParanRac = btnParanRac.parentElement
//         let temp = localStorage.getItem("dsItem")
//         temp = JSON.parse(temp)
//         temp["sp" + btnParanRac.getAttribute("index")] = 0
//         localStorage.setItem("dsItem", JSON.stringify(temp))
//         let soluonitem = localStorage.getItem("soLuongItem")
//         soluonitem = parseInt(soluonitem)
//         localStorage.setItem("soLuongItem", 0)
//         btnParanRac.remove()
//         loadTongTien()
//     })
//     btnThem[i].addEventListener("click", function(e) {
//         let btnThem = e.target
//         let btnThemParent = btnThem.parentElement
//         btnThemParent = btnThemParent.parentElement
//         btnThemParent = btnThemParent.parentElement
//         let temp = localStorage.getItem("dsItem")
//         temp = JSON.parse(temp)
//         temp["sp" + btnThemParent.getAttribute("index")] += 1
//         btnThemParent.children[4].innerHTML = temp["sp" + btnThemParent.getAttribute("index")] * parseInt(dsdonGia[parseInt(btnThemParent.getAttribute("index"))]) + ".000"
//         btnThemParent.children[3].children[0].children[1].innerHTML = temp["sp" + btnThemParent.getAttribute("index")]
//         localStorage.setItem("dsItem", JSON.stringify(temp))
//         let soluonitem = localStorage.getItem("soLuongItem")
//         soluonitem = parseInt(soluonitem)
//         localStorage.setItem("soLuongItem", soluonitem + 1)
//         loadTongTien()
//     })
//     btnXoa[i].addEventListener("click", function(e) {
//         let btnXoa = e.target
//         let btnXoaParent = btnXoa.parentElement
//         btnXoaParent = btnXoaParent.parentElement
//         btnXoaParent = btnXoaParent.parentElement
//         let temp = localStorage.getItem("dsItem")
//         temp = JSON.parse(temp)

//         temp["sp" + btnXoaParent.getAttribute("index")] -= 1
//         btnXoaParent.children[4].innerHTML = temp["sp" + btnXoaParent.getAttribute("index")] * parseInt(dsdonGia[parseInt(btnXoaParent.getAttribute("index"))]) + ".000"
//         btnXoaParent.children[3].children[0].children[1].innerHTML = temp["sp" + btnXoaParent.getAttribute("index")]
//         localStorage.setItem("dsItem", JSON.stringify(temp))
//         let soluonitem = localStorage.getItem("soLuongItem")
//         soluonitem = parseInt(soluonitem)
//         localStorage.setItem("soLuongItem", soluonitem - 1)
//         loadTongTien()
//         if (temp["sp" + btnXoaParent.getAttribute("index")] < 1) {
//             btnXoaParent.remove()
//         }
//     })
// }
// try {
//     document.querySelector(".dang-ky").addEventListener("click", function() {
//         document.querySelector(".from-dang-nhap").style.position = "absolute"
//         document.querySelector(".from-dang-ky").style.position = "relative"
//     })
//     document.querySelector(".dang-nhap").addEventListener("click", function() {
//         document.querySelector(".from-dang-ky").style.position = "absolute"
//         document.querySelector(".from-dang-nhap").style.position = "relative"
//     })
// } catch {

// }
// try {
//     var xemchitiet = document.querySelectorAll(".btn-xem-chi-tiet")
//     for (let i = 0; i < xemchitiet.length; i++) {
//         xemchitiet[i].addEventListener("click", function() {
//             window.location = "indexChiTietSanPham.html"
//         })
//     }

// } catch {

// }
// try {
//     // Get the button:
//     let mybutton = document.getElementById("myBtn");

//     // When the user scrolls down 20px from the top of the document, show the button
//     window.onscroll = function() { scrollFunction() };

//     function scrollFunction() {
//         if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//             mybutton.style.display = "block";
//         } else {
//             mybutton.style.display = "none";
//         }
//     }

//     // When the user clicks on the button, scroll to the top of the document
//     function topFunction() {
//         document.body.scrollTop = 0; // For Safari
//         document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
//     }
// } catch (error) {

// }