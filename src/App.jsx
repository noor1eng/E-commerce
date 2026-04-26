import { Route, Routes } from "react-router";
import SignIn from "./pages/Auth/SignIn";
import LogIn from "./pages/Auth/LogIn";
import Users from "./components/dashboard/Users";
import GoogleCallback from "./pages/Auth/GoogleCallback";
import Dashboard from "./pages/dashboard/Dashborad";
import ProtectRoute from "./pages/Auth/RequireAuth";
import Edituser from "./components/dashboard/Edituser";
import AddUser from "./components/dashboard/Adduser";
import Whriter from "./components/dashboard/Whriter";
import RequireBack from "./pages/Auth/RequireBack";
import Dashboardlayout from "./pages/dashboard/Dashboardlayout";
import Catigories from "./components/dashboard/Categories";
import AddCat from "./components/dashboard/AddCat";
import EditCat from "./components/dashboard/EditCat";
import Product from "./components/dashboard/Product";
import AddPro from "./components/dashboard/AddPro";
import EditProduct from "./components/dashboard/EditPorduct";
import HomePage from "./components/website/HomePage";
import CategorieWeb from "./components/website/CategorieWeb";
import ProductWeb from "./components/website/product/ProductWeb";
import ProductShop from "./components/website/product/ProductShop";
import ShoppingCart from "./components/website/shopping/Shopping";
import { Toaster } from "@/components/ui/sonner";
import TopRated from "./components/toprated/TopRated";
import ErrorPage1 from "./pages/Eror404";
import WebPages from "./pages/WebPages/WebPages";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<WebPages />}>
          <Route path="" element={<HomePage />} />
          <Route path="topRated" element={<TopRated />} />
          <Route path="CategorieWeb" element={<CategorieWeb />} />
          <Route path="ProductWeb" element={<ProductWeb />} />
        </Route>
        <Route path="productShop/:id" element={<ProductShop />} />
        <Route path="*" element={<ErrorPage1 />} />
        <Route path="/shopping" element={<ShoppingCart />} />
        {/* protect userback */}
        <Route element={<RequireBack />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<LogIn />} />
        </Route>
        {/* protect userback */}
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
        {/* protect routes */}
        <Route
          element={<ProtectRoute allowedRole={["1995", "1996", "1999"]} />}
        >
          <Route
            path="/dashboard"
            element={
              <>
                <Dashboard />
              </>
            }
          >
            {/* solve users loading */}
            <Route element={<ProtectRoute allowedRole={["1995"]} />}>
              <Route path="dashboardlayout" element={<Dashboardlayout />} />
              {/* user sectoin */}
              <Route path="users" element={<Users />} />
              <Route
                path="users/:id"
                element={
                  <>
                    <Users />
                    <Edituser />
                  </>
                }
              />
              <Route
                path="users/adduser"
                element={
                  <>
                    <Users />
                    <AddUser />
                  </>
                }
              />
            </Route>
            {/* user sectoin */}

            {/* whriter section */}
            <Route element={<ProtectRoute allowedRole={["1996", "1995"]} />}>
              <Route path="whriter" element={<Whriter />} />
            </Route>
            {/* whriter section */}

            {/* categories sectoin */}
            <Route element={<ProtectRoute allowedRole={["1999", "1995"]} />}>
              <Route path="categories" element={<Catigories />} />
              <Route
                path="categories/:id"
                element={
                  <>
                    <Catigories />
                    <EditCat />
                  </>
                }
              />
              <Route
                path="categories/addCat"
                element={
                  <>
                    <Catigories />
                    <AddCat />
                  </>
                }
              />
            </Route>
            {/* categories sectoin */}
            {/* product sectoin */}
            <Route path="product" element={<Product />} />
            <Route path="product/addPro" element={<AddPro />} />
            <Route
              path="product/:id"
              element={
                <>
                  <EditProduct />
                </>
              }
            />
            {/* product sectoin */}
          </Route>
          {/* protect routes */}
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
