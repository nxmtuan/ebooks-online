import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faSquareGooglePlus, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import styles from './EBook.module.scss';
import { Rating, ReviewRegion } from '~/components/ReviewRegion';
import * as getEBookService from '~/services/getEBookService';
import handleCountDownload from '~/utils/handleCountDownload';

const cx = classNames.bind(styles);

function EBook() {
    const { id } = useParams();
    const location = useLocation();
    const { data } = location.state || {};

    const [bookData, setBookData] = useState(null);
    const [isClickable, setIsClickable] = useState(true);

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

    const countDownload = useCallback(async () => {
        if (!bookData || !isClickable) return;

        const updatedDownloadCount = bookData.download_count + 1;

        setIsClickable(false);
        setBookData((prevData) => ({ ...prevData, download_count: updatedDownloadCount }));
        handleCountDownload(bookData.id, updatedDownloadCount);

        setTimeout(() => {
            setIsClickable(true);
        }, 4000);
    }, [bookData, isClickable]);

    if (!data) {
        return <p>No book data available</p>;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('row')}>
                <div className={cx('top-content')}>
                    <div className={cx('container')}>
                        <div className={cx('row')}>
                            <div className={cx('left-region')}>
                                <div className={cx('book-image-region')}>
                                    <div className={cx('book-image')}>
                                        <img
                                            src={data.formats['image/jpeg']}
                                            alt={data.title || 'Book cover'}
                                            loading="lazy"
                                            draggable="false"
                                        />
                                    </div>
                                </div>

                                <div className={cx('info-region')}>
                                    <div className={cx('published-year')}>
                                        <h2>
                                            PUBLISHED: <p>{data.published || '0'}</p>
                                        </h2>
                                    </div>

                                    <div className={cx('pages-count')}>
                                        <h2>
                                            VIEWS: <p>{data.view_count || '0'}</p>
                                        </h2>
                                    </div>

                                    <div className={cx('download-count')}>
                                        <h2>
                                            DOWNLOAD: {!bookData ? 'Unknow' : <p>{bookData.download_count || '0'}</p>}
                                        </h2>
                                    </div>

                                    <div className={cx('share-option')}>
                                        <h2>Share This</h2>
                                        <div className={cx('share-icon')}>
                                            <a href="https://facebook.com" className={cx('fb')}>
                                                <FontAwesomeIcon icon={faSquareFacebook} className={cx('icon')} />
                                            </a>
                                            <a href="https://x.com" className={cx('x')}>
                                                <FontAwesomeIcon icon={faSquareXTwitter} className={cx('icon')} />
                                            </a>
                                            <a href="https://mail.google.com/" className={cx('gplus')}>
                                                <FontAwesomeIcon icon={faSquareGooglePlus} className={cx('icon')} />
                                            </a>
                                        </div>
                                    </div>

                                    <div className={cx('save-favorite')}>
                                        <Link to={'/flag/favorite'}>Save to favorite</Link>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('right-region')}>
                                <div className={cx('block-info')}>
                                    <div className={cx('title')}>{data.title}</div>
                                    <div className={cx('sub-title')}>{data.sub_title || ''}</div>
                                    <div className={cx('author-and-rate')}>
                                        <div className={cx('author')}>
                                            By
                                            <Link to={'/author/id'}>{data.authors.map(({ name }) => name)}</Link>
                                        </div>
                                        <Rating />
                                    </div>
                                    <div className={cx('option-btn')}>
                                        <div className={cx('download')}>
                                            <a
                                                href={data.formats['application/octet-stream']}
                                                onClick={countDownload}
                                                className={cx('download-btn')}
                                                style={{ pointerEvents: isClickable ? 'auto' : 'none' }}
                                            >
                                                <FontAwesomeIcon icon={faDownload} className={cx('icon')} />
                                                <p>Free Download</p>
                                            </a>
                                        </div>
                                        <div className={cx('read')}>
                                            <a href={data.formats['text/html']} className={cx('read-btn')}>
                                                <p>Read Online</p>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className={cx('block-summary')}>
                                    <p>
                                        <div>
                                            <strong>Subjects:</strong>
                                            <p>
                                                {data.subjects.map((res) => (
                                                    <li>{res}</li>
                                                ))}
                                            </p>
                                        </div>
                                        <br /> <br />
                                        <div>
                                            <strong>Bookshelves:</strong>
                                            <p>
                                                {data.bookshelves.map((res) => (
                                                    <li>{res}</li>
                                                ))}
                                            </p>
                                        </div>
                                    </p>
                                </div>

                                <div className={cx('block-genre')}>
                                    <div className={cx('field-genre')}>
                                        {data.bookshelves.map((res) => (
                                            <div className={cx('genre-btn')}>
                                                <Link>{res}</Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('bottom-content')}>
                    <div className={cx('container')}>
                        <div className={cx('row')}>
                            <ReviewRegion />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EBook;
