let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let create = document.getElementById("create")
let tbody = document.getElementById("tbody")
let btnUpdate = document.getElementById("update")
let btnDelete = document.getElementById("delete")
let ColorCh = document.getElementById("Color")
let deleteAll = document.getElementById("deleteAll")
let Range = document.getElementById("range")


// total 
function priceDAta() {
    let result = (+price.value + +taxes.value) - +discount.value
    total.innerHTML = result
    if (price.value > 0) {
        total.style.backgroundColor = "green"
    } else {
        total.style.backgroundColor = "rgb(143, 16, 16)"
        total.innerHTML = ""
    }
}

// createData
mood = "create";

let ArData;
if (localStorage.products != null) {
    ArData = JSON.parse(localStorage.products)
} else {
    ArData = [];
}
create.onclick = () => {
    let obData = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        discount: discount.value,
        Range: Range.value,
        total: total.innerHTML,
    }
    total.style.backgroundColor = "rgb(143, 16, 16)"
    if (mood === "create") {
        if (obData.Range >= 1) {
            for (let i = 0; i < obData.Range; i++) {
                ArData.push(obData)
                localStorage.setItem("products", JSON.stringify(ArData))
            }
        } else {
            ArData.push(obData)
        }
    } else {
        ArData[tmp] = obData;
        create.innerHTML = "create"
        mood = "create"
    }
    BigData()
    clearData()
}

function BigData() {
    let table = ''
    for (let i = 0; i < ArData.length; i++) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${ArData[i].title}</td>
        <td>${ArData[i].price}</td>
        <td>${ArData[i].taxes}</td>
        <td>${ArData[i].discount}</td>
        <td>${ArData[i].total}</td>
        <td><button id="update" onclick = 'UpdateDAta(${i})'>update</button></td>
        <td><button id="delete" onclick="DeDAta(${i})">delete</button></td>
    </tr> 
        `
    }
    tbody.innerHTML = table;
}
BigData()


// clearData
function clearData() {
    title.value = ""
    price.value = ""
    taxes.value = ""
    discount.value = ""
    total.innerHTML = ""
    Range.value = ""
}

// delete product
function DeDAta(i) {
    ArData.splice(i, 1)
    localStorage.setItem("products", JSON.stringify(ArData))
    BigData()
}

let tmp;
// updateDAta
function UpdateDAta(i) {
    title.value = ArData[i].title
    price.value = ArData[i].price
    taxes.value = ArData[i].taxes
    total.innerHTML = ArData[i].total
    discount.value = ArData[i].discount
    create.innerHTML = "update"
    mood = "update"
    total.style.backgroundColor = "green"
    scroll({
        top: 0,
        behavior: "smooth",
    })
    tmp = i;
}

// searchDAta 
function searchData(value) {
    let table = ''
    for (let i = 0; i < ArData.length; i++) {
        if (ArData[i].title.includes(value)) {
            table += `
        <tr>
        <td>${i}</td>
        <td>${ArData[i].title}</td>
        <td>${ArData[i].price}</td>
        <td>${ArData[i].taxes}</td>
        <td>${ArData[i].discount}</td>
        <td>${ArData[i].total}</td>
        <td><button id="update" onclick = 'UpdateDAta(${i})'>update</button></td>
        <td><button id="delete" onclick="DeDAta(${i})">delete</button></td>
    </tr> 
        `
        }
    }
    tbody.innerHTML = table;
}

// delete All
deleteAll.onclick = () => {
    localStorage.clear()
    ArData.splice(0)
    BigData()
}


