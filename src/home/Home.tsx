import { ConnectButton } from '@rainbow-me/rainbowkit';
import QRCode from 'qrcode.react';
import contractExperia from "../assets/experia.json";
import { useAccount, useWriteContract } from 'wagmi';
import { useEffect, useState } from 'react';
import logo from '../assets/expire.png'

type Props = {
    amount: number,
    message: string
}

const Home = (props: Props) => {

  const {address} = useAccount()
  const [home, setHome] = useState(false)
  const { data: hash, writeContract } = useWriteContract()
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleClick = () => {
    setHome(!home)
    
  }
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const buyProduct =async () => {
    console.log("enter");
    console.log(BigInt(props.amount));
    setIsLoading(true);
    setIsSuccessful(false);
    setIsModalOpen(false);
    
     writeContract({
      address: '0x2eCDC5ADdc6b6045428b4417636733292b5f8afC',
      abi: contractExperia,
      functionName: 'buy',
      args: [ address, "0x459393De4adF9007053391B1cb481Cc1DFA18878"],
      value: BigInt(props.amount),
      chainId: 43113,
    }
  )    
  setTimeout(() => {
    alert('La transacción se ha finalizado exitosamente.')
    
  }, 10000);
  };

  useEffect(() => {
    let timer : NodeJS.Timeout;
    if (isLoading) {
      
        setIsLoading(false);
        setIsSuccessful(true);
        setIsModalOpen(true);
    }
    return () => clearTimeout(timer); // Limpiar el temporizador en el desmontaje del componente
  }, [isLoading]);
  return (
    <>
    {
      home  ? (
        isLoading ? (
          <div>cargando...</div>
        ):(
          
          <div>
          <div className='flex justify-end m-3'>
          <ConnectButton />
          </div>
        <main className="flex min-h-screen items-center justify-center p-10 bg-gray-100">
          <div className="flex flex-col md:flex-row w-full max-w-5xl items-center justify-between bg-white shadow-lg p-8 rounded-lg">
            <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
              <h2 className="text-xl font-bold mb-4">Scan</h2>
              <QRCode
                value={`avax:${address}?amount=${props.amount}&message=${props.message}`}
                size={256}
              />
            </div>
            <div className="w-full md:w-1/2 p-4">
              <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">Payment Information</h2>
              <p className="mb-2"><strong>Address:</strong> {address}</p>
              <p className="mb-2"><strong>Amount:</strong> {props.amount}</p>
              <p className="mb-2"><strong>Message:</strong> {props.message}</p>
            
              <button className='w-28 px-3 py-1 rounded-md bg-blue-400 cursor-pointer text-white' onClick={buyProduct}> Pay product</button>
            </div>
          </div>
        </main>
        
    </div>

        )

      ) : (
        <div className='flex justify-center text-center justify-items-center items-center h-screen overflow-hidden bg-black'>
          <div>
            <img className='w-80 h-80 bg-cover' src={logo} alt="" />
            <div>
              <button className='w-56  h-6 mt-3 rounded-md text-white bg-blue-400  font-bold font-mono cursor-pointer' onClick={handleClick } > Adquiere el producto </button>
            </div>
          </div>
        </div>
        
      )


        

      
    }
    </>
    
  )
}

export default Home