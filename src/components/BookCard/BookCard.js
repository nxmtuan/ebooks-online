import classNames from 'classnames/bind';
import styles from '~/pages/Home/Home.module.scss';
import { Link } from 'react-router-dom';
import handleCountView from '~/utils/handleCountView';

const cx = classNames.bind(styles);

function BookCard({ dataBook }) {
    return (
        <div className={cx('items-card')}>
            <div className={cx('items')}>
                <div className={cx('book-image')}>
                    <img
                        src={dataBook.formats['image/jpeg'] || 'https://placehold.co/560x315.png'}
                        alt={dataBook.title || 'Book cover'}
                        loading="lazy"
                        draggable="false"
                    />
                </div>

                <div className={cx('book-info')}>
                    <div className={cx('book-title')}>
                        <Link
                            onClick={() => handleCountView(dataBook.id)}
                            to={{ pathname: `/ebook/${dataBook.id}` }}
                            className={cx('title')}
                            state={{ data: dataBook }}
                        >
                            {dataBook.title || 'Unknow Title'}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MoreInfoBookCard({ dataDeals }) {
    console.log('MoreInfoBookCard re-render');
    return (
        <div className={cx('items-card')}>
            <div className={cx('items')}>
                <div className={cx('book-image')}>
                    <img
                        src={dataDeals.formats['image/jpeg']}
                        alt={dataDeals.title || 'Book cover'}
                        loading="lazy"
                        draggable="false"
                    />
                </div>

                <div className={cx('book-info')}>
                    <div className={cx('book-title')}>
                        <Link
                            onClick={() => handleCountView(dataDeals.id)}
                            to={{ pathname: `/ebook/${dataDeals.id}` }}
                            className={cx('title')}
                            state={{ data: dataDeals }}
                        >
                            {dataDeals.title || 'Unknow Title'}
                        </Link>
                    </div>
                    <div className={cx('book-author')}>
                        <div to="/" className={cx('author')}>
                            {dataDeals.authors.map(({ name }) => name) || 'Book cover'}
                        </div>
                    </div>
                    <div className={cx('price')}>
                        <div to="/" className={cx('sale')}>
                            ${dataDeals.price || '0'}
                        </div>
                        <div to="/" className={cx('no-sale')}>
                            ${dataDeals.price_before_sale || '0'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { BookCard, MoreInfoBookCard };
