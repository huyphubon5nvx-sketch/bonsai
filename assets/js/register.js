import {
   getAuth,
   createUserWithEmailAndPassword,
}  from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js"

const emailElement = document.getElementById("email")  // lấy thẻ html từ file bằng id
const passElement = document.getElementById("password")
const pass1Element = document.getElementById("password1")
const emailErrorElement = document.getElementById("email-error")
const passErrorElement = document.getElementById("pass-error")
const pass1ErrorElement = document.getElementById("pass1-error")
const registerButton = document.getElementById("register-btn")

function handleRegisterClick(event) {
   event.preventDefault(); // Ngăn chặn hành vi mặc định của button
   

   let email = emailElement.value.trim(); // goi ra bien tuong ung gia tri nhap vao cua input
   let password = passElement.value;
   let password1 = pass1Element.value;

   if (validate(email, password,password1) === true){
      const auth = getAuth()
      createUserWithEmailAndPassword(auth,email,password)
      .then((userCredentist) =>{
         const user = userCredentist.user
         console.log("Registrationg successful:",user);
         window.location.href = "login.html"// redirect to food html
      })
      .catch((error)=>{
         const errorCode = error.errorCode
         const errorMessage = error.errorMessage
         console.error("Error during register",errorCode,errorMessage)
         passErrorElement.textContent = "(*)"+ errorMessage
      })
   } 
}

function validate(email, password,password1) {
   let isValid = true;
   let email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   // Reset error messages
   emailErrorElement.textContent = "";
   passErrorElement.textContent = "";
   pass1ErrorElement.textContent = "";



   // Validation
   if (!email_regex.test(email)) {
      emailErrorElement.textContent = "(*) Invalid email format.";
      isValid = false;
   }
   if (password === "") {
      passErrorElement.textContent =
         "(*) Password must be at least 6 characters.";
      isValid = false;
   }
    if (password1 !== password ) {
      pass1ErrorElement.textContent =
         "(*) Password must be at least 6 characters.";
      isValid = false;
   }
       if (password1 ==="" ) {
      pass1ErrorElement.textContent =
         "(*) Password must be at least 6 characters.";
      isValid = false;
       }
   return isValid;
}
// gắn sự kiện click cho button và hàm xử lí sự kiện 
registerButton.addEventListener("click",handleRegisterClick)


