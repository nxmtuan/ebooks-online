import * as httpRequest from '~/utils/httpRequest'

export const getListLimit = async (limit = 18) => {
    try {
        const res = await httpRequest.getEBookList(`/results?_limit=${limit}`);
        return res
    } catch (error){
        console.log(error);
        return []
    }
}

export const getEBookByEditorChoice = async (id) => {
    try {
        const res = await httpRequest.getEBookList(`/results/?is_editor_choice=true`)
        return res
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