window.addEventListener("scroll", function() {
    const x = this.pageYOffset
    if (x > this.window.innerHeight) {
        document.querySelector(".img1").classList.remove("actionRight")
        document.querySelector(".img2").classList.remove("actionLeft")
        document.querySelector(".imgMain1").classList.remove("actionTop")
    } else {
        document.querySelector(".img1").classList.add("actionRight")
        document.querySelector(".img2").classList.add("actionLeft")
        document.querySelector(".imgMain1").classList.add("actionTop")
    }
    if (x < (this.window.innerHeight * 2) && x > (this.window.innerHeight / 4)) {
        document.querySelector(".img3").classList.add("actionRight")
        document.querySelector(".img4").classList.add("actionLeft")
        document.querySelector(".imgMain2").classList.add("actionTop")

    } else {
        document.querySelector(".img3").classList.remove("actionRight")
        document.querySelector(".img4").classList.remove("actionLeft")
        document.querySelector(".imgMain2").classList.remove("actionTop")
    }
})