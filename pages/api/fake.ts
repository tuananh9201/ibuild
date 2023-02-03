// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import categories from "@/data/categories.json";
import { ICategory } from "lib/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICategory[]>
) {
  res.status(200).json(categories);
}
