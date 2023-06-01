import { INewCategory, INews, INewsResponse } from "src/lib/types";
import axios from "./api";
import data from "@/data/news1.json";
import newRelateds from "@/data/news-related.json";
import categories from "@/data/news-categories.json";

export const fetchNewsForHome = (url: string): Promise<INews[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
  })
    .then(() => {
      return data;
    })
    .catch((err) => data);
};

export const fetchNewBySlug = async (slug: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
  })
    .then(() => data.find((n) => n.slug === slug))
    .catch(() => data.find((n) => n.slug === slug));
};

export const fetchNewCategories = async (url: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
  })
    .then(() => categories)
    .catch(() => categories);
};

export const fetchNewCategoryBySlug = async (slug: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
  })
    .then(() => categories.find((n) => n.slug === slug))
    .catch(() => categories.find((n) => n.slug === slug));
};
export const fetchNewDefault = async (slug: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
  })
    .then(() => categories.find((n) => n.id === "1"))
    .catch(() => categories.find((n) => n.id === "1"));
};

export const fetchNewsByCategoryId = async (cateId: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
  })
    .then(() => data.filter((n) => n.category.id === cateId))
    .catch(() => data.filter((n) => n.category.id === cateId));
};
export const fetchNewsRelated = (cateId: string): Promise<INews[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
  })
    .then(() => {
      return newRelateds;
    })
    .catch((err) => newRelateds);
};

export const fetchDragonById = async (id: string) => {
  const res = await axios.get(`/dragons/${id}`);
  return res.data;
};

export const listNewCategories = async (): Promise<INewCategory[] | null> => {
  try {
    const res = await axios.get('/news-category/all')
    return res?.data?.data
  } catch (error) {
    console.warn(error)
  }
  return null
}

export const getNewByCategoryId = async (params: { skip: number, limit: number, categoryId: string }): Promise<INewsResponse | null> => {
  if (!params.categoryId) return null
  try {
    const res = await axios.get(`/news/?skip=${params.skip}&limit=${params.limit}&category_id=${params.categoryId}`)
    return res?.data?.data
  } catch (error) {
    console.warn(error)
  }

  return null
}

export const getNewsFeature = async (): Promise<INews[] | null> => {
  try {
    const res = await axios.get('/news/features')
    return res.data?.data
  } catch (error) {
    console.warn(error)
  }

  return null
}
