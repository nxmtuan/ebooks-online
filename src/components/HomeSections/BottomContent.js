import styles from '~/pages/Home/Home.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function BottomContent() {
    return (
        <div className={cx('bottom-content')}>
            <div className={cx('bottom-title')}>
                <p>Recently Questions</p>
                <Link to={'#'}>(View all)</Link>
            </div>
            <div className={cx('q-a-area')}>No Question Yet!</div>
            <div className={cx('comments-area')}>
                <p>No comment yet</p>
            </div>
        </div>
    );
}

export default BottomContent;
