# ERC20 Token Smart Contract Project

This project implements an ERC20 token using Solidity and integrates it with a backend API.

## Project Structure

```
/smart-contract        # Hardhat project for the ERC20 token
  /contracts           # Smart contract source code
  /scripts             # Deployment scripts
  /test                # Smart contract tests
  hardhat.config.ts    # Hardhat configuration
  
/poc                   # Backend project
  /backend             # Backend API that interacts with the smart contract
    /controllers       # API controllers
    /routes            # API routes
    /services          # Services to interact with the smart contract
    /scripts           # Testing scripts
```

## Requirements

- Node.js >= 20.10.0
- NPM >= 10.5.0

## Smart Contract Setup

1. Navigate to the smart contract directory:

```bash
cd smart-contract
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with the following content:

```
# Ethereum network variables
SEPOLIA_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY
PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

# Etherscan API key for contract verification (optional)
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY
```

4. Compile the smart contract:

```bash
npx hardhat compile
```

5. Run tests:

```bash
npx hardhat test
```

## Deployment

### Local Development Network

1. Start a local Hardhat node (using port 8546 to avoid conflicts):

```bash
npx hardhat node --port 8546
```

2. In a new terminal, deploy the contract to the local network:

```bash
npx hardhat run scripts/deploy.ts --network localhost
```

### Sepolia Testnet

To deploy to the Sepolia testnet, update the `.env` file with your Infura API key and private key, then run:

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

## Backend Setup

1. Navigate to the backend directory:

```bash
cd ../poc/backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with the following content:

```
# Ethereum
ETHEREUM_RPC_URL=http://localhost:8546
ETHEREUM_PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

4. Test the communication with the smart contract:

```bash
node scripts/test-token.js
```

5. Start the backend server:

```bash
npm run dev
```

## API Endpoints

- `GET /api/token/info` - Get general token information
- `GET /api/token/owner` - Get token owner's address (authenticated)
- `GET /api/token/balance/:address` - Get token balance for a specific address (authenticated)
- `POST /api/token/transfer` - Transfer tokens (authenticated, body: `{ to, amount }`)

## Smart Contract Features

The ERC20 token includes the following features:

- Standard ERC20 functionality (transfer, balanceOf, etc.)
- Minting capability (restricted to the owner)
- Burning capability (available to any token holder)
- Total supply of 1,000,000 tokens

## License

MIT
