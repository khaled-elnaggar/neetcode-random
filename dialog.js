
var modal = window.document.createElement("dialog")
modal.style = 'width: 250px; overflow-wrap: break-word; font-family: "Segoe UI", Tahoma, sans-serif; font-size: 80%;'
modal.style.backgroundColor = "#1d1f21";
modal.style.borderRadius = "30px";
modal.style.borderColor = "#4a4a4a";

modal.innerHTML += `
    <p style="text-align:center"><b>Neetcode random</b></p>
    <div>
        <p>Preferences:</p>
        <form>
          <input type="checkbox" id="easy_rnd" name="easy" checked><label style="padding-left: 2px;" for="easy_rnd">Easy</label>

          <input type="checkbox" id="medium_rnd" name="medium"><label style="padding-left: 2px;" for="medium_rnd">Medium</label>

          <input type="checkbox" id="hard_rnd" name="hard"><label style="padding-left: 2px;" for="hard_rnd">Hard</label>
        </form>
    
        <br/>    

        <div>
          <input type="radio" id="any_rnd" name="new" value="any" checked>
          <label for="any_rnd">Any</label>

          <input type="radio" id="solved_b" name="new" value="solved">
          <label for="solved_b">Solved</label>

          <input type="radio" id="new_rnd" name="new" value="new">
          <label for="new_rnd">Not solved</label>
        </div>
    </div>

    <br/>    
    <button style="width: 100%;" id="search_rnd">Search</button>
    <hr/>    

    <div id="result_rnd">
      <p style="text-align:center; font-weight: bold;" id="name_rnd">problem name</p>
      <div id="problem_details" style="visibility: hidden;">
        <a target="_blank" id="url_rnd">problem link</a>
        <p id="difficulty_rnd">difficulty</p>
        <p id="solved_rnd">solved</p>
        <details>
          <summary id="summary_rnd" style="color: white">Category</summary>
          <p id="category_rnd">category</p>
        </details>
      </div>
    </div>
    <hr style="margin: 24px 0px 5px 0px" />
    <div style="width: 100%">
      <p style="font-size: small;">Made by dev_khalid@hotmail.com </p>
      <button id="closeModal" style="width: 100%; display: block;">close</button>

    </div>
    `

document.body.appendChild(modal);
document.getElementById("closeModal").addEventListener('click', function (){modal.close()})

var p = window.document.createElement('p')
p.style.position= "fixed";
p.style.right= "70px";
p.style.bottom= "70px";
p.style.zIndex = 999;
p.style.fontSize = "50px";
p.style.color="white";
p.style.padding="5px";
p.style.borderRadius="10px";
p.style.backgroundColor="rgba(0, 0, 0, 0.8)";
p.style.cursor= "pointer"
p.textContent = "🔍"
document.body.appendChild(p);

p.addEventListener("click", function(){
  modal.showModal();
})