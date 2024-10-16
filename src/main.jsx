import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home'
import Contact from './Contact'
import Profile from './Profile'
import { ClerkProvider, SignIn } from "@clerk/clerk-react"
import AddListing from './add-listing'
import MySignInPage from './MySignInPage'
// import { Toaster } from './Components/ui/sonner'
import SearchByCategory from './search/[category]'
import SearchByOptions from './search'
import ListingDetails from './listing-details/[id]'
import About from './About'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/contact',
    element:<Contact/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'/profile/add-listing',
    element:<AddListing/>
  },
  {
    path:'/add-listing',
    element:<AddListing/>
  },{
    path: "/login",
    element:<MySignInPage/>
  },{
    path: "/search/:category",
    element:<SearchByCategory/>
  }
  ,{
    path: "/search",
    element:<SearchByOptions/>
  }
  ,{
    path: "/listing-details/:id",
    element:<ListingDetails/>
  },
  {
    path: "/about",
    element: <About/>
  }
])
createRoot(document.getElementById('root')).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
     <RouterProvider router={router}/>
     {/* <Toaster/> */}
    </ClerkProvider>
)
