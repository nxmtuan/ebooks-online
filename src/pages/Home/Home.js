import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import * as getEBookService from '~/services/getEBookService';
import TopContent from '~/components/HomeSections/TopContent';
import MiddleContent from '~/components/HomeSections/MiddleContent';
import BottomContent from '~/components/HomeSections/BottomContent';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);
const TRENDING_BOOK_BY_VIEW_COUNT = 200000;
const LIMITED_LIST_BOOKS = 18;

function Home() {
    const [listAll, setListAll] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //get API result
    useEffect(() => {
        setIsLoading(true);
        const fetchApi = async () => {
            try {
                const listAll = await getEBookService.getAllList();
                setListAll(listAll);
            } catch (error) {
                console.error('Error fetching data: ', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchApi();
    }, []);

    //Filter eBooks
    const ListBooksLimited = listAll.slice(0, LIMITED_LIST_BOOKS);
    const ListTrendingBooksByView = listAll.filter((book) => book.view_count > TRENDING_BOOK_BY_VIEW_COUNT);
    const ListBooksByEditorChoice = listAll.filter((book) => book.is_editor_choice === true);
    const ListBooksByPrice = listAll.filter((book) => book.price_before_sale > 0);

    return (
        <div className={cx('wrapper')}>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <TopContent data={ListBooksByPrice} />
                    <MiddleContent
                        data1={ListBooksByEditorChoice}
                        data2={ListTrendingBooksByView}
                        data3={ListBooksLimited}
                        data4={listAll}
                    />
                    <BottomContent />
                </>
            )}
        </div>
    );
}

export default Home;
