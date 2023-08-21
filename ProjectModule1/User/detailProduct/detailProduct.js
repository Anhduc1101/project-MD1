// Lấy dữ liệu sản phẩm từ Local Storage
const products = JSON.parse(localStorage.getItem("productTable"))

const indexProductDetail = JSON.parse(localStorage.getItem("index_product_detail"))

document.getElementById("image").src = `../../image/cigarCuba/${products[indexProductDetail].avatar}`
document.getElementById("name").innerHTML = products[indexProductDetail].name
document.getElementById("price").innerHTML = Number(products[indexProductDetail].unit_price).toLocaleString('vi-VN')
document.getElementById("role").innerHTML = products[indexProductDetail].role
document.getElementById("stock").innerHTML = Number(products[indexProductDetail].stock).toLocaleString('vi-VN')
document.getElementById("description").innerHTML = products[indexProductDetail].description

function addToCart() {
    // Kiểm tra xem giỏ hàng đã tồn tại trong localStorage chưa
    let userlogin = JSON.parse(localStorage.getItem("userlogin")) || [];
    if (!userlogin) {
        confirm("Bạn chưa đăng nhập tài khoản")
        location.href = "../../User/logIn/userLogin.html"; // Nếu chưa tồn tại, khởi tạo giỏ hàng là một mảng rỗng
    } else {
        const products = JSON.parse(localStorage.getItem("productTable"));
        const indexProductDetail = JSON.parse(localStorage.getItem("index_product_detail"));

        const quantityInput = document.getElementById("quantity");
        const quantity = parseInt(quantityInput.value); // Lấy giá trị số lượng từ ô input

        if (isNaN(quantity)) {
            alert("bạn chưa nhập số lượng");
        } else {
            const selectedProduct = products[indexProductDetail];
            const stockQuantity = selectedProduct.stock; // Số lượng còn lại trong kho
            if (quantity <= stockQuantity) {
                const cartItem = {
                    name: selectedProduct.name,
                    price: selectedProduct.unit_price,
                    quantity: quantity
                };
                userlogin.cart.push(cartItem);
                localStorage.setItem("userlogin", JSON.stringify(userlogin)); // Lưu giỏ hàng vào localStorage
                location.href = "../cart/cart.html";
            } else {
                alert("Số lượng còn lại trong kho không đủ");
            }
        }
    }
}
