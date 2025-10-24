# Environment Variables Guide

**How environment variables work in the Docker setup**

---

## Overview

This guide explains how your `.env` file is used in the Docker build and why it's safe even though environment files are mentioned in `.dockerignore`.

---

## Important: .env is NOT in Docker Image

**Key Point:** The `.env` file is **NEVER** copied into the Docker image. It remains on your host machine and is read by `docker-compose` before building.

---

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│  Step 1: You create .env file on your HOST machine          │
│  Location: /path/to/project/.env                            │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 2: docker-compose reads .env BEFORE build starts      │
│  Command: docker-compose up --build                         │
│  (This happens OUTSIDE the Docker build context)            │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 3: docker-compose passes values as --build-arg        │
│  Example:                                                    │
│  --build-arg REACT_APP_ZARELA_CONTRACT_ADDRESS=0x...        │
│  --build-arg REACT_APP_ETHEREUM_API_KEY=abc123              │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 4: Dockerfile receives as ARG                         │
│  Dockerfile:                                                 │
│    ARG REACT_APP_ZARELA_CONTRACT_ADDRESS                    │
│    ENV REACT_APP_ZARELA_CONTRACT_ADDRESS=$...               │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 5: npm run build bakes them into React bundle        │
│  create-react-app embeds REACT_APP_* into JavaScript       │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 6: Final image contains built JavaScript              │
│  Variables are now part of the compiled code                │
│  .env file is NOT in the image                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Why This is Secure

### ✅ What IS in the Docker image:
- Compiled JavaScript with embedded values
- Static HTML/CSS/JS files
- Nginx configuration

### ❌ What is NOT in the Docker image:
- `.env` file
- Source code
- `node_modules`
- Development tools

---

## .dockerignore Explanation

### What's Ignored

```dockerfile
# .dockerignore file

# These are ignored (won't be copied to Docker build context):
.env.local                    # ✅ Ignored
.env.development.local        # ✅ Ignored
.env.test.local              # ✅ Ignored
.env.production.local        # ✅ Ignored

# This is NOT ignored (docker-compose reads it from host):
.env                         # ✅ NOT in .dockerignore
```

### Why Variant Files are Ignored

`.env.local`, `.env.development.local`, etc. are ignored because:
1. They can conflict with the main `.env`
2. They're not needed in production builds
3. Docker-compose only reads `.env` by default

---

## Configuration in docker-compose.yml

```yaml
services:
  zarela-webapp:
    build:
      args:
        # These values come from .env file on HOST
        - REACT_APP_ZARELA_CONTRACT_ADDRESS=${REACT_APP_ZARELA_CONTRACT_ADDRESS}
        - REACT_APP_ETHEREUM_API_KEY=${REACT_APP_ETHEREUM_API_KEY}
        # ... other variables
```

**How it works:**
1. `docker-compose` reads `.env` from the same directory
2. `${VARIABLE}` syntax pulls value from `.env`
3. Passes as build argument to Dockerfile
4. Never copies `.env` into image

---

## Configuration in Dockerfile

```dockerfile
# Dockerfile

# Receive build arguments
ARG REACT_APP_ZARELA_CONTRACT_ADDRESS
ARG REACT_APP_ETHEREUM_API_KEY

# Set as environment variables for build
ENV REACT_APP_ZARELA_CONTRACT_ADDRESS=$REACT_APP_ZARELA_CONTRACT_ADDRESS
ENV REACT_APP_ETHEREUM_API_KEY=$REACT_APP_ETHEREUM_API_KEY

# Build React app (variables are baked into bundle)
RUN npm run build
```

---

## How Create React App Handles Variables

Create React App (CRA) has special behavior:

### At Build Time:
1. CRA reads all `REACT_APP_*` environment variables
2. Replaces them in the code with actual values
3. Example:
   ```javascript
   // In your code:
   const address = process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS;
   
   // After build becomes:
   const address = "0xF67192a8b9f269f23802D9AB94C7875a0aBB7aeA";
   ```

### Result:
- Variables are **compiled into JavaScript**
- No environment variables in final image
- No `.env` file needed at runtime

---

