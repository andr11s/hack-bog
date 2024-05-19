import './App.css';
import { ConnectButton, RainbowKitProvider  } from '@rainbow-me/rainbowkit';

 
import '@rainbow-me/rainbowkit/styles.css';

import { config } from './config' 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiConfig } from 'wagmi';
import Home from './home/Home';

const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <RainbowKitProvider Chain={config.chains}>
          <Home message="Desayuno" amount={21000}/>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  )
}

export default App;
