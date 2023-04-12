import axios from "./api"
import { AreasModal } from "@/lib/models"

export const getAreas = async (): Promise<AreasModal[] | any> => {
  try {
    const res = await axios.get('/area')
    return res?.data?.data.map((item: any) => {
      return {
        id: item.id,
        name_vi: item.name,
        parent_id: item.parent_id
      }
    })
  } catch (error) {
    console.warn(error)
    return error
  }
}