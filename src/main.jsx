import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import LandingPage from './pages/landing_page'
import ProfilePage from './pages/profile_page'
import GalleryPage from './pages/gallery_page'
import NewsPage from './pages/news_page'
import InfographicPage from './pages/infographic_page'
import EventPage from './pages/event_page'
import UMKMPage from './pages/umkm_page'
import SOTKPage from './pages/sotk_page'
import NewsDetailPage from './pages/news_detail_page'
import UMKMDetailPage from './pages/umkm_detail_page'
import LoginPage from './pages/login_page'
import DashboardPage from './pages/dashboard_page'
import DashboardHome from './components/fragments/Dashboard_Page/Dashboard_Home_Fragment'
import DashboardSOTK from './components/fragments/Dashboard_Page/Dashboard_SOTK_Fragment'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/profil',
    element: <ProfilePage />,
  },
  {
    path: '/profil/sotk',
    element: <SOTKPage />,
  },
  {
    path: '/infografis',
    element: <InfographicPage />,
  },
  {
    path: '/galeri',
    element: <GalleryPage />,
  },
  {
    path: '/berita',
    element: <NewsPage />,
  },
  {
    path: '/berita/:slug',
    element: <NewsDetailPage />,
  },
  {
    path: '/acara',
    element: <EventPage />,
  },
  {
    path: '/umkm',
    element: <UMKMPage />,
  },
  {
    path: '/umkm/:id',
    element: <UMKMDetailPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
    children: [
      {
        index: true,
        element: <DashboardHome />
      },
      {
        path: 'sotk',
        element: <DashboardSOTK />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)