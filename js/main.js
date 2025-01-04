// تعريف العناصر

let product = document.querySelector(".product")
let price = document.querySelector(".price")
let total = document.querySelector(".total")
let create = document.querySelector(".create")
let programStatus = "create"
let swap ;



// 1 - get total

function getTotal(){
    if( product.value != "" ){
        // القيمة التي ستعرض في توتال تساوي قيمة الحقل برايس
        total.innerHTML = price.value;
    }
}

price.addEventListener("keyup" , getTotal)


// 2 - create product

let data = []; 

function createProduct(){

    // 1 - create object

    let newProduct = {
        product : product.value,
        price : price.value,
        total : total.innerHTML
    }

    // 2 - add object to data array
        if(programStatus == "create"){
            data.push(newProduct)
        }else{
            data[swap] = newProduct
            create.innerHTML = "create"
            create.style.background = "#0d6efd"
            programStatus = "create"
        }


    // 3 - add data array to local storage

    localStorage.setItem("products" , JSON.stringify(data))

    // 4- call show data function
    showData()

    // 5 - clean screen
    cleanScreen()

}


create.addEventListener("click" , createProduct)

// 3 - show data

function showData(){

    let item = ""

    for( i = 0 ; i < data.length ; i++){
        item += `
        <tr>
            <td>${i}</td>
            <td>${data[i].product}</td>
            <td>${data[i].price}</td>
            <td>${data[i].total}</td>
            <td><button onclick = "upDateItem(${i})" class="update btn btn-success">update</button></td>
            <td><button onclick = "deleteItem(${i})" class="delete btn btn-danger">delete</button></td>
        </tr>

    `
    }

    document.querySelector(".tbody").innerHTML = item
}

showData();


// 3 - clean screen

function cleanScreen(){
    product.value = ""
    price.value = ""
    total.innerHTML = "0"
}

// 4 - delete all
let deletAll = document.querySelector(".delete-all")


function deletAllItems(){
    // تفريغ اللوكال ستوريج
    localStorage.clear()
    // تفريغ مصفوفة الداتا
    data.splice( 0 , data.length )
    // عرض الداتا
    showData()
}

deletAll.addEventListener("click" , deletAllItems)


// 5 - delete one item

function deleteItem(i){
    // حذف عنصر من مصفوفة
    data.splice( i , 1)

    // التعديل بعد الحذف
    localStorage.products = JSON.stringify(data)
    // localStorage.getItem("products") = JSON.stringify(data)

    // عرض البيانات من جديد
    showData();
}


// 6 - update

function upDateItem(i){
    // مرحلة تمري القيم من المصفوفة داتا لحقول الادخال
    product.value = data[i].product 
    price.value = data[i].price
    total.innerHTML = data[i].total

    // تبديل كلمة كرييت الى ابديت
    create.innerHTML = "update"
    create.style.background = "green"

    // تبديل وضع البرنامج
    programStatus = "update"

    // تمرير قيمة المتغير لخارج البلوك
    swap = i;

}

