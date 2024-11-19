
import config from "~/config";

//pages
import eBook from "~/pages/eBook";
import Home from "~/pages/Home";
import Blogs from "~/pages/Blogs";

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.ebook, component: eBook },
    { path: config.routes.blogs, component: Blogs },
]

const privateRoutes = []

export { publicRoutes, privateRoutes}