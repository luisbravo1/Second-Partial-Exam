const API_KEY = "1"

function showMeals(response, searchText) {
  let results = document.querySelector('.js-search-results');

  results.innerHTML = '';
  if (response.meals != null) {
    response.meals.forEach(res => {
      results.innerHTML += `
        <div>
          <h4>${res.strMeal}</h4>
          <p>Area: ${res.strArea}</p>
          <p>Instructions: ${res.strInstructions}</p>
          <img src="${res.strMealThumb}"></img>
        </div
      `
    });
  } else {
    results.innerHTML += `
      <div>
        <h4>Meal not Found.</h4>      
      </div>
    `
  }
}

function searchMeal(searchText) {
 let url = `https://www.themealdb.com/api/json/v1/${API_KEY}/search.php?s=${searchText}`

  let settings = {
    method: 'GET'
  };

  fetch(url, settings)
    .then( response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error( response.statusText );
    })
    .then( responseJSON => {
      console.log(responseJSON);
      showMeals(responseJSON, searchText);
    })
    .catch(err => {
      console.log(err);
    })
}

function watchForm() {
  let searchBtn = document.querySelector('.searchBtn');
  let searchQuery = document.querySelector('.js-query');

  searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let searchText = searchQuery.value;
    if (searchText != '') {
      console.log(searchText);
      searchMeal(searchText);
    } else {
      alert('Please write a search keyword')
    }
  });
}
function init() {
  watchForm();
}

init();