// connect to HTML-document
let body = document.querySelector("body")
let dispDiv = document.getElementById("dispProd")

// display products
// dropdown to choose from
// submit button  - add product to basket -eventlistner 
fetch('products.json')
.then(prods => prods.json())
.then(prods => showProducts(prods) )

function showProducts(products){
  for(let i = 0; i < products.products.length; i++){
  let imageAddress = products.products[i].image
  let name = products.products[i].name
  let description = products.products[i].description
  let price = products.products[i].price
  
  let test = `Hej på dig ${name}`

  dispDiv.innerHTML += 
  "<div id='prod"+i+"' class='prod'><img src='" + imageAddress + "'>"  +
    "<h2>" + name + "</h2>" + 
    "<p>"+description+"</p>" +
    "<p>"+price+"kr</p>"+
    "<button type='submit'>Order</button>"+
    "</div><br>"
  }
}


// product basket