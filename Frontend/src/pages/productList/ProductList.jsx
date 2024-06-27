import "../../pages/productList/productList.css";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import { ProductCard } from "../../components/productCard/ProductCard";
import { Loader } from "../../components/loader/Loader";
import { UserContext } from "../../context/UserContext";

export function ProductList() {
  const { categoria } = useParams();
  const { handleProductDetail, loading, setLoading } =
    useContext(ProductContext);
  const [orderBy, setOrderBy] = useState("");
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { user, userToken } = useContext(UserContext);

  const handleGetFilteredProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://edimarket.onrender.com/categorias/${categoria}`
      );
      if (!response.ok) {
        throw new Error("Producto no encontrado");
      }
      const data = await response.json();

      setFilteredProducts(data.results);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setLoading(false);
    }
  };

  let sortedProducts = [...filteredProducts];

  useEffect(() => {
    handleGetFilteredProducts();
  }, [categoria]);

  const handleSortChange = (event) => {
    setOrderBy(event.target.value);
  };

  useEffect(() => {
    if (navigate) {
      setOrderBy("");
    }
  }, [navigate]);

  if (userToken) {
    sortedProducts = sortedProducts.filter(
      (product) => product.vendedor !== user.id
    );

    if (orderBy === "menorPrecio") {
      sortedProducts.sort((a, b) => a.precio - b.precio);
    } else if (orderBy === "mayorPrecio") {
      sortedProducts.sort((a, b) => b.precio - a.precio);
    }
  }

  return (
    <div className="products__container">
      <h1 className="products__title text-2xl font-normal">
        Estás en la siguiente categoría :{" "}
        <span className="font-semibold">
          {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
        </span>
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <select
            onChange={handleSortChange}
            className="products__filter shadow-sm rounded-md py-1 px-2 w-60 text-center mt-10 border border-gray-300"
            name="orderBy"
            id="orderBy"
            value={orderBy}
          >
            <option className="text-start cursor-pointer" value="">
              Ordenar por
            </option>
            <option className="text-start cursor-pointer" value="menorPrecio">
              Menor precio
            </option>
            <option className="text-start cursor-pointer" value="mayorPrecio">
              Mayor precio
            </option>
          </select>
          <div className="products__cards__container">
            {sortedProducts.map((product) => (
              <ProductCard
                onClick={() => handleProductDetail(product?.id)}
                key={product?.id}
                className="products__card shadow-md bg-white"
              >
                <div className="products__card__img__container">
                  <img
                    className="products__card__img"
                    src={product?.imagen}
                    alt={product?.nombre}
                  />
                  <div className="products__card__desc__container px-4">
                    <p className="products__card__paragraph text-slate-700 font-semibold text-lg">
                      {product?.nombre}
                    </p>
                    <p className="products__card__paragraph font-semibold text-2xl">
                      {product?.precio
                        ? Number(product.precio).toLocaleString("es-CL", {
                            style: "currency",
                            currency: "CLP",
                          })
                        : null}
                    </p>
                  </div>
                </div>
              </ProductCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
