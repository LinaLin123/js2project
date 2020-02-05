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

  for( let i = 0; i < localStorage.length; i++ ){
    let name = localStorage.key( i )
    let tickets = localStorage.getItem( localStorage.key( i ) )
    tickets = parseInt(tickets)
    let price = names.products[i].price
    let sum = price * tickets

    // hämtar värdet
    localStorage.getItem( name )
    // console.log("Name: " + name + " Tickets: " + localStorage.getItem( name ))

    dispCart.innerHTML +=
    "<tr class='table-row'>" +
      "<td>" + name + "</td>" +
      "<td><button class='minusbtn btn btn-primary btn-sm'>-</button>" +
      "<input type='number class='inputAmount' value='" + tickets + "'></input>" +
      "<button class='plusbtn btn btn-primary btn-sm'>+</button></td>" +
      "<td>" + price + "</td>" +
      "<td>" + sum + "</td>" +
    "</tr>" 
  }
  dispCart.innerHTML +=
  "<tr class='table-row tfoot'>" +
    "<td></td>" +
    "<td></td>" +
    "<td>Total sum:</td>" +
    "<td></td>" +
  "</tr>"
}

function ifEmptyCart(){
  if(localStorage.length > 0 ){
    document.getElementById("emptyCart").innerHTML = ""
    dispCart.innerHTML += 
    "<thead class='thead'><tr>" +
        "<th>Name</th>"+
        "<th>Tickets</th>"+
         "<th>Price</th>"+
         "<th>Sum</th>"
    "</tr></thead>"
  } else {
    document.getElementById("emptyCart").innerHTML = "Your cart is empty!"
  }
}