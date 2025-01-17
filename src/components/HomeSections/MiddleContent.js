import styles from '~/pages/Home/Home.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { BookCard } from '../BookCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react';
import dragToScrollEvent from '~/utils/dragToScrollEvent';

const cx = classNames.bind(styles);

function MiddleContent({ data1, data2, data3, data4 }) {
    const rowRef2 = useRef(null);
    const rowRef3 = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const cleanup2 = dragToScrollEvent(rowRef2);
        const cleanup3 = dragToScrollEvent(rowRef3);

        return () => {
            cleanup2?.();
            cleanup3?.();
        };
    }, []);

    const handleGetListEditorChoice = (e) => {
        e.preventDefault();
        navigate(`/search?keyword=${'Editors choice'}`, { state: { listChoice: data1 } });
    };

    const handleGetListTrending = (e) => {
        e.preventDefault();
        navigate(`/search?keyword=${'Trending book'}`, { state: { listTrending: data2 } });
    };

    const handleGetAllList = (e) => {
        e.preventDefault();
        navigate(`/search?keyword=${'All eBooks'}`, { state: { list: data4 } });
    };

    return (
        <div className={cx('middle-content')}>
            <div className={cx('middle-content-container', 'container')}>
                <div className={cx('row')}>
                    {/* editor choice */}
                    <div className={cx('editor-choice')}>
                        <div className={cx('block-header')}>
                            <h2>EDITOR'S CHOICE</h2>
                            <Link onClick={handleGetListEditorChoice}>(View all)</Link>
                        </div>

                        <div className={cx('block-content')}>
                            <div className={cx('list-content')} ref={rowRef2}>
                                {data1 && data1.length > 0 ? (
                                    data1.map((result, index) => <BookCard key={index} dataBook={result} />)
                                ) : (
                                    <p>No books available</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Recommended */}
                    <div className={cx('recommended')}>
                        <div className={cx('block-header')}>
                            <h2>Recommended for You</h2>
                            <Link to="#">(View all)</Link>
                        </div>

                        <div className={cx('block-content')}>
                            <div className={cx('list-content')} ref={rowRef3}>
                                {data1 && data1.length > 0 ? (
                                    data1.map((result, index) => <BookCard key={index} dataBook={result} />)
                                ) : (
                                    <p>No books available</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* trending book */}
                    <div className={cx('trending-book')}>
                        <div className={cx('block-header')}>
                            <h2>
                                TRENDING BOOKS <FontAwesomeIcon icon={faFire} className={cx('fire-icon')} />
                            </h2>
                            <Link onClick={handleGetListTrending}>(View all)</Link>
                        </div>

                        <div className={cx('block-content')}>
                            <div className={cx('list-content')}>
                                {data2 && data2.length > 0 ? (
                                    data2.map((result, index) => <BookCard key={index} dataBook={result} />)
                                ) : (
                                    <p>No eBook available</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* popular */}
                    <div className={cx('popular')}>
                        <div className={cx('block-header')}>
                            <h2>POPULAR CLASSICS</h2>
                            <Link onClick={handleGetAllList}>(View all)</Link>
                        </div>

                        <div className={cx('block-content')}>
                            <div className={cx('list-content')}>
                                {data3 && data3.length > 0 ? (
                                    data3.map((result, index) => <BookCard key={index} dataBook={result} />)
                                ) : (
                                    <p>No books available</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MiddleContent;
