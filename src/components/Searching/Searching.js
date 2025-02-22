import styles from './Searching.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Searching() {
    return (
        <div className={cx('loadContainer')}>
            <div className={cx('loader')}>
                <div className={cx('circle')}></div>
                <div className={cx('circle')}></div>
                <div className={cx('circle')}></div>
                <div className={cx('circle')}></div>
                <div className={cx('circle')}></div>
            </div>
            <div className={cx('searching-title')}>Working...</div>
        </div>
    );
}

export default Searching;
