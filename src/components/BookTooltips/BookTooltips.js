import { Link } from 'react-router-dom';
import { memo, useCallback, useState } from 'react';

import classNames from 'classnames/bind';

import styles from './BookTooltips.module.scss';
import handleCountView from '~/utils/handleCountView';
import handleCountDownload from '~/utils/handleCountDownload';

const cx = classNames.bind(styles);

function BookTooltips({ data }) {
    const [isClickable, setIsClickable] = useState(true);

    const countDownload = useCallback(async () => {
        if (!data || !isClickable) return;

        const updatedDownloadCount = data.download_count + 1;

        setIsClickable(false);
        handleCountDownload(data.id, updatedDownloadCount);

        setTimeout(() => {
            setIsClickable(true);
        }, 4000);
    }, [data, isClickable]);

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
