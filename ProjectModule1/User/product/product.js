


function showProduct() {
    const products = JSON.parse(localStorage.getItem("productTable"));
    let stringHTML = ""
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        stringHTML += ` <div class="card">
        <img src="../../image/cigarCuba/${product.avatar}"
            style="width:150px; height: 150px;object-fit: cover;margin-top: 10px; border-radius:5px">
        <h3>${product.name}</h3>
        <p class="price">${Number(product.unit_price == "" ? "1000" : product.unit_price).toLocaleString('vi-VN') } đ/điếu</p>
        <p>
            <button onclick="saveInfoProduct(${i})">Chi tiết</button>
        </p>
        </div>`
    }
    document.getElementById("table_body").innerHTML = stringHTML;
}
showProduct();

function saveInfoProduct(index) {
    localStorage.setItem("index_product_detail", JSON.stringify(index))
    location.href = "../detailProduct/detailProduct.html"
}