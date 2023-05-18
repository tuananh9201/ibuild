import axios from "./api"
import { AreasModal, IBaseModel } from "@/lib/models"

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

export const getCities = async (): Promise<IBaseModel[] | null> => {
  try {
    const res = await axios.get('/area/city')
    return res?.data?.data.map((item: any) => {
      return {
        id: item.id,
        value: item.name,
        slug: item.code
      }
    })
  } catch (error) {
    console.warn(error)
  }
  return null
}

export const getDistricts = async (cityId: string): Promise<IBaseModel[] | null> => {
  if (!cityId) return null
  try {
    const res = await axios.get(`/area/districst?city_id=${cityId}`)
    return res?.data?.data.map((item: any) => {
      return {
        id: item.id,
        value: item.name,
        slug: item.code
      }
    })
  } catch (error) {
    console.warn(error)
  }
  return null
}