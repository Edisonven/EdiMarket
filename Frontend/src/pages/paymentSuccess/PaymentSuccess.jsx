import ediFeliz from "../../../public/imgs/aplication/edi-feliz.svg";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";

export function PaymentSuccess(){
    return (
      <div className='py-10 flex flex-col items-center jusitfy-center'>
        <div>
          <h1 className="text-center">Compra Exitosa</h1>
          <h3 className="text-center mt-3">¡MuchasGracias por tu compra!</h3>
        </div>
        <div>
          <img src={ediFeliz} alt="" className="h-64 mt-8 mb-10"/>
        </div>
        <div>
          <GeneralBtn type="primary">
            Seguir comprando
          </GeneralBtn>
        </div>
        </div>
      );
}
