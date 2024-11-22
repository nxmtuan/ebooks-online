import classNames from 'classnames/bind';
import styles from './EBook.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faSquareGooglePlus, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link, useLocation, useParams } from 'react-router-dom';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import * as getEBookService from '~/services/getEBookService';

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

    const handleCountDownload = async () => {
        if (!bookData || !isClickable) return;

        setIsClickable(false);
        try {
            const updatedDownloadCount = bookData.download_count + 1;

            await getEBookService.updateEBook(bookData.id, { download_count: updatedDownloadCount });
            setBookData((prevData) => ({ ...prevData, download_count: updatedDownloadCount }));

            setTimeout(() => {
                setIsClickable(true);
            }, 4000);
        } catch (error) {
            console.log('Error updating download count: ', error);
        }
    };

    console.log('End handle: ', bookData);

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
                                            DOWNLOAD:{' '}
                                            {!bookData ? 'Unknow' : <p>{bookData.download_count || '0'}</p>}
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
                                        <div className={cx('book-rate')}>
                                            <div className={cx('rate-stars')}>
                                                <div className={cx('first-star', 'star')}></div>
                                                <div className={cx('second-star', 'star')}></div>
                                                <div className={cx('third-star', 'star')}></div>
                                                <div className={cx('fourth-star', 'star')}></div>
                                                <div className={cx('fifth-star', 'star')}></div>
                                            </div>
                                            <div className={cx('review-count')}>(0 Reviews)</div>
                                        </div>
                                    </div>
                                    <div className={cx('option-btn')}>
                                        <div className={cx('download')}>
                                            <a
                                                href={data.formats['application/octet-stream']}
                                                onClick={handleCountDownload}
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
                            <div className={cx('review-region')}>
                                <div className={cx('top-region')}>
                                    <h2>READERS REVIEWS</h2>
                                </div>

                                <div className={cx('middle-region')}>
                                    <div className={cx('all-rate-stats')}>
                                        <div className={cx('count-rates')}>
                                            <div className={cx('five-stars')}>
                                                <div className={cx('stars')}>
                                                    <div className={cx('star', 'st')}></div>
                                                    <div className={cx('star', 'nd')}></div>
                                                    <div className={cx('star', 'rd')}></div>
                                                    <div className={cx('star', 'rth')}></div>
                                                    <div className={cx('star', 'fth')}></div>
                                                </div>
                                                <div className={cx('rate-line')}>
                                                    <div className={cx('dark-line')}></div>
                                                    <div className={cx('grey-line')}></div>
                                                </div>
                                            </div>
                                            <div className={cx('four-stars')}>
                                                <div className={cx('stars')}>
                                                    <div className={cx('star', '1')}></div>
                                                    <div className={cx('star', '2')}></div>
                                                    <div className={cx('star', '3')}></div>
                                                    <div className={cx('star', '4')}></div>
                                                    <div className={cx('star', '5')}></div>
                                                </div>
                                                <div className={cx('rate-line')}>
                                                    <div className={cx('dark-line')}></div>
                                                    <div className={cx('grey-line')}></div>
                                                </div>
                                            </div>
                                            <div className={cx('three-stars')}>
                                                <div className={cx('stars')}>
                                                    <div className={cx('star', '1')}></div>
                                                    <div className={cx('star', '2')}></div>
                                                    <div className={cx('star', '3')}></div>
                                                    <div className={cx('star', '4')}></div>
                                                    <div className={cx('star', '5')}></div>
                                                </div>
                                                <div className={cx('rate-line')}>
                                                    <div className={cx('dark-line')}></div>
                                                    <div className={cx('grey-line')}></div>
                                                </div>
                                            </div>
                                            <div className={cx('two-stars')}>
                                                <div className={cx('stars')}>
                                                    <div className={cx('star', '1')}></div>
                                                    <div className={cx('star', '2')}></div>
                                                    <div className={cx('star', '3')}></div>
                                                    <div className={cx('star', '4')}></div>
                                                    <div className={cx('star', '5')}></div>
                                                </div>
                                                <div className={cx('rate-line')}>
                                                    <div className={cx('dark-line')}></div>
                                                    <div className={cx('grey-line')}></div>
                                                </div>
                                            </div>
                                            <div className={cx('one-stars')}>
                                                <div className={cx('stars')}>
                                                    <div className={cx('star', '1')}></div>
                                                    <div className={cx('star', '2')}></div>
                                                    <div className={cx('star', '3')}></div>
                                                    <div className={cx('star', '4')}></div>
                                                    <div className={cx('star', '5')}></div>
                                                </div>
                                                <div className={cx('rate-line')}>
                                                    <div className={cx('dark-line')}></div>
                                                    <div className={cx('grey-line')}></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* average rate */}
                                        <div className={cx('average-rate')}>
                                            <div className={cx('rate-value')}>0.0</div>
                                            <div className={cx('rate-message')}>Average from 0 Reviews</div>
                                            <div className={cx('stars')}>
                                                <div className={cx('star', '1')}></div>
                                                <div className={cx('star', '2')}></div>
                                                <div className={cx('star', '3')}></div>
                                                <div className={cx('star', '4')}></div>
                                                <div className={cx('star', '5')}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('bottom-region')}>
                                    <div className={cx('review-btn')}>
                                        <div className={cx('btn')}>Write Review</div>
                                    </div>
                                </div>
                                <div className={cx('comments-area')}>
                                    <p>Be the first to review this book</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EBook;
