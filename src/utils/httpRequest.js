import axios from 'axios';

const listEBooksRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

const eBooksRequest = listEBooksRequest;
const updateEBookRequest = listEBooksRequest

export const getEBookList = async (path, option = {}) => {
    const response = await listEBooksRequest.get(path, option);
    return response.data;
};

export const getEBookById = async (path, option = {}) => {
    const response = await eBooksRequest.get(path, option);
    return response.data;
};

export const updateEBook = async (path, option = {}) => {
    const response = await updateEBookRequest.patch(path, option);
    return response.data;
};

const httpRequest = {
    listEBooksRequest,
    eBooksRequest,
    updateEBookRequest,
};

export default httpRequest;
