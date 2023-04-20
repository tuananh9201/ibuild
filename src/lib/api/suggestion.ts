import axios from './api'

export interface ISuggestionKeyword {
    id: string
    name: string
}

export const getSuggestionKeyword = async (params: { search_type: string, limit: number, keyword: string }): Promise<ISuggestionKeyword[]> => {
    try {
        const res = await axios.get(`/suggestion-keyword/?search_type=${params.search_type}&limit=${params.limit}&keyword=${params.keyword}`)
        return res?.data?.data || []
    } catch (error) {
        console.warn(error)
        return []
    }
}