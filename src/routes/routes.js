import config from '~/config';

//pages
import EBook from '~/pages/EBook/EBook';
import Home from '~/pages/Home/Home';
import SearchEbooks from '~/pages/SearchEbooks/SearchEbooks';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.ebook, component: EBook },
    { path: config.routes.search, component: SearchEbooks },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
