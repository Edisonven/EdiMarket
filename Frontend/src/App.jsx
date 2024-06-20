import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/home/Home.jsx";
import { SingUp } from "./pages/singUp/singUp.jsx";
import { SingIn } from "./pages/singIn/SingIn.jsx";
import { Navbar } from "./components/navbar/Navbar.jsx";
import { Footer } from "./components/footer/Footer.jsx";
import { ProductDetail } from "./pages/productDetail/ProductDetail.jsx";
import { CarritoModal } from "./components/carritoModal/CarritoModal.jsx";
import { ProductList } from "./pages/productList/ProductList.jsx";
import { Favorites } from "./pages/favorites/Favorites.jsx";
import { useContext } from "react";
import { UserContext } from "./context/UserContext.jsx";
import { MiPerfil } from "./pages/miPerfil/MiPerfil.jsx";
import { CreatePost } from "./pages/createPost/CreatePost.jsx";
import { Cart } from "./pages/cart/Cart.jsx";
import { Billing } from "./pages/billing/Billing";
import { PublishedProduct } from "./pages/publishedProduct/PublishedProduct.jsx";
import { Shipping } from "./pages/shipping/Shipping.jsx";
import { ScrollTop } from "./components/scrollTop/ScrollTop.jsx";
import { UserData } from "./pages/userData/UserData.jsx";
import { EditUserData } from "./pages/editUserData/EditUserData.jsx";
import { UserAddress } from "./pages/userAddress/UserAddress.jsx";
import { AddUserAdress } from "./pages/addUserAddress/AddUserAddress.jsx";
import { NotFound } from "./pages/notFound/NotFound.jsx";

function App() {
  const { userToken } = useContext(UserContext);

  return (
    <>
      <Navbar />
      <ScrollTop />
      <section className="app__container">
        <Routes>
          <Route path="/carro" element={<Cart />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/myProduct" element={<PublishedProduct />} />
          {/*esta ruta debe tener el nombre del producto*/}
          <Route path="shipping" element={<Shipping />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/"
            element={userToken ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/registro" element={<SingUp />} />
          <Route
            path="/login"
            element={userToken ? <Navigate to="/" /> : <SingIn />}
          />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:categoria" element={<ProductList />} />
          <Route
            path="/favorites"
            element={userToken ? <Favorites /> : <Navigate to="/login" />}
          />{" "}
          <Route
            path="/miperfil"
            element={userToken ? <MiPerfil /> : <Navigate to="/login" />}
          />
          <Route
            path="/createpost"
            element={userToken ? <CreatePost /> : <Navigate to="/login" />}
          />
          <Route
            path="/user-data"
            element={userToken ? <UserData /> : <Navigate to="/login" />}
          />
          <Route
            path="/edit-user-data"
            element={userToken ? <EditUserData /> : <Navigate to="/login" />}
          />
          <Route
            path="/user-address"
            element={userToken ? <UserAddress /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-address"
            element={userToken ? <AddUserAdress /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={userToken ? <NotFound /> : <Navigate to="/login" />}
          />
        </Routes>

        <Footer />
        <CarritoModal />
      </section>
    </>
  );
}

export default App;
