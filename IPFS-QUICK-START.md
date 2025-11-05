# 🚀 IPFS Quick Start Guide

## ✅ What's Ready

- ✅ IPFS daemon installed and running
- ✅ .env configured for Docker
- ⏳ Need to rebuild Docker image

---

## 🐳 For Docker (Your Current Setup)

### Step 1: Ensure IPFS is Running
```bash
curl -X POST http://localhost:5001/api/v0/version
```

If not running:
```bash
ipfs daemon
```

### Step 2: Rebuild Docker (REQUIRED!)
```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```

### Step 3: Test
- Open `http://localhost` in browser
- Try uploading a file
- Should work without getting stuck! 🎉

---

## 💻 For Local Development (npm start)

### Switch to Local Config:
```bash
./setup-ipfs-local.sh
npm start
```

---

## 🔄 Quick Commands

### Check IPFS Status:
```bash
curl -X POST http://localhost:5001/api/v0/version
```

### Start IPFS:
```bash
ipfs daemon
```

### Auto-start IPFS on login:
```bash
brew services start ipfs
```

### Rebuild Docker:
```bash
docker compose down && docker compose build --no-cache && docker compose up -d
```

### Switch between Local/Docker:
```bash
./setup-ipfs-local.sh   # For npm start
./setup-ipfs-docker.sh  # For docker compose
```

---

## 📚 Full Documentation

- **IPFS-FIXED.md** - How the issue was fixed
- **IPFS-DOCKER-SETUP.md** - Complete Docker + IPFS guide
- **IPFS-SETUP.md** - Alternative IPFS configurations
- **IPFS-UPLOAD-FIX.md** - Original troubleshooting guide

---

## ⚠️ Important Notes

1. **IPFS daemon must always be running** (on your Mac)
2. **Docker needs rebuild** after changing .env
3. **Use `host.docker.internal:5001` for Docker**, `localhost:5001` for local dev
4. **Environment variables are baked in at build time**

---

## 🆘 Troubleshooting

### Upload stuck?
1. Is IPFS running? `curl -X POST http://localhost:5001/api/v0/version`
2. Did you rebuild Docker? `docker compose build --no-cache`
3. Check logs: `docker compose logs -f`

### Can't connect to IPFS?
```bash
# Restart IPFS
pkill ipfs
ipfs daemon
```

### Docker can't reach IPFS?
```bash
# Test from inside container
docker compose exec zarela-webapp sh -c "wget -O- http://host.docker.internal:5001/api/v0/version"
```

---

## ✨ You're Ready!

Your configuration is set for Docker. Just rebuild and test:

```bash
docker compose down && docker compose build --no-cache && docker compose up -d
```


