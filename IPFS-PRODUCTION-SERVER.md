# 🌐 IPFS Configuration for Production Server

## The Problem with `localhost`

When running on a **server** (production), `http://localhost:5001` **WILL NOT WORK** because:

```
┌─────────────────────────────────────────────────────────────────┐
│ User's Browser (anywhere in the world)                          │
│                                                                  │
│  JavaScript tries to access:                                    │
│  http://localhost:5001  ❌  <- Points to user's machine!        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ Your Server (remote - e.g. AWS, DigitalOcean, etc.)            │
│                                                                  │
│  IPFS daemon running here ✅                                     │
│  But user's browser can't access "localhost"                   │
└─────────────────────────────────────────────────────────────────┘
```

**Why**: The React app runs **in the user's browser**, not on your server. `localhost` refers to the **user's machine**, not your server.

---

## ✅ Solutions for Production

### Option 1: Use Public IPFS Service (Recommended for Quick Deploy)

#### A. Infura IPFS (Free Tier)
```bash
REACT_APP_IPFS=https://ipfs.infura.io:5001
REACT_APP_IPFS_GET_LINK=https://cloudflare-ipfs.com/ipfs/
```

**Pros**:
- ✅ Free tier: 5GB storage, 100K requests/month
- ✅ No server setup needed
- ✅ Reliable, maintained by Infura
- ✅ Works immediately

**Cons**:
- ⚠️ Rate limits on free tier
- ⚠️ Files may not be permanently pinned
- ⚠️ Recently added authentication requirements (may need API key)

---

#### B. Pinata (Recommended for Production)

**Free Tier**: 100GB storage

1. **Sign up** at https://pinata.cloud
2. **Get your API keys** from dashboard
3. **Update configuration**:

```bash
# This requires code changes to add API key headers
REACT_APP_IPFS=https://api.pinata.cloud
REACT_APP_IPFS_GET_LINK=https://gateway.pinata.cloud/ipfs/
REACT_APP_PINATA_JWT=your_jwt_token_here
```

**Code changes needed** in `src/workers/encrypt.js` and `src/pages/CreateRequest.js`:

```javascript
// Change from:
const ipfs = create(process.env.REACT_APP_IPFS);

// To:
const ipfs = create({
  url: process.env.REACT_APP_IPFS,
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`
  }
});
```

**Pros**:
- ✅ Generous free tier (100GB)
- ✅ Files are permanently pinned
- ✅ Fast, reliable
- ✅ Good for production

**Cons**:
- ⚠️ Requires API key (small code change)
- ⚠️ Paid plans for more storage

---

#### C. Web3.Storage (Great for NFTs/Web3)

```bash
REACT_APP_IPFS=https://api.web3.storage
REACT_APP_IPFS_GET_LINK=https://w3s.link/ipfs/
```

**Pros**:
- ✅ Free for public data
- ✅ Designed for Web3 apps
- ✅ Files stored permanently

**Cons**:
- ⚠️ Requires API key
- ⚠️ Optimized for public data (not private)

---

### Option 2: Run Your Own IPFS Node on Server (Full Control)

If you want complete control, run IPFS on your server with a public endpoint.

#### Setup on Your Server

```bash
# SSH into your server
ssh user@your-server.com

# Install IPFS
wget https://dist.ipfs.tech/kubo/v0.28.0/kubo_v0.28.0_linux-amd64.tar.gz
tar -xvzf kubo_v0.28.0_linux-amd64.tar.gz
cd kubo
sudo bash install.sh

# Initialize IPFS
ipfs init

