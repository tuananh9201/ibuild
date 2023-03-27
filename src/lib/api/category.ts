import { ICategory } from "src/lib/types";
import axios from "./api";
import categories from "@/data/categories.json";

export const fetchRootCategories = async (): Promise<ICategory[]> => {
  try {
    const res = await axios.get("/product-category/roots/");
    const data = res?.data;
    return data?.data || [];
  } catch (error) {
    console.log(error);
  }
  return [];
};

export const fetchCategorySlug = async (slug: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
  })
    .then(() => categories.find((c) => c.slug === slug))
    .catch(() => categories.find((c) => c.slug === slug));
};

export const fetchChildsCategories = async (parentId: string) => {
  console.log("load categories by parent " + parentId);
  return fetch(`/api/fake/categories/${parentId}`)
    .then((res) => res.json())
    .catch(() => {
      return [];
    });
};
