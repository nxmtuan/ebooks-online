import classNames from 'classnames/bind';
import styles from '~/pages/EBook/EBook.module.scss';

const cx = classNames.bind(styles);

function ReviewRegion() {
    return (
        <div className={cx('review-region')}>
            <div className={cx('top-region')}>
                <h2>READERS REVIEWS</h2>
            </div>

            <div className={cx('middle-region')}>
                <div className={cx('all-rate-stats')}>
                    <div className={cx('count-rates')}>
                        <div className={cx('five-stars')}>
                            <div className={cx('stars')}>
                                <div className={cx('star', 'st')}></div>
                                <div className={cx('star', 'nd')}></div>
                                <div className={cx('star', 'rd')}></div>
                                <div className={cx('star', 'rth')}></div>
                                <div className={cx('star', 'fth')}></div>
                            </div>
                            <div className={cx('rate-line')}>
                                <div className={cx('dark-line')}></div>
                                <div className={cx('grey-line')}></div>
                            </div>
                        </div>
                        <div className={cx('four-stars')}>
                            <div className={cx('stars')}>
                                <div className={cx('star', '1')}></div>
                                <div className={cx('star', '2')}></div>
                                <div className={cx('star', '3')}></div>
                                <div className={cx('star', '4')}></div>
                                <div className={cx('star', '5')}></div>
                            </div>
                            <div className={cx('rate-line')}>
                                <div className={cx('dark-line')}></div>
                                <div className={cx('grey-line')}></div>
                            </div>
                        </div>
                        <div className={cx('three-stars')}>
                            <div className={cx('stars')}>
                                <div className={cx('star', '1')}></div>
                                <div className={cx('star', '2')}></div>
                                <div className={cx('star', '3')}></div>
                                <div className={cx('star', '4')}></div>
                                <div className={cx('star', '5')}></div>
                            </div>
                            <div className={cx('rate-line')}>
                                <div className={cx('dark-line')}></div>
                                <div className={cx('grey-line')}></div>
                            </div>
                        </div>
                        <div className={cx('two-stars')}>
                            <div className={cx('stars')}>
                                <div className={cx('star', '1')}></div>
                                <div className={cx('star', '2')}></div>
                                <div className={cx('star', '3')}></div>
                                <div className={cx('star', '4')}></div>
                                <div className={cx('star', '5')}></div>
                            </div>
                            <div className={cx('rate-line')}>
                                <div className={cx('dark-line')}></div>
                                <div className={cx('grey-line')}></div>
                            </div>
                        </div>
                        <div className={cx('one-stars')}>
                            <div className={cx('stars')}>
                                <div className={cx('star', '1')}></div>
                                <div className={cx('star', '2')}></div>
                                <div className={cx('star', '3')}></div>
                                <div className={cx('star', '4')}></div>
                                <div className={cx('star', '5')}></div>
                            </div>
                            <div className={cx('rate-line')}>
                                <div className={cx('dark-line')}></div>
                                <div className={cx('grey-line')}></div>
                            </div>
                        </div>
                    </div>

                    {/* average rate */}
                    <div className={cx('average-rate')}>
                        <div className={cx('rate-value')}>0.0</div>
                        <div className={cx('rate-message')}>Average from 0 Reviews</div>
                        <div className={cx('stars')}>
                            <div className={cx('star', '1')}></div>
                            <div className={cx('star', '2')}></div>
                            <div className={cx('star', '3')}></div>
                            <div className={cx('star', '4')}></div>
                            <div className={cx('star', '5')}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('bottom-region')}>
                <div className={cx('review-btn')}>
                    <div className={cx('btn')}>Write Review</div>
                </div>
            </div>
            <div className={cx('comments-area')}>
                <p>Be the first to review this book</p>
            </div>
        </div>
    );
}

function Rating() {
    console.log('Rating re-render');
    return (
        <div className={cx('book-rate')}>
            <div className={cx('rate-stars')}>
                <div className={cx('first-star', 'star')}></div>
                <div className={cx('second-star', 'star')}></div>
                <div className={cx('third-star', 'star')}></div>
                <div className={cx('fourth-star', 'star')}></div>
                <div className={cx('fifth-star', 'star')}></div>
            </div>
            <div className={cx('review-count')}>(0 Reviews)</div>
        </div>
    );
}

export { ReviewRegion, Rating };
