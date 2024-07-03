import { useContext } from "react";
import { Adresses } from "../../components/adresses/Adresses";
import { PaymentMethods } from "../../components/paymentMethods/PaymentMethods";
import summary from "../../components/summary/summary.module.css";
import shipping from "./shipping.module.css";
import classNames from "classnames";
import { CheckoutContext } from "../../context/CheckoutContext";
import { Summary } from "../../components/summary/Summary";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { NoAddressAdded } from "../../components/noAddressAdded/NoAddressAdded";
import { CartContext } from "../../context/CarritoContext";
import { ProductContext } from "../../context/ProductContext";

export function Shipping() {
  const { userAddress } = useContext(UserContext);
  const { selectedAddress, navigate } = useContext(CheckoutContext);
  const { cart } = useContext(CartContext);
  const { directBuy } = useContext(ProductContext);

  const handleButtonClickAdress = () => {
    navigate("/billing");
  };

  return (
    <div className={classNames("pt-10", shipping.shipping_container)}>
      {userAddress.length ? (
        <div>
          <h1 className="ml-5 mb-10">Elige dónde quieres recibir tu compra:</h1>
          <div className="shipping__container flex mx-8 md:mx-8 lg:mx-28 flex-col md:flex-row">
            <div className="delivery w-full md:w-2/3">
              <Adresses />
            </div>
            <div className="p-4 w-full md:w-1/3 bg-white m-0 md:ml-8">
              <Summary />
              <div>
                <GeneralBtn
                  type="primary"
                  className={classNames("mt-8", summary.summary__button, {
                    [summary["summary__button--disabled"]]:
                      !selectedAddress ||
                      (cart.length === 0 && directBuy === null),
                  })}
                  onClick={handleButtonClickAdress}
                  disabled={
                    !selectedAddress ||
                    (cart.length === 0 && directBuy === null)
                  }
                >
                  Continuar compra
                </GeneralBtn>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoAddressAdded />
      )}
    </div>
  );
}
