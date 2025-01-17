import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import classNames from 'classnames/bind';

import styles from './EBook.module.scss';
import * as getEBookService from '~/services/getEBookService';
import TopContent from '~/components/EBookSections/TopContent';
import BottomContent from '~/components/EBookSections/BottomContent';

const cx = classNames.bind(styles);

function EBook() {
    const { id } = useParams();
    const location = useLocation();
    const { data } = location.state || {};

    const [bookData, setBookData] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await getEBookService.getEBookById(`${id}`);
                setBookData(result);
            } catch (error) {
                console.log('Error fetching data: ', error);
            }
        };

        fetchApi();
    }, [id]);

    if (!data) {
        return <p>No book data available</p>;
    }

    return (
        <section className={cx('wrapper')}>
            <div className={cx('row')}>
                <TopContent data1={data} data2={bookData} setData2={setBookData} />

                <BottomContent />
            </div>
        </section>
    );
}

export default EBook;
