import styles from '~/pages/Home/Home.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { MoreInfoBookCard } from '../BookCard';
import { useEffect, useRef } from 'react';
import dragToScrollEvent from '~/utils/dragToScrollEvent';

const cx = classNames.bind(styles);

function TopContent({ data }) {
    const navigate = useNavigate();
    const rowRef1 = useRef(null);

    useEffect(() => {
        const cleanup1 = dragToScrollEvent(rowRef1);

        return () => {
            cleanup1?.();
        };
    }, []);

    const handleGetListFree = (e) => {
        e.preventDefault();
        navigate(`/search?keyword=${'Free eBooks'}`, { state: { listFree: data } });
    };

    return (
        <div className={cx('top-content')}>
            <div className={cx('top-content-container', 'container')}>
                <div className={cx('row')}>
                    <div className={cx('block-header')}>
                        <h2>FREE EBOOKS AND DEALS</h2>
                        <Link onClick={handleGetListFree}>(View all)</Link>
                    </div>

                    <div className={cx('block-content')}>
                        <div className={cx('list-content')} ref={rowRef1}>
                            {data && data.length > 0 ? (
                                data.map((result) => <MoreInfoBookCard dataDeals={result} key={result.id} />)
                            ) : (
                                <p>No eBook available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopContent;
