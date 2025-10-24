# AGENTS Guide: Zarela WebApp (Legacy Node 14)

This document is for an agent to triage and fix runtime issues, with focus on the web3 connection. Paste console errors into the bottom section and follow the playbook.

## Snapshot of the Current Stack

- **Node**: v14 (legacy; many deps now expect >=16/18)
- **React**: 17.0.2 (CRA 5 via react-app-rewired)
- **Bundler**: react-scripts 5 + config-overrides with Node polyfills
- **Web3 stack**:
  - web3: 4.16.0 (ESM-first, breaking changes vs 1.x)
  - @web3-react/core: 8.2.3 (hooks API)
  - Injected connector: @web3-react/injected-connector 6.0.7 (only Mainnet allowed)
  - ethers (partial): @ethersproject/providers present but not actively used
- **Data/API**: Etherscan (v1 tx endpoints + v2 gas oracle), Apollo Client for GraphQL
- **UI**: Material-UI v4, styled-components v6, react-router-dom v5, reactstrap
- **Other notable**: ipfs-http-client 60.x (ESM; can be problematic in CRA if bundled on client)

## Where Web3 Is Wired

- **Provider root**: `src/App.js`
  - Uses `Web3ReactProvider` with `getLibrary` from `src/utils/getLibrary.js`.
- **Library factory**: `src/utils/getLibrary.js`
  - Returns a `new Web3(provider, <chainId-or-'any'>)`, sets `library.pollingInterval = 15000`.
- **Fallback provider**: `src/getFallbackWeb3.js`
  - On `window.load` chooses `window.ethereum` if present, otherwise public RPC `https://eth.llamarpc.com` (Mainnet), verifies with `getBlockNumber`.
- **App state + contract**: `src/state/Provider.js` and `src/state/actions.js`
  - If `library` exists, `configureWeb3(dispatch, library)` creates `web3.eth.Contract(ABI, REACT_APP_ZARELA_CONTRACT_ADDRESS)`.
  - Else `configureFallbackWeb3` creates a fallback `Web3` and the same contract.
  - Reads ETH balance via `activeWeb3.eth.getBalance(account)` and BBIT via `contract.methods.balanceOf(account)`.
- **Connector**: `src/connectors/index.js`
  - `InjectedConnector({ supportedChainIds: [1] })` → only Ethereum Mainnet will activate.
- **Etherscan usage**: `src/pages/Wallet/Wallet.js`, `src/state/actions.js`
  - Tx history uses `REACT_APP_ETHERSCAN_MAINNET_API_LINK` as base URL.
  - Gas price uses `https://api.etherscan.io/v2/api` with `chainid=1`.

## Required Environment Variables (.env)

From `.env.example`:
- **REACT_APP_ZARELA_CONTRACT_ADDRESS**: Deployed contract address (must match the active network).
- **REACT_APP_ETHERSCAN_MAINNET_API_LINK**: Etherscan API base URL used by the app, e.g. `https://api.etherscan.io/api`.
- **REACT_APP_ETHEREUM_API_KEY**: Etherscan API key.
- Optional: `REACT_APP_IPFS`, `REACT_APP_IPFS_GET_LINK`, `REACT_APP_ETHERSCAN_LINK`, `REACT_APP_ZARELA_BUSINESS_CATEGORY`, `REACT_APP_ETHERSCAN_ROPSTEN_API_LINK`, `REACT_APP_EXPLORE_LINK`.

Recommendations:
- Ensure `REACT_APP_ETHERSCAN_MAINNET_API_LINK=https://api.etherscan.io/api`.
- Ensure the contract address is on Mainnet or change network support accordingly (see below).

## Known Risk Areas and Likely Root Causes

- **Web3 v4 constructor usage**
  - Current: `new Web3(provider, chainIdOrAny)`. v4 expects `new Web3(provider)`; extra args are ignored and can confuse maintainers. Polling interval setting may not affect web3 v4.
  - Symptom: Unexpected behavior/polling, hard-to-reason connection state.
  - Fix (future patch): Use `new Web3(provider)` only; handle chain logic via provider/network checks.

- **Network lock to Mainnet**
  - `InjectedConnector` allows only `1`. If wallet is on Sepolia/other, activation fails.
  - Symptom: Wallet not connecting, no `library`, fallback used instead, features requiring signer unavailable.
  - Fix: Add allowed chain IDs (e.g., `SEPOLIA`) or provide UI feedback to switch network.

- **Environment-driven Etherscan calls**
  - `Wallet.js` calls `axios.get(ETHERSCAN_BASE_URL, ...)`. If `REACT_APP_ETHERSCAN_MAINNET_API_LINK` is empty, this becomes an invalid URL.
  - Symptom: `ERR_INVALID_URL` or network errors on fetching transactions.
  - Fix: Set `REACT_APP_ETHERSCAN_MAINNET_API_LINK=https://api.etherscan.io/api` and provide a valid `REACT_APP_ETHEREUM_API_KEY`.

