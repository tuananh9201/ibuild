import { SelectOptionModel } from '../models'
import axios from './api'

export const importFile = async (file: any) => {
  try {
    const res = await axios.post('/utils/images/', file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return res
  } catch (error) {
    console.warn(error)
    return error
  }
}

export const getJobs = async (): Promise<SelectOptionModel[] | null> => {
  try {
    const res = await axios.get('/job/?limit=1000&skip=0')
    return res?.data?.data || []
  } catch (error) {
    console.warn(error)
  }
  return null
}

export const getPositionJob = async (): Promise<SelectOptionModel[] | null> => {
  try {
    const res = await axios.get('/position/?limit=1000&skip=0')
    return res?.data?.data || []
  } catch (error) {
    console.warn(error)
  }
  return null
}

export const getBusinessServiceType = async (): Promise<SelectOptionModel[] | null> => {
  try {
    const res = await axios.get('/business-type/?limit=1000&skip=0')
    return res?.data?.data || []
  } catch (error) {
    console.warn(error)
  }
  return null
}