# Configure CORS for your domain
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["https://yourdomain.com", "https://www.yourdomain.com"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Headers '["Authorization", "Content-Type"]'

# Configure API to listen on public interface (CAREFUL! Use firewall)
ipfs config Addresses.API /ip4/0.0.0.0/tcp/5001

# Start IPFS daemon
ipfs daemon
```

#### Secure with Nginx Reverse Proxy

**IMPORTANT**: Don't expose port 5001 directly! Use Nginx:

```nginx
# /etc/nginx/sites-available/ipfs
server {
    listen 443 ssl;
    server_name ipfs.yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://127.0.0.1:5001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        
        # CORS headers
        add_header Access-Control-Allow-Origin "https://yourdomain.com" always;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Authorization, Content-Type" always;
        
        if ($request_method = OPTIONS) {
            return 204;
        }
    }
}
```

#### Your .env Configuration

```bash
REACT_APP_IPFS=https://ipfs.yourdomain.com
REACT_APP_IPFS_GET_LINK=https://ipfs.yourdomain.com/ipfs/
```

**Pros**:
- ✅ Full control
- ✅ No rate limits
- ✅ No costs (except server)
- ✅ Can configure exactly as needed

**Cons**:
- ❌ Requires server maintenance
- ❌ Need to configure SSL/HTTPS
- ❌ Need to configure firewall/security
- ❌ You're responsible for uptime

---

### Option 3: Use IPFS Gateway Service

For **downloads only** (if uploads are handled differently):

```bash
# Can't upload to these, but can download
REACT_APP_IPFS_GET_LINK=https://cloudflare-ipfs.com/ipfs/
# or
REACT_APP_IPFS_GET_LINK=https://ipfs.io/ipfs/
# or
REACT_APP_IPFS_GET_LINK=https://dweb.link/ipfs/
```

**Note**: These are gateway services for **reading** IPFS files only. You still need an upload endpoint.

---

## 🎯 Recommended Configuration by Use Case

### Quick Deploy / MVP / Testing
```bash
REACT_APP_IPFS=https://ipfs.infura.io:5001
REACT_APP_IPFS_GET_LINK=https://cloudflare-ipfs.com/ipfs/
```

### Production (Small to Medium)
```bash
# Sign up for Pinata, get JWT
REACT_APP_IPFS=https://api.pinata.cloud
REACT_APP_IPFS_GET_LINK=https://gateway.pinata.cloud/ipfs/
REACT_APP_PINATA_JWT=your_jwt_here
```

### Production (Large Scale / Enterprise)
```bash
# Run your own IPFS cluster
REACT_APP_IPFS=https://ipfs.yourdomain.com
REACT_APP_IPFS_GET_LINK=https://ipfs.yourdomain.com/ipfs/
```

---

## ⚠️ Security Considerations

### 1. API Keys
If using Pinata or Web3.Storage:
- **DO NOT** commit API keys to git
- Use environment variables on server
- Rotate keys periodically

### 2. CORS Configuration
Only allow your production domain:
```javascript
Access-Control-Allow-Origin: "https://yourdomain.com"
```
**Never** use `*` in production!

### 3. Rate Limiting
Implement rate limiting on your backend to prevent abuse.

### 4. File Validation
Always validate:
- File size limits
- File types
- Content before uploading to IPFS

---

## 🔄 Migration Path: Development → Production

### Development (.env.local)
```bash
REACT_APP_IPFS=http://localhost:5001
REACT_APP_IPFS_GET_LINK=http://localhost:8080/ipfs/
```

### Staging (.env.staging)
```bash
REACT_APP_IPFS=https://ipfs.infura.io:5001
REACT_APP_IPFS_GET_LINK=https://cloudflare-ipfs.com/ipfs/
```

### Production (.env.production)
```bash
REACT_APP_IPFS=https://api.pinata.cloud
REACT_APP_IPFS_GET_LINK=https://gateway.pinata.cloud/ipfs/
REACT_APP_PINATA_JWT=${PINATA_JWT}  # Set in server environment
```

---

## 📋 Deployment Checklist

- [ ] Choose IPFS provider (Infura/Pinata/Own)
- [ ] Sign up and get API keys (if needed)
- [ ] Update .env with production URLs
- [ ] Test upload in staging environment
- [ ] Configure CORS for production domain
- [ ] Set up SSL/HTTPS
- [ ] Test from production domain
- [ ] Monitor rate limits/usage
- [ ] Set up backup/pinning strategy

---

## 🧪 Testing Production IPFS Config

Before deploying:

```bash
# Test upload endpoint
curl -X POST https://ipfs.infura.io:5001/api/v0/version

# Test gateway
curl https://cloudflare-ipfs.com/ipfs/QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o
```

---

## 💰 Cost Comparison

| Service | Free Tier | Paid Plans | Best For |
|---------|-----------|------------|----------|
| **Infura** | 5GB, 100K req/mo | From $50/mo | Quick start |
| **Pinata** | 100GB | From $20/mo | Production apps |
| **Web3.Storage** | Unlimited (public) | N/A | NFTs, public data |
| **Own Server** | Server cost only | VPS $5-50/mo | Full control |

---

## 🚨 Common Mistakes

### ❌ Using localhost in production
```bash
# WRONG - will not work for users!
REACT_APP_IPFS=http://localhost:5001
```

### ❌ No HTTPS in production
```bash
# WRONG - browsers block HTTP from HTTPS sites
REACT_APP_IPFS=http://ipfs.yourdomain.com
```

### ✅ Correct production config
```bash
REACT_APP_IPFS=https://api.pinata.cloud
REACT_APP_IPFS_GET_LINK=https://gateway.pinata.cloud/ipfs/
```

---

## 📖 Additional Resources

- [Pinata Documentation](https://docs.pinata.cloud/)
- [IPFS Documentation](https://docs.ipfs.tech/)
- [Web3.Storage Docs](https://web3.storage/docs/)
- [Infura IPFS Guide](https://docs.infura.io/networks/ipfs)

---

## 🆘 Need Help?

If you need help deciding which option is best for your use case, consider:

- **Budget**: Own server vs. paid service
- **Scale**: Expected users/uploads
- **Control**: Need full control or managed service OK?
- **Maintenance**: Want to manage infrastructure?

**My recommendation for most cases**: Start with **Pinata** (100GB free tier, easy to use, production-ready).


