import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import * as getEBookService from '~/services/getEBookService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import dragToScrollEvent from '~/utils/dragToScrollEvent';
import { BookCard, MoreInfoBookCard } from '~/components/BookCard';

const cx = classNames.bind(styles);
const TRENDING_BOOK_BY_VIEW_COUNT = 200000;

function Home() {
    console.log('Home re-render');
    const rowRef1 = useRef(null);
    const rowRef2 = useRef(null);
    const rowRef3 = useRef(null);

    const [listResult, setListResult] = useState([]);
    const [listLimitedResult, setListLimitedResult] = useState([]);
    const [editorChoiceListResult, setEditorChoiceListResult] = useState([]);
    const [priceListResult, setPriceListResult] = useState([]);

    //Drag to scroll event
    useEffect(() => {
        const cleanup1 = dragToScrollEvent(rowRef1);
        const cleanup2 = dragToScrollEvent(rowRef2);
        const cleanup3 = dragToScrollEvent(rowRef3);

        return () => {
            cleanup1?.();
            cleanup2?.();
            cleanup3?.();
        };
    }, []);

    //Fetch Api
    useEffect(() => {
        const fetchApi = async () => {
            try {
                //Fetch Data
                const listLimited = await getEBookService.getListLimit();
                const editorChoice = await getEBookService.getEBookByEditorChoice();
                const listAll = await getEBookService.getAllList();
                const listByPrice = await getEBookService.getEBookByEPrice();
                console.warn('Fetched Data: ', listByPrice)

                //Filter list by view_count
                const filteredList = listAll.filter((book) => book.view_count > TRENDING_BOOK_BY_VIEW_COUNT);

                //Save data to state
                setListResult(filteredList);
                setEditorChoiceListResult(editorChoice);
                setListLimitedResult(listLimited);
                setPriceListResult(listByPrice);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchApi();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {/* Top content */}
            <div className={cx('top-content')}>
                <div className={cx('top-content-container', 'container')}>
                    <div className={cx('row')}>
                        <div className={cx('block-header')}>
                            <h2>FREE EBOOKS AND DEALS</h2>
                            <Link to="/">(View all)</Link>
                        </div>

                        <div className={cx('block-content')}>
                            <div className={cx('list-content')} ref={rowRef2}>
                                {priceListResult && priceListResult.length > 0 ? (
                                    priceListResult.map((result) => <MoreInfoBookCard dataDeals={result} />)
                                ) : (
                                    <p>No eBook available</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* middle content */}
            <div className={cx('middle-content')}>
                <div className={cx('middle-content-container', 'container')}>
                    <div className={cx('row')}>
                        {/* editor choice */}
                        <div className={cx('editor-choice')}>
                            <div className={cx('block-header')}>
                                <h2>EDITOR'S CHOICE</h2>
                                <Link to="/">(View all)</Link>
                            </div>

                            <div className={cx('block-content')}>
                                <div className={cx('list-content')} ref={rowRef1}>
                                    {editorChoiceListResult && editorChoiceListResult.length > 0 ? (
                                        editorChoiceListResult.map((result) => <BookCard dataBook={result} />)
                                    ) : (
                                        <p>No books available</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* trending book */}
                        <div className={cx('trending-book')}>
                            <div className={cx('block-header')}>
                                <h2>
                                    TRENDING BOOKS <FontAwesomeIcon icon={faFire} className={cx('fire-icon')} />
                                </h2>
                                <Link to="/">(View all)</Link>
                            </div>

                            <div className={cx('block-content')}>
                                <div className={cx('list-content')}>
                                    {listResult && listResult.length > 0 ? (
                                        listResult.map((result) => <BookCard dataBook={result} />)
                                    ) : (
                                        <p>No eBook available</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* popular */}
                        <div className={cx('popular')}>
                            <div className={cx('block-header')}>
                                <h2>POPULAR CLASSICS</h2>
                                <Link to="/">(View all)</Link>
                            </div>

                            <div className={cx('block-content')}>
                                <div className={cx('list-content')}>
                                    {listLimitedResult && listLimitedResult.length > 0 ? (
                                        listLimitedResult.map((result) => <BookCard dataBook={result} />)
                                    ) : (
                                        <p>No books available</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
