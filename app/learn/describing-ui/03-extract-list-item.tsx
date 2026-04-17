"use client";

import { recipes } from "./data";

type RecipeProps = {
  id: string;
  name: string;
  ingredients: string[];
};

function Recipe({ id, name, ingredients }: RecipeProps) {
  return (
    <div key={id} className="">
      <h2>{name}</h2>
      <ul className="list-inside list-disc">
        {ingredients.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ExtractListItem() {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold">
        Challenge 3 of 4: Extracting a list item component
      </p>
      <p className="">
        This RecipeList component contains two nested map calls. To simplify it,
        extract a Recipe component from it which will accept id, name, and
        ingredients props. Where do you place the outer key and why?
      </p>
      {recipes.map((recipe) => (
        <Recipe key={recipe.id} {...recipe} />
      ))}
    </div>
  );
}
