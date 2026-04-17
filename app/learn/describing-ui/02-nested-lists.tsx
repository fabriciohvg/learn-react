"use client";

import { recipes } from "./data";

export default function NestedLists() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="">Recipes</h1>
      <p className="">
        Make a list of recipes from this array! For each recipe in the array,
        display its name as an <code>h2</code> and list its ingredients in a{" "}
        <code>ul</code>.
      </p>
      <hr />
      {recipes.map((r) => (
        <div key={r.id}>
          <h2 className="font-semibold tracking-tight py-1">{r.name}</h2>
          <ul className="list-disc list-inside">
            {r.ingredients.map((ingredient, index) => (
              <li className="ml-2 italic" key={index}>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
