import axios from './api'
import api from './api';
import { ICategory, ResponseSupplierInfo } from "../types";

export const fetchListSupplierBySearch = async (params: { skip: number, limit: number, name: string, sort_by: string }): Promise<ResponseSupplierInfo | undefined> => {
    try {
        const res = await axios.get(`/supplier/?skip=${params.skip}&limit=${params.limit}&name=${params.name}&sort_by=${params.sort_by}`)
        return res.data.data
    } catch (error) {
        console.warn(error)
    }
}

export const fetchListSupplierByCategoryId = async (params: { category_id: string, skip: number, limit: number }): Promise<ResponseSupplierInfo | undefined> => {
    try {
        const res = await api.get(`/supplier/by-category-id/${params.category_id}?skip=${params.skip}&limit=${params.limit}`)
        return res.data?.data
    } catch (error) {
        console.warn(error)
    }
}

export const fetchInfoSupplierBySlug = async (slug: string) => {
    try {
        const res = await axios.get(`/product-category/by-slug/${slug}`)
        return res.data?.data
    } catch (error) {
        console.warn(error)
    }
}

export const followSupplier = async (id: string) => {
    try {
        await api.post(`/supplier/follow/${id}`)
    } catch (error) {
        console.warn(error)
    }
}
