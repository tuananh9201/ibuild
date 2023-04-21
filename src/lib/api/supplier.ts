import axios from './api'
import { ResponseSupplierInfo } from "../types";

export const fetchListSupplierBySearch = async (params: { skip: number, limit: number, name: string }): Promise<ResponseSupplierInfo | undefined> => {
    try {
        const res = await axios.get(`/supplier/?skip=${params.skip}&limit=${params.limit}&name=${params.name}`)
        return res.data.data
    } catch (error) {
        console.warn(error)
    }
}