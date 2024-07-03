import { useEffect, useState, useContext } from "react";
import classNames from "classnames";
import { Loader } from "../../components/loader/Loader";
import { UserContext } from "../../context/UserContext";
import myOrders from "./myOrders.module.css";

export function MyOrders() {
  const { userToken, user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (userToken) {
          const response = await fetch(
            `https://edimarket.onrender.com/usuarios/usuario/ventas/?idUsuario=${user.id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Error fetching orders");
          }
          const data = await response.json();

          setOrders(data.ventas);
          setLoading(false);
        } else {
          return;
        }
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString("es-ES", options).toUpperCase();
  };

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(precio);
  };

  return (
    <div
      className={classNames(
        "myOrders__container pt-10 bg-white shadow-sm rounded-sm",
        myOrders.myOrders__container
      )}
    >
      <h1 className="">Mis compras</h1>
      <div className="orders_box">
        {loading ? (
          <Loader />
        ) : (
          orders.map((order, index) => {
            return (
              <div
                className={classNames(
                  "order_box flex flex-row",
                  myOrders.order__container
                )}
                key={`${order.producto_id}_${index}`}
              >
                <div>
                  <h2 className="pb-2">
                    Número de órden: #{`${order.producto_id * 2}`}
                  </h2>
                  <p>Fecha de la compra: {formatDate(order.fecha_venta)}</p>
                  <p className="font-semibold">
                    {formatearPrecio(order.valor_total)}
                  </p>
                </div>
                <div>
                  <img className="h-24" src={order.imagen} alt="" />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
