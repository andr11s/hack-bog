import { ConnectButton } from '@rainbow-me/rainbowkit';
import QRCode from 'qrcode.react';
import contractExperia from "../assets/experia.json";
import { useAccount, useWriteContract } from 'wagmi';

type Props = {
    amount: number,
    message: string
}

const Home = (props: Props) => {

  const {address} = useAccount()
  const { data: hash, writeContract } = useWriteContract()
  // const [walletRestaurant, setWalletRestaurant] = useState("")
  // setWalletRestaurant("0x459393De4adF9007053391B1cb481Cc1DFA18878")
  const buyProduct = () => {
    console.log("enter");
    console.log(BigInt(props.amount));
    
    
    writeContract({
      address: '0x2eCDC5ADdc6b6045428b4417636733292b5f8afC',
      abi: contractExperia,
      functionName: 'buy',
      args: [ address, "0x459393De4adF9007053391B1cb481Cc1DFA18878"],
      value: BigInt(props.amount),
      chainId: 43113,
    })

    console.log(hash);
    
  };
  return (
    <>
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
        
          <button className='w-28 px-3 py-1 rounded-md bg-green-500 cursor-pointer text-black' onClick={buyProduct}> Pay product</button>
        </div>
      </div>
    </main>

    </>

  )
}

export default Home