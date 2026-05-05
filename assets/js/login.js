import {
   getAuth,
   signInWithEmailAndPassword,
   GoogleAuthProvider,
   signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js"

const emailElement = document.getElementById("email")  // lấy thẻ html từ file bằng id
const passElement = document.getElementById("password")
const emailErrorElement = document.getElementById("email-error")
const passErrorElement = document.getElementById("pass-error")
// lấy button từ file bằng id
const loginButton = document.getElementById("login-btn")
function handleLoginClick(event) {
   event.preventDefault(); // Ngăn chặn hành vi mặc định của button
   
   let userList = [];
   let email = emailElement.value; // goi ra bien tuong ung gia tri nhap vao cua o input
   let password = passElement.value;

   if (validate(email, password) === true){
      const auth = getAuth()
      signInWithEmailAndPassword(auth,email,password)
      .then((userCredentist) =>{
         //logined in
         const user = userCredentist.user
         console.log("Login successful:",user);
         window.location.href = "index.html"// redirect to food html
      })
      .catch((error)=>{
         const errorCode = error.errorCode
         const errorMessage = error.errorMessage
         console.error("Error during login",errorCode,errorMessage)
         passErrorElement.textContent = "(*)"+ errorMessage
      })
   } 
}

function validate(email,password) {
   let isValid = true;
   let email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   // Reset error messages
   emailErrorElement.textContent = "";
   passErrorElement.textContent = "";



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

   return isValid;
   
}
const googleBtn = document.getElementById("google-login-btn");

googleBtn.addEventListener("click", function () {
   const auth = getAuth();
   const provider = new GoogleAuthProvider();

   signInWithPopup(auth, provider)
      .then((result) => {
         const user = result.user;
         console.log("Google login success:", user);

         // chuyển trang
         window.location.href = "index.html";
      })
      .catch((error) => {
         console.error("Google login error:", error.message);
         alert("Đăng nhập Google thất bại!");
      });
});

// gắn sự kiện click cho button và hàm xử lí sự kiện 
loginButton.addEventListener("click",handleLoginClick)
if (localStorage.getItem("userList")){
   userList = JSON.parse(localStorage.getItem("userList"))
} else{
   localStorage.setItem("userList",JSON.stringify([]))   
}  


function checkExistUser(email) {
   let result = null;
   userList.forEach((user) =>{
      if (user.email == email) {
         result =  user
      }
   })
   return result
}