// connect to HTML-document
let body = document.querySelector("body")
let dispDiv = document.getElementById("dispProd")

if( localStorage.length == 0 ) {
  console.log("local storage empty")
} else {
  console.log("local storage exist");
}

// display products with dropdown to choose from
fetch( 'products2.json' )
.then( prods => prods.json() )
.then( prods => showProducts( prods ) )

function showProducts( products ){
  for(let i = 0; i < 10; i++){
    let imageAddress = products["id"+i].image
    let name = products["id"+i].name
    let description = products["id"+i].description
    let price = products["id"+i].price
    let prodId = "id"+i

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
      "<button type='submit' class='btn btn-primary' id='" + prodId + "btn'>Add to basket</button>" +
    "</div>"

  }
  addListnerToBtn()
}

// gör en addEventListner som reagerar på knapp tryck
function addListnerToBtn(){
  let allBtns = document.querySelectorAll("button")

  allBtns.forEach( btn => {
    btn.addEventListener('click',function(){ 
      let eName = this.parentElement.children[1].innerHTML
      let eSelectVal = this.parentElement.children[4].value
      eSelectVal = parseInt(eSelectVal)

      // either set an amount for the first time or add together with previous amount
      if( localStorage.getItem(eName) == null || parseInt(localStorage.getItem(eName)) == 0 ){
        localStorage.setItem( eName, eSelectVal )
        console.log("Set first amount of " + eName + " tickets to: " + localStorage.getItem(eName))
      } else {
        let eTickets = localStorage.getItem(eName)
        eTickets = parseInt(eTickets)
        let eNewTicketSum = eSelectVal + eTickets
        localStorage.setItem( eName, eNewTicketSum )
        console.log("Changed amount of " + eName + " tickets to: " + localStorage.getItem(eName) )
      }
      
      // reset button value
      this.parentElement.children[4].value  = 0
    })
  })
}

window.addEventListener('storage', function(e) {  
  console.log('Woohoo, someone changed my localstorage va another tab/window!');
});