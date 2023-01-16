import { INews } from "lib/types";
import axios from "./api";
import data from "@/data/news1.json";

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

export const fetchDragonById = async (id: string) => {
  const res = await axios.get(`/dragons/${id}`);
  return res.data;
};
