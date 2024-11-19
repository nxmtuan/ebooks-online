import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

function Home() {
    const rowRef1 = useRef(null);
    const rowRef2 = useRef(null);
    const rowRef3 = useRef(null);

    const applyDragScroll = (rowRef) => {
        const row = rowRef.current;
        if (!row) return;

        let isDragging = false;
        let startX;
        let scrollLeft;

        const handleMouseDown = (e) => {
            isDragging = true;
            startX = e.pageX - row.offsetLeft;
            scrollLeft = row.scrollLeft;
        };

        const handleMouseMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - row.offsetLeft;
            const walk = x - startX;
            row.scrollLeft = scrollLeft - walk;
        };

        const handleMouseUpOrLeave = () => {
            isDragging = false;
        };

        row.addEventListener('mousedown', handleMouseDown);
        row.addEventListener('mousemove', handleMouseMove);
        row.addEventListener('mouseup', handleMouseUpOrLeave);
        row.addEventListener('mouseleave', handleMouseUpOrLeave);

        return () => {
            row.removeEventListener('mousedown', handleMouseDown);
            row.removeEventListener('mousemove', handleMouseMove);
            row.removeEventListener('mouseup', handleMouseUpOrLeave);
            row.removeEventListener('mouseleave', handleMouseUpOrLeave);
        };
    };

    useEffect(() => {
        const cleanup1 = applyDragScroll(rowRef1);
        const cleanup2 = applyDragScroll(rowRef2);
        const cleanup3 = applyDragScroll(rowRef3);

        return () => {
            cleanup1?.();
            cleanup2?.();
            cleanup3?.();
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            {/* Top content */}
            <div className={cx('top-content')}>
                <div className={cx('top-content-container', 'container')}>
                    <div className={cx('row')}>
                        <div className={cx('block-header')}>
                            <h2>FREE EBOOKS AND DEALS</h2>
                            <Link to="/">(View all)</Link>
                        </div>

                        <div className={cx('block-content')}>
                            <div className={cx('list-content')} ref={rowRef1}>
                                <div className={cx('items-card')}>
                                    <div className={cx('items')}>
                                        <div className={cx('book-image')}>
                                            <img
                                                src="https://placehold.co/178x267.png"
                                                alt=""
                                                loading="lazy"
                                                draggable="false"
                                            />
                                            
                                        </div>

                                        <div className={cx('book-info')}>
                                            <div className={cx('book-title')}>
                                                <Link to="/" className={cx('title')}>
                                                    How To Self-Learn With Any Schedule
                                                </Link>
                                            </div>
                                            <div className={cx('book-author')}>
                                                <div to="/" className={cx('author')}>
                                                    Phyllis Edgerly Ring
                                                </div>
                                            </div>
                                            <div className={cx('price')}>
                                                <div to="/" className={cx('sale')}>
                                                    $0.99
                                                </div>
                                                <div to="/" className={cx('no-sale')}>
                                                    $5.99
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* middle content */}
            <div className={cx('middle-content')}>
                <div className={cx('middle-content-container', 'container')}>
                    <div className={cx('row')}>
                        {/* editor choice */}
                        <div className={cx('editor-choice')}>
                            <div className={cx('block-header')}>
                                <h2>EDITOR'S CHOICE</h2>
                                <Link to="/">(View all)</Link>
                            </div>

                            <div className={cx('block-content')}>
                                <div className={cx('list-content')} ref={rowRef2}>
                                    <div className={cx('items-card')}>
                                        <div className={cx('items')}>
                                            <div className={cx('book-image')}>
                                                <img
                                                    src="https://placehold.co/178x267.png"
                                                    alt=""
                                                    loading="lazy"
                                                    draggable="false"
                                                />
                                                
                                            </div>

                                            <div className={cx('book-info')}>
                                                <div className={cx('book-title')}>
                                                    <Link to="/" className={cx('title')}>
                                                        How To Self-Learn With Any Schedule
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* trending book */}
                        <div className={cx('trending-book')}>
                            <div className={cx('block-header')}>
                                <h2>TRENDING BOOKS</h2>
                                <Link to="/">(View all)</Link>
                            </div>

                            <div className={cx('block-content')}>
                                <div className={cx('list-content')}>
                                    <div className={cx('items-card')}>
                                        <div className={cx('items')}>
                                            <div className={cx('book-image')}>
                                                <img
                                                    src="https://placehold.co/178x267.png"
                                                    alt=""
                                                    loading="lazy"
                                                    draggable="false"
                                                />
                                                
                                            </div>

                                            <div className={cx('book-info')}>
                                                <div className={cx('book-title')}>
                                                    <Link to="/" className={cx('title')}>
                                                        How To Self-Learn With Any Schedule
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={cx('items-card')}>
                                        <div className={cx('items')}>
                                            <div className={cx('book-image')}>
                                                <img
                                                    src="https://placehold.co/178x267.png"
                                                    alt=""
                                                    loading="lazy"
                                                    draggable="false"
                                                />
                                                
                                            </div>

                                            <div className={cx('book-info')}>
                                                <div className={cx('book-title')}>
                                                    <Link to="/" className={cx('title')}>
                                                        How To Self-Learn With Any Schedule
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* popular */}
                        <div className={cx('popular')}>
                            <div className={cx('block-header')}>
                                <h2>POPULAR CLASSICS</h2>
                                <Link to="/">(View all)</Link>
                            </div>

                            <div className={cx('block-content')}>
                                <div className={cx('list-content')}>
                                    <div className={cx('items-card')}>
                                        <div className={cx('items')}>
                                            <div className={cx('book-image')}>
                                                <img
                                                    src="https://placehold.co/178x267.png"
                                                    alt=""
                                                    loading="lazy"
                                                    draggable="false"
                                                />
                                                
                                            </div>

                                            <div className={cx('book-info')}>
                                                <div className={cx('book-title')}>
                                                    <Link to="/" className={cx('title')}>
                                                        How To Self-Learn With Any Schedule
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={cx('items-card')}>
                                        <div className={cx('items')}>
                                            <div className={cx('book-image')}>
                                                <img
                                                    src="https://placehold.co/178x267.png"
                                                    alt=""
                                                    loading="lazy"
                                                    draggable="false"
                                                />
                                                
                                            </div>

                                            <div className={cx('book-info')}>
                                                <div className={cx('book-title')}>
                                                    <Link to="/" className={cx('title')}>
                                                        How To Self-Learn With Any Schedule
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('bottom-content')}>
                <div className={cx('bottom-content-container', 'container')}>
                    <div className={cx('row')}>
                        <div className={cx('region-bottom')}>
                            <div className={cx('block-header')}>
                                <h2>FROM THE BLOG</h2>
                                <Link to="/">(View all)</Link>
                            </div>

                            <div className={cx('block-content')}>
                                <div className={cx('list-content')} ref={rowRef3}>
                                    <div className={cx('items-card')}>
                                        <div className={cx('items')}>
                                            <div className={cx('blog-image')}>
                                                <img
                                                    src="https://placehold.co/560x315.png"
                                                    alt=""
                                                    loading="lazy"
                                                    draggable="false"
                                                />
                                            </div>

                                            <div className={cx('book-info')}>
                                                <div className={cx('book-title')}>
                                                    <Link to="/" className={cx('title')}>
                                                        How To Self-Learn With Any Schedule
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;