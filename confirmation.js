// 1. connect to HTML-document
let dispOrder = document.getElementById("dispOrder")

// 2. get product information from json-file
getProducts()

// 2. get product information from json-file and send to getcartToOrderForm-function
function getProducts() {
  fetch('products.json')
    .then(products => products.json())
    .then(products => getcartToOrderForm(products))
}

// 3. display confirmation page with items from local storage in a table
function getcartToOrderForm(products) {
  // 3.1 add table header
  dispOrder.innerHTML +=
    "<thead><tr class='thead thead-dark'>" +
    "<th></th>" +
    "<th>Destination</th>" +
    "<th>Tickets</th>" +
    "<th>Price/ticket</th>" +
    "<th>Sum</th></tr></thead>"

  // 3.2 initalize totalSum
  let totalSum = 0

  // 3.3 loop over local storage to display cart products
  for (let i = 0; i < localStorage.length; i++) {
    // 3.3.1 initalizes values needed to display products
    let id = localStorage.key(i)
    let name = products[id].name
    let tickets = parseInt(localStorage.getItem(localStorage.key(i)))
    let price = products[id].price
    let sum = tickets * price
    totalSum += sum

    // 3.3.2 display items in table
    dispOrder.innerHTML +=
      "<tr id='" + id + "' class='table-row'>" +
      "<td></td>" +
      "<td>" + name + "</td>" +
      "<td>" + tickets + "</td>" +
      "<td>" + price + "</td>" +
      "<td>" + sum + "</td>" +
      "</tr>"
  }
  // 3.4 display table footer with total sum 
  dispOrder.innerHTML +=
    "<thead><tr class='thead thead-dark''>" +
    "<th></th>" +
    "<th></th>" +
    "<th></th>" +
    "<th>Total sum: </th>" +
    "<th>" + totalSum + "</th></tr></thead>"
  // 4. After displaying items, clear cart
  clearCart()
}

// 4. clear local storage
function clearCart(){
  localStorage.clear()
}
