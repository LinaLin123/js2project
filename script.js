// connect to HTML-document
let body = document.querySelector("body")
let dispDiv = document.getElementById("dispProd")

// display products
// image
// name
// description
// price
// dropdown to choose from
// submit button  - add product to basket -eventlistner 
fetch('protucts.json')
.then(prods => console.log(prods))

function showProducts(user){
  for(let i = 0; i < user.length; i++){

  let name = user[i].name
  let city = user[i].address.city
  document.getElementById("dispProd").innerHTML += 
  "<div class='card' style='width: 15rem;' >" +
    "<h2>" + 
  name + 
    "</h2>" +
    "<p>" +
  city + "</p></div><br>"
  }
}


// product basket