"use client";

import NestedLists from "./02-nested-lists";
import ExtractListItem from "./03-extract-list-item";

export default function DescribeUI() {
  return (
    <div className="flex flex-col gap-2 p-2">
      <h1 className="">Describing the UI</h1>
      <h2 className="">Challenge 2 of 4: Nested lists in one component</h2>
      <hr />
      {/* <NestedLists /> */}
      <ExtractListItem />
    </div>
  );
}
