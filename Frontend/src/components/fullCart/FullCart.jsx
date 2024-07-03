import { useContext } from "react";
import { ProductCard } from "../../components/productCard/ProductCard";
import { CartContext } from "../../context/CarritoContext";
import { UserContext } from "../../context/UserContext";
import "../fullCart/fullCart.css";
import cartStyle from "../../pages/cart/cart.module.css";
import { Summary } from "../summary/Summary";
import { GeneralBtn } from "../generalBtn/GeneralBtn";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { TbTrashXFilled } from "react-icons/tb";

export function FullCart() {
  const { cart, formatearPrecio } = useContext(CartContext);
  const { user, userToken, handleAddedToCart } = useContext(UserContext);

  const handleDeleteProduct = async (product_id, usuario_id) => {
    try {
      if (userToken) {
        const response = await fetch(
          `https://edimarket.onrender.com/carrito/${product_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({
              usuario_id,
            }),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error al eliminar del carrito");
        }
        const data = response.json();
        handleAddedToCart();

        return data;
      } else {
        return;
      }
    } catch (error) {
      console.error("Error al elimninar del carrito:", error);
    }
  };

  return (
    <div className="fullcart__container pt-10">
      <h1 className="ml-5 mb-10">Tus productos</h1>
      <div className="flex mx-8 md:mx-8 lg:mx-28 flex-col md:flex-row">
        <div
          className={classNames(
            "w-full",
            "md:w-2/3",
            "p-4",
            cartStyle.cart_box
          )}
        >
          <div className="cart__cards__container">
            {cart.map((element) => (
              <ProductCard key={element.carro_id}>
                <div
                  className={classNames(
                    "cart__card__body",
                    cartStyle.product_container
                  )}
                >
                  <img
                    className="cart__card__img shadow-md"
                    src={element.imagen}
                    alt="producto"
                  />
                  <div>
                    <p className="card__card__paragraph text-md">
                      {element.nombre}
                    </p>
                    <p className="font-semibold">
                      {formatearPrecio(element.precio)}
                    </p>
                  </div>
                  <TbTrashXFilled
                    onClick={() =>
                      handleDeleteProduct(element.producto_id, user.id)
                    }
                    className="cartmodal__trash__icon"
                  />
                </div>
              </ProductCard>
            ))}
          </div>
        </div>
        <div className="p-4 w-full md:w-1/3 bg-white m-0 md:ml-8">
          <Summary />
          <div>
            <GeneralBtn
              type="primary"
              className={classNames("mt-8", cartStyle.summary__button)}
            >
              <NavLink to="/shipping">Continuar compra</NavLink>
            </GeneralBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
