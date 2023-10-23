
import Recipe from "./components/Recipe";
import { App_Id, App_Key } from "./constants";
import { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    margin: "10px auto",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

function App() {
  const classes = useStyles();

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  useEffect(() => {
    getRecipe();
  }, [query]);
  const getRecipe = async () => {
    const response = await axios.get(
      `https://api.edamam.com/search?q=${query}&app_id=${App_Id}&app_key=${App_Key}`
    );
    setRecipes(response.data.hits);
    console.log(response.data.hits);
  };
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  const updateQuery = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };
  return (
    <div>
      <Paper onSubmit={updateQuery} component='form' className={classes.root}>
        <InputBase
          type='text'
          value={search}
          onChange={updateSearch}
          className={classes.input}
          placeholder='Search for Recipe'
          inputProps={{ "aria-label": "search for recipe" }}
        />
        <IconButton
          type='submit'
          className={classes.iconButton}
          aria-label='search'
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      {/* <form onSubmit={updateQuery}>
        <input type='text' value={search} onChange={updateSearch} />
        <button type='submt'>Search</button>
      </form> */}
      <div style={{ margin: "10px" }}>
        <Grid container>
          {recipes.map((recipe) => (
            <Grid item xs={3}>
              <Recipe
                key={recipe.recipe.label}
                title={recipe.recipe.label}
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default App;