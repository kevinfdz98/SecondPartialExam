

function fetchMeals(searchTerm){
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
    let settings = {
        method: 'GET'
    }
    let addRecipe = ""; 

    fetch(url, settings)
    .then(response=>{
        console.log(response); 
        if(response.ok)
        {
            console.log("Here is ok"); 
            return response.json(); 
        }
        else{
            console.log("Error"); 
            return response; 
        }
    })
    .then(json => {
        console.log("second promise"); 
        console.log(json); 
       
        return json; 
    }); 
    console.log("Here"); 
    console.log(json);
   /* for(let i = 0; i <= json.length; i++)
    {
        addRecipe += `<div class="recipe">
                        <h3>${json[i].strMeal} </h3> 
                        <h4> Meal Area: ${json[i].strArea} </h4>
                        <h5> Preparation </h5>
                        <b>${json[i].strInstructions} </b>
                        <img src="${strMealThumb}"/> 
        </div>
        `
    }*/
    console.log(addRecipe); 
    document.querySelector(`.js-search-results`).innerHTML = addRecipe; 

}


function getMealToSearch(){
    let clicked = document.getElementById('clickable')
        clicked.addEventListener('click', (event)=>{
        event.preventDefault(); 
        let searchTerm = document.getElementById('query').value; 
        console.log(searchTerm); 

        fetchMeals(searchTerm); 
      
    })

}

function init(){

getMealToSearch(); 


}

init(); 