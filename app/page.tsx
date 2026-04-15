import { MyButton } from "@/components/learning-1/my-button";
import { MyButtonState } from "@/components/learning-1/my-button-state-up";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Suspense } from "react";
import { JSX } from "react/jsx-dev-runtime";

const user = {
  name: "Fabrício Lennar",
  imageUrl: "https://avatars.githubusercontent.com/u/122414?v=4",
  imageSize: 64,
};

type Child = {
  name: string;
  id: number;
};

const childrens: Child[] = [
  { name: "Henrique", id: 1 },
  { name: "Aurora", id: 2 },
  { name: "Augusto", id: 3 },
];

type Product = {
  title: string;
  price: number;
  id: number;
  inStock: boolean;
};

const products: Product[] = [
  { title: "Notebook", price: 1000, id: 1, inStock: true },
  { title: "Smartphone", price: 500, id: 2, inStock: false },
  { title: "Tablet", price: 750, id: 3, inStock: true },
];

async function ProductList(): Promise<JSX.Element> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <ul className="border rounded-md border-blue-500">
      {products.map((product) => (
        <li key={product.id}>
          <h3>{product.title}</h3>
          <p>${product.price.toFixed(2)}</p>
          <p className={cn(product.inStock ? "text-blue-500" : "text-red-500")}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>
        </li>
      ))}
    </ul>
  );
}

function ChildList() {
  return (
    <ul className="border rounded-md border-blue-500">
      {childrens.map((child) => (
        <li key={child.id}>{child.name}</li>
      ))}
    </ul>
  );
}

function Profile() {
  return (
    <div className="border rounded-md border-blue-500">
      <h2 className="">{user.name}</h2>
      <Image
        src={user.imageUrl}
        width={user.imageSize}
        height={user.imageSize}
        alt={`${user.name}'s avatar`}
      />
    </div>
  );
}

export default function Home() {
  return (
    <div className="">
      <h1 className="">Learn React</h1>
      <p className="">
        React is a JavaScript library for building user interfaces.
      </p>
      <Button className="">Click me</Button>
      <Profile />
      <MyButton />
      {childrens.length > 0 && <ChildList />}
      <Suspense
        fallback={
          <div className="border border-blue-500 rounded-md">
            <Spinner />
          </div>
        }
      >
        {products.length > 0 && <ProductList />}
      </Suspense>
      <MyButton />
      <MyButtonState />
    </div>
  );
}
