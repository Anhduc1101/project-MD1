

function drawBills() {
  const idUserLogin = JSON.parse(localStorage.getItem("userlogin"));
  const bills = JSON.parse(localStorage.getItem("bills"));
  const allUserBills = bills.map(bill => {
    const nameProduct = [];
    const productPrice = [];
    const productQuantity = [];
    let totalPrice = 0;

    bill.cart.forEach(e => {
      nameProduct.push(`<p>${e.name}</p>`);
      productPrice.push(`<p>${Number(e.price).toLocaleString('vi-VN')} đ</p>`);
      productQuantity.push(`<p>${Number(e.quantity).toLocaleString('vi-VN')}</p>`);
      totalPrice += e.price * e.quantity;
    });

    return {
      ...bill,
      nameProduct: nameProduct.join(""),
      productPrice: productPrice.join(""),
      productQuantity: productQuantity.join(""),
      totalPrice: totalPrice
    };
  });

  let stringBill = "";
  for (let i = 0; i < allUserBills.length; i++) {
    const element = allUserBills[i];
    stringBill +=
      `
      <tr>
          <td>${element.id}</td>
          <td>${element.userId}</td>
          <td>${element.createAt}</td>
          <td>${element.nameProduct}</td>
          <td>${element.productPrice}</td>
          <td>${element.productQuantity}</td>
          <td>${Number(element.totalPrice).toLocaleString('vi-VN')} đ</td>
          <td>${element.status}</td>
          <td>
              <button  onclick="receiveBill(${element.id})" class="action-btn">Receive</button>
              <button  onclick="denyBill(${element.id})" class="action-btn">Deny</button>
          </td>
      </tr>
    `;
  }
  document.getElementById("table_body").innerHTML = stringBill;
}

drawBills();

function receiveBill(id) {
  const order = JSON.parse(localStorage.getItem("bills"));
  const index = order.findIndex(e => e.id == id);
  if (index !== -1) {
    order[index].status = "Đơn đã được nhận";
    localStorage.setItem("bills", JSON.stringify(order));
    drawBills();
  }
}

function denyBill(id) {
  const order = JSON.parse(localStorage.getItem("bills"));
  const index = order.findIndex(e => e.id == id);
  if (index !== -1) {
    order[index].status = "Đã hủy đơn";
    localStorage.setItem("bills", JSON.stringify(order));
    drawBills();
  }
}