- **Styled-components v6 with React 17**
  - v6 targets React 18; using with React 17 can lead to subtle runtime issues.
  - Symptom: Rendering/hydration warnings or runtime crashes in edge cases.
  - Fix: Consider downgrading to `styled-components@5.3.11`.

- **ESM-only deps under CRA**
  - `web3@4` and `ipfs-http-client@60` are ESM; CRA 5 can bundle them, but dynamic imports and tree-shaking matter.
  - Symptom: Build-time or runtime errors about module format, or polyfill-related errors (`process`/`Buffer` undefined) when polyfills are missing.
  - Mitigation: `config-overrides.js` adds necessary polyfills. Avoid importing IPFS code on critical paths unless needed.

- **RPC/network mismatch**
  - Fallback RPC is Mainnet (`eth.llamarpc.com`). If the configured `REACT_APP_ZARELA_CONTRACT_ADDRESS` is for a testnet, contract reads will fail.
  - Symptom: `contract.methods...` reverts or returns zeros; balance reads fail silently.
  - Fix: Align fallback RPC and `supportedChainIds` with the contract’s network.

- **Auto-activation heuristic**
  - Uses `window.ethereum?.selectedAddress` to auto-activate. Some wallets may not expose this or may return stale values.
  - Symptom: Auto-connect not triggering or triggering inconsistently.
  - Fix: Rely on `@web3-react` connection UI and `ethereum.on('accountsChanged')` (future improvement).

## Quick Operational Checklist

- **Before running**
  - Ensure Node 14 is used (or upgrade path planned).
  - Create `.env` with the variables listed above.
  - If wallet is not on Mainnet, either switch to Mainnet or extend `supportedChainIds`.
- **Run**
  - `npm start` (or `yarn start`) using the repo’s scripts (react-app-rewired).
- **Verify in browser**
  - Open devtools console.
  - Check `window.ethereum?.chainId`, `window.ethereum?.selectedAddress`.
  - Check `window.web3` (should not be relied on), prefer `@web3-react` state.

## Minimal Diagnostics to Capture With Any Error

Paste this under “Errors Collected” below for each issue:
- **What you did**: navigation/click sequence
- **Console error(s)**: exact text + stack trace
- **Network**: wallet chainId, is wallet connected?
- **Env**: values for `REACT_APP_ETHERSCAN_MAINNET_API_LINK`, `REACT_APP_ZARELA_CONTRACT_ADDRESS` (redact last 4 if needed)

## Agent Debugging Playbook (Web3-focused)

1. **Confirm env**
   - Verify `REACT_APP_ETHERSCAN_MAINNET_API_LINK` is a valid URL.
   - Verify `REACT_APP_ZARELA_CONTRACT_ADDRESS` matches the intended network.
2. **Check connection state**
   - Inspect `useWeb3React()` values: `active`, `account`, `chainId`, `library` in components.
   - If not active and wallet is on non-Mainnet, extend `supportedChainIds` and prompt network switch.
3. **Validate provider behavior**
   - Ensure fallback initialized (look for console logs from `getFallbackWeb3.js`).
   - If race suspected, ensure code doesn’t rely on contract before `fallbackWeb3Instance` is set.
4. **Contract reads**
   - If `balanceOf` or `getBalance` fails, check RPC/network and ABI/address pairing.
5. **Etherscan calls**
   - If tx history fails, verify base URL and API key; compare with a manual request in the browser.
6. **Apply targeted patches**
   - Prefer small, isolated changes. Examples queued:
     - Simplify `getLibrary` to `new Web3(provider)`.
     - Extend `supportedChainIds` to include `SEPOLIA` if needed.
     - Add defensive checks and more explicit error logs (without noisy spam).
     - Downgrade `styled-components` if React upgrade is not planned.

## Proposed Near-Term Stabilization Patches (to be applied as needed)

- **getLibrary simplification** (`src/utils/getLibrary.js`)
  - Replace the constructor with `new Web3(provider)`; remove unused chainId arg and pollingInterval tweak.
- **Network flexibility** (`src/connectors/index.js`)
  - Allow `[supportedChains.MAINNET, supportedChains.SEPOLIA]` if you test on Sepolia.
- **Env defaults** (constants layer)
  - Provide a safe default for Etherscan base URL when env is empty (or fail loudly with a clear message).
- **styled-components alignment**
  - Downgrade to `5.3.11` or plan React 18 upgrade.

## Context Links

- getLibrary: `src/utils/getLibrary.js`
- Fallback Web3: `src/getFallbackWeb3.js`
- AppState wiring: `src/state/Provider.js`, `src/state/actions.js`
- Connector: `src/connectors/index.js`
- Constants/networks: `src/constants/index.js`
- Wallet history: `src/pages/Wallet/Wallet.js`
- Env template: `.env.example`
