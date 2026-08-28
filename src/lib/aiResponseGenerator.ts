import type { KeyPointItem, PriceSnapshot, ThinkingStep, WebSource } from '../types/crypto';
import { INITIAL_COINS } from '../data/cryptoData';

export interface GeneratedAiResponse {
  content: string;
  keyPoints?: KeyPointItem[];
  thinkingSteps?: ThinkingStep[];
  priceSnapshot?: PriceSnapshot;
  codeBlocks?: Array<{ language: string; code: string }>;
  suggestedFollowUps: string[];
  webSources?: WebSource[];
}

export interface CryptoResponseOptions {
  isDeepResearch?: boolean;
  isWebSearch?: boolean;
}

export function generateCryptoResponse(
  prompt: string,
  optionsOrBool: boolean | CryptoResponseOptions = false
): GeneratedAiResponse {
  const isDeepResearch =
    typeof optionsOrBool === 'boolean'
      ? optionsOrBool
      : !!optionsOrBool?.isDeepResearch;

  const isWebSearch =
    typeof optionsOrBool === 'object' ? !!optionsOrBool?.isWebSearch : false;
  const query = prompt.toLowerCase();

  const webSources: WebSource[] = isWebSearch
    ? [
        {
          title: 'Coindesk Market Real-Time Intelligence',
          url: 'https://coindesk.com',
          domain: 'coindesk.com',
          snippet: 'Real-time on-chain metrics, orderbook depth, and liquidity data.',
        },
        {
          title: 'DefiLlama Protocol Analytics',
          url: 'https://defillama.com',
          domain: 'defillama.com',
          snippet: 'Total value locked (TVL) tracking across all active smart contract chains.',
        },
      ]
    : [];

  const thinkingSteps: ThinkingStep[] = isDeepResearch
    ? [
        {
          id: 'step-1',
          title: 'Scanning On-Chain Liquidity & Mempools',
          detail: 'Aggregated TVL across Ethereum, Solana, and Arbitrum RPC nodes.',
          status: 'completed',
          durationMs: 420,
        },
        {
          id: 'step-2',
          title: 'Analyzing Institutional Orderbooks & ETF Flows',
          detail: 'Extracted Net Inflows from BlackRock IBIT and Fidelity FBTC.',
          status: 'completed',
          durationMs: 650,
        },
        {
          id: 'step-3',
          title: 'Synthesizing Consensus & Risk-Reward Modeling',
          detail: 'Synthesized macro interest rate sensitivity against Sharpe-ratio volatility.',
          status: 'completed',
          durationMs: 380,
        },
      ]
    : [];

  if (query.includes('bitcoin') || query.includes('btc') || query.includes('satoshi')) {
    const btc = INITIAL_COINS.find((c) => c.id === 'bitcoin')!;
    return {
      content:
        "Bitcoin is the world's premier decentralized digital currency, engineered in 2009 by Satoshi Nakamoto to enable peer-to-peer value transfer without central bank intermediaries.\n\n### Core Protocol Dynamics\nBitcoin operates on a Proof-of-Work (PoW) consensus model using the SHA-256 cryptographic hash algorithm. Every 210,000 blocks (~4 years), the block subsidy undergoes a **Halving**, reducing the inflation rate and reinforcing programmatic scarcity.",
      keyPoints: [
        {
          id: 'kp-btc-1',
          iconType: 'orange',
          title: 'Decentralized Monetary Policy',
          description: 'No sovereign government or single entity can alter the 21M hard cap.',
        },
        {
          id: 'kp-btc-2',
          iconType: 'green',
          title: 'Unhackable Cryptography',
          description: 'Secured by over 650 EH/s of distributed computational hashrate.',
        },
        {
          id: 'kp-btc-3',
          iconType: 'blue',
          title: 'Transparent Settlement Layer',
          description: 'Every transaction is immutably validated on the global public ledger.',
        },
        {
          id: 'kp-btc-4',
          iconType: 'purple',
          title: 'Absolute Scarcity',
          description: '21 Million BTC hard cap creates the hardest asset in human history.',
        },
      ],
      thinkingSteps,
      priceSnapshot: {
        coinId: 'bitcoin',
        symbol: 'BTC',
        name: 'Bitcoin',
        priceUsd: btc.price,
        change24h: btc.change24h,
        marketCapUsd: btc.marketCap,
        volume24hUsd: btc.volume24h,
        sparkline: btc.history24h.map((h) => h.price),
      },
      codeBlocks: [
        {
          language: 'bash',
          code: `# Verify Bitcoin Node Genesis Block Hash\nbitcoin-cli getblockhash 0\n# Output: 000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f`,
        },
      ],
      suggestedFollowUps: [
        'How does Bitcoin mining difficulty adjustment work?',
        'What is the Lightning Network layer 2 for BTC?',
        'Explain the historical impact of the 4-year Halving cycle',
        'How to set up a multi-signature cold storage wallet',
      ],
    };
  }

  if (query.includes('ethereum') || query.includes('eth') || query.includes('vitalik') || query.includes('smart contract')) {
    const eth = INITIAL_COINS.find((c) => c.id === 'ethereum')!;
    return {
      content:
        'Ethereum is the decentralized global computer that pioneers programmable smart contracts, decentralized finance (DeFi), and tokenized real-world assets (RWAs).\n\n### Ethereum Architectural Layers\n1. **Execution Layer (EVM):** Processes transactions and executes bytecode.\n2. **Consensus Layer (Proof of Stake):** Validators stake 32 ETH to secure the network.\n3. **Data Availability (Blobspace / EIP-4844):** Enables Layer-2 rollups (Arbitrum, Base, Optimism) to achieve sub-cent fees.',
      keyPoints: [
        {
          id: 'kp-eth-1',
          iconType: 'blue',
          title: 'Ultra-Sound Deflation',
          description: 'EIP-1559 burns base gas fees directly, making ETH supply deflationary during high usage.',
        },
        {
          id: 'kp-eth-2',
          iconType: 'green',
          title: 'Staking Yield (APY)',
          description: 'Native validator staking yields ~3.2% - 4.5% annualized rewards.',
        },
        {
          id: 'kp-eth-3',
          iconType: 'purple',
          title: 'Layer-2 Ecosystem',
          description: 'Arbitrum, Optimism, Base, and zkSync inherit Ethereum L1 security.',
        },
      ],
      thinkingSteps,
      priceSnapshot: {
        coinId: 'ethereum',
        symbol: 'ETH',
        name: 'Ethereum',
        priceUsd: eth.price,
        change24h: eth.change24h,
        marketCapUsd: eth.marketCap,
        volume24hUsd: eth.volume24h,
        sparkline: eth.history24h.map((h) => h.price),
      },
      codeBlocks: [
        {
          language: 'solidity',
          code: `// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract SimpleVault {\n    mapping(address => uint256) public balances;\n    \n    function deposit() external payable {\n        require(msg.value > 0, "Zero deposit");\n        balances[msg.sender] += msg.value;\n    }\n}`,
        },
      ],
      suggestedFollowUps: [
        'How does liquid staking (Lido, Rocket Pool) work?',
        'Explain Optimistic vs Zero-Knowledge (ZK) Rollups',
        'What are Account Abstraction (ERC-4337) smart accounts?',
      ],
    };
  }

  if (query.includes('solana') || query.includes('sol') || query.includes('memecoin')) {
    const sol = INITIAL_COINS.find((c) => c.id === 'solana')!;
    return {
      content:
        'Solana is a high-performance Layer-1 blockchain engineered for widespread institutional adoption and decentralized applications requiring sub-second finality and ultra-low transaction costs.\n\n### Architectural Innovations\n- **Proof of History (PoH):** A cryptographically verifiable timestamp clock that sequences transactions before consensus.\n- **Tower BFT:** High-speed consensus leveraging PoH as a timing reference.\n- **Sealevel Engine:** Parallel smart contract execution engine capable of processing thousands of transactions concurrently.',
      keyPoints: [
        {
          id: 'kp-sol-1',
          iconType: 'purple',
          title: 'High Throughput',
          description: 'Sustains 2,500 - 4,000+ real TPS with theoretical limits over 65,000 TPS.',
        },
        {
          id: 'kp-sol-2',
          iconType: 'green',
          title: 'Sub-Cent Transaction Fees',
          description: 'Average fee is $0.00025 per transaction, enabling micro-payments.',
        },
        {
          id: 'kp-sol-3',
          iconType: 'cyan',
          title: 'Firedancer Client',
          description: 'Jump Crypto independent C++ validator client pushing throughput to 1M TPS.',
        },
      ],
      thinkingSteps,
      priceSnapshot: {
        coinId: 'solana',
        symbol: 'SOL',
        name: 'Solana',
        priceUsd: sol.price,
        change24h: sol.change24h,
        marketCapUsd: sol.marketCap,
        volume24hUsd: sol.volume24h,
        sparkline: sol.history24h.map((h) => h.price),
      },
      codeBlocks: [
        {
          language: 'rust',
          code: `use anchor_lang::prelude::*;\n\n#[program]\npub mod solana_escrow {\n    use super::*;\n    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {\n        msg!("Escrow vault initialized successfully!");\n        Ok(())\n    }\n}`,
        },
      ],
      suggestedFollowUps: [
        'How does Solana Proof of History work under the hood?',
        'What is Solana Pay for merchant checkouts?',
        'Compare Solana DEX liquidity against Uniswap V3',
      ],
    };
  }

  if (query.includes('staking') || query.includes('yield') || query.includes('defi') || query.includes('apy')) {
    return {
      content:
        'Staking is the mechanism by which Proof-of-Stake (PoS) blockchains secure their networks. Participants lock up their native cryptocurrency to earn algorithmic validation rewards.\n\n### Annualized Staking Yield Formula\n\n$$\\text{Real Yield (Net APY)} = \\text{Nominal APY} - \\text{Network Inflation Rate} - \\text{Validator Commission Fee}$$\n\n### Key Considerations\n- **Slashing Risk:** Penalties imposed if a validator node acts maliciously or goes offline.\n- **Unbonding Period:** The cooldown duration before staked assets become liquid (e.g. 21 days for Cosmos, ~9 days for Ethereum).',
      keyPoints: [
        {
          id: 'kp-stake-1',
          iconType: 'green',
          title: 'Passive Network Yield',
          description: 'Earn 3% to 15% APY depending on the underlying PoS protocol.',
        },
        {
          id: 'kp-stake-2',
          iconType: 'blue',
          title: 'Liquid Staking Tokens (LST)',
          description: 'Tokens like stETH and mSOL allow you to earn staking rewards while using capital in DeFi.',
        },
        {
          id: 'kp-stake-3',
          iconType: 'red',
          title: 'Validator Slashing Risk',
          description: 'Choose reputable validator operators with 99.99% uptime guarantees.',
        },
      ],
      thinkingSteps,
      suggestedFollowUps: [
        'What is EigenLayer and Liquid Restaking (LRT)?',
        'How to calculate Impermanent Loss in Uniswap V3?',
        'What is the safest way to stake Ethereum from hardware wallet?',
      ],
    };
  }

  return {
    content: `Here is a comprehensive breakdown regarding **"${prompt}"** based on live on-chain metrics, macro market data, and protocol fundamentals.\n\n### Market & Strategic Summary\nThe current market cycle is characterized by institutional capital inflows, macroeconomic interest rate shifts, and rapid layer-2 scaling adoption. Risk management, cold-storage security, and deep fundamental analysis remain essential for long-term alpha.\n\n### Fundamental Assessment\n\n| Indicator | Status | Market Signal |\n| :--- | :--- | :--- |\n| **Market Momentum** | Bullish Accumulation | High institutional ETF demand |\n| **Funding Rates** | Neutral to Mild Positive | Healthy derivatives market leverage |\n| **Stablecoin Liquidity** | Growing ($160B+) | Fresh capital entering the ecosystem |`,
    keyPoints: [
      {
        id: 'kp-gen-1',
        iconType: 'blue',
        title: 'Institutional Grade Security',
        description: 'Verify smart contracts, audits, and multi-sig governance structures.',
      },
      {
        id: 'kp-gen-2',
        iconType: 'green',
        title: 'Data-Driven Execution',
        description: 'Cross-reference on-chain volume with orderbook depth before executing positions.',
      },
      {
        id: 'kp-gen-3',
        iconType: 'purple',
        title: 'Diversified Allocation',
        description: 'Maintain strict risk management with defined stop-loss and profit targets.',
      },
    ],
    thinkingSteps,
    webSources: isWebSearch ? webSources : undefined,
    suggestedFollowUps: [
      'What are the key technical support and resistance levels?',
      'How to hedge portfolio downside with crypto options?',
      'Analyze the historical correlation between BTC and the S&P 500',
    ],
  };
}
