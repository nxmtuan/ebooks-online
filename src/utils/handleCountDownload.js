import * as getEBookService from '~/services/getEBookService';

const handleCountDownload = async (bookId, count) => {
    try {
        await getEBookService.updateEBook(bookId, { download_count: count });
    } catch (error) {
        console.log('Error updating count: ', error);
    }
};

export default handleCountDownload;
