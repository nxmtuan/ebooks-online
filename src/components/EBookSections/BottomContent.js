import { ReviewRegion } from '../ReviewRegion';
import styles from '~/pages/EBook/EBook.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function BottomContent() {
    return (
        <div className={cx('bottom-content')}>
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <ReviewRegion />
                </div>
            </div>
        </div>
    );
}

export default BottomContent;
