import {
    getFirestore,
    setDoc,
    doc,
    getDocs,
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js"
import { getCurrentUser } from "./auth.js"
import { app } from "./firebase_config.js"

const db = getFirestore(app)

export async function addToCart(productId) {
    const user = getCurrentUser()
    //1.kiem tra dang nhap 
    if (!user) {
        alert("vui long dang nhap de tiep tuc")
        window.location.href = "login.html"
    }

    const uid = user.uid
    const cartRef = doc(db, "carts", uid)
    
    try {
        //lay gio hang hien tai cua user thong qua dia chi gio hang(cartRef)
        const docSnap = await getDocs(cartRef)

        //neu chua cs gio hang tao moi luon
        if(!docSnap.exists()){
            //tao gio hang moi voi san pham dau tien
            const newCart = {
                items: [
                    {
                        productId: productId,
                        quantity: 1,
                    }
                ]
            }

            await setDoc(cartRef , newCart)
            alert("da tao gio hang va them san pham")
            return
        }
    //3 neu da cs gio hang 
    let items = docSnap.data().items || []

    // 4 kiem tra san pham da cs chua
    const index  = items.findIndex((item) => item.productId === productId)

    if (index !== -1){
        //da cs tang 1 
        items[index].quantity += 1
    } else {
        //chua cs them moi
        items.push({
            productId: productId,
            quantity: 1 ,
        })
    }
    //5 cap nhat lai firestore
    await setDoc(cartRef, { items })
    alert("da cap nhat gio hang")

 } catch (error){
        console.error("loi them gio hang",error);
        alert("co loi xay ra")   
    }
}
