import classNames from 'classnames/bind';
import styles from './eBook.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faSquareGooglePlus, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function eBook() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('row')}>
                <div className={cx('top-content')}>
                    <div className={cx('container')}>
                        <div className={cx('row')}>
                            <div className={cx('left-region')}>
                                <div className={cx('book-image-region')}>
                                    <div className={cx('book-image')}>
                                        <img src="https://placehold.co/178x267.png" alt="" />
                                    </div>
                                </div>

                                <div className={cx('info-region')}>
                                    <div className={cx('published-year')}>
                                        <h2>
                                            PUBLISHED: <p>2016</p>
                                        </h2>
                                    </div>

                                    <div className={cx('pages-count')}>
                                        <h2>
                                            PAGES: <p>205</p>
                                        </h2>
                                    </div>

                                    <div className={cx('download-count')}>
                                        <h2>
                                            DOWNLOAD: <p>481</p>
                                        </h2>
                                    </div>

                                    <div className={cx('share-option')}>
                                        <h2>Share This</h2>
                                        <div className={cx('share-icon')}>
                                            <a href='https://facebook.com' className={cx('fb')}><FontAwesomeIcon icon={faSquareFacebook} className={cx('icon')}/></a>
                                            <a href='https://x.com' className={cx('x')}><FontAwesomeIcon icon={faSquareXTwitter} className={cx('icon')}/></a>
                                            <a href='https://mail.google.com/' className={cx('gplus')}><FontAwesomeIcon icon={faSquareGooglePlus} className={cx('icon')}/></a>
                                        </div>
                                    </div>

                                    <div className={cx('save-favorite')}>
                                        <Link to={'/flag/favorite'}>Save to favorite</Link>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('right-region')}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default eBook;
