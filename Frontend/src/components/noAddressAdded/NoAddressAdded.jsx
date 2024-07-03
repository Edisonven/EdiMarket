import { useNavigate } from 'react-router-dom';
import { GeneralBtn } from '../generalBtn/GeneralBtn'

export function NoAddressAdded() {

  const navigate = useNavigate();

  const handleAddAddresses = () => {
    navigate("/user-address");
  }

  return (
    <div className='flex flex-col align-center justify-center'>
      <div className='flex  flex-col justify-center align-center lg:mx-96 md:mx-80 mx-20'>
        <h1 className="mb-10 text-center">No has añadido ninguna dirección :(</h1>
        <GeneralBtn type='primary' className="" onClick={handleAddAddresses}>
          Añadir dirección
        </GeneralBtn>
      </div>
    </div>
  )
};