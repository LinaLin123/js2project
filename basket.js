// connect to HTML-document
let dispCart = document.getElementById("dispCart")
// display cart

fetch( 'products.json' )
.then( names => names.json() )
.then( names => getNames( names ) )

function getNames (names){
    dispCart.innerHTML += 
    "<tr>"+
        "<th>Name</th>"+
        "<th>Amount</th>"+
         "<th>Price</th>"+
         "<th>Sum</th>"
    "</tr>"

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
        "<td>"+amount+"</td>"+
        "<td>"+price+"</td>"+
        "<td>"+sum+"</td>"+
    "</tr>" 
  }

}