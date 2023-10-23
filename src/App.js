import { useState, useEffect } from "react";
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

 

  return (
    <div className="App">
        <form >
          <input type="text"/>
          <button>search</button>
        </form>
       
    </div>
  );
}

export default App;
