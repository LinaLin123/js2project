// connect to HTML-document
let body = document.querySelector("body")
let dispDiv = document.getElementById("dispProd")

if( localStorage.length == 0 ) {
  console.log("storage empty")
} else {
  console.log("storage exist");
  console.table( localStorage )
}

// fetch( 'products.json' )
// .then( storage => storage.json() )
// .then( storage => getNumbers( storage ) )
// function getNumbers (storage){
//   let totTickets = 0
//   for(let i = 0; i < storage.products.length; i++){
//     let name = storage.products[i].name
//     totTickets += parseInt(localStorage.getItem( name ))
//     console.log(name +" " + parseInt(localStorage.getItem( name )))
//   }
//   console.log("Total number of tickets: " + totTickets)
//   if(totTickets < 13 ){
//     console.log("Tot: " + totTickets)
//   } else {
//     console.log("More that 12 tickets: " + totTickets)
//   }
// }
console.log()
localStorage.key
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

  // local storage - ersätt med en function istället?
  // localStorage.setItem( name, amount )


// vi behöver en funktion som skickar value till basket
// sätta eventLister på formuläret istället? För att lättare komma åt informationen inom this
// gör en addEventListner som reagerar på knapp tryck
function addListnerToBtn(){
  let allBtns = document.querySelectorAll("button")
  allBtns.forEach( btn => {
    btn.addEventListener('click',function(){ 
      // get current name
      let eName = this.parentElement.children[1].innerHTML

      // get current value
      let eSelectVal = this.parentElement.children[4].value
      eSelectVal = parseInt(eSelectVal)
      console.log(typeof(eSelectVal));
      

      // get current price
      let ePrice = this.parentElement.children[3].innerHTML
      ePrice = parseInt(ePrice)

      // current amount of tickets
      let eTickets = localStorage.getItem(eName)
      eTickets = parseInt(eTickets)

      // feedback that you've added products to basket
      console.log("Added " + eSelectVal + " " + eName + "-tickets to basket ")
      

      // either set an amount for the first time or add together with previous amount
      // it's a string currently and must be a number
      if( eTickets == null || eTickets == 0 ){
        console.log(eTickets)        
        localStorage.setItem( eName, [eSelectVal, ePrice, eSelectVal*ePrice] )
        console.log("Set first amount to: " + localStorage.getItem(eName))
      } else {
        let eNewTicketSum = eSelectVal + eTickets
        localStorage.setItem( eName, [eNewTicketSum, ePrice, eNewTicketSum*ePrice] )
        console.log("Change new amount to: " + localStorage.getItem(eName) )
      }
      
      // if(localStorage.getItem( currentName, currentSelectVal ))
      // console.log(localStorage.getItem(currentName))
      
      // reset button value
      this.parentElement.children[4].value  = 0
    })
  })
}