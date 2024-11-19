import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Header() {
    const [isDiscoverVisible, setIsDiscoverVisible] = useState(false);
    const [isProfileVisible, setIsProfileVisible] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('block-logo')}>
                    <Link className={cx('logo')}>
                        <img src="https://manybooks.net/themes/custom/mnybks/logo.svg" alt="Logo" />
                    </Link>
                </div>

                <HeadlessTippy
                    render={(attrs) => (
                        <div className={cx('discover-options')} tabIndex="-1" {...attrs}>
                            <div className={cx('menu-card', 'genres')}>
                                <h3>Genres</h3>
                                <ul>
                                    <li>
                                        <Link to="/authors">Action & Adventure</Link>
                                    </li>
                                    <li>
                                        <Link to="/languages">Bios & History</Link>
                                    </li>
                                    <li>
                                        <Link to="/genres">Children's</Link>
                                    </li>
                                    <li>
                                        <Link to="/articles">Fantasy</Link>
                                    </li>
                                    <li>
                                        <Link to="/author-interviews">Historical Fiction</Link>
                                    </li>
                                    <li>
                                        <Link to="/discuss">Horror</Link>
                                    </li>
                                    <li>
                                        <Link to="/authors">Literary Fiction</Link>
                                    </li>
                                    <li>
                                        <Link to="/languages">Mystery & Thriller</Link>
                                    </li>
                                    <li>
                                        <Link to="/genres">Non-Fiction</Link>
                                    </li>
                                    <li>
                                        <Link to="/articles">Romance</Link>
                                    </li>
                                    <li>
                                        <Link to="/author-interviews">Science Fiction</Link>
                                    </li>
                                    <li>
                                        <Link to="/discuss">Young Adult</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className={cx('menu-card', 'resources')}>
                                <h3>Resources</h3>
                                <ul>
                                    <li>
                                        <Link to="/authors">Authors</Link>
                                    </li>
                                    <li>
                                        <Link to="/languages">Languages</Link>
                                    </li>
                                    <li>
                                        <Link to="/genres">Genres</Link>
                                    </li>
                                    <li>
                                        <Link to="/articles">Articles</Link>
                                    </li>
                                    <li>
                                        <Link to="/author-interviews">Author Interviews</Link>
                                    </li>
                                    <li>
                                        <Link to="/discuss">Discuss</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                    placement="bottom-start"
                    interactive
                    trigger="click"
                    offset={[0, -5]}
                    onShow={() => setIsDiscoverVisible(true)}
                    onHide={() => setIsDiscoverVisible(false)}
                >
                    <div className={cx('block-discover')}>
                        <div className={cx('discover')}>
                            <h3>DISCOVER</h3>
                            <FontAwesomeIcon
                                icon={isDiscoverVisible ? faCaretUp : faCaretDown}
                                className={cx('arrow-icon')}
                            />
                        </div>
                    </div>
                </HeadlessTippy>

                <div className={cx('block-search')}>
                    <input
                        type="text"
                        className={cx('search-input')}
                        placeholder="Search by title, author or keyword"
                    />
                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                    </button>
                </div>
                <HeadlessTippy
                    render={(attrs) => (
                        <div className={cx('profile-options')} tabIndex="-1" {...attrs}>
                            <ul>
                                <li>
                                    <Link to="/profile">View Profile</Link>
                                </li>
                                <li>
                                    <Link to="/update-profile">Edit Account</Link>
                                </li>
                                <li>
                                    <Link to="/logout">Log out</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                    placement="bottom-start"
                    interactive
                    trigger="click"
                    offset={[0, 15]}
                    onShow={() => setIsProfileVisible(true)}
                    onHide={() => setIsProfileVisible(false)}
                >
                    <div className={cx('block-user-menu')}>
                        <div className={cx('user-menu')}>
                            <h3>My Profile</h3>
                            <FontAwesomeIcon
                                icon={isProfileVisible ? faCaretUp : faCaretDown}
                                className={cx('arrow-icon')}
                            />
                        </div>
                    </div>
                </HeadlessTippy>
            </div>
        </div>
    );
}

export default Header;
