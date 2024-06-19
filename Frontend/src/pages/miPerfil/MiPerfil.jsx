import "../miPerfil/miPerfil.css";
import { PiUserListLight } from "react-icons/pi";
import { MdSell } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { FaCreditCard } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

export function MiPerfil() {
  return (
    <section className="miperfil__container ">
      <div className="miperfil__userinfo__container bg-white shadow-sm ">
        <div className="miperfill__userinfo__initials">
          <h1 className="text-6xl rounded-full">EV</h1>
        </div>
        <div className="miperfil__userinfo__name">
          <p className="miperfill__userinfo__paragraph font-medium">
            Edison Alejandro Venegas Espinoza
          </p>
          <p className="miperfill__userinfo__paragraph text-sm mt-3">
            Aalevenegass@gmail.com
          </p>
        </div>
      </div>
      <div className="miperfil__userinfo__edit bg-white shadow-sm rounded-md">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center w-full">
            <Link
              to="/user-data"
              className="miperfil__userinfo__data miperfil__userinfo__postlink w-full"
            >
              <PiUserListLight className="miperfil__userinfo__icon text" />
              Información personal
            </Link>
          </div>
          <div className="">
            <IoIosArrowForward className="miperfil__userinfo__icon__arrow " />
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center w-full">
            <Link
              to="/createpost"
              className="miperfil__userinfo__data miperfil__userinfo__postlink w-full"
            >
              <IoAddCircle className="miperfil__userinfo__icon text" />
              Crear una publicación
            </Link>
          </div>
          <div className="">
            <IoIosArrowForward className="miperfil__userinfo__icon__arrow " />
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center w-full">
            <Link
              to=""
              className="miperfil__userinfo__data miperfil__userinfo__postlink w-full"
            >
              <MdSell className="miperfil__userinfo__icon text" />
              Mis publicaciones
            </Link>
          </div>
          <div className="">
            <IoIosArrowForward className="miperfil__userinfo__icon__arrow " />
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center w-full">
            <Link
              to=""
              className="miperfil__userinfo__data miperfil__userinfo__postlink w-full"
            >
              <HiMiniShoppingBag className="miperfil__userinfo__icon text" />
              Mis compras
            </Link>
          </div>
          <div className="">
            <IoIosArrowForward className="miperfil__userinfo__icon__arrow " />
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center w-full">
            <Link
              to=""
              className="miperfil__userinfo__data miperfil__userinfo__postlink w-full"
            >
              <FaCreditCard className="miperfil__userinfo__icon text" />
              Mis tarjetas
            </Link>
          </div>
          <div className="">
            <IoIosArrowForward className="miperfil__userinfo__icon__arrow " />
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center w-full">
            <Link
              to=""
              className="miperfil__userinfo__data miperfil__userinfo__postlink w-full"
            >
              <FaLocationDot className="miperfil__userinfo__icon text" />
              Mis direcciones
            </Link>
          </div>
          <div className="">
            <IoIosArrowForward className="miperfil__userinfo__icon__arrow " />
          </div>
        </div>
      </div>
    </section>
  );
}
