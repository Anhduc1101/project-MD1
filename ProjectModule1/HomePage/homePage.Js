const userLogin = JSON.parse(localStorage.getItem("userlogin"))

if (userLogin) {
    document.getElementById("btn_login").style.display = "none"
    document.getElementById("btn_register").style.display = "none"
    const userImg = document.getElementById("userImg");
    const username = document.getElementById("username");
    userImg.src = `../image/cigarCuba/${userLogin.avatar}`;
    username.textContent = userLogin.username;
}
const products = JSON.parse(localStorage.getItem("productTable")) || [];
function showProduct() {
    let str = "";
    for (let i = 0; i < products.length; i++){
        let element = products[i];
        str +=`<div class="sliderProductBox">
                <a href="../User/product/product.html">
                    <div class="product-image">
                        <img  src="../image/cigarCuba/${element.avatar}">
                    </div>
                </a>
                <div class="product-details">
                    <h4 class="product-name">${element.name}</h4>
                    <p class="product-price">${Number(element.unit_price).toLocaleString('vi-VN')} đ/điếu</p>
                </div>
            </div>`
    }
    document.querySelector(".sliderProduct").innerHTML = str;
}
showProduct();

function changeToDetailPage() {
    location.href = "../User/detailProduct/detailProduct.html"
}


//******************************************** */
let swiper = new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 20,
});
function showOtherProduct() {
    const otherProduct = JSON.parse(localStorage.getItem("productTable"));
    let str = "";
    for (let i = 0; i < otherProduct.length; i++) {
        let element = otherProduct[i];
        str +=` <div class="swiper-slide">
        <a href="#">
                    <img src="../image/cigarCuba/${element.avatar}">
                    <h6>${element.name}</h6>
                </a>
                </div>`
    }
    document.querySelector(".swiper-wrapper").innerHTML = str;
}
showOtherProduct();


//******************************************** */
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
//************************************************** */
