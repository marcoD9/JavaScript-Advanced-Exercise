"use strict";

const cakeRecipes = require("./cake-recipes.json");

// Your functions here
//Get all the authors of a given list
const findAuthors = (recipes) => {
  let authors = [];
  recipes.forEach((recipe) => {
    //check if the author is already in the authors array, if not add it
    if (!authors.includes(recipe.Author)) {
      authors.push(recipe.Author);
    }
  });
  return authors;
};
console.log(findAuthors(cakeRecipes));
//----------------------------------------------------------------
//Get all the names of the recipes
const getRecipesNames = (recipes) => {
  let requiredProperties = [
    "Name",
    "url",
    "Description",
    "Author",
    "Ingredients",
    "Method",
  ];
  //check if the recipe has the poperties we want
  const recipesNames = recipes
    .filter((recipe) => {
      return requiredProperties.every((property) =>
        recipe.hasOwnProperty(property)
      );
    })
    //if the recipe has all the properties add it in the new array
    .map((recipe) => recipe.Name);
  //if the new array is empty return a message
  if (recipesNames.length === 0) {
    console.log("There are no recipes found with all required properties.");
  } else {
    return recipesNames;
  }
};

console.log(getRecipesNames(cakeRecipes));

//-----------------------------------------------------------------
//Get all the recipes of the given author
const getAuthorRecipes = (recipes, author) => {
  // Validate author to prevent errors
  if (typeof author !== "string" || !author) {
    console.log("Please provide a valid author name.");
  }
  //filter the array
  const filteredRecipes = recipes.filter(
    (recipe) => recipe.Author.toLowerCase() === author.toLowerCase()
  );

  if (filteredRecipes.length === 0) {
    return "There are no recipes found for this author.";
    //if the array is not empty return a new array with the recipes of the given author
  } else {
    return filteredRecipes.map((recipe) => recipe.Name);
  }
};

console.log(getAuthorRecipes(cakeRecipes, "james martin"));

//----------------------------------------------------------------------
//Get recipes with the given ingredient
const getRecipesWithIngredient = (recipes, ingredient) => {
  if (typeof ingredient !== "string" || !ingredient) {
    console.log("Please provide a valid ingredient.");
  }
  //check if the Ingredients array contains the given ingredient and filter the recipes
  const filteredRecipes = recipes.filter((recipe) => {
    return recipe.Ingredients.some(
      (recipeIngredients) =>
        recipeIngredients.toLowerCase() === ingredient.toLowerCase()
    );
  });
  //create a new array with the names of the recipes that contain that ingredient
  if (filteredRecipes.length === 0) {
    return "There are no recipes found for this ingredient.";
  } else {
    return filteredRecipes.map((recipe) => recipe.Name);
    /*If I want to return the whole recipe, and not just the name, I can use this code:
     return filteredRecipes.map((recipe) => recipe); 
     and the stringify method at line 153 */
  }
};

console.log(getRecipesWithIngredient(cakeRecipes, "140g caster sugar"));
//---------------------------------------------------------------------------
//Get one recipe with a given word within the name
const getRecipeWithName = (recipes, name) => {
  const nameInLowerCase = name.toLowerCase();
  //find the first receipe wich name includes the given name
  const findRecipe = recipes.find((recipe) => {
    const recipeNameLowerCase = recipe.Name.toLowerCase();
    return recipeNameLowerCase.includes(nameInLowerCase);
  });
  return findRecipe;
};
console.log(getRecipeWithName(cakeRecipes, "christmas cake"));

//---------------------------------------------------------------------------
//Get all ingredients of a given list
const getIngredients = (recipes) => {
  const flattenedIngredients = recipes.reduce((acc, recipe) => {
    return acc.concat(recipe.Ingredients);
  }, []);
  return flattenedIngredients;
};
const shortList = getAuthorRecipes(cakeRecipes, "james martin");
console.log(getIngredients(shortList));

// Part 2

const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  const choice =
    //2
    //3
    //4
    //5
    //0
    prompt("Enter a number (1-5) or 0 to exit: ");
  return parseInt(choice);
};
const recipeIngredients = [];
let choice;

do {
  choice = displayMenu();

  switch (choice) {
    case 1:
      console.log("The authors are : \n" + findAuthors(cakeRecipes));
      break;
    case 2:
      const givenAuthor =
        //"Barney Desmazery";
        prompt("Enter the author name");
      console.log(
        "The recipes of the same author are : \n " +
          getAuthorRecipes(cakeRecipes, givenAuthor)
      );
      /*console.log(
        "The recipes of the same author are : \n " +
          JSON.stringify(getAuthorRecipes(cakeRecipes, givenAuthor))
      );*/

      break;
    case 3:
      const givenIngredient =
        // "280g self-raising flour";
        prompt("Choose an ingredient");
      console.log(
        "The recipes with that ingredient are: \n" +
          getRecipesWithIngredient(cakeRecipes, givenIngredient)
      );
      break;
    case 4:
      const givenName =
        //"cupcakes";
        prompt("Choose a name");
      const choosenRecipe = getRecipeWithName(cakeRecipes, givenName);
      console.log(
        "Here is the recipe I found : \n" + JSON.stringify(choosenRecipe)
      );

      recipeIngredients.push(choosenRecipe.Ingredients);
      //console.log(recipeIngredients);
      break;
    case 5:
      console.log(
        "Here is a list of all ingredients you'll need : \n" + recipeIngredients
      );
      break;
    case 0:
      console.log("Exiting...");
      break;
    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);

    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);
