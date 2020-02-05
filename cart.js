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
.then( names => names.json() )
.then( names => getNames( names ) )

function getNames (names){
  ifEmptyCart() // either writes empty cart or table heading
  let totalSum = 0;

  for( let i = 0; i < localStorage.length; i++ ){
    let name = localStorage.key( i )
    let tickets = localStorage.getItem( localStorage.key( i ) )
    tickets = parseInt(tickets)
    let price = names.products[i].price
    let sum = price * tickets
    totalSum += sum
    // hämtar värdet
    localStorage.getItem( name )
    // console.log("Name: " + name + " Tickets: " + localStorage.getItem( name ))

    dispCart.innerHTML +=
    "<tr class='table-row'>" +
      "<td><button class='btn btn-warning btn-sm'>x</button></td>" +
      "<td>" + name + "</td>" +
      "<td><button id='"+name+"Btn+' class='minus btn btn-primary btn-sm'>-</button>" +
      "<input type='number' id='"+name+"Input'  class='inputAmount' value='" + tickets + "'></input>" +
      "<button id='"+name+"Btn-'  class='plus btn btn-primary btn-sm'>+</button></td>" +
      "<td>" + price + "</td>" +
      "<td>" + sum + "</td>" +
    "</tr>" 
    console.log(parseInt(localStorage.getItem(name)))
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
  removeTicket()
}

function ifEmptyCart(){
  if(localStorage.length > 0 ){
    document.getElementById("emptyCart").innerHTML = ""
    dispCart.innerHTML += 
    "<thead class='thead thead-dark'><tr>" +
        "<th><button class='btn btn-danger btn-sm'>Clear cart</button></th>"+
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

function removeTicket(){
  let removeBtn = document.querySelectorAll("button")
  removeBtn.forEach( input => {
    
    input.addEventListener('click',function(e){ 
      console.log(this)
    })
  })
}