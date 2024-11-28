import { generateSeed } from '~/seed/seedRandom';
import * as httpRequest from '~/utils/httpRequest'
import shuffleArray from '~/utils/shuffleArray';

const seed = generateSeed()

export const getListLimit = async (limit = 18) => {
    try {
        const res = await httpRequest.getEBookList(`/results`);
        const randomizedDataResult = shuffleArray(res, seed).slice(0, limit)

        return randomizedDataResult
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
        const randomizedDataResult = shuffleArray(filteredResult, seed).slice(0, limit)

        return randomizedDataResult
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