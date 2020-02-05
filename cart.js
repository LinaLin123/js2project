// connect to HTML-document
let dispCart = document.getElementById("dispCart")
let test = document.getElementById("test")
// display cart

// Hämta data från localStorage
let cart = JSON.parse(localStorage.getItem('Name')) 
// console.table( localStorage )

//Visa alla nycklar
// for (let i = 0; i < localStorage.length; i++) {
//   console.log("Key: " + localStorage.key(i));
//   }

// https://github.com/mahmudalhakim/JavaScript_2_FEND19/blob/master/Lektion_06/localstorage/localstorage-demo.html
// https://studentportal.nackademin.se/pluginfile.php/171567/mod_resource/content/0/JavaScript-2-Lektion-06.pdf

fetch( 'products.json' )
.then( products => products.json() )
.then( products => getProdsToCart( products ) )

function getProdsToCart (products){
  ifEmptyCart() // either writes empty cart or table heading
  let totalSum = 0;

  for( let i = 0; i < localStorage.length; i++ ){
    let id = localStorage.key( i )
    let name = products[id].name
    let tickets = localStorage.getItem( localStorage.key( i ) )
    tickets = parseInt(tickets)
    console.log()
    let price = products[id].price
    let sum = tickets * price
    totalSum += sum
    // hämtar värdet
    
    console.log(localStorage.getItem( id ))
    // console.log("Name: " + name + " Tickets: " + localStorage.getItem( name ))

    dispCart.innerHTML +=
    "<tr class='table-row'>" +
      "<td><button id ='" + id + "deleteBtn' class='btn btn-warning btn-sm'>x</button></td>" +
      "<td>" + name + "</td>" +
      "<td><button id='" + id + "BtnMinus' class='minus btn btn-primary btn-sm'>-</button>" +
      "<input type='number' id='"+id+"Input' class='inputAmount' value='" + tickets + "'></input>" +
      "<button id='" + id + "BtnPlus'  class='plus btn btn-primary btn-sm'>+</button></td>" +
      "<td>" + price + "</td>" +
      "<td>" + sum + "</td>" +
    "</tr>" 
  }
  dispCart.innerHTML +=
  "<thead><tr class='table-row thead-dark'>" +
    "<th><button id='orderBtn' class='btn btn-success'>Place order</button></th>" +
    "<th></th>" +
    "<th></th>" +
    "<th>Total sum: </th>" +
    "<th>" + totalSum + "</th>" +
  "</tr></thead>"
  inputChange()
  getBtns()
}

function ifEmptyCart(){
  if(localStorage.length > 0 ){
    document.getElementById("emptyCart").innerHTML = ""
    dispCart.innerHTML += 
    "<thead class='thead thead-dark'><tr>" +
        "<th><button id='clearCartBtn' class='btn btn-danger btn-sm deletAllBtn'>Clear cart</button></th>"+
        "<th>Destination</th>"+
        "<th>Tickets</th>"+
         "<th>Price per ticket</th>"+
         "<th>Sum</th>"
    "</tr></thead>"
  } else {
    document.getElementById("emptyCart").innerHTML = "Your cart is empty!"
  }
}


function inputChange(){
  let inputs = document.querySelectorAll("input")
  inputs.forEach( input => {
    input.addEventListener('change',function(e){ 
      console.log(this)
    })
  })
}

function getBtns(){
  let removeBtn = document.querySelectorAll("button")
  removeBtn.forEach( input => {
    input.addEventListener('click',function(e){ 
      if(this.id == "clearCartBtn"){
        alert("Are you sure you would like to delete all items in your cart?")
        console.log("Clearing the cart!")
      } else {
        console.log(this)
      }
    })
  })
}