// connect to HTML-document
let body = document.querySelector("body")
let dispDiv = document.getElementById("dispProd")

// number of tickets ordered
let orders = 

// display products
// dropdown to choose from
// submit button  - add product to basket -eventlistner 
fetch( 'products.json' )
.then( prods => prods.json() )
.then( prods => showProducts( prods ) )

function showProducts( products ){
  for(let i = 0; i < products.products.length; i++){
  let imageAddress = products.products[i].image
  let name = products.products[i].name
  let description = products.products[i].description
  let price = products.products[i].price
  let prodId = products.products[i].id
  let amount = products.products[i].amount

  // local storage - ersätt med en function istället?
  localStorage.setItem( name, amount )
  
  // create div for each product with product info, select and submitbtn
  dispDiv.innerHTML += 
    "<div id='" + prodId + "' class='prod'><img src='" + imageAddress + "' class='prodImg'>"  +
      "<h2 id='" + prodId + "name'>" + name + "</h2>" + 
      "<p>" + description + "</p>" +
      "<p>" + price + "kr</p>"+
        "<select id='" + prodId + "select'>" + 
        "<option value='0'>Välj antal</option>" +
        "<option value='1'>1</option>" +
        "<option value='2'>2</option>" +
        "<option value='3'>3</option>" +
        "<option value='4'>4</option>" +
        "<option value='5'>5</option>" +
      "</select><br><br>" +
      "<button type='submit' id='" + prodId + "btn'>Add to basket</button>" +
    "</div>"

  }
  addListnerToBtn()
}

// vi behöver en funktion som skickar value till basket
// sätta eventLister på formuläret istället? För att lättare komma åt informationen inom this
// gör en addEventListner som reagerar på knapp tryck
function addListnerToBtn(){
  let allBtns = document.querySelectorAll("button")
  allBtns.forEach( btn => {
    btn.addEventListener('click',function(){ 

      // get current value
      let currentSelectVal = this.parentElement.children[4].value
      currentSelectVal = parseInt(currentSelectVal)
      console.log(typeof(currentSelectVal))
      console.log(currentSelectVal+14)
      

      // get current name
      let currentName = this.parentElement.children[1].innerHTML
      
      // get current price
      let currentPrice = this.parentElement.children[3].value
      currentPrice = parseInt(currentPrice)

      // current amount of tickets
      let currentAmount = localStorage.getItem(currentName)
      currentAmount = parseInt(currentAmount)
      typeof(currentAmount)

      // feedback that you've added products to basket
      // console.log("Added " + currentSelectVal + " " + currentName + "-tickets to basket ")
      
      // either set an amount for the first time or add together with previous amount
      // it's a string currently and must be a number
      if( currentAmount == 0 ){
        console.log("amount was empty")
        localStorage.setItem( currentName, currentSelectVal )
        console.log("set new amount to: " + localStorage.getItem(currentName));
      } else {
        localStorage.setItem( currentName, currentSelectVal + currentAmount )
        console.log("new amount: " + localStorage.getItem(currentName) )
      }
      
      // if(localStorage.getItem( currentName, currentSelectVal ))
      console.log(localStorage.getItem(currentName))
      
      // reset button value
      this.parentElement.children[4].value  = 0

    })
  })
}