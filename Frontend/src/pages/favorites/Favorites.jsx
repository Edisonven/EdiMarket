import { useContext } from "react";
import "../favorites/favorites.css";
import { ProductContext } from "../../context/ProductContext";
import { ProductCard } from "../../components/productCard/ProductCard";

export function Favorites() {
  const { products } = useContext(ProductContext);

  return (
    <section className="favorites__container bg-white shadow-sm">
      <h1 className="favorites__title text-2xl font-semibold">Mis favoritos</h1>
      <div className="favorites__cards__container">
        {products.map((product) => {
          return (
            <ProductCard key={product.id}>
              <div className="favorites__card__body">
                <img
                  className="favorites__card__img shadow-md"
                  src={product.href}
                  alt=""
                />
                <div className="favorites__card__info">
                  <p className="favorites__card__paragraph text-md font-light text-lg">
                    {product.nombre}
                  </p>
                  <p className="favorites__card__info">
                    {product.precio.toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    })}
                  </p>
                  <button className="favorites__card__info__btn font-bold text-blue-400">
                    Eliminar
                  </button>
                </div>
              </div>
            </ProductCard>
          );
        })}
      </div>
    </section>
  );
}