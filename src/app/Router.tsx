import Terminal from "../components/layout/Terminal";
import { ScrollToTop } from "../components/layout/ScrollToTop";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProjectsPage from "../pages/ProjectsPage";
import AboutPage from "../pages/AboutPage";
import BlogPage from "../pages/BlogPage";
import ContactPage from "../pages/ContactPage";
import BlogPostPage from "../pages/BlogPostPage";
import NotFoundPage from "../pages/NotFound";
import AdminPage from "../pages/AdminPage";
import AdminLoginPage from "../pages/AdminLoginPage";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import LabPage from "../pages/LabPage";

const RootLayout = () => (
    <>
        <ScrollToTop />
        <Terminal />
    </>
);

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <HomePage/>
            },
            {
                path: '/projects',
                element: <ProjectsPage/>
            },
            {
                path: '/about',
                element: <AboutPage/>
            },
            {
                path: '/blog',
                element: <BlogPage/>
            },
            {
                path: '/blog/:slug',
                element: <BlogPostPage/>
            },
            {
                path: '/contact',
                element: <ContactPage/>
            },
            {
                path: '/lab',
                element: <LabPage/>
            },
            {
                path: '/admin/login',
                element: <AdminLoginPage/>
            },
            {
                path: '/admin',
                element: (
                    <ProtectedRoute>
                        <AdminPage/>
                    </ProtectedRoute>
                )
            },
            {
                path: '*',
                element: <NotFoundPage/>
            }
        ]
    }
])
