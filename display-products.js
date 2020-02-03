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
  
  dispDiv.innerHTML += 
    "<div id='prod"+i+"' class='prod'><img src='" + imageAddress + "' class='prodImg'>"  +
    "<h2>" + name + "</h2>" + 
    "<p>"+description+"</p>" +
    "<p>"+price+"kr</p>"+
    "<select id='select"+i+"'>" + 
    "<option value='0'>Välj antal</option>" +
    "<option value='1'>1</option>" +
    "<option value='2'>2</option>" +
    "<option value='3'>3</option>" +
    "<option value='4'>4</option>" +
    "<option value='5'>5</option>" +
    "</select><br><br>" +
    "<button type='submit' id='submitbtn"+i+"'>Add to basket</button>"+
    "</div>"
  }
  addListnerToBtn()
}

// vi behöver en funktion som skickar value till basket
// gör en addEventListner som reagerar på knapp tryck
function addListnerToBtn(){
  let allBtns = document.querySelectorAll("button")
  allBtns.forEach(btn => {
    btn.addEventListener('click',function(){
      console.log("Du la till " + this.previousSibling.previousSibling.previousSibling.value + " produkter")
    })
  });
}