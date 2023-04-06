import axios from "./api"
import { AreasModal } from "@/lib/models"

export const getAreas = async (): Promise<AreasModal[] | any> => {
  try {
    const res = await axios.get('/area')
    return res?.data?.data || []
  } catch (error) {
    console.warn(error)
    return error
  }
}