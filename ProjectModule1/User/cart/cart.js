
// let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
// let userlogin = JSON.parse(localStorage.getItem("userlogin")) || [];

function showTable() {
    let userlogin = JSON.parse(localStorage.getItem("userlogin")) || [];

    const products = JSON.parse(localStorage.getItem("productTable"))

    let str = "";
    let total = 0;
    for (let i = 0; i < userlogin.cart.length; i++) {

        let element = userlogin.cart[i];
        const totalPrice = element.price * element.quantity;
        total += totalPrice;

        const product = products.find(e => e.name == element.name)

        str += `<tr>
            <td>
                <div>
                    <img src="../../image/cigarCuba/${product.avatar}" alt="image">
                    <p>${element.name}</p>
                </div>
            </td>
            <td>${Number(element.price).toLocaleString('vi-VN')} đ/điếu</td>
            <td>
                <input id="quantity${i}" type="number" style="text-align: center; width: 30px;height: 20px;" value="${Number(element.quantity)}"> điếu
            </td>
            <td id="totalPrice${i}">${Number(totalPrice).toLocaleString('vi-VN')} đ</td>
            <td>
                <button onclick="editCart(${i})" class="edit">Edit</button>
                <button onclick="deleteCart(${i})" class="delete">Delete</button>
            </td>
        </tr>`;
    }
    document.getElementById("table_body").innerHTML = str;
    document.getElementById("totalPay").innerHTML = `${total.toLocaleString('vi-VN')} đ `;
}
showTable();

function editCart(index) {
    let userlogin = JSON.parse(localStorage.getItem("userlogin")) || [];
    const newQuantity = document.getElementById(`quantity${index}`).value;
    userlogin.cart[index].quantity = newQuantity;
    let total = userlogin.cart[index].price * userlogin.cart[index].quantity;
    let totalPay = 0;
    document.getElementById(`totalPrice${index}`).innerText = `${total.toLocaleString('vi-VN')} đ `;
    for (let i = 0; i < userlogin.cart.length; i++) {
        element = userlogin.cart[i];
        totalPay += element.price * element.quantity;
    }
    document.getElementById("totalPay").innerText = `${totalPay.toLocaleString('vi-VN')} đ `;
}


function deleteCart(index) {
    let userlogin = JSON.parse(localStorage.getItem("userlogin")) || [];
    userlogin.cart.splice(index, 1);
    localStorage.setItem("userlogin", JSON.stringify(userlogin))
    showTable();
}

function continueToBuy() {
    location.href = "../product/product.html";
}

function pay() {
    let userlogin = JSON.parse(localStorage.getItem("userlogin")) || [];
    const bills = JSON.parse(localStorage.getItem("bills")) || [];

    bills.push({
        id: Math.floor(100 + Math.random() * 899),
        userId: userlogin.user_id,
        cart: userlogin.cart,
        status: "Đang chờ xác thực...",
        createAt: new Date()
    })

    localStorage.setItem("bills", JSON.stringify(bills))

    alert("Đã đặt hàng thành công");
    location.href = "../../HomePage/homePage.html";
}


