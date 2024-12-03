import classNames from 'classnames/bind';
import styles from './SearchEbooks.module.scss';
import { BookCard } from '~/components/BookCard';
import { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import * as getEBookService from '~/services/getEBookService';
import popularGenres from '~/utils/popularGenres';

const cx = classNames.bind(styles);

function SearchEbooks() {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const searchResult = location.state?.resultData;
    const listAllEbooks = location.state?.list;
    const listFreeEbooks = location.state?.listFree;
    const listChoiceEbooks = location.state?.listChoice;
    const listTrendingEbooks = location.state?.listTrending;
    const itemsPerPage = 20;
    const keyword = searchParams.get('keyword');
    const navigate = useNavigate();

    const [selectedGenres, setSelectedGenres] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);

    const [sortFormat, setSortFormat] = useState(false);
    const [currentPageData, setCurrentPageData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        if (filteredBooks && filteredBooks.length > 0) {
            setCurrentPageData(filteredBooks.slice(startIndex, endIndex));
        } else if (searchResult && searchResult.length > 0) {
            setCurrentPageData(searchResult.slice(startIndex, endIndex));
        } else if (listAllEbooks && listAllEbooks.length > 0) {
            setCurrentPageData(listAllEbooks.slice(startIndex, endIndex));
        } else if (listFreeEbooks && listFreeEbooks.length > 0) {
            setCurrentPageData(listFreeEbooks.slice(startIndex, endIndex));
        } else if (listChoiceEbooks && listChoiceEbooks.length > 0) {
            setCurrentPageData(listChoiceEbooks.slice(startIndex, endIndex));
        } else if (listTrendingEbooks && listTrendingEbooks.length > 0) {
            setCurrentPageData(listTrendingEbooks.slice(startIndex, endIndex));
        } else {
            setCurrentPageData([]);
        }
    }, [currentPage, searchResult, listAllEbooks, listFreeEbooks, listChoiceEbooks, listTrendingEbooks, filteredBooks]);
    console.log(currentPageData);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const genres = params.getAll('genre');

        if (genres.length > 0) {
            setSelectedGenres(genres);

            getEBookService.filterGenres(genres).then((result) => {
                setFilteredBooks(result);
            });
        }
    }, []);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const handleSortFormat = () => {
        setSortFormat(true);
    };

    const handleCheckBoxChange = useCallback((category) => {
        setSelectedGenres((prev) =>
            prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category],
        );
    }, []);

    const handleApplyFilter = useCallback(
        async (e) => {
            try {
                e.preventDefault();

                const result = await getEBookService.filterGenres(selectedGenres);
                setFilteredBooks(result);

                const queryParams = new URLSearchParams();
                selectedGenres.forEach((genre) => queryParams.append('genre', genre));
                navigate(`?${queryParams.toString()}`);
                setCurrentPage(0);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        },
        [selectedGenres, navigate],
    );
    console.log(filteredBooks);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('row')}>
                <div className={cx('main-region')}>
                    <div className={cx('container')}>
                        <div className={cx('row')}>
                            <div className={cx('left-region')}>
                                <div className={cx('child-of-left-region')}>
                                    <div className={cx('left-region-content')}>
                                        <div className={cx('genre-filter')}>
                                            <h2>Popular Genres</h2>
                                            {popularGenres && popularGenres.length > 0 ? (
                                                popularGenres.map((result, index) => (
                                                    <div className={cx('filter')} key={index}>
                                                        <label className={cx('custom-checkbox')}>
                                                            <input
                                                                type="checkbox"
                                                                onChange={() => handleCheckBoxChange(result)}
                                                                checked={selectedGenres.includes(result)}
                                                            />
                                                            <span></span>
                                                        </label>
                                                        <p>{result}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No Genres Found!</p>
                                            )}
                                        </div>

                                        <div className={cx('sort-filter')}>
                                            <h2>Sort by</h2>
                                            <div className={cx('filter')}>
                                                <label className={cx('custom-radio')}>
                                                    <input type="radio" name="option" />
                                                    <span></span>
                                                </label>
                                                <p>A - Z</p>
                                            </div>
                                            <div className={cx('filter')}>
                                                <label className={cx('custom-radio')}>
                                                    <input type="radio" name="option" />
                                                    <span></span>
                                                </label>
                                                <p>Views</p>
                                            </div>
                                            <div className={cx('filter')}>
                                                <label className={cx('custom-radio')}>
                                                    <input type="radio" name="option" />
                                                    <span></span>
                                                </label>
                                                <p>Downloads</p>
                                            </div>
                                            <div className={cx('filter')}>
                                                <label className={cx('custom-radio')}>
                                                    <input type="radio" name="option" />
                                                    <span></span>
                                                </label>
                                                <p>Random</p>
                                            </div>
                                        </div>

                                        <div className={cx('btn-region')}>
                                            <button className={cx('apply-btn')} onClick={handleApplyFilter}>
                                                Apply
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('right-region')}>
                                <div className={cx('title')}>
                                    Search Results
                                    <p>{keyword ? `Result for: "${keyword}"` : 'Genres filter'}</p>
                                </div>
                                <div className={cx('sort-format')} onClick={() => handleSortFormat()}>
                                    <p>Sort format: </p>
                                    <FontAwesomeIcon
                                        className={cx('icon')}
                                        icon={sortFormat ? faArrowUp : faArrowDown}
                                    />
                                </div>
                                <div className={cx('result-region')}>
                                    <div className={cx('block')}>
                                        <div className={cx('list')}>
                                            {currentPageData && currentPageData.length > 0 ? (
                                                currentPageData.map((result) => (
                                                    <BookCard
                                                        key={result.id}
                                                        dataBook={result}
                                                        itemsCardStyle={{ width: '165px', paddingBottom: '30px' }}
                                                        bookImageStyle={{ height: '247px' }}
                                                    />
                                                ))
                                            ) : (
                                                <p>No books available</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <ReactPaginate
                                    previousLabel={'< Previous'}
                                    nextLabel={'Next >'}
                                    breakLabel={'...'}
                                    pageCount={Math.ceil(
                                        (searchResult?.length || 0) / itemsPerPage ||
                                            (listAllEbooks?.length || 0) / itemsPerPage ||
                                            (listFreeEbooks?.length || 0) / itemsPerPage ||
                                            (listChoiceEbooks?.length || 0) / itemsPerPage ||
                                            (listTrendingEbooks?.length || 0) / itemsPerPage ||
                                            (filteredBooks?.length || 0) / itemsPerPage,
                                    )}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={3}
                                    onPageChange={handlePageChange}
                                    containerClassName={cx('pagination')}
                                    activeClassName={cx('active')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchEbooks;
