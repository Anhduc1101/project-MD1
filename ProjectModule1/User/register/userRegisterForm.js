const userList = JSON.parse(localStorage.getItem("userList")) || [];
const handleLogin = () => {
    const userList = JSON.parse(localStorage.getItem("userList")) || [];
    let fullname = document.getElementById("fullname").value;
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let avatar = document.getElementById("avatar").value;
    // console.log(username, email, password, confirm_password);

    if (fullname.trim() === "") {
        document.getElementById("errorFullname").innerHTML = "Không được để trống !";
        return;
    } else {
        document.getElementById("errorFullname").innerHTML = ""
    }

    if (username.trim() === "") {
        document.getElementById("errorUsername").innerHTML = "Không được để trống !";
        return;
    } else if (userList.findIndex((value) => value.username == username) > -1) {
        document.getElementById("errorUsername").innerHTML = "Tài khoản đã tồn tại. Xin vui lòng nhập tài khoản khác!"
        return;
    } else {
        document.getElementById("errorUsername").innerHTML = ""
    }

    if (email.trim() === "") {
        document.getElementById("errorEmail").innerHTML = "Không được để trống !";
        return;
    } else if (!validateEmail(email)) {
        document.getElementById("errorEmail").innerHTML = "Không đúng định dạng email !"
        return;
    } else {
        document.getElementById("errorEmail").innerHTML = ""
    }

    if (password.trim() === "") {
        document.getElementById("errorPassword").innerHTML = "Không được để trống !";
        return;
    } else if (!validatePassword(password)) {
        document.getElementById("errorPassword").innerHTML = "Mật khẩu phải ít nhất 8 ký tự!"
        return;
    } else {
        document.getElementById("errorPassword").innerHTML = ""
    }

    if (password !== confirmPassword) {
        document.getElementById("errorConfirmPassword").innerHTML = "Mật khẩu nhập lại chưa đúng!";
        return;
    }
    avatar = avatar.split("\\");
    avatar = avatar[avatar.length - 1];
    let newUser = {
        user_id: getNewId(),
        fullname,
        username,
        email,
        password,
        role: "user",
        avatar,
        cart: []
    }
    // thêm newUser vào mảng
    userList.push(newUser);
    // lưu lên local
    localStorage.setItem("userList", JSON.stringify(userList));
    // chuyển trang tự động
    location.href = "../logIn/userLogin.html";
}
handleLogin();
// hàm validate email
const validateEmail = (email) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

// hàm validate pass 
const validatePassword = (pass) => {
    return true;
}
// hàm tự tăng id
const getNewId = () => {
    let idMax = 0;
    for (let i = 0; i < userList.length; i++) {
        const u = userList[i];
        if (u.user_id > idMax) {
            idMax = u.user_id;
        }
    }
    return idMax + 1;
}
