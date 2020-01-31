<select id="select">
    <option value="0">---Välj antal</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
  </select>

let select = document.getElementById('select');

select.addEventListener('change', function(e){
    // hämta från en dropdown-lista

    console.log(e);
    
    let antal = select.value;
    antal = e.target.value;
    
    const url = "https://api.namnapi.se/v2/names.json?limit="+antal;
    load(url, showList);
  });