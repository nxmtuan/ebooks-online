import styles from '~/pages/EBook/EBook.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faSquareGooglePlus, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function LeftRegion({ data1, data2 }) {
    return (
        <div className={cx('left-region')}>
            <div className={cx('book-image-region')}>
                <div className={cx('book-image')}>
                    <img
                        src={data1.formats['image/jpeg']}
                        alt={data1.title || 'Book cover'}
                        loading="lazy"
                        draggable="false"
                    />
                </div>
            </div>

            <div className={cx('info-region')}>
                <div className={cx('published-year')}>
                    <h2>
                        PUBLISHED: <p>{data1.published || '0'}</p>
                    </h2>
                </div>

                <div className={cx('pages-count')}>
                    <h2>
                        VIEWS: <p>{data1.view_count || '0'}</p>
                    </h2>
                </div>

                <div className={cx('download-count')}>
                    <h2>DOWNLOAD: {!data2 ? 'Unknow' : <p>{data2.download_count || '0'}</p>}</h2>
                </div>

                <div className={cx('share-option')}>
                    <h2>Share This</h2>
                    <div className={cx('share-icon')}>
                        <a href="https://facebook.com" className={cx('fb')} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faSquareFacebook} className={cx('icon')} />
                        </a>
                        <a href="https://x.com" className={cx('x')} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faSquareXTwitter} className={cx('icon')} />
                        </a>
                        <a
                            href="https://mail.google.com/"
                            className={cx('gplus')}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faSquareGooglePlus} className={cx('icon')} />
                        </a>
                    </div>
                </div>

                <div className={cx('save-favorite')}>
                    <Link to={'/flag/favorite'}>Save to favorite</Link>
                </div>
            </div>
        </div>
    );
}

export default LeftRegion;
