import { useState, useContext, useEffect } from "react";
import summary from "../../components/summary/summary.module.css"
import billing from "./billing.module.css"
import classNames from "classnames";
import { PaymentMethods } from "../../components/paymentMethods/PaymentMethods";
import { Summary } from "../../components/summary/Summary";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";
import { ThreeDots } from "react-loader-spinner";
import { CheckoutContext } from "../../context/CheckoutContext";
import { CartContext } from "../../context/CarritoContext";
import { UserContext } from "../../context/UserContext";
import { NavLink } from "react-router-dom";
import { NoPaymentMethodsAdded } from "../../components/noPaymentMethodsAdded/NoPaymentMethodsAdded";

export function Billing() {
  const { userToken, userCreditCards } = useContext(UserContext);
  const { selectedPaymentMethod, isLoading, setIsLoading, navigate } = useContext(CheckoutContext);
  const { cart, clearCart } = useContext(CartContext);
  const [addOrder, setAddOrder] = useState([]);

  const handleOrder = async (idProducto, cantidad) => {
    try {
      for (const producto of cart) {
        const response = await fetch(`https://edimarket.onrender.com/venta`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            idProducto: producto.producto_id,
            cantidad: producto.cantidad,
          })
        });

        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }

        const data = await response.json();
        console.log('Compra realizada', data);
        setAddOrder(prev => [...prev, data]);
        return data;
      }

      clearCart();

    } catch (error) {
      console.error('Error al realizar la compra:', error);
    }
  };

  const handleButtonClickPayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/compra-exitosa");
    }, 1500);
  };

  const handleClick = () => {
    handleButtonClickPayment();
    handleOrder();
  };

  return (
    <div>
      {userCreditCards.length ?
        <div className={classNames('pt-10', 'billing__container')}>
          <h1 className="mb-10 ml-5">¿Cómo quieres pagar?</h1>
          <div className="flex mx-8 md:mx-8 lg:mx-28 flex-col md:flex-row">
            <div className="delivery w-full md:w-2/3">
              <PaymentMethods />
            </div>
            <div className="p-4 summary_container w-full md:w-1/3 bg-white m-0 md:ml-8">
              <Summary />
              <div className="">
                <GeneralBtn
                  className={classNames(
                    'mt-8',
                    summary.summary__button,
                    { [summary['summary__button--disabled']]: !selectedPaymentMethod }
                  )}
                  type="primary"
                  onClick={() => { handleClick(); }}
                  disabled={!selectedPaymentMethod}>
                  {isLoading ? (
                    <ThreeDots
                      visible={true}
                      height="25"
                      width="100"
                      color="#FFFFFF"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    "Realizar pago"
                  )}
                </GeneralBtn>
              </div>
            </div>
          </div>
        </div>
        : <NoPaymentMethodsAdded />
      }
    </div>
  );
}
