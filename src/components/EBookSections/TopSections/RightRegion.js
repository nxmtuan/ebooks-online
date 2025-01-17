import styles from '~/pages/EBook/EBook.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Rating } from '~/components/ReviewRegion';
import { useCallback, useState } from 'react';
import handleCountDownload from '~/utils/handleCountDownload';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function RightRegion({ data1, data2, setData2 }) {
    const [isClickable, setIsClickable] = useState(true);

    const countDownload = useCallback(async () => {
        if (!data2 || !isClickable) return;

        const updatedDownloadCount = data2.download_count + 1;

        setIsClickable(false);
        setData2((prevData) => ({ ...prevData, download_count: updatedDownloadCount }));
        handleCountDownload(data2.id, updatedDownloadCount);

        setTimeout(() => {
            setIsClickable(true);
        }, 4000);
    }, [data2, isClickable, setData2]);
    return (
        <div className={cx('right-region')}>
            <div className={cx('block-info')}>
                <div className={cx('title')}>{data1.title}</div>
                <div className={cx('sub-title')}>{data1.sub_title || ''}</div>
                <div className={cx('author-and-rate')}>
                    <div className={cx('author')}>
                        By
                        <Link to={'/author/id'}>{data1.authors.map(({ name }) => name)}</Link>
                    </div>
                    <Rating />
                </div>
                <div className={cx('option-btn')}>
                    <div className={cx('download')}>
                        <a
                            href={data1.formats['application/octet-stream']}
                            onClick={countDownload}
                            className={cx('download-btn')}
                            style={{ pointerEvents: isClickable ? 'auto' : 'none' }}
                        >
                            <FontAwesomeIcon icon={faDownload} className={cx('icon')} />
                            <p>Free Download</p>
                        </a>
                    </div>
                    <div className={cx('read')}>
                        <a
                            href={data1.formats['text/html']}
                            className={cx('read-btn')}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <p>Read Online</p>
                        </a>
                    </div>
                </div>
            </div>

            <div className={cx('block-summary')}>
                <div>
                    <strong className={cx('p')}>Subjects:</strong>
                    <p>
                        {data1.subjects.map((res, index) => (
                            <li key={index}>{res}</li>
                        ))}
                    </p>
                </div>
                <br /> <br />
                <div>
                    <strong className={cx('p')}>Bookshelves:</strong>
                    <p>
                        {data1.bookshelves.map((res, index) => (
                            <li key={index}>{res}</li>
                        ))}
                    </p>
                </div>
            </div>

            <div className={cx('block-genre')}>
                <div className={cx('field-genre')}>
                    {data1.bookshelves.map((res, index) => (
                        <div key={index} className={cx('genre-btn')}>
                            <Link>{res}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RightRegion;
