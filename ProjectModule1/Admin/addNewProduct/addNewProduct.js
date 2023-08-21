let productTable = JSON.parse(localStorage.getItem('productTable')) || [];

let indexUpdate = null;
let currentPage = 1;
const pageSize = 5; // Số sản phẩm hiển thị trên mỗi trang
const totalPages = Math.ceil(productTable.length / pageSize);

function showTable(data = productTable) {
    // Tính chỉ số bắt đầu và chỉ số kết thúc của dữ liệu hiển thị trên trang hiện tại
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    let str = "";
    for (let i = startIndex; i < endIndex && i < data.length; i++) {
        let element = data[i];
        str += `<tr>
            <td>${i + 1}</td>
            <td>${element.name}</td>
            <td>${element.description}</td>
            <td>${Number(element.unit_price).toLocaleString('vi-VN')} đ</td>
            <td>${element.role}</td>
            <td>${Number(element.stock).toLocaleString(`vi-VN`)}</td>
            <td><img src="../../image/cigarCuba/${element.avatar}" style="width: 100px; height: 100px; "></td>
            <td><button onclick="updateProduct(${i})">update</button></td>
            <td><button onclick="deleteProduct(${i})">delete</button></td>
        </tr>`;
    }
    document.getElementById("tbody").innerHTML = str;
}
function goToPage(page) {
    if (page < 1 || page > totalPages) {
        return;
    }
    currentPage = page;
    showTable();
    updatePagination();
}

function updatePagination() {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';

    // Tạo nút trang trước
    if (currentPage > 1) {
        pagination.innerHTML += `
            <li class="page-item">
                <a class="page-link" href="#" onclick="goToPage(${currentPage - 1})">Trang trước</a>
            </li>`;
    }

    // Tạo các nút trang
    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="goToPage(${i})">${i}</a>
            </li>`;
    }

    // Tạo nút trang sau
    if (currentPage < totalPages) {
        pagination.innerHTML += `
            <li class="page-item">
                <a class="page-link" href="#" onclick="goToPage(${currentPage + 1})">Trang sau</a>
            </li>`;
    }
}

showTable();
updatePagination();

function addNewProduct() {
    // event.preventDefault();
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let unit_price = document.getElementById("unit_price").value;
    let role = document.getElementById("role").value;
    let stock = document.getElementById("stock").value;
    let avatar = document.getElementById("avatar").value;

    if (document.getElementById("avatar").files[0]) {
        avatar = document.getElementById("avatar").files[0].name;
    }
    console.log(avatar);
    console.log(indexUpdate);

    if (indexUpdate != null) {
        productTable[indexUpdate] = {
            name,
            description,
            unit_price,
            role,
            stock,
            avatar
        }
        showTable();
        indexUpdate = null;
        return;
    }
    let newProduct = {
        name,
        description,
        unit_price,
        role,
        stock,
        avatar
    }
    productTable.push(newProduct);
    localStorage.setItem("productTable", JSON.stringify(productTable));
    showTable(productTable);
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("unit_price").value = "";
    document.getElementById("stock").value = "";
}


function deleteProduct(index) {
    if (confirm("Bạn có chắc muốn xóa?")) {
        if (index !== -1) {
            productTable.splice(index, 1);
            showTable(productTable);
            localStorage.setItem("productTable", JSON.stringify(productTable));
        }
    }
}

function updateProduct(index) {
    let product = productTable[index];
    document.getElementById("name").value = product.name;
    document.getElementById("description").value = product.description;
    document.getElementById("unit_price").value = product.unit_price;
    document.getElementById("role").value = product.role;
    document.getElementById("stock").value = product.stock;
    // document.getElementById("avatar").value = product.avatar; ???????????
    indexUpdate = index;
    localStorage.setItem("productTable", JSON.stringify(productTable))
}

function sortProduct() {
    productTable.sort((a, b) => a.name.localeCompare(b.name));
    showTable();
}

function searchProduct() {
    let textSearch = document.getElementById("search").value;
    let findProduct = productTable.filter(product => product.name.toLowerCase().includes(textSearch.trim().toLowerCase()))
    showTable(findProduct);
}


