import { http, createConfig } from "wagmi";
import { mainnet, sepolia, scrollSepolia } from "wagmi/chains";

export const config = createConfig({
  chains: [scrollSepolia],
  transports: {
    [scrollSepolia.id]: http(),
  },
});
