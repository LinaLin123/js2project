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
    "</tr>"

    for(let i = 0; i < localStorage.length; i++){
    let name = localStorage.getItem( localStorage.key( i ) )
    let price =names.products[i].price
    // let amount = localStorage.key(i).value

    console.log(localStorage.getItem( localStorage.key( i ) ))

    // hämtar värdet
    localStorage.getItem( name )
    // console.log("Name: " + name + " Tickets: " + localStorage.getItem( name ))

    dispCart.innerHTML += 
    "<tr>"+
        "<td>"+name+"</td>"+
        // "<td>"+amount+"</td>"+
        "<td>"+price+"</td>"+
    "</tr>" 
  }

}