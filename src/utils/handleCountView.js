import * as getEBookService from '~/services/getEBookService';

const handleCountView = (id) => {
    const fetchApi = async () => {
        try {
            const result = await getEBookService.getEBookById(`${id}`);

            const updatedViewCount = result.view_count + 1;
            await getEBookService.updateEBook(`${id}`, { view_count: updatedViewCount });
        } catch (error) {
            console.log('Error fetching data: ', error);
        }
    };

    fetchApi();
};

export default handleCountView