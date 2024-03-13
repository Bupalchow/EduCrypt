import './polyfills';
import './CSS/global.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, lightTheme,  RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { confluxESpaceTestnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const { chains, publicClient } = configureChains(
  [ confluxESpaceTestnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'EDUCRYPT',
  projectId: 'educrypt',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={lightTheme()}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);