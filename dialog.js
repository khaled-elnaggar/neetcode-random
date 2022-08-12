
var modal = window.document.createElement("div")
modal.id = "modal"
modal.style = `width: 250px; border: 5px solid rgb(74, 74, 74); border-radius: 10px; padding: 10px; transform: translate(-50%, -50%); overflow-wrap: break-word; font-family: "Segoe UI", Tahoma, sans-serif; font-size: 80%;`
modal.style.backgroundColor = "var(--text-color-invert)";
modal.style.color = "var(--text-color)";
modal.style.position = "fixed";
modal.style.left = "50%";
modal.style.top = "50%";
modal.style.display = "none"

modal.innerHTML += `
    <p style="text-align:center"><b>Neetcode random</b></p>
    <div>
        <p>Difficulty:</p>
        <form>
          <input type="checkbox" id="easy_rnd" name="easy" checked><label style="padding-left: 2px;" for="easy_rnd">Easy</label>

          <input type="checkbox" id="medium_rnd" name="medium"><label style="padding-left: 2px;" for="medium_rnd">Medium</label>

          <input type="checkbox" id="hard_rnd" name="hard"><label style="padding-left: 2px;" for="hard_rnd">Hard</label>
        </form>
    
        <br/>    

        <div>
          <p>Solved:</p>
          <input type="radio" id="any_rnd" name="new" value="any" checked>
          <label for="any_rnd">Any</label>

          <input type="radio" id="solved_b" name="new" value="solved">
          <label for="solved_b">Solved</label>

          <input type="radio" id="new_rnd" name="new" value="new">
          <label for="new_rnd">Not solved</label>
        </div>

        <div style="margin-top: 10px;">
          <p style="margin-bottom: 5px;">Category:</p>
          <select c18 style="text-align:center; width: 70%" name="req_category" id="req_category">
            <option c18 value="any">any category</option>
          </select>
        </div>
    </div>

    <br/>    
    <button style="width: 100%;" id="search_rnd">Search</button>
    <hr/>    

    <div id="result_rnd">
      <p style="text-align:center; min-height: 39px; font-weight: bold;" id="name_rnd">problem name</p>
      <div id="problem_details" style="visibility: hidden;">
        <a target="_blank" id="url_rnd">problem link</a>
        <p id="difficulty_rnd">difficulty</p>
        <p id="solved_rnd">solved</p>
        <details>
          <summary id="summary_rnd" style="color: var(--text-color); margin-bottom: 10px"">Category (click to reveal)</summary>
          <p id="category_rnd" style="margin-left: 20px">category</p>
        </details>
        <button id="navigate" style="width: 100%; display: block;">navigate to section</button>
      </div>
    </div>
    <hr style="margin: 10px 0px 10px 0px; backgroundColor: var(--text-color)" />
    <div style="width: 100%">
      <button id="closeModal" style="width: 100%; display: block;">close</button>

    </div>
    `

document.body.appendChild(modal);

function closeModal(){modal.style.display = "none"}
document.getElementById("closeModal").addEventListener('click', closeModal)
document.addEventListener("keyup", function (e){if(e.key === "Escape") closeModal()})


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

p.addEventListener("click", function(e){
  if(modal.style.display !== "block") modal.style.display = "block";
  else modal.style.display = "none";
})

// document.addEventListener("click", function (e){
//   if(e.target.getAttributeNames().some(e => e.endsWith("c18") || e.startsWith("ng-tns"))) {return;};
//   width = parseInt(window.getComputedStyle(modal).width)
//   height = parseInt(window.getComputedStyle(modal).height)
//   xCoordinate = modal.getBoundingClientRect().x
//   yCoordinate = modal.getBoundingClientRect().y

//   if(e.clientX < xCoordinate || e.clientX > xCoordinate + width) closeModal();
//   if(e.clientY < yCoordinate || e.clientY > yCoordinate + height) closeModal();
// })
