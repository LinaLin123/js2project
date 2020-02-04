// connect to HTML-document
let dispCart = document.getElementById("dispCart")
// display cart

fetch( 'products.json' )
.then( names => names.json() )
.then( names => getNames( names ) )

function getNames (names){
  for(let i = 0; i < names.products.length; i++){
    let name = names.products[i].name
    // hämtar värdet
    localStorage.getItem( name )
    console.log("Name: " + name + " Tickets: " + localStorage.getItem( name ))
  }
}