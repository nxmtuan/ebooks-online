import { generateSeed } from '~/seed/seedRandom';
import * as httpRequest from '~/utils/httpRequest';
import shuffleArray from '~/utils/shuffleArray';

const seed = generateSeed();

export const getAllList = async () => {
    try {
        const res = await httpRequest.getEBookList(`/results`);
        const randomizedDataResult = shuffleArray(res, seed)
        return randomizedDataResult;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getEBookById = async (id) => {
    try {
        const res = await httpRequest.getEBookList(`/results/${id}`);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const updateEBook = async (id, data) => {
    try {
        const res = await httpRequest.updateEBook(`/results/${id}`, data);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const search = async (keyword) => {
    try {
        const res = await httpRequest.getEBookList(`/results?keyword=${keyword}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
