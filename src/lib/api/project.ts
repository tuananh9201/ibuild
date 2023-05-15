import { IProject, IProjectResponse } from '../types'
import axios from './api'

export const getProjectBySupplierId = async (supplierId: string): Promise<IProject[]> => {
    if (!supplierId) return []
    try {
        const res = await axios.get(`/project/by-supplier-id/${supplierId}`)
        return res.data?.data
    } catch (error) {
        console.warn(error)
    }
    return []
}