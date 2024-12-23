import { Link } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';

import classNames from 'classnames/bind';

import styles from '~/pages/Home/Home.module.scss';
import handleCountView from '~/utils/handleCountView';
import BookTooltips from '~/components/BookTooltips';
import useIsMobile from '~/hooks/useCheckMobile';

const cx = classNames.bind(styles);

function BookCard({ dataBook, itemsCardStyle, bookImageStyle }) {
    const isMobile = useIsMobile();

    return (
        <div className={cx('items-card')} style={itemsCardStyle}>
            <HeadlessTippy
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                        <BookTooltips data={dataBook} />
                    </div>
                )}
                interactive={true}
                delay={[500, 500]}
                offset={[-50, -250]}
                lazy={true}
                appendTo={'parent'}
                disabled={isMobile}
            >
                <div className={cx('items')}>
                    <div className={cx('book-image')} style={bookImageStyle}>
                        <Link
                            onClick={() => handleCountView(dataBook.id)}
                            to={{ pathname: `/ebook/${dataBook.id}` }}
                            state={{ data: dataBook }}
                        >
                            <img
                                src={dataBook.formats['image/jpeg'] || 'https://placehold.co/560x315.png'}
                                alt={dataBook.title || 'Book cover'}
                                loading="lazy"
                                draggable="false"
                            />
                        </Link>
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
            </HeadlessTippy>
        </div>
    );
}

function BookCardLoading({ itemsCardStyle, bookImageStyle }) {
    return (
        <div className={cx('items-card')} style={itemsCardStyle}>
            <div className={cx('items')}>
                <div className={cx('book-image')} style={bookImageStyle}>
                    <img src="" alt="" />
                </div>

                <div className={cx('book-info')}>
                    <div className={cx('book-title')}></div>
                </div>
            </div>
        </div>
    );
}

function MoreInfoBookCard({ dataDeals }) {
    return (
        <div className={cx('items-card')}>
            <div className={cx('items')} key={dataDeals.id}>
                <div className={cx('book-image')}>
                    <Link
                        onClick={() => handleCountView(dataDeals.id)}
                        to={{ pathname: `/ebook/${dataDeals.id}` }}
                        state={{ data: dataDeals }}
                    >
                        <img
                            src={dataDeals.formats['image/jpeg']}
                            alt={dataDeals.title || 'Book cover'}
                            loading="lazy"
                            draggable="false"
                        />
                    </Link>
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

export { BookCard, MoreInfoBookCard, BookCardLoading };
