
var modal = window.document.createElement("div")
modal.id = "modal"
modal.style = `width: 250px; opacity: 0.8; border: 5px solid rgb(74, 74, 74); border-radius: 10px; padding: 10px; transform: translate(-50%, -50%); overflow-wrap: break-word; font-family: "Segoe UI", Tahoma, sans-serif; font-size: 80%;`
modal.style.backgroundColor = "var(--text-color-invert)";
modal.style.color = "var(--text-color)";
modal.style.position = "fixed";
modal.style.left = "50%";
modal.style.top = "50%";
modal.style.display = "none"
modal.style.zIndex = 100

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
          <select c18 style="text-align:center; width: 85%" name="req_category" id="req_category" multiple size=10>
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
        <a target="_blank" id="url_rnd">leetcode link</a>
        <p id="difficulty_rnd">difficulty</p>
        <p id="solved_rnd">solved</p>
        <details style="font-size: 12px;">
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


modal.addEventListener("mouseenter", function () {
  modal.style.opacity = 1.0;
});

modal.addEventListener("mouseleave", function () {
  modal.style.opacity = 0.8;
});

function closeModal() { modal.style.display = "none" }
document.getElementById("closeModal").addEventListener('click', closeModal)
document.addEventListener("keyup", function (e) { if (e.key === "Escape") closeModal() })


var searchIcon = window.document.createElement('p')
searchIcon.id = "search-icon";
searchIcon.style.position = "fixed";
searchIcon.style.right = "70px";
searchIcon.style.bottom = "70px";
searchIcon.style.zIndex = 999;
searchIcon.style.fontSize = "50px";
searchIcon.style.color = "white";
searchIcon.style.padding = "5px";
searchIcon.style.borderRadius = "10px";
searchIcon.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
searchIcon.style.cursor = "pointer"
searchIcon.textContent = "🔍"
document.body.appendChild(searchIcon);

searchIcon.addEventListener("click", function (e) {
  if (modal.style.display !== "block") {
    initializeCategoriesAndProblems();
    modal.style.display = "block";
  }
  else modal.style.display = "none";
})

