# 🔴 Transaction Error: eth_sendTransaction not supported

## What Happened

✅ **IPFS Upload**: SUCCESS! Reached 100%  
❌ **Ethereum Transaction**: FAILED with error `method eth_sendTransaction not supported`

---

## Root Cause

The error occurs because the Web3 provider isn't properly configured to send transactions. This typically happens when:

1. **Provider Issue**: The provider from @web3-react isn't properly handling transaction signing
2. **Web3 Version Mismatch**: Using Web3 v1.2.2 with @web3-react v6.1.9 can have compatibility issues
3. **Account Not Properly Connected**: The `from` account isn't recognized by the provider

---

## Diagnostic Steps

### 1. Check Wallet Connection

Open browser console and run:
```javascript
// Check if MetaMask is connected
window.ethereum.selectedAddress

// Check if account is recognized
window.ethereum.request({ method: 'eth_accounts' })

// Check network
window.ethereum.chainId
```

**Expected**: 
- Address should be shown
- Accounts array should contain your address
- Chain ID should be `0x1` (Mainnet)

### 2. Check Web3 Provider

```javascript
// In console while on the page
window.web3.currentProvider
```

**Expected**: Should show MetaMask provider

---

## Likely Solutions

### Solution 1: Reconnect Wallet

The most common fix:

1. **Disconnect** MetaMask from the site:
   - Click MetaMask extension
   - Go to "Connected sites"
   - Find `localhost` and disconnect

2. **Clear** browser cache:
   - Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

3. **Reconnect** wallet:
   - Click "Connect Wallet" button
   - Approve connection in MetaMask
   - Try uploading again

### Solution 2: Check Network

Make sure you're on **Ethereum Mainnet**:

1. Open MetaMask
2. Check network at top
3. Should say "Ethereum Mainnet"
4. If not, switch to Mainnet

### Solution 3: Update Provider Configuration

The issue might be in how the Web3 library wraps the provider.

**Current code** (`src/utils/getLibrary.js`):
```javascript
const library = new Web3(provider);
library.eth.transactionPollingTimeout = 750;
library.eth.transactionConfirmationBlocks = 1;
return library;
```

**Try this fix**:

1. The provider might need explicit account access
2. The Web3 instance might not be properly initialized

---

## Temporary Workaround

If reconnecting doesn't work, try:

1. **Use fallback web3** instead of connected wallet
2. **Switch to a different browser** (Chrome/Brave if using Firefox, or vice versa)
3. **Update MetaMask** to latest version
4. **Try a different wallet** (if you have WalletConnect set up)

---

## What's Working

✅ **IPFS Upload**: 100% complete  
✅ **IPFS Configuration**: Correct  
✅ **File Storage**: File is on IPFS  
✅ **Browser → IPFS**: Connection working  

❌ **Only issue**: Ethereum transaction not being sent

---

## Code Location

The transaction is being sent here:

**File**: `src/pages/CreateRequest.js`  
**Lines**: 162-189

```javascript
appState.contract.methods
  .submitNewRequest(...)
  .send(
    {
      from: account,
      to: process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS,
      gasPrice: +appState.gas.average * Math.pow(10, 8),
    },
    (error, result) => {
      // Callback
    }
  );
```

The error happens at the `.send()` call when Web3 tries to use `eth_sendTransaction`.

---

## About Those Uniswap Errors

The CORS errors you see:
```
https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2
```

**These are completely unrelated** to your transaction issue. They're separate API calls for price data.

---

## MetaMask Warning

```
MetaMask: The event 'data' is deprecated and will be removed in the future.
Use 'message' instead.
```

This is just a deprecation warning from your event listeners. It won't break functionality, but should be updated eventually.

---

## Next Steps to Debug

1. **Open browser console**
2. **Run these commands**:
   ```javascript
   // Check connection
   await window.ethereum.request({ method: 'eth_requestAccounts' })
   
   // Try manual transaction
   await window.ethereum.request({
     method: 'eth_sendTransaction',
     params: [{
       from: window.ethereum.selectedAddress,
       to: '0xF67192a8b9f269f23802D9AB94C7875a0aBB7aeA',
       value: '0x0',
       data: '0x'
     }]
   })
   ```

3. **If this fails**, the issue is with MetaMask/provider
4. **If this works**, the issue is with how Web3 is calling it

---

## Quick Fix Script

Try running this in console:

```javascript
// Force reconnect
await window.ethereum.request({ 
  method: 'wallet_requestPermissions', 
  params: [{ eth_accounts: {} }] 
});
```

Then try uploading again.

---

## Alternative: Use MetaMask Directly

As a workaround, you could bypass Web3.js and call MetaMask directly:

```javascript
const tx = await window.ethereum.request({
  method: 'eth_sendTransaction',
  params: [{
    from: account,
    to: contractAddress,
    data: encodedData, // Contract method call
    gas: '0x76c0', // 30400
    gasPrice: gasPriceInHex
  }]
});
```

---

## Summary

✅ IPFS upload is **fully working** now!  
❌ Ethereum transaction has a **provider/connection issue**  

**Most likely fix**: Disconnect and reconnect MetaMask, then try again.


