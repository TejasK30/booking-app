import { Link } from "react-router-dom"
import Hero from "./Hero"
import SignOutButton from "./SignOutButton"
import useAppContext from "../hooks/useAppContext"

const Header = () => {
  
  const { isLoggedIn } = useAppContext()
  
  return (
    <>
      <div className="bg-blue-800 py-2">
        <div className="flex justify-between mx-auto px-2">
          <span className="text-2xl text-white font-bold tracking-tight">
            <Link to={'/'}>MERNBooking</Link>
          </span>
          <span className="flex space-x-2">
            {
              isLoggedIn ?
              <>
                <Link to={'/my-bookings'} className="flex items-center text-blue-100 px-2 font-bold hover:bg-blue-600">My Bookings</Link>
                <Link to={'/my-hotels'} className="flex items-center text-blue-100 px-2 font-bold hover:bg-blue-600">My Hotels</Link>
                <SignOutButton />
              </>: 
              <Link to={'/sign-in'} className="flex items-center text-blue-100 px-2 font-bold hover:bg-blue-700">Sign in</Link>
            }
          </span>
        </div>
        <Hero />
      </div>
    </>
  )
}

export default Header