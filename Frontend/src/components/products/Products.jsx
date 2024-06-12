import { ProductCard } from "../../components/productCard/ProductCard.jsx";
import products from "/public/product.json";

export function Products() {
  return (
    <div className="products__container">
      <div className="home__cards__container">
        {products.map((product) => (
          <ProductCard key={product.id} className="home__card shadow-md">
            <img
              className="home__card__img"
              src={product.href}
              alt={product.nombre}
            />
            <div className="home__card__desc__container px-4">
              <p className="home__card__paragraph text-slate-700 font-semibold text-lg">
                {product.nombre}
              </p>
              <p className="home__card__paragraph font-semibold text-2xl">
                {product.precio.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </p>
            </div>
          </ProductCard>
        ))}
      </div>
    </div>
  );
}