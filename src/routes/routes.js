
import config from "~/config";

//pages
import EBook from "~/pages/EBook";
import Home from "~/pages/Home";
import Blogs from "~/pages/Blogs";

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.ebook, component: EBook },
    { path: config.routes.blogs, component: Blogs },
]

const privateRoutes = []

export { publicRoutes, privateRoutes}