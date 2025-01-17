import styles from '~/pages/EBook/EBook.module.scss';
import classNames from 'classnames/bind';
import LeftRegion from './TopSections/LeftRegion';
import RightRegion from './TopSections/RightRegion';

const cx = classNames.bind(styles);

function TopContent({ data1, data2, setData2 }) {
    return (
        <div className={cx('top-content')}>
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <LeftRegion data1={data1} data2={data2} />
                    <RightRegion data1={data1} data2={data2} setData2={setData2} />
                </div>
            </div>
        </div>
    );
}

export default TopContent;
