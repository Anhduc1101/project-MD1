// let userList = JSON.parse(localStorage.getItem('userList')) || [];


const handleLogin = () => {
    //lấy ra dữ liệu 
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // xác thực dữ liệu 
    if (username.trim() === "" || password.trim() === "") {
        document.getElementById("error").innerText = "Tên đăng nhập hoặc mật khẩu không đc để trống";
        return;
    }

    // kiểm tra tồn tại 
    let userLogin = checkLogin(username, password)
    if (userLogin == null) {
        document.getElementById("error").innerText = "Tên đăng nhập hoặc mật khẩu không chính xác , vui lòng thử lại";
        return;
    }

    // đăng nhập thành công
    localStorage.setItem("userlogin", JSON.stringify(userLogin))

    // kiểm tra quyền
    if (userLogin.role == "admin") {
        // đièu hướng về admin/index
        location.href = "../../Admin/addNewUser/addNewUser.html"
    } else {
        // điều hướng trang về home 
        location.href = "../../HomePage/homePage.html"
    }

}

const checkLogin = (username, password) => {
    const userList = JSON.parse(localStorage.getItem('userList')) || [];
    for (let i = 0; i < userList.length; i++) {
        const user = userList[i];
        if (user.username == username && user.password == password) {
            return user;
        }
    }
    // không ìm thấy
    return null;
}


