import ProductImg from "@assets/image-1.jpg";
import AppleIcon from "@assets/categories/apple.svg?react";
import SaladIcon from "@assets/categories/salad.svg?react";
import FishIcon from "@assets/categories/fish.svg?react";
import MeatIcon from "@assets/categories/meat.svg?react";
import CoffeeIcon from "@assets/categories/coffee.svg?react";
import IceCreamIcon from "@assets/categories/ice-cream.svg?react";
import CupcakeIcon from "@assets/categories/cupcake.svg?react";
import PieIcon from "@assets/categories/pie.svg?react";
import FoodIcon from "@assets/categories/food.svg?react";
import {Product} from "@/types";

export function createProductsData(length: number): Product[] {
  const result: Product[] = [];

  for(let i = 0; i < length; i++) {
    result[i] = {
      id: `asd${i}`,
      name: "Big Potatos",
      price: 14.99,
      category: {
        id: 1,
        name: "Vegetables"
      },
      image: ProductImg,
      rating: {
        rate: 4.8,
        count: 120,
      },
    }
  }
  return result;
}




export const categoriesData = [
  {
    name: "Fresh Fruit",
    pathname: "fresh-fruit",
    icon: (className: string) => <AppleIcon className={className}/>
  },
  {
    name: "Vegetables",
    pathname: "vegetables",
    icon: (className: string) => <SaladIcon className={className}/>
  },
  {
    name: "River Fish",
    pathname: "rive-fish",
    icon: (className: string) => <FishIcon className={className}/>
  },
  {
    name: "Chicken & Meat",
    pathname: "chicken-and-meat",
    icon: (className: string) => <MeatIcon className={className}/>
  },
  {
    name: "Drink & Water",
    pathname: "drink-an-water",
    icon: (className: string) => <CoffeeIcon className={className}/>
  },
  {
    name: "Yogurt & Ice Cream",
    pathname: "yogurt-and-ice-cream",
    icon: (className: string) => <IceCreamIcon className={className}/>
  },
  {
    name: "Cake & Bread",
    pathname: "cake-and-bread",
    icon: (className: string) => <CupcakeIcon className={className}/>
  },
  {
    name: "Butter & Cream",
    pathname: "butter-and-cream",
    icon: (className: string) => <PieIcon className={className}/>
  },
  {
    name: "Cooking",
    pathname: "cooking",
    icon: (className: string) => <FoodIcon className={className}/>
  },
];













const category = [
  {
    id: 1,
    name: "Молочные продукты"
  },
  {
    id: 2,
    name: "Хлеб и выпечка"
  },
  {
    id: 3,
    name: "Оващи"
  },
  {
    id: 4,
    name: "Фрукты"
  },
  {
    id: 5,
    name: "Мясо и птица"
  },
  {
    id: 6,
    name: "Рыба"
  },
  {
    id: 7,
    name: "Вода и напитки"
  },
  {
    id: 8,
    name: "Сладкое"
  },
  {
    id: 9,
    name: "Снеки"
  },
]


