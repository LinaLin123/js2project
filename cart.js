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

    emptyCart() // either writes empty cart or table heading

    for(let i = 0; i < localStorage.length; i++){
    let name = localStorage.key( i )
    console.log("Name: " + name)

    let amount = localStorage.getItem( localStorage.key( i ) )
    amount = parseInt(amount)
    console.log("Tickets: " + amount)
    
    let price = names.products[i].price
    console.log("Price: " + price)

    let sum = price * amount

    // hämtar värdet
    localStorage.getItem( name )
    // console.log("Name: " + name + " Tickets: " + localStorage.getItem( name ))

    dispCart.innerHTML += 
    "<tr>"+
        "<td>"+name+"</td>"+
        "<td><button class='minusbtn btn btn-primary'>-</button>"+amount+"<button class='plusbtn btn btn-primary'>+</button></td>"+
        "<td>"+price+"</td>"+
        "<td>"+sum+"</td>"+
    "</tr>" 
  }
}

function emptyCart(){
  if(localStorage.length > 0 ){
    document.getElementById("emptyCart").innerHTML = ""
    dispCart.innerHTML += 
    "<tr>" +
        "<th>Name</th>"+
        "<th>Amount</th>"+
         "<th>Price</th>"+
         "<th>Sum</th>"
    "</tr>"
  } else {
    document.getElementById("emptyCart").innerHTML = "Your cart is empty!"
  }
}
