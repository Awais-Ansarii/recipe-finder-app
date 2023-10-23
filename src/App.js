import { useState, useEffect } from "react";
import Recipe from "./components/Recipe";
import { App_Id, App_Key } from "./constants";
import axios from "axios";

function App() {
  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

 
  const getRecipe = async () => {
    const response = await axios.get(
      `https://api.edamam.com/search?q=${query}&app_id=${App_Id}&app_key=${App_Key}`
    );
    setRecipes(response.data.hits);
    console.log(response.data.hits); 
  };

  

  useEffect(() => {
    getRecipe();
  }, []);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const updateQuery = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
        <form >
          <input type="text"/>
          <button>search</button>
        </form>
        {recipes.map( (recipe)=>(
          <Recipe
                key={recipe.recipe.label}
                title={recipe.recipe.label}
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}/>
        )

        )}
       
       
    </div>
  );
}

export default App;
