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

export const getNewCategoryBySlug = async (slug: string): Promise<INewCategory | null> => {
  try {
    const res = await axios.get(`/news-category/by-slug/${slug}`)
    return res?.data?.data
  } catch (error) {
    console.warn(error)
  }
  return null
}

export const getNewByCategoryId = async (params: { skip: number, limit: number, categoryId: string, exclude_feature: number, exclude_id: string }): Promise<INewsResponse | null> => {
  try {
    const res = await axios.get(`/news/?skip=${params.skip}&limit=${params.limit}${params.categoryId.length > 0 ? `&category_id=${params.categoryId}` : ""}&exclude_feature=${params.exclude_feature}${params.exclude_id.length > 0 ? `&exclude_id=${params.exclude_id}` : ""}`)
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

export const getDetailNewBySlug = async (slug: string): Promise<INews | null> => {
  try {
    const res = await axios.get(`/news/by-slug/${slug}`)
    return res?.data?.data
  } catch (error) {
    console.warn(error)
  }

  return null
}
