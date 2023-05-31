import { IDesign, IDesignCategory, IDesignResponse, IDesignSearch } from '../types'
import axios from './api'

export const getListDesignCategories = async (): Promise<IDesignCategory[] | null> => {
  try {
    const res = await axios.get('/design-category/all')
    return res.data?.data
  } catch (error) {
    console.warn(error)
  }
  return null
}

export const getDesignBySearch = async (params: IDesignSearch): Promise<IDesignResponse | null> => {
  try {
    const res = await axios.get(`/design/?skip=${params.skip}&limit=${params.limit}&category_id=${params.categoryId}&keyword=${params.keyword}`)
    return res.data?.data
  } catch (error) {
    console.warn(error)
  }
  return null
}

export const getDetailDesignBySlug = async (slug: string): Promise<IDesign | null> => {
  if (!slug) return null
  try {
    const res = await axios.get(`/design/by-slug/${slug}`)
    return res.data?.data
  } catch (error) {
    console.warn(error)
  }
  return null
}

export const getDesignCategoryById = async (id: string): Promise<IDesignCategory | null> => {
  if (!id) return null
  try {
    const res = await axios.get(`/design-category/${id}`)
    return res?.data?.data
  } catch (error) {
    console.warn(error)
  }
  return null
}