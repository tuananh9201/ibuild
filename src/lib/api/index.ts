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