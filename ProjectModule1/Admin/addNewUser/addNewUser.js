const userList = JSON.parse(localStorage.getItem("userList")) || [];
// let userList = [];
let indexUpdate = null;
let currentPage = 1;
const pageSize = 5; // Số sản phẩm hiển thị trên mỗi trang
const totalPages = Math.ceil(userList.length / pageSize);
function showTable(data = userList) {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    let str = "";
    for (let i = startIndex; i < endIndex && i < data.length; i++) {
        let element = data[i];
        if (element.role == "admin") {
            continue;
        }
        str += ` <tr>
                <td>${i + 1}</td>
                <td>${element.fullname}</td>
                <td>${element.email}</td>
                <td>${element.username}</td>
                <td>${element.password}</td>
                <td>${element.role}</td>
                <td><img src="../../image/cigarCuba/${element.avatar}" style="width: 100px; height: 100px; "></td>
                <td><button onclick="updateUser(${i})">update</button></td>
                <td><button onclick="deleteUser(${element.id})">delete</button></td>
                
            </tr>`
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

let imgGlobal = null

document.getElementById("avatar").addEventListener("change", function (e) {
    imgGlobal = e.target.files[0].name;
})

function addNewUser() {
    // event.preventDefault();
    let fullname = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let role = document.getElementById("role").value;
    let avatar;

    if (document.getElementById("avatar").files[0]) {
        avatar = document.getElementById("avatar").files[0].name;
    }
    console.log(avatar);
    console.log(indexUpdate);

    if (indexUpdate != null) {
        userList[indexUpdate] = {
            fullname,
            email,
            username,
            password,
            role,
            avatar: imgGlobal
        }
        showTable();
        indexUpdate = null;
        imgGlobal = null
        return;
    }
    // let newUser = {
    //     fullname,
    //     email,
    //     username,
    //     password,
    //     role,
    //     avatar
    // }
    // userList.push(newUser);
    // showTable();
    // document.getElementById("fullname").value = "";
    // document.getElementById("email").value = "";
    // document.getElementById("username").value = "";
    // document.getElementById("password").value = "";
}

function deleteUser(index) {
    if (confirm("Bạn có chắc muốn xóa?")) {
        if (index !== -1) {
            userList.splice(index, 1);
            showTable();

        }
    }
}

function updateUser(index) {
    let user = userList[index];
    document.getElementById("fullname").value = user.fullname;
    document.getElementById("email").value = user.email;
    document.getElementById("username").value = user.username;
    document.getElementById("password").value = user.password;
    document.getElementById("role").value = user.role;
    // document.getElementById("avatar").value = user.avatar; ???????????
    indexUpdate = index;
    imgGlobal = user.avatar
}

function sortUser() {
    userList.sort((a, b) => a.fullname.localeCompare(b.fullname));
    showTable();
}

function searchUser() {
    let textSearch = document.getElementById("search").value;
    let findUser = userList.filter(user => user.fullname.toLowerCase().includes(textSearch.trim().toLowerCase()))
    showTable(findUser);
}
