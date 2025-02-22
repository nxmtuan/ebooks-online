import classNames from 'classnames/bind';
import styles from './SearchEbooks.module.scss';
import { BookCard } from '~/components/BookCard';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import * as getEBookService from '~/services/getEBookService';
import popularGenres from '~/utils/popularGenres';
import Searching from '~/components/Searching';

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
    //const [visibleFilter, setVisibleFilter] = useState(false);
    const filterRef = useRef(null);

    const [selectedGenres, setSelectedGenres] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [sortOption, setSortOption] = useState('');
    const [isSearching, setIsSearching] = useState(true);

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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSortFormat = () => {
        setSortFormat(!sortFormat);
    };

    const handleCheckBoxChange = useCallback((category) => {
        setSelectedGenres((prev) =>
            prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category],
        );
    }, []);

    const handleApplyFilter = useCallback(
        async (e) => {
            setIsSearching(true);
            try {
                if (filterRef.current) {
                    e.preventDefault();

                    const result = await getEBookService.filterGenres(selectedGenres);
                    setFilteredBooks(result);

                    const queryParams = new URLSearchParams();
                    selectedGenres.forEach((genre) => queryParams.append('genre', genre));
                    navigate(`?${queryParams.toString()}`);
                    setCurrentPage(0);
                    setIsSearching(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    filterRef.current.classList.remove(styles.show);
                } else {
                    console.log('Filter element not found!');
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        },
        [selectedGenres, navigate],
    );

    const handleSortChange = (event) => {
        const selectedOption = event.target.value;
        setSortOption(selectedOption);

        if (selectedOption === 'A-Z') {
            currentPageData.sort((a, b) => a.title.localeCompare(b.title));
        }
        if (selectedOption === 'Views') {
            currentPageData.sort((a, b) => b.view_count - a.view_count);
        }
        if (selectedOption === 'Downloads') {
            currentPageData.sort((a, b) => b.download_count - a.download_count);
        }
    };

    const toggleAddClass = () => {
        if (filterRef.current) {
            filterRef.current.classList.add(styles.show);
        }
    };
    const toggleRemoveClass = () => {
        if (filterRef.current) {
            filterRef.current.classList.remove(styles.show);
        }
    };

    return (
        <section className={cx('wrapper')}>
            <div className={cx('row')}>
                <div className={cx('main-region')}>
                    <div className={cx('container')}>
                        <div className={cx('row')}>
                            <div className={cx('left-region')}>
                                <div ref={filterRef} className={cx('child-of-left-region')}>
                                    <div className={cx('closeBtn', 'sub-left-region')} onClick={toggleRemoveClass}>
                                        CLOSE FILTERS
                                        <FontAwesomeIcon icon={faXmark} />
                                    </div>
                                    <div className={cx('left-region-content')}>
                                        <div className={cx('sort-filter')}>
                                            <h2>Sort by</h2>
                                            <div className={cx('filter')}>
                                                <label className={cx('custom-radio')}>
                                                    <input
                                                        type="radio"
                                                        value="A-Z"
                                                        name="option"
                                                        onChange={handleSortChange}
                                                    />
                                                    <span></span>
                                                </label>
                                                <p>A - Z</p>
                                            </div>
                                            <div className={cx('filter')}>
                                                <label className={cx('custom-radio')}>
                                                    <input
                                                        type="radio"
                                                        value="Views"
                                                        name="option"
                                                        onChange={handleSortChange}
                                                    />
                                                    <span></span>
                                                </label>
                                                <p>Views</p>
                                            </div>
                                            <div className={cx('filter')}>
                                                <label className={cx('custom-radio')}>
                                                    <input
                                                        type="radio"
                                                        value="Downloads"
                                                        name="option"
                                                        onChange={handleSortChange}
                                                    />
                                                    <span></span>
                                                </label>
                                                <p>Downloads</p>
                                            </div>
                                        </div>

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

                                        <div className={cx('btn-region')}>
                                            <button className={cx('apply-btn')} onClick={handleApplyFilter}>
                                                Apply
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('right-region')}>
                                <div className={cx('toggleBtn', 'sub-left-region')} onClick={toggleAddClass}>
                                    FILTERS
                                    <FontAwesomeIcon icon={faFilter} />
                                </div>
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
                                {isSearching ? (
                                    <Searching />
                                ) : (
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
                                )}

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
        </section>
    );
}

export default SearchEbooks;
