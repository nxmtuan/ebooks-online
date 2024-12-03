import { createContext, useContext, useEffect, useState } from 'react';
import * as getEBookService from '~/services/getEBookService';

const ContextAPI = createContext();

export const Provider = ({ children }) => {
    const [listAll, setListAll] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const listAll = await getEBookService.getAllList();
                setListAll(listAll);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchApi();
    }, []);

    return <ContextAPI.Provider value={{ listAll }}>{children}</ContextAPI.Provider>;
};

export const useEBook = () => useContext(ContextAPI);
