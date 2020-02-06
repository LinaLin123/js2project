let dispOrder = document.getElementById("dispOrder")

function getProducts() {
  fetch('products.json')
    .then(products => products.json())
    .then(products => getcartToOrderForm(products))
}

getProducts()

// display confirmation
function getcartToOrderForm(products) {
  let totalSum = 0
  for (let i = 0; i < localStorage.length; i++) {
    let id = localStorage.key(i)
    let name = products[id].name
    let tickets = parseInt(localStorage.getItem(localStorage.key(i)))
    let price = products[id].price
    let sum = tickets * price
    totalSum += sum

    dispOrder.innerHTML +=
      "<tr id='" + id + "' class='table-row'>" +
      "<td></td>" +
      "<td>" + name + "</td>" +
      "<td>" + tickets + "</td>" +
      "<td>" + price + "</td>" +
      "<td>" + sum + "</td>" +
      "</tr>"
  }
  dispOrder.innerHTML +=
    "<thead><tr class='thead thead-dark'>" +
    "<th></th>" +
    "<th>Destination</th>" +
    "<th>Tickets</th>" +
    "<th>Price/ticket</th>" +
    "<th>Sum</th></tr></thead>"

  dispOrder.innerHTML +=
    "<thead><tr class='thead thead-dark''>" +
    "<th></th>" +
    "<th></th>" +
    "<th></th>" +
    "<th>Total sum: </th>" +
    "<th>" + totalSum + "</th></tr></thead>"
}

function clearCart(){
  document.getElementById("clearHomeLink").addEventListener('click',function(){
    localStorage.clear()
  })
  document.getElementById("clearCartLink").addEventListener('click',function(){
    localStorage.clear()
  })
  document.getElementById("closeConfirmationPage").addEventListener('click',function(){
    localStorage.clear()
  })
}

clearCart()
