# 🐳 IPFS Configuration for Docker

## 🔄 Two Different Configurations

Your IPFS setup has **two different configurations** depending on how you run the app:

### 1️⃣ **Running Locally** (npm start)
```bash
REACT_APP_IPFS=http://localhost:5001
REACT_APP_IPFS_GET_LINK=http://localhost:8080/ipfs/
```

### 2️⃣ **Running in Docker** (docker compose)
```bash
REACT_APP_IPFS=http://host.docker.internal:5001
REACT_APP_IPFS_GET_LINK=http://localhost:8080/ipfs/
```

---

## 🤔 Why the Difference?

**The Problem:**
- When you run `npm start` locally, `localhost` refers to your Mac
- When you run in Docker, `localhost` refers to the **container's localhost**, not your Mac
- IPFS daemon runs on your Mac, not inside the container

**The Solution:**
- Docker Desktop for Mac provides a special DNS name: `host.docker.internal`
- This DNS name points to your Mac's localhost from inside the container
- So the container can access your Mac's IPFS daemon at `host.docker.internal:5001`

---

## ✅ What I've Already Done

1. ✅ Updated your `.env` to use `host.docker.internal:5001`
2. ✅ Created backup of your previous `.env`
3. ✅ Verified IPFS daemon is running

---

## 🚀 Next Steps: Rebuild Docker

The environment variables are **baked into the Docker image at build time**, so you must rebuild:

```bash
# 1. Stop current containers
docker compose down

# 2. Rebuild with no cache (to pick up new env vars)
docker compose build --no-cache

# 3. Start containers
docker compose up -d

# 4. Check logs
docker compose logs -f zarela-webapp
```

Or use the one-liner:
```bash
docker compose down && docker compose build --no-cache && docker compose up -d && docker compose logs -f
```

---

## 🧪 Testing After Docker Rebuild

1. Open browser to `http://localhost` (or port 80)
2. Try uploading a file
3. It should work without getting stuck!

---

## ⚠️ CRITICAL: IPFS Daemon Must Stay Running

The Docker container **accesses your Mac's IPFS daemon**. This means:

✅ **IPFS daemon MUST be running on your Mac**
```bash
# Check if running:
curl -X POST http://localhost:5001/api/v0/version

# If not running, start it:
ipfs daemon

# Or set it to auto-start:
brew services start ipfs
```

❌ **If IPFS daemon stops:**
- Docker container can't upload files
- You'll see connection errors in Docker logs

---

## 🔀 Switching Between Local and Docker

### Switching to Local Development (npm start):
```bash
# Update .env
sed -i.tmp 's/host.docker.internal/localhost/g' .env
rm .env.tmp

# Start dev server
npm start
```

### Switching to Docker:
```bash
# Update .env
sed -i.tmp 's/localhost:5001/host.docker.internal:5001/g' .env
rm .env.tmp

# Rebuild Docker
docker compose down && docker compose build --no-cache && docker compose up -d
```

Or use the provided scripts:
- `./setup-ipfs-local.sh` - Configure for local development
- `./setup-ipfs-docker.sh` - Configure for Docker (already done)

---

## 🐛 Troubleshooting Docker + IPFS

### Problem: Upload stuck in Docker

**Check IPFS daemon:**
```bash
curl -X POST http://localhost:5001/api/v0/version
```

**Check Docker can reach IPFS:**
```bash
docker compose exec zarela-webapp sh -c "wget -O- http://host.docker.internal:5001/api/v0/version"
```

### Problem: "host.docker.internal" not resolving

**Solution:** Add to docker-compose.yml (already should work on Mac):
```yaml
services:
  zarela-webapp:
    extra_hosts:
      - "host.docker.internal:host-gateway"
```

### Problem: Different behavior in Docker vs local

- Remember: Environment variables are baked in at build time
- Always rebuild after changing `.env`: `docker compose build --no-cache`
- Check what's compiled: `docker compose exec zarela-webapp sh -c 'grep -r "host.docker.internal" /usr/share/nginx/html/static/js/'`

---

## 📦 Alternative: Run IPFS Inside Docker

If you want IPFS inside Docker instead of on your Mac, here's a quick docker-compose snippet:

```yaml
services:
  ipfs:
    image: ipfs/kubo:latest
    container_name: zarela-ipfs
    ports:
      - "5001:5001"  # API
      - "8080:8080"  # Gateway
    volumes:
      - ipfs-data:/data/ipfs
    networks:
      - zarela-network

  zarela-webapp:
    depends_on:
      - ipfs
    environment:
      - REACT_APP_IPFS=http://ipfs:5001
      - REACT_APP_IPFS_GET_LINK=http://localhost:8080/ipfs/

volumes:
  ipfs-data:
```

---

## 📝 Current Status

✅ IPFS daemon running on Mac
✅ .env configured for Docker (`host.docker.internal:5001`)
⏳ Need to rebuild Docker image
⏳ Need to test upload in Docker

---

## 🎯 Quick Reference

| Environment | IPFS API URL | Gateway URL |
|------------|--------------|-------------|
| Local dev (npm start) | `http://localhost:5001` | `http://localhost:8080/ipfs/` |
| Docker (compose) | `http://host.docker.internal:5001` | `http://localhost:8080/ipfs/` |
| IPFS in Docker | `http://ipfs:5001` | `http://localhost:8080/ipfs/` |

---

## ✅ Summary

Your `.env` is now configured for Docker. Next steps:

1. **Rebuild Docker image** (required!):
   ```bash
   docker compose down
   docker compose build --no-cache
   docker compose up -d
   ```

2. **Ensure IPFS daemon is running**:
   ```bash
   ipfs daemon
   # or
   brew services start ipfs
   ```

3. **Test upload** at `http://localhost`

That's it! Your Docker container will now access IPFS on your Mac. 🚀


