import axios from './api'
import api from './api';
import { ICategory, ICategoryViewer, IChart, IChartParams, ISupplierInfo, ResponseSupplierInfo } from "../types";

export const fetchListSupplierBySearch = async (params: { skip: number, limit: number, name: string, sort_by: string, cities: Array<string>; districts: Array<string> }): Promise<ResponseSupplierInfo | undefined> => {
    let urlCity = ``
    let urlDistrict = ``
    if (params.cities.length > 0 && params.cities[0] !== '0') {
        params.cities.forEach((city) => {
            urlCity += `&cities=${city}`
        })
    }
    if (params.districts.length > 0 && params.districts[0] !== '0') {
        params.districts.forEach((dis) => {
            urlDistrict += `&districts=${dis}`
        })
    }
    try {
        const res = await axios.get(`/supplier/?skip=${params.skip}&limit=${params.limit}&name=${params.name}&sort_by=${params.sort_by}${urlCity ? urlCity : ''}${urlDistrict ? urlDistrict : ''}`)
        return res.data.data
    } catch (error) {
        console.warn(error)
    }
}

export const fetchListSupplierByCategoryId = async (params: { category_id: string, skip: number, limit: number, sort_by: string, cities: Array<string>, districts: Array<string> }): Promise<ResponseSupplierInfo | undefined> => {
    let urlCity = ``
    let urlDistrict = ``
    if (params.cities.length > 0 && params.cities[0] !== '0') {
        params.cities.forEach((city) => {
            urlCity += `&cities=${city}`
        })
    }
    if (params.districts.length > 0 && params.districts[0] !== '0') {
        params.districts.forEach((dis) => {
            urlDistrict += `&districts=${dis}`
        })
    }
    try {
        const res = await api.get(`/supplier/by-category-id/${params.category_id}?skip=${params.skip}&limit=${params.limit}&sort_by=${params.sort_by}${urlCity ? urlCity : ''}${urlDistrict ? urlDistrict : ''}`)
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

export const fetchSupplierInfoBySlug = async (supplierSlug: string): Promise<ISupplierInfo | undefined> => {
    try {
        const res = await axios.get(`/supplier/by-slug/${supplierSlug}`)
        return res.data?.data
    } catch (error) {
        console.warn(error)
    }
    return undefined
}

export const getCategoriesViewer = async (params: IChartParams): Promise<ICategoryViewer[]> => {
    try {
        const res = await axios.get(`/supplier/chart-categories-viewer/?limit=${params.limit}&range_time=${params.rangeTime}&supplier_id=${params.supplierId}`)
        return res.data?.data || []
    } catch (error) {
        console.warn(error)
    }
    return []
}

export const categoriesForSupplier = async (supplierId: string): Promise<IChart[] | null> => {
    if (!supplierId) return null
    try {
        const res = await axios.get(`/supplier/chart-root-categories/?supplier_id=${supplierId}`)
        return res.data?.data
    } catch (error) {
        console.warn(error)
    }
    return null
}

export const rootsCategoryBySupplierId = async (supplierId: string): Promise<ICategory[] | null> => {
    if (!supplierId) return null
    try {
        const res = await axios.get(`/supplier/roots-by-supplier-id/${supplierId}`)
        return res.data?.data
    } catch (error) {
        console.warn(error)
    }
    return null
}

export const getCategoriesByRootCategory = async (params: { supplierId: string, rootCategoryId: string }): Promise<ICategory[] | null> => {
    if (!params.supplierId) return null
    try {
        const res = await axios.get(`/supplier/get-categories-by-parent/${params.supplierId}${params.rootCategoryId !== '0' ? `?category_id=${params.rootCategoryId}` : ''}`)
        return res.data?.data
    } catch (error) {
        console.warn(error)
    }
    return null
}

export const getWatchListSupplier = async (params: { limit: number, skip: number }): Promise<ResponseSupplierInfo | null> => {
    try {
        const res = await api.get(`/supplier/follows-by-user/?limit=${params.limit}&skip=${params.skip}`)
        return res?.data?.data
    } catch (error) {
        console.warn(error)
    }
    return null
}
