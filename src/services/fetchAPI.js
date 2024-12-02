import * as getEBookService from '~/services/getEBookService';

const fetchApi = async () => {
    try {
        const listAll = await getEBookService.getAllList();
        return listAll;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
};

export default fetchApi;
