import axios from './api'
import api from './api';
import { ICategory, ResponseSupplierInfo } from "../types";

export const fetchListSupplierBySearch = async (params: { skip: number, limit: number, name: string, sort_by: string, cities: Array<string> }): Promise<ResponseSupplierInfo | undefined> => {
    let urlCity = ``
    if (params.cities.length > 0 && params.cities[0] !== '0') {
        params.cities.forEach((city) => {
            urlCity += `&cities=${city}`
        })
    }
    try {
        const res = await axios.get(`/supplier/?skip=${params.skip}&limit=${params.limit}&name=${params.name}&sort_by=${params.sort_by}${urlCity ? urlCity : ''}`)
        return res.data.data
    } catch (error) {
        console.warn(error)
    }
}

export const fetchListSupplierByCategoryId = async (params: { category_id: string, skip: number, limit: number, sort_by: string, cities: Array<string> }): Promise<ResponseSupplierInfo | undefined> => {
    let urlCity = ``
    if (params.cities.length > 0 && params.cities[0] !== '0') {
        params.cities.forEach((city) => {
            urlCity += `&cities=${city}`
        })
    }
    try {
        const res = await api.get(`/supplier/by-category-id/${params.category_id}?skip=${params.skip}&limit=${params.limit}&sort_by=${params.sort_by}${urlCity ? urlCity : ''}`)
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
