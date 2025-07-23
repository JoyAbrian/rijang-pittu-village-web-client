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
    path: '/acara',
    element: <EventPage />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)