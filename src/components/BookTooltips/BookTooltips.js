import { Link } from 'react-router-dom';
import { memo, useCallback, useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import styles from './BookTooltips.module.scss';
import handleCountView from '~/utils/handleCountView';
import * as getEBookService from '~/services/getEBookService';
import handleCountDownload from '~/utils/handleCountDownload';

const cx = classNames.bind(styles);

function BookTooltips({ data }) {

    console.log('tooltip re-render');
    
    const [bookData, setBookData] = useState(null);
    const [isClickable, setIsClickable] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await getEBookService.getEBookById(`${data.id}`);
                setBookData(result);
            } catch (error) {
                console.log('Error fetching data: ', error);
            }
        };

        fetchApi();
    }, [data.id]);

    const countDownload = useCallback(async () => {
        if (!bookData || !isClickable) return;

        const updatedDownloadCount = bookData.download_count + 1;
        
        setIsClickable(false);
        setBookData((prevData) => ({ ...prevData, download_count: updatedDownloadCount }));
        handleCountDownload(bookData.id, updatedDownloadCount)

        setTimeout(() => {
            setIsClickable(true);
        }, 4000);
    }, [bookData, isClickable])

    return (
        <div className={cx('tooltips-area')}>
            <div className={cx('left-tooltip')}>
                <Link 
                    onClick={() => handleCountView(data.id)}
                    to={{ pathname: `/ebook/${data.id}` }}
                    state={{ data: data }}
                >
                    <img
                        src={data.formats['image/jpeg'] || 'https://placehold.co/560x315.png'}
                        alt={data.title || 'Book cover'}
                        loading="lazy"
                        draggable="false"
                    />
                </Link>
            </div>
            <div className={cx('right-tooltip')}>
                <Link 
                    className={cx('tooltip-title')}
                    onClick={() => handleCountView(data.id)}
                    to={{ pathname: `/ebook/${data.id}` }}
                    state={{ data: data }}
                >
                    {data.title || 'Unknow Title'}
                </Link>
                <span>by</span>
                <Link className={cx('tooltip-author')}>{data.authors.map(({ name }) => name) || 'Book cover'}</Link>
                <a 
                    className={cx('download-btn')}
                    href={data.formats['application/octet-stream']}
                    onClick={countDownload}
                    style={{ pointerEvents: isClickable ? 'auto' : 'none' }}
                >
                    Download
                </a>
                <Link
                    className={cx('read-more-btn')}
                    onClick={() => handleCountView(data.id)}
                    to={{ pathname: `/ebook/${data.id}` }}
                    state={{ data: data }}
                >
                    Read more
                </Link>
            </div>
        </div>
    );
}

export default memo(BookTooltips);
