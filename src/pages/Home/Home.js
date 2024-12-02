import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import * as getEBookService from '~/services/getEBookService';
import dragToScrollEvent from '~/utils/dragToScrollEvent';
import { BookCard, MoreInfoBookCard } from '~/components/BookCard';

const cx = classNames.bind(styles);
const TRENDING_BOOK_BY_VIEW_COUNT = 200000;
const LIMITED_LIST_BOOKS = 18;

function Home() {
    const rowRef1 = useRef(null);
    const rowRef2 = useRef(null);
    const rowRef3 = useRef(null);

    const [listAllBooks, setListAllBooks] = useState([]);
    const navigate = useNavigate();

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
                const listAll = await getEBookService.getAllList();
                setListAllBooks(listAll);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchApi();
    }, []);

    //Filter eBooks
    const ListBooksLimited = listAllBooks.slice(0, LIMITED_LIST_BOOKS);
    const ListTrendingBooksByView = listAllBooks.filter((book) => book.view_count > TRENDING_BOOK_BY_VIEW_COUNT);
    const ListBooksByEditorChoice = listAllBooks.filter((book) => book.is_editor_choice === true);
    const ListBooksByPrice = listAllBooks.filter((book) => book.price_before_sale > 0);

    // const getAllGenres = listAllBooks.flatMap((book) => book.bookshelves);
    // const uniqueGenres = [...new Set(getAllGenres)];
    // console.log(uniqueGenres);

    //handle get list with conditions
    const handleGetAllList = (e) => {
        e.preventDefault();
        navigate(`/search?keyword=${'All eBooks'}`, { state: { list: listAllBooks } });
    };

    const handleGetListFree = (e) => {
        e.preventDefault();
        navigate(`/search?keyword=${'Free eBooks'}`, { state: { listFree: ListBooksByPrice } });
    };

    const handleGetListEditorChoice = (e) => {
        e.preventDefault();
        navigate(`/search?keyword=${'Editors choice'}`, { state: { listChoice: ListBooksByEditorChoice } });
    };

    const handleGetListTrending = (e) => {
        e.preventDefault();
        navigate(`/search?keyword=${'Trending book'}`, { state: { listTrending: ListTrendingBooksByView } });
    };

    return (
        <div className={cx('wrapper')}>
            {/* Top content */}
            <div className={cx('top-content')}>
                <div className={cx('top-content-container', 'container')}>
                    <div className={cx('row')}>
                        <div className={cx('block-header')}>
                            <h2>FREE EBOOKS AND DEALS</h2>
                            <Link onClick={handleGetListFree}>(View all)</Link>
                        </div>

                        <div className={cx('block-content')}>
                            <div className={cx('list-content')} ref={rowRef1}>
                                {ListBooksByPrice && ListBooksByPrice.length > 0 ? (
                                    ListBooksByPrice.map((result) => (
                                        <MoreInfoBookCard dataDeals={result} key={result.id} />
                                    ))
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
                                <Link onClick={handleGetListEditorChoice}>(View all)</Link>
                            </div>

                            <div className={cx('block-content')}>
                                <div className={cx('list-content')} ref={rowRef2}>
                                    {ListBooksByEditorChoice && ListBooksByEditorChoice.length > 0 ? (
                                        ListBooksByEditorChoice.map((result) => <BookCard dataBook={result} />)
                                    ) : (
                                        <p>No books available</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Recommended */}
                        <div className={cx('recommended')}>
                            <div className={cx('block-header')}>
                                <h2>Recommended for You</h2>
                                <Link to="#">(View all)</Link>
                            </div>

                            <div className={cx('block-content')}>
                                <div className={cx('list-content')} ref={rowRef3}>
                                    {ListBooksByEditorChoice && ListBooksByEditorChoice.length > 0 ? (
                                        ListBooksByEditorChoice.map((result) => <BookCard dataBook={result} />)
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
                                <Link onClick={handleGetListTrending}>(View all)</Link>
                            </div>

                            <div className={cx('block-content')}>
                                <div className={cx('list-content')}>
                                    {ListTrendingBooksByView && ListTrendingBooksByView.length > 0 ? (
                                        ListTrendingBooksByView.map((result) => <BookCard dataBook={result} />)
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
                                <Link onClick={handleGetAllList}>(View all)</Link>
                            </div>

                            <div className={cx('block-content')}>
                                <div className={cx('list-content')}>
                                    {ListBooksLimited && ListBooksLimited.length > 0 ? (
                                        ListBooksLimited.map((result) => <BookCard dataBook={result} />)
                                    ) : (
                                        <p>No books available</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom content */}
            <div className={cx('bottom-content')}>
                <div className={cx('bottom-title')}>
                    <p>Recently Questions</p>
                    <Link to={'#'}>(View all)</Link>
                </div>
                <div className={cx('q-a-area')}>No Question Yet!</div>
                <div className={cx('comments-area')}>
                    <p>No comment yet</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
