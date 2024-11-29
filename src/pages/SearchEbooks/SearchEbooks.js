import classNames from 'classnames/bind';
import styles from './SearchEbooks.module.scss';
import { BookCard } from '~/components/BookCard';
import { useEffect, useState } from 'react';
import * as getEBookService from '~/services/getEBookService';

const cx = classNames.bind(styles);

function SearchEbooks() {
    const [listLimitedResult, setListLimitedResult] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                //Fetch Data
                const listLimited = await getEBookService.getListLimit();

                setListLimitedResult(listLimited);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchApi();
    }, []);

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
                                            <h2>Genre</h2>
                                            <div className={cx('filter')}>
                                                <label className={cx('custom-checkbox')}>
                                                    <input type="checkbox" className={cx('checkmark')} />
                                                    <span></span>
                                                </label>
                                                <p>Adventure</p>
                                            </div>
                                        </div>
    
                                        <div className={cx('sort-filter')}>
                                            <h2>Sort by</h2>
                                            <div className={cx('filter')}>
                                                <label className={cx('custom-checkbox')}>
                                                    <input type="checkbox" className={cx('checkmark')} />
                                                    <span></span>
                                                </label>
                                                <p>A - Z</p>
                                            </div>
                                            <div className={cx('filter')}>
                                                <label className={cx('custom-checkbox')}>
                                                    <input type="checkbox" />
                                                    <span></span>
                                                </label>
                                                <p>Views</p>
                                            </div>
                                            <div className={cx('filter')}>
                                                <label className={cx('custom-checkbox')}>
                                                    <input type="checkbox" />
                                                    <span></span>
                                                </label>
                                                <p>Downloads</p>
                                            </div>
                                        </div>
    
                                        <div className={cx('btn-region')}>
                                            <button className={cx('apply-btn')}>Apply</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('right-region')}>
                                <div className={cx('title')}>Search Results</div>
                                <div className={cx('result-region')}>
                                    <div className={cx('block')}>
                                        <div className={cx('list')}>
                                            {listLimitedResult && listLimitedResult.length > 0 ? (
                                                listLimitedResult.map((result) => (
                                                    <BookCard
                                                        dataBook={result}
                                                        itemsCardStyle={{ width: '165px', paddingBottom: '30px',  }}
                                                        bookImageStyle={{ height: '247px' }}
                                                    />
                                                ))
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
            </div>
        </div>
    );
}

export default SearchEbooks;
