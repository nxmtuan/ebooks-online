import classNames from 'classnames/bind';
import styles from './eBook.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faSquareGooglePlus, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function eBook() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('row')}>
                <div className={cx('top-content')}>
                    <div className={cx('container')}>
                        <div className={cx('row')}>
                            <div className={cx('left-region')}>
                                <div className={cx('book-image-region')}>
                                    <div className={cx('book-image')}>
                                        <img src="https://placehold.co/178x267.png" alt="" />
                                    </div>
                                </div>

                                <div className={cx('info-region')}>
                                    <div className={cx('published-year')}>
                                        <h2>
                                            PUBLISHED: <p>2016</p>
                                        </h2>
                                    </div>

                                    <div className={cx('pages-count')}>
                                        <h2>
                                            PAGES: <p>205</p>
                                        </h2>
                                    </div>

                                    <div className={cx('download-count')}>
                                        <h2>
                                            DOWNLOAD: <p>481</p>
                                        </h2>
                                    </div>

                                    <div className={cx('share-option')}>
                                        <h2>Share This</h2>
                                        <div className={cx('share-icon')}>
                                            <a href="https://facebook.com" className={cx('fb')}>
                                                <FontAwesomeIcon icon={faSquareFacebook} className={cx('icon')} />
                                            </a>
                                            <a href="https://x.com" className={cx('x')}>
                                                <FontAwesomeIcon icon={faSquareXTwitter} className={cx('icon')} />
                                            </a>
                                            <a href="https://mail.google.com/" className={cx('gplus')}>
                                                <FontAwesomeIcon icon={faSquareGooglePlus} className={cx('icon')} />
                                            </a>
                                        </div>
                                    </div>

                                    <div className={cx('save-favorite')}>
                                        <Link to={'/flag/favorite'}>Save to favorite</Link>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('right-region')}>
                                <div className={cx('block-info')}>
                                    <div className={cx('title')}>The Eye of Nefertiti</div>
                                    <div className={cx('sub-title')}>A Pharaoh's Cat Novel</div>
                                    <div className={cx('author-and-rate')}>
                                        <div className={cx('author')}>
                                            By
                                            <Link to={'/author/id'}>Maria Luisa Lang</Link>
                                        </div>
                                        <Link to={'#reviews'} className={cx('book-rate')}>
                                            <div className={cx('rate-stars')}>
                                                <div className={cx('first-star', 'star')}></div>
                                                <div className={cx('second-star', 'star')}></div>
                                                <div className={cx('third-star', 'star')}></div>
                                                <div className={cx('fourth-star', 'star')}></div>
                                                <div className={cx('fifth-star', 'star')}></div>
                                            </div>
                                            <div className={cx('review-count')}>(0 Reviews)</div>
                                        </Link>
                                    </div>
                                    <div className={cx('option-btn')}>
                                        <div className={cx('download')}>
                                            <Link to={'/ebooks/download'} className={cx('download-btn')}>
                                                <FontAwesomeIcon icon={faDownload} className={cx('icon')} />
                                                <p>Free Download</p>
                                            </Link>
                                        </div>
                                        <div className={cx('read')}>
                                            <Link className={cx('read-btn')}>
                                                <p>Read Online</p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className={cx('block-summary')}>
                                    <p>
                                        Now a New Yorker, the Pharaoh’s cat--the ancient Egyptian feline with human
                                        powers--travels back in time to free Egypt’s legendary Queen Nefertiti from a
                                        horrific curse, discovering firsthand why her mummy has never been found and her
                                        famous bust is missing one eye. <br /> <br />
                                        As in the first Pharaoh’s cat novel, the cat is quick-witted, wisecracking
                                        narrator as well as free-spirited, ever-curious protagonist, and the story he
                                        tells is an exotic, imaginative, spell-binding tragicomedy. The Eye of Nefertiti
                                        also interweaves feline and human, past and present, natural and supernatural.
                                        It too contains numerous surprises, twists and turns, intriguing characters,
                                        both human and animal, fascinating revelations about ancient Egyptian history
                                        and culture. Added to all this is an ingenious use of the Tarot and Italian
                                        opera. <br /> <br />
                                        The cat is living happily in New York City with the High Priest, Elena, daughter
                                        of an Egyptologist, and their infant son, the cat’s beloved Pharaoh
                                        reincarnated, when the supernatural gradually intrudes in the form of phantasms,
                                        the plot of an Italian opera, a Tarot card reading, and an unexpected summons to
                                        present-day Bath Spa disguised as an opportunity for Elena.
                                        <br /> <br />
                                        She and the little Pharaoh travel conventionally while the cat and the High
                                        Priest take the little boat they use for time travel and are diverted to ancient
                                        Stonehenge for a brief stop-over. The figure at the center of their encounter
                                        with the Druids has been prefigured in the cat’s phantasms, the Italian opera,
                                        and the Tarot reading, all his uncanny experiences being in accord with a single
                                        design.
                                        <br /> <br />
                                        Reunited with Elena and the infant Pharaoh in Bath, the cat and the High Priest
                                        discover a secret tomb below the Georgian house where they are staying, and are
                                        soon impelled to journey to ancient Egypt in the time of Queen Nefertiti to save
                                        her from a horrific curse. They become separated as they search for Nefertiti
                                        and the cat has several adventures before finding her on his own.
                                        <br /> <br />
                                        He undertakes an ingenious deception to stay close to her without revealing his
                                        identity. Being so close, he falls in love with her. He succeeds in lifting the
                                        horrific curse at great cost to himself. Despite his love, he surrenders
                                        Nefertiti to history and, mourning his loss, descends into a psychological abyss
                                        so deep only the Pharaoh can save him.
                                        <br /> <br />
                                        Maria Luisa Lang was born in Rome and lives in New York City. She has an art
                                        degree and is an amateur Egyptologist. The Pharaoh's Cat is her first novel, The
                                        Eye of Nefertiti her second.
                                    </p>
                                </div>

                                <div className={cx('block-genre')}>
                                    <div className={cx('field-genre')}>
                                        <div className={cx('genre-btn')}>
                                            <Link>Fantasy</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('bottom-content')}>
                    <div className={cx('container')}>
                        <div className={cx('row')}>
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
                                <div className={cx('bottom-region')}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default eBook;
