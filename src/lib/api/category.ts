import { ICategory } from "src/lib/types";
import axios from "./api";
import categories from "@/data/categories.json";

export const fetchRootCategories = async (): Promise<ICategory[]> => {
  const res = await axios.get("/product-category/by-parent-id/0");
  const data = res?.data;
  console.log("**** data", data);

  return data?.data || [];
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
