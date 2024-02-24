import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"
import Home from "./pages/Home"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"
import useAppContext from "./hooks/useAppContext"
import AddHotel from "./pages/AddHotel"
import MyHotels from "./components/MyHotels"

const App = () => {
  const { isLoggedIn } = useAppContext()
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        }/>
        <Route path="/register" element={
          <Layout>
            <Register />
          </Layout>
        }/>
        <Route path="/sign-in" element={
          <Layout>
            <SignIn />
          </Layout>
        }/>
        {
          isLoggedIn && 
          (
            <Route path="/add-hotel" element={
              <Layout>
                <AddHotel />
              </Layout>
            }/>
          )
        }
        {
          isLoggedIn && (
            <>
              <Route path="/my-hotels" element={
                <Layout>
                  <MyHotels />
                </Layout>
              }/>
            </>
          )
        }
        <Route path="*" element={<Home />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App