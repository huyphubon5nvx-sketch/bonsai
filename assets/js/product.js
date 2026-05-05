import {
   collection,
   getDocs,
   getFirestore,
   query,
   where,
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import { app } from "./firebase_config.js"

export async function fetchData(collectionName){  //
   const db = getFirestore(app) // truyen app vao firebase.config.js de lay database ra
   const querySnapshot = await getDocs(collection(db,collectionName)) //lay ra nhung cai document tu colection cs ten colectionName nam trong database 
   // querySnapshot la phan hoi cs data hoac chua loi
   let product = [] //tao ra mang rong 
   querySnapshot.forEach((doc) => {//duyet qua document va bo vao mang produc
      // doc.data() is never undefined for query doc snapshots
      product.push({id: doc.id, ...doc.data()})
   })
   return product//return lai danh sach
}
//export: cho phép các file khác có thể sủ dụng hàm này
//function là hàm sử dụng 1 chức năng j đó đc sử dụng nhiều lần
// hàm hiển thị sản phẩm của trang web dựa trên id của phần tử hmtl
export async function renderProducts(id) { 
   //lấy phần tử html sẽ chứa danh sánh sản phẩm theo id
    let productContainer = document.getElementById(id);
    let productHtml = ""
    let products = await fetchData("products")
    console.log("abc",products);
    
   // tạo thẻ html
   // products :danh sách sản phẩm 
   //forEach :lập qua từng sản phẩm trong danh sách và gán từng sản phẩm vào biến p
   //$ chuyền trực tiếp vào
    products.forEach((p) =>{
        productHtml +=`
        <div class="product-card">
                  <div class="product-info">
                     <img src="../assets/images/${p.image}" alt="" class="product-image" />
                     <a href="detail.html?id=${p.id}"><h3 class="product-name">${p.name}</h3>
                     </a>
                     <p class="product-description">${p.description}
                        Japanese Black Pine
                     </p>
                     <button class"btn-add" onclick="addToCart('${p.id}')">Add to cart</button>
                  </div>
               </div>
        `;}
    )

    productContainer.innerHTML = productHtml
}


// chuc nang tim kiem san pham

const searchInput = document.getElementById("search-input")
const searchchBtn = document.getElementById("search-button")

// hàm hiển thị sản phẩm sau khi tìm
export async function renderSearchedDetails(product){
   let productContainer = document.getElementById("product-list")
   let productHtml = ""

   // nếu không có sản phẩm
   if (product.length === 0 ){
      productContainer.innerHTML = "Không tìm thấy sản phẩm"
      return
   }

   // nếu có sản phẩm
   product.forEach((p) =>{
      productHtml += `        
      <div class="product-card">
         <div class="product-info">
            <img src="../assets/images/${p.image}" alt="" class="product-image" />
            <h3 class="product-name">${p.name}</h3>
            <p class="product-description">${p.description}</p>
            <div class="price">${p.price}</div>
            <button class"btn-add" onclick="addToCart('${p.id}')">Add to cart</button>
         </div>
      </div>
      `
   })

   productContainer.innerHTML = productHtml
}

// hàm tìm kiếm
async function searchProducts() {
   let searchText = searchInput.value.trim()

   // nếu chưa nhập
   if (searchText === ""){
      alert("Vui lòng nhập tên sản phẩm")
      return
   }

   const db = getFirestore(app)

   // query tìm kiếm
   const q = query(
      collection(db,"products"),
      where("name",">=",searchText),
      where("name","<=",searchText + "\uf8ff")
   )

   const querySnapshot = await getDocs(q)

   let product = []

   querySnapshot.forEach((doc) => {
      product.push({id: doc.id, ...doc.data()})
   })

   console.log("Kết quả tìm:", product)

   // 👉 hiển thị kết quả
   renderSearchedDetails(product)
}

// bắt sự kiện click nút search
searchchBtn.addEventListener("click", searchProducts)