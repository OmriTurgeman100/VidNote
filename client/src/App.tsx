import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Sections } from "./pages/Sections";
import { DisplaySection } from "./pages/DisplaySection";


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>

        <Route path="/" element={<Navbar />}>

          <Route index element={<Home />}></Route>

          <Route path="/sections" element={<Sections />}></Route>

          <Route path="/sections/:id" element={<DisplaySection />}></Route>

        </Route>

      </>
    )
  )


  return <RouterProvider router={router} />;
}

export default App