## Testing Environment Variable Flow

### 1. Check .env is being read:

```bash
# This should show your variables
make check-env
```

### 2. Verify build arguments are passed:

```bash
# Build with verbose output
docker-compose build --progress=plain
# Look for lines like: "ARG REACT_APP_ZARELA_CONTRACT_ADDRESS"
```

### 3. Check compiled bundle:

```bash
# After build, check if variables are in the bundle
docker-compose up -d
docker-compose exec zarela-webapp grep -r "0xF67192a8b9f269f23802D9AB94C7875a0aBB7aeA" /usr/share/nginx/html/static/js/
# Should find your contract address in the compiled JS
```

---

## Common Scenarios

### Scenario 1: Changing Environment Variables

```bash
# 1. Update .env file
vim .env

# 2. Rebuild (variables are baked in at build time)
make rebuild

# 3. Start with new build
make start
```

**Important:** You MUST rebuild after changing `.env` because variables are compiled into the JavaScript.

### Scenario 2: Different Environments

```bash
# Production .env
REACT_APP_ZARELA_CONTRACT_ADDRESS=0xPRODUCTION

# Build production image
docker-compose build

# Staging .env (create .env.staging)
REACT_APP_ZARELA_CONTRACT_ADDRESS=0xSTAGING

# Build staging image
docker-compose -f docker-compose.yml build --build-arg REACT_APP_ZARELA_CONTRACT_ADDRESS=0xSTAGING
```

---

## Security Best Practices

### ✅ DO:
1. Keep `.env` in `.gitignore` (already done)
2. Use different `.env` for different environments
3. Rotate API keys regularly
4. Use secrets management for production

### ❌ DON'T:
1. Commit `.env` to git
2. Put sensitive data in frontend code
3. Share `.env` file publicly
4. Reuse API keys across environments

---

## Troubleshooting

### Problem: Variables are undefined in app

**Symptom:** `process.env.REACT_APP_*` is undefined

**Solution:**
```bash
# 1. Check .env exists
ls -la .env

# 2. Check variables are set
make check-env

# 3. Rebuild from scratch
make rebuild
```

### Problem: Old values persist after changing .env

**Cause:** Image was not rebuilt

**Solution:**
```bash
# Rebuild image (this re-compiles with new values)
make rebuild
make start
```

### Problem: docker-compose can't read .env

**Check:**
1. `.env` file is in same directory as `docker-compose.yml`
2. File is named exactly `.env` (not `.env.txt` or similar)
3. No syntax errors in `.env`

---

## Alternative: Runtime Environment Variables

**Note:** This Docker setup uses **build-time** variables (compiled into bundle). This is standard for Create React App.

If you need **runtime** variables (changeable without rebuild), you would need:
1. Custom entrypoint script
2. Template index.html
3. JavaScript to inject variables at startup

This is more complex and not needed for most use cases.

---

## Summary

✅ `.env` stays on your host machine  
✅ `docker-compose` reads it before building  
✅ Values are passed as build arguments  
✅ CRA compiles them into JavaScript  
✅ Final image contains compiled code, not `.env`  
✅ Safe and secure by design  

**The `.env` file is NEVER in the Docker image!**

---

## Files Involved

```
Project Directory:
├── .env                        ← You create this (NOT in image)
├── .dockerignore              ← Ignores .env.local variants
├── docker-compose.yml         ← Reads .env, passes to Dockerfile
└── Dockerfile                 ← Receives as ARG, sets as ENV

Docker Image:
├── /usr/share/nginx/html/     ← Compiled JavaScript (values embedded)
└── NO .env file!              ← .env is NOT in image
```

---

## Quick Reference

| Question | Answer |
|----------|--------|
| Is `.env` copied to image? | **NO** |
| Where is `.env` read? | On host by docker-compose |
| When are variables set? | At build time |
| Can I change them at runtime? | No, must rebuild |
| Is it secure? | Yes, values are compiled in |
| What if I change `.env`? | Must rebuild image |

---

**For more information, see:**
- `DOCKER-QUICKSTART.md` - Quick start guide
- `README-DOCKER.md` - Full documentation

