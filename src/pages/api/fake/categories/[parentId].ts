// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import categories from "@/data/categories.json";
import { ICategory } from "src/lib/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICategory[]>
) {
  const { parentId } = req.query;
  setTimeout(() => {
    res.status(200).json(categories.filter((c) => c.parentId === parentId));
  }, 5000);
}
