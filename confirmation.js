// 1. connect to HTML-document
let dispOrder = document.getElementById("dispOrder")

// removes items where value = 0, because this are unnecessary on confiramtion page
removeTicketsWithValueZero()

// 2. get product information from json-file och kör vår huvudfunktion
getProducts() 

// 2. get product information from json-file and send to getcartToOrderForm-function. Vi har skapat till en funktionen eftersom vi vill köra den flera gånger
function getProducts() {
  fetch('products.json')
    .then(products => products.json())
    .then(products => getCartToOrderForm(products))
}

// 3. display confirmation page with items from local storage in a table
function getCartToOrderForm(products) {
  // 3.1 add table header
  dispOrder.innerHTML +=
    "<thead><tr class='thead thead-dark'>" +
    "<th></th>" +
    "<th>Destination</th>" +
    "<th>Tickets</th>" +
    "<th>Price/ticket</th>" +
    "<th>Sum</th></tr></thead>"

  // 3.2 initalize totalSum, en variabel för att spara summa i.
  let totalSum = 0 

  // 3.3 loop over local storage to display cart products
  for (let i = 0; i < localStorage.length; i++) { // < localStorage.length använda längden för veta hur många varv loopar går genom
    // 3.3.1 initalizes values needed to display products
    let id = localStorage.key(i) // Id från LS
    let name = products[id].name //namn från JSON
    let tickets = parseInt(localStorage.getItem(localStorage.key(i))) // antal biljetter
    let price = products[id].price // pris från JSON
    let sum = tickets * price // pris gånger med antal
    totalSum += sum // totalSum som är från början 0 där det adderas på beroende antal biljetter. += addera på och inte skriva över

    // 3.3.2 display items in table
    dispOrder.innerHTML +=
      "<tr id='" + id + "' class='table-row'>" +
      "<td></td>" +
      "<td>" + name + "</td>" +
      "<td>" + tickets + "</td>" +
      "<td>" + price + "</td>" +
      "<td>" + sum + "</td>" +
      "</tr>"
  } // for loop slutar


  // 3.4 display table footer with total sum 
  dispOrder.innerHTML +=
    "<thead><tr class='thead thead-dark''>" +
    "<th></th>" +
    "<th></th>" +
    "<th></th>" +
    "<th>Total sum: </th>" +
    "<th>" + totalSum + "</th></tr></thead>" // här används totalSum för visa användaren
  // 4. After displaying items, clear cart. Måste vara efter for loopen.
  clearCart()
}

// 4. clear local storage 
function clearCart(){
  localStorage.clear()
}

// remove items where value = 0
function removeTicketsWithValueZero(){
  for( let i = 0; i < localStorage.length; i++ ){ // loopar över local storages längd
    if( localStorage.getItem(localStorage.key(i)) == 0 ){ // kollar om värdet = 0
      console.log("empty")
      localStorage.removeItem(localStorage.key(i)) // tar bort nyckel+värde ifall värdet = 0
    }
  }
}