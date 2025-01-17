import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('footer-region')}>
                    <div className={cx('navigation')}>
                        <ul className={cx('nav-menu')}>
                            <li>
                                <ul>
                                    <h3>Library</h3>
                                    <Link to="/">
                                        <li>Genres</li>
                                    </Link>
                                    <Link to="/">
                                        <li>Languages</li>
                                    </Link>
                                    <Link to="/">
                                        <li>Authors</li>
                                    </Link>
                                </ul>
                            </li>

                            <li>
                                <ul>
                                    <h3>Comunity</h3>
                                    <Link to="/">
                                        <li>Articles</li>
                                    </Link>
                                    <Link to="/">
                                        <li>Author Interviews</li>
                                    </Link>
                                    <Link to="/">
                                        <li>Newsletter</li>
                                    </Link>
                                </ul>
                            </li>

                            <li>
                                <ul>
                                    <h3>Company</h3>
                                    <Link to="/">
                                        <li>Author Services</li>
                                    </Link>
                                    <Link to="/">
                                        <li>About / Contact</li>
                                    </Link>
                                    <Link to="/">
                                        <li>Accessibility Statement</li>
                                    </Link>
                                </ul>
                            </li>

                            <li>
                                <ul>
                                    <h3>Follow</h3>
                                    <Link to="/">
                                        <li>Facebook</li>
                                    </Link>
                                    <Link to="/">
                                        <li>Twitter</li>
                                    </Link>
                                    <Link to="/">
                                        <li>Instagram</li>
                                    </Link>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('block-footer')}>
                        <div className={cx('copyright')}>© 2024. All Rights Reserved.</div>
                        <div className={cx('terms-privacy')}>
                            <Link to="/terms">Terms</Link>-<Link to="/privacy">Privacy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
