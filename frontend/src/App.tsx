import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"
import Home from "./pages/Home"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"

const App = () => {
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
        <Route path="*" element={<Home />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App