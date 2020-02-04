// connect to HTML-document
let dispCart = document.getElementById("dispCart")
// display cart


fetch( 'products.json' )
.then( names => names.json() )
.then( names => getUpdatedProds( names ) )

function getUpdatedProds (names){
  for(let i = 0; i < names.products.length; i++){
    let name = names.products[i].name
    console.log(name)
    // hämtar värdet
    localStorage.getItem( name )
    console.log(localStorage.getItem( name ))
  }
}