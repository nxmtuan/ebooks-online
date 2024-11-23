import * as httpRequest from '~/utils/httpRequest'
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5)

export const getListLimit = async (limit = 18) => {
    try {
        const res = await httpRequest.getEBookList(`/results`);

        const shufferedResult = shuffleArray(res).slice(0, limit)
        return shufferedResult
    } catch (error){
        console.log(error);
        return []
    }
}

export const getAllList = async () => {
    try {
        const res = await httpRequest.getEBookList(`/results`);
        return res
    } catch (error){
        console.log(error);
        return []
    }
}

export const getEBookByEditorChoice = async () => {
    try {
        const res = await httpRequest.getEBookList(`/results/?is_editor_choice=true`)
        return res
    } catch (error){
        console.log(error);
        return null
    }
}

export const getEBookByEPrice = async (limit = 7) => {
    try {
        const res = await httpRequest.getEBookList(`/results`)
        const filteredResult = res.filter(items => items.price_before_sale > 0)
        const shufferedResult = shuffleArray(filteredResult).slice(0, limit)

        return shufferedResult
    } catch (error){
        console.log(error);
        return null
    }
}

export const getEBookById = async (id) => {
    try {
        const res = await httpRequest.getEBookById(`/results/${id}`)
        return res
    } catch (error){
        console.log(error);
        return null
    }
}

export const updateEBook = async (id, data) => {
    try {
        const res = await httpRequest.updateEBook(`/results/${id}`, data)
        return res
    } catch (error){
        console.log(error);
        return null
    }
}