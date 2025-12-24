var easy, medium, hard;
var problemTablesLoaded = false;
var allProblems = {};
var allCategories = "All categories";
let categories = {[allCategories]:null};

// ===== route change watcher (SPA-safe) =====

let lastPath = location.pathname;

setInterval(() => {
  if (location.pathname !== lastPath) {
    lastPath = location.pathname;

    if (lastPath === "/practice") {
      setTimeout(initializeCategoriesAndProblems, 300);
    }
  }
}, 300);


function initializeCategoriesAndProblems(){
  initializeCategories();
  loadProblemsTables();
}

function initializeCategories() {
  extractCategoryNames();
  fillCategoriesInSelectOptions();
}

function extractCategoryNames() {
  document.querySelectorAll("app-pattern-table").forEach(e => {
    let categoryHeader = e.firstChild.firstChild.firstChild;
    categories[categoryHeader.children[1].textContent] = categoryHeader;
  }
  )
}

function fillCategoriesInSelectOptions() {
  let categoriesSelect = document.getElementById("req_category");
  categoriesSelect.replaceChildren();

  Object.keys(categories).forEach(categoryName => {
    let option = document.createElement("option");
    option.value = categoryName;
    option.textContent = categoryName;
    option.addEventListener("mouseover", function () {
      modal.style.opacity = 1.0;
    });
    categoriesSelect.appendChild(option)
  })
}

function loadProblemsTables(){
  if (problemTablesLoaded == true) {
    return;
  }

  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

  const accordions = Array.from(document.querySelectorAll('button.accordion')).reverse();

  for (const btn of accordions) {
      btn.click();
      btn.click();
  }

  setTimeout(() => {
    window.scrollTo(scrollLeft, scrollTop);
  }, 100);

  problemTablesLoaded = true;
}

function buildInternalTableFromProblemStatus() {
  if(!problemTablesLoaded) {
    loadProblemsTables();
  }
  let htmlQuestionTables = document.getElementsByClassName("table");
  easy = []; medium = []; hard = [];
  allProblems = { easy, medium, hard };

  for (var i = 0; i < htmlQuestionTables.length; i++) {
    var categoryHeader = htmlQuestionTables[i].parentNode.parentNode.parentNode.parentNode.firstChild;

    htmlQuestionTables[i].childNodes[1].childNodes.forEach(problemHeader => {
      if (!problemHeader.childNodes[2]) return;
      extractProblemInfo(allProblems, problemHeader, categoryHeader);
    })
  }
}

function extractProblemInfo(allProblems, problemHeader, categoryHeader) {
  let name = problemHeader.childNodes[2].textContent;
  let solved = problemHeader.childNodes[0].firstChild.firstChild.firstChild.checked;
  let url = problemHeader.childNodes[2].childNodes[1].href;
  let difficulty = problemHeader.childNodes[3].textContent;
  allProblems[difficulty.toLowerCase()].push({ name, url, difficulty, solved, category: categoryHeader });
}

function getProblemFromPool(pool) {
  buildInternalTableFromProblemStatus();
  if (!pool) {
    let randomDifficulty = Math.trunc(Math.random() * 3);
    pool = allProblems[Object.keys(allProblems)[randomDifficulty]];
  }

  shuffleArray(pool)

  let i = Math.trunc(Math.random() * pool.length);

  return pool[i];
}

/* Randomize array in-place using Durstenfeld shuffle algorithm - copy pasta */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function getProblemFromRequest(requiredProblem) {
  let candidateProblems = []
  if (requiredProblem.easy) candidateProblems = candidateProblems.concat(easy);
  if (requiredProblem.medium) candidateProblems = candidateProblems.concat(medium);
  if (requiredProblem.hard) candidateProblems = candidateProblems.concat(hard);

  if (requiredProblem.new) candidateProblems = candidateProblems.filter(q => !q.solved)
  if (requiredProblem.solved) candidateProblems = candidateProblems.filter(q => q.solved)

  if (!requiredProblem["req_category"].includes(allCategories)) {
    candidateProblems = candidateProblems.filter(problem => requiredProblem["req_category"].includes(problem.category.children[1].textContent))
  }

  return getProblemFromPool(candidateProblems)
}

document.getElementById("search_rnd").addEventListener("click", getRandomProblem);

form = document.querySelector("form");

form.addEventListener("change", checkInputs);
var lastProblem;


function getRandomProblem() {
  buildInternalTableFromProblemStatus();
  let requiredProblemSpecs = {}

  getSolvedFilter(requiredProblemSpecs);
  getDifficultyFilter(requiredProblemSpecs);
  getCategoryFilter(requiredProblemSpecs);

  let problem = getProblemFromRequest(requiredProblemSpecs)

  if (!problem) {
    document.getElementById("name_rnd").textContent = "Nothing matches search";
    document.getElementById("problem_details").style.visibility = "hidden";
    return;
  }

  closePreviousProblemCategory(problem);

  lastProblem = problem

  fillProblemDetailsForUi(problem);
}

function fillProblemDetailsForUi(problem) {
  document.getElementById("name_rnd").textContent = problem.name;

  document.getElementById("url_rnd").textContent = "Problem link";
  document.getElementById("url_rnd").href = problem.url;

  document.getElementById("solved_rnd").textContent = problem.solved ? "Solved" : "NOT Solved";
  document.getElementById("difficulty_rnd").textContent = problem.difficulty;

  document.querySelector("details").open = false;

  document.getElementById("navigate").addEventListener('click', navigateTo);

  document.getElementById("category_rnd").textContent = "  " + problem.category.firstChild.textContent;

  document.getElementById("problem_details").style.visibility = "visible"
}


function getSolvedFilter(requiredProblemSpecs) {
  let solvedOrUnsolvedFilter = document.querySelector('input[name="new"]:checked').value;
  requiredProblemSpecs[solvedOrUnsolvedFilter] = true;
}

function getDifficultyFilter(requiredProblemSpecs) {
  for (let i = 0; i < form.elements.length; i++) {
    requiredProblemSpecs[form.elements[i].name] = form.elements[i].checked;
  }
}

function getCategoryFilter(requiredProblemSpecs) {
  requiredProblemSpecs["req_category"] = Array.from(document.querySelectorAll("#req_category option:checked")).map(o => o.value);
  if (requiredProblemSpecs["req_category"].length == 0) {
    requiredProblemSpecs["req_category"] = [allCategories]
  }
}

function navigateTo(e) {
  if (lastProblem.category.classList.contains('active')) {
    lastProblem.category.scrollIntoView();
  } else {
    lastProblem.category.click();
  }
}

function closePreviousProblemCategory(newProblem) {
  if (!lastProblem) return;
  document.getElementById("navigate").removeEventListener('click', navigateTo);
  if (lastProblem.category.classList.contains("active")) {
    lastProblem.category.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function checkInputs() {
  let atLeastOneBoxChecked = false;
  for (let i = 0; i < form.elements.length; i++) {
    atLeastOneBoxChecked = atLeastOneBoxChecked || form.elements[i].checked
  }

  if (!atLeastOneBoxChecked) {
    for (let i = 0; i < form.elements.length; i++) {
      form.elements[i].checked = true;
    }
  }
}
