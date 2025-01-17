import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import * as getEBookService from '~/services/getEBookService';
import popularGenres from '~/utils/popularGenres';

const cx = classNames.bind(styles);

function Header() {
    const [value, setValue] = useState('');
    const [isDiscoverVisible, setIsDiscoverVisible] = useState(false);
    const [isProfileVisible, setIsProfileVisible] = useState(false);

    const navigate = useNavigate();

    const handleSearch = async (e) => {
        try {
            const result = await getEBookService.search(value);

            e.preventDefault();
            if (value.trim()) {
                navigate(`/search?keyword=${encodeURIComponent(value)}`, { state: { resultData: result } });
                setValue('');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const handleSearchGenres = async (value) => {
        try {
            const result = await getEBookService.search(value);

            //e.preventDefault();
            if (value.trim()) {
                navigate(`/search?genres=${value}`, { state: { resultData: result } });
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    return (
        <header className={cx('wrapper')}>
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
                                    {popularGenres && popularGenres.length > 0 ? (
                                        popularGenres.map((result, index) => (
                                            <li key={index}>
                                                <Link onClick={() => handleSearchGenres(result)}>{result}</Link>
                                            </li>
                                        ))
                                    ) : (
                                        <p>No genre found!</p>
                                    )}
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
                        placeholder="Search by title, author, genre,..."
                        onChange={(e) => setValue(e.target.value)}
                        spellCheck={false}
                        value={value}
                    />
                    <button className={cx('search-btn')} onClick={handleSearch}>
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
        </header>
    );
}

export default Header;
