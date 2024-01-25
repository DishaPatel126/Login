const form = document.querySelector("form");
const pass_icon = document.getElementById('icon');
const taskInput = document.querySelectorAll("input");
const messages = [];
const errorFields = document.querySelectorAll("small");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let password1 = document.getElementById("password1");
let password2 = document.getElementById("password2");
let gender = document.getElementsByName("gender")
let email = document.getElementById("email");
let contact = document.getElementById("contact");
let course = document.getElementById("course");
let dob = document.getElementById("dob");
let address = document.getElementById("address");

function genderValue() {
    for (var i = 0; i < gender.length; i++) {
        if (gender[i].checked) {
            return gender[i].value;
        }
    }
}

// console.log(document.getElementsByClassName('field').firstName);
//password icon toggle
pass_icon.addEventListener("click", function () {
    if (password1.type === "password") {
        password1.type = "text";
    }
    else {
        password1.type = "password";
    }
    pass_icon.classList.toggle("fa-eye");
})

//reset button
form.addEventListener("reset", function (e) {
    for (var i = 0; i < errorFields.length; i++) {
        errorFields[i].innerHTML = "";
    }
})

//validation functions
function isValidEmail(email) {
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

function isValidContact(contact) {
    var contactRegex = /^\d{10}$/;
    return contactRegex.test(contact);
}

//error functions
function showError(fieldId, message) {
    var element = document.getElementById(fieldId);
    element.textContent = message;
}

function hideError(fieldId) {
    var element = document.getElementById(fieldId);
    element.textContent = null;
}


//field validation 
function checkFields(fieldNameCurrent) {
    let data = document.getElementById(fieldNameCurrent).value;
    if (data == "") {
        showError(fieldNameCurrent + "_small", fieldNameCurrent + " can't be empty");
        messages.push(fieldNameCurrent + " can't be empty");
        return false;
    } else {
        hideError(fieldNameCurrent + "_small");
        messages.pop();
    }

    if (fieldNameCurrent == "password1") {
        if (password1.value.length < 8) {
            showError("password1_small", "Password must be 8 characters long");
            messages.push("Password must be 8 characters long");
            return false;
        } else {
            hideError("password1_small");
            for (var i = 0; i < password1.value.length; i++) {
                messages.pop();
            }
        }
    }
    if (fieldNameCurrent == "password2") {
        if (password1.value !== password2.value) {
            showError("password2_small", "Password doesn't match");
            messages.push("Password doesn't match");
            return false;
        } else {
            hideError("password2_small");
            messages.pop();
        }
    }

    if ((fieldNameCurrent == "email" && !isValidEmail(data)) || (fieldNameCurrent == "contact" && !isValidContact(data))) {
        showError(fieldNameCurrent + "_small", "Enter valid " + fieldNameCurrent);
        messages.push("Enter valid " + fieldNameCurrent);
        return false;
    } else {
        hideError(fieldNameCurrent + "_small");
        messages.pop();
    }
}


//redirecting
function redirect() {
    localStorage.setItem('myObject', JSON.stringify([firstName.value, lastName.value, password1.value, genderValue(), email.value, contact.value, dob.value, course.value, address.value]))
    window.location.href = "display.html";
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(messages);
    checkFields('firstName');
    checkFields('lastName');
    checkFields('password1');
    checkFields('password2');
    checkFields('email');
    checkFields('contact');
    checkFields('dob');
    console.log(messages);


    if (messages.length > 0) {
        // console.log("error persists or no values in fields");
        e.preventDefault();
    }
    else {
        redirect();
    }
})