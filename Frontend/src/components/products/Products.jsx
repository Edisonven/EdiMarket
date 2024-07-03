import { useContext, useEffect } from "react";
import { ProductCard } from "../../components/productCard/ProductCard.jsx";
import { ProductContext } from "../../context/ProductContext.jsx";
import { Loader } from "../loader/Loader.jsx";
import "../products/products.css";
import { UserContext } from "../../context/UserContext.jsx";
import { Pagination } from "../pagination/Pagination.jsx";
import star from "/imgs/aplication/estrella.png";

export function Products() {
  const { products, handleProductDetail, loading, page } =
    useContext(ProductContext);
  const { userToken, user } = useContext(UserContext);

  useEffect(() => {
    if (page !== 1) {
      window.scrollTo(0, 600);
    }
  }, [page]);

  return (
    <section>
      <div className="products__container">
        <div className="product__title__container">
          <h1 className="products__title text-2xl font-semibold mt-7">
            Lo más reciente
          </h1>
        </div>
        <Pagination />
        {loading ? (
          <Loader />
        ) : (
          <div className="products__cards__container">
            {userToken ? (
              <div className="products__cards__container">
                {products?.map((product) => (
                  <ProductCard
                    onClick={() => handleProductDetail(product?.id)}
                    key={product.id}
                    className="products__card shadow-md bg-white"
                  >
                    <div className="products__card__img__container">
                      {user.id === product?.vendedor ? (
                        <div className="product__star__container">
                          <span className="font-semibold">Mi producto</span>
                          <img
                            className="product__star__icon"
                            src={star}
                            alt=""
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      <img
                        className="products__card__img"
                        src={
                          product?.imagen
                            ? product?.imagen
                            : "/imgs/aplication/img-notfound.png"
                        }
                        alt={product?.nombre}
                      />
                      <div className="products__card__desc__container px-4">
                        <p className="products__card__paragraph pt-8 text-left">
                          {product?.nombre}
                        </p>
                        <h6 className="products__card__paragraph pb-8 text-left">
                          {product?.precio.toLocaleString("es-CL", {
                            style: "currency",
                            currency: "CLP",
                          })}
                        </h6>
                      </div>
                    </div>
                  </ProductCard>
                ))}
              </div>
            ) : (
              <div className="products__cards__container">
                {products?.map((product) => (
                  <ProductCard
                    onClick={() => handleProductDetail(product?.id)}
                    key={product.id}
                    className="products__card shadow-md bg-white"
                  >
                    <div className="products__card__img__container">
                      <img
                        className="products__card__img"
                        src={
                          product?.imagen
                            ? product?.imagen
                            : "/imgs/aplication/img-notfound.png"
                        }
                        alt={product?.nombre}
                      />
                      <div className="products__card__desc__container px-4">
                        <p className="products__card__paragraph pt-8 text-left">
                          {product?.nombre}
                        </p>
                        <h6 className="products__card__paragraph pb-8 text-left">
                          {product?.precio.toLocaleString("es-CL", {
                            style: "currency",
                            currency: "CLP",
                          })}
                        </h6>
                      </div>
                    </div>
                  </ProductCard>
                ))}
              </div>
            )}
          </div>
        )}
        <Pagination />
      </div>
    </section>
  );
}
