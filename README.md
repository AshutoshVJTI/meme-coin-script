# Meme Coin Trading Script

Automates meme coin trading on Solana using Raydium. Fetches tweets, detects bullish sentiments with OpenAI, and swaps SOL for tokens.

## Setup

1. Clone & Install:
   git clone https://github.com/your-repo/meme-coin-script.git
   cd meme-coin-script
   npm install

2. Configure .env:
   cp .env.example .env
   Fill in:
   RAPID_API_KEY=your_rapid_api_key
   OPENAI_API_KEY=your_openai_api_key
   PRIVATE_KEY=your_solana_private_key
   RPC_URL=https://api.mainnet-beta.solana.com

## Usage

- Dev Mode: npm run dev
- Build & Run:
   npm run build
   npm start

## How It Works

1. Fetches recent tweets.
2. Detects bullish posts with token addresses via OpenAI.
3. Swaps SOL for the token using Raydium.

## Disclaimer

For educational purposes only. Use at your own risk.