const product = [
  {
    name: "Огурцы Корнишон",
    price: 309 ,
    categoryId: 3,
    image: "https://yastatic.net/avatars/get-grocery-goods/2783132/2d93e076-e117-40ce-badb-128aa8d9be95/464x464-webp",
  },
  {
    name: "Огурцы Корнишон",
    price: 309 ,
    categoryId: 3,
    image: "https://yastatic.net/avatars/get-grocery-goods/2783132/2d93e076-e117-40ce-badb-128aa8d9be95/464x464-webp",
  },
  {
    name: "Огурцы Корнишон",
    price: 309 ,
    categoryId: 3,
    image: "https://yastatic.net/avatars/get-grocery-goods/2783132/2d93e076-e117-40ce-badb-128aa8d9be95/464x464-webp",
  },
  {
    name: "Огурцы Корнишон",
    price: 309 ,
    categoryId: 3,
    image: "https://yastatic.net/avatars/get-grocery-goods/2783132/2d93e076-e117-40ce-badb-128aa8d9be95/464x464-webp",
  },
  {
    name: "Огурцы Корнишон",
    price: 309 ,
    categoryId: 3,
    image: "https://yastatic.net/avatars/get-grocery-goods/2783132/2d93e076-e117-40ce-badb-128aa8d9be95/464x464-webp",
  },{
    name: "Огурцы Корнишон",
    price: 309 ,
    categoryId: 3,
    image: "https://yastatic.net/avatars/get-grocery-goods/2783132/2d93e076-e117-40ce-badb-128aa8d9be95/464x464-webp",
  },{
    name: "Огурцы Корнишон",
    price: 309 ,
    categoryId: 3,
    image: "https://yastatic.net/avatars/get-grocery-goods/2783132/2d93e076-e117-40ce-badb-128aa8d9be95/464x464-webp",
  },{
    name: "Огурцы Корнишон",
    price: 309 ,
    categoryId: 3,
    image: "https://yastatic.net/avatars/get-grocery-goods/2783132/2d93e076-e117-40ce-badb-128aa8d9be95/464x464-webp",
  },{
    name: "Огурцы Корнишон",
    price: 309 ,
    categoryId: 3,
    image: "https://yastatic.net/avatars/get-grocery-goods/2783132/2d93e076-e117-40ce-badb-128aa8d9be95/464x464-webp",
  },{
    name: "Огурцы Корнишон",
    price: 309 ,
    categoryId: 3,
    image: "https://yastatic.net/avatars/get-grocery-goods/2783132/2d93e076-e117-40ce-badb-128aa8d9be95/464x464-webp",
  },{
    name: "Огурцы Корнишон",
    price: 309 ,
    categoryId: 3,
    image: "https://yastatic.net/avatars/get-grocery-goods/2783132/2d93e076-e117-40ce-badb-128aa8d9be95/464x464-webp",
  },{
    name: "Огурцы Корнишон",
    price: 309 ,
    categoryId: 3,
    image: "https://yastatic.net/avatars/get-grocery-goods/2783132/2d93e076-e117-40ce-badb-128aa8d9be95/464x464-webp",
  },{
    name: "Огурцы Корнишон",
    price: 309 ,
    categoryId: 3,
    image: "https://yastatic.net/avatars/get-grocery-goods/2783132/2d93e076-e117-40ce-badb-128aa8d9be95/464x464-webp",
  },{
    name: "Огурцы Корнишон",
    price: 309 ,
    categoryId: 3,
    image: "https://yastatic.net/avatars/get-grocery-goods/2783132/2d93e076-e117-40ce-badb-128aa8d9be95/464x464-webp",
  },{
    name: "Огурцы Корнишон",
    price: 309 ,
    categoryId: 3,
    image: "https://yastatic.net/avatars/get-grocery-goods/2783132/2d93e076-e117-40ce-badb-128aa8d9be95/464x464-webp",
  },{
    name: "Огурцы Корнишон",
    price: 309 ,
    categoryId: 3,
    image: "https://yastatic.net/avatars/get-grocery-goods/2783132/2d93e076-e117-40ce-badb-128aa8d9be95/464x464-webp",
  },
  {
    name: "Огурцы Корнишон",
    price: 309 ,
    categoryId: 3,
    image: "https://yastatic.net/avatars/get-grocery-goods/2783132/2d93e076-e117-40ce-badb-128aa8d9be95/464x464-webp",
  },
  {
    name: "Огурцы Корнишон",
    price: 309 ,
    categoryId: 3,
    image: "https://yastatic.net/avatars/get-grocery-goods/2783132/2d93e076-e117-40ce-badb-128aa8d9be95/464x464-webp",
  },
  {
    name: "Огурцы Корнишон",
    price: 309 ,
    categoryId: 3,
    image: "https://yastatic.net/avatars/get-grocery-goods/2783132/2d93e076-e117-40ce-badb-128aa8d9be95/464x464-webp",
  },
  {
    name: "Огурцы Корнишон",
    price: 309 ,
    categoryId: 3,
    image: "https://yastatic.net/avatars/get-grocery-goods/2783132/2d93e076-e117-40ce-badb-128aa8d9be95/464x464-webp",
  },
  {
    name: "Огурцы Корнишон",
    price: 309 ,
    categoryId: 3,
    image: "https://yastatic.net/avatars/get-grocery-goods/2783132/2d93e076-e117-40ce-badb-128aa8d9be95/464x464-webp",
  },













];



