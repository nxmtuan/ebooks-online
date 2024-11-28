import classNames from "classnames/bind";
import styles from './SearchEbooks.module.scss'

const cx = classNames.bind(styles)

function SearchEbooks() {
    return ( 
        <div className={cx('wrapper')}>Search Page</div>
    );
}

export default SearchEbooks;