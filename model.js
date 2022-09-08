var easy, medium, hard;
var all = {};
let categories = {};
initCats();
function initCats(){
  document.querySelectorAll("app-pattern-table").forEach(e =>
    {let cat = e.firstChild.firstChild.firstChild; 
    categories[cat.firstChild.textContent] = cat;})

  let select = document.getElementById("req_category");

  Object.keys(categories).forEach(cat => {
    let option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    option.addEventListener("mouseover", function() {
          modal.style.opacity = 1.0;
      });
    select.appendChild(option)
  })
}


function init(){
  let htmlTables = document.getElementsByClassName("table");
  easy = []; medium = []; hard = [];
  all = {easy, medium, hard};

  for (var i = 0; i < htmlTables.length ; i++) {
    var category = htmlTables[i].parentNode.parentNode.parentNode.parentNode.firstChild;
    
    htmlTables[i].childNodes[1].childNodes.forEach(n => {
      if(!n.childNodes[2]) return;

      let name = n.childNodes[1].textContent;
      let solved = n.childNodes[0].firstChild.firstChild.firstChild.checked;
      let url = n.childNodes[1].firstChild.href;
      let difficulty = n.childNodes[2].textContent;
      all[difficulty.toLowerCase()].push({name, url, difficulty, solved, category});
    })
  }

}

function any(pool){
  init();
  if(!pool){
    let arr = Math.trunc(Math.random() * 3);
    pool = all[Object.keys(all)[arr]];
  }

  shuffleArray(pool)
  let i = Math.trunc(Math.random() * pool.length);
  return pool[i];
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function getProblemFromRequest(requiredProblem){
  let pool = []
  if(requiredProblem.easy) pool = pool.concat(easy);
  if(requiredProblem.medium) pool = pool.concat(medium);
  if(requiredProblem.hard) pool = pool.concat(hard);

  if(requiredProblem.new) pool = pool.filter(q => !q.solved)
  if(requiredProblem.solved) pool = pool.filter(q => q.solved)

  if(!requiredProblem["req_category"].includes("any")) {
    pool = pool.filter(q => {
      return requiredProblem["req_category"].includes(q.category.firstChild.textContent)
    })
  }

  return any(pool)
}

document.getElementById("search_rnd").addEventListener("click", getRandomProblem);

form = document.querySelector("form");

form.addEventListener("change", checkInputs);  
var lastProblem;
function getRandomProblem(){
    init();
    let requiredProblem = {}

    let solvedOrUnsolvedFilter = document.querySelector('input[name="new"]:checked').value;
    requiredProblem[solvedOrUnsolvedFilter] = true;
    
    for(let i = 0; i < form.elements.length; i++){
      requiredProblem[form.elements[i].name] = form.elements[i].checked;
    }

    requiredProblem["req_category"] = Array.from(document.querySelectorAll("#req_category option:checked")).map(o => o.value);

    let problem = getProblemFromRequest(requiredProblem)
    
    if(!problem) {
      document.getElementById("name_rnd").textContent = "Nothing matches search";
      document.getElementById("problem_details").style.visibility="hidden";
      return;
    }
    closeLastProblem(problem);

    lastProblem = problem
    document.getElementById("name_rnd").textContent = problem.name;

    document.getElementById("url_rnd").textContent = "Problem link";
    document.getElementById("url_rnd").href = problem.url;

    document.getElementById("solved_rnd").textContent = problem.solved? "Solved" : "NOT Solved";
    document.getElementById("difficulty_rnd").textContent = problem.difficulty;

    document.querySelector("details").open = false;

    document.getElementById("navigate").addEventListener('click', navigateTo);

    document.getElementById("category_rnd").textContent = "  " + problem.category.firstChild.textContent;

    document.getElementById("problem_details").style.visibility="visible"
}

function navigateTo(e){
  if(lastProblem.category.classList.contains('active')){
    lastProblem.category.scrollIntoView();
  }else{
    lastProblem.category.click();
  }
}

function closeLastProblem(newProblem){
  if(!lastProblem) return;
  document.getElementById("navigate").removeEventListener('click', navigateTo);
  if(lastProblem.category.classList.contains("active") && newProblem.category !== lastProblem.category) {
    lastProblem.category.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
   }
}

function checkInputs(){
  let any = false;
  for(let i = 0; i < form.elements.length; i++){
    any = any || form.elements[i].checked
  }

  if(!any){
    for(let i = 0; i < form.elements.length; i++){
      form.elements[i].checked = true;
    }    
  }
}

document.querySelector("[routerlink='/practice']").addEventListener('click', () => setTimeout(initCats, 500));
