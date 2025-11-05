# 🔌 Docker Port Configuration - Server Deployment

## Issue: Port 80 Already in Use

When deploying to a server with other applications, port 80 is often already taken by:
- Nginx
- Apache
- Another Docker container
- Another web application

---

## ✅ Solution: Use Alternative Port

### Updated Configuration

I've changed `docker-compose.yml` to use port **8080** instead of 80:

```yaml
ports:
  - "8080:80"    # Host port 8080 → Container port 80
  - "8443:443"   # Host port 8443 → Container port 443
```

**What this means:**
- Container runs nginx on port 80 internally (as before)
- Accessible from outside on port **8080**
- Container runs on port 443 internally
- Accessible from outside on port **8443**

---

## 🚀 Deploy with New Port

### 1. Start the Container

```bash
docker compose up -d
```

### 2. Verify It's Running

```bash
docker compose ps
# Should show: 0.0.0.0:8080->80/tcp
```

### 3. Test Access

```bash
# From server
curl http://localhost:8080

# From your computer
curl http://your-server-ip:8080
```

### 4. Open in Browser

```
http://your-server-ip:8080
```

---

## 🌐 Option 1: Use Nginx as Reverse Proxy (Recommended)

If you want users to access via port 80 (standard HTTP), use nginx reverse proxy:

### Setup Nginx Reverse Proxy

```bash
# Install nginx (if not already installed)
sudo apt update
sudo apt install nginx

# Create configuration
sudo nano /etc/nginx/sites-available/zarela
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;  # or use IP

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket support (if needed)
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

**Enable the configuration:**

```bash
# Create symlink
sudo ln -s /etc/nginx/sites-available/zarela /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

**Now accessible at:**
- http://your-domain.com (port 80)
- http://your-server-ip (port 80)

---

## 🌐 Option 2: Use Different Port Directly

Keep using port 8080 directly (no nginx needed):

### For Development/Testing
```
http://your-server-ip:8080
```

### For Production with Domain
Set DNS A record to your server IP, then:
```
http://your-domain.com:8080
```

**Pros:**
- ✅ Simple, no extra configuration
- ✅ Works immediately

**Cons:**
- ⚠️ Users must specify port in URL
- ⚠️ Can't use SSL easily (need port 443)

---

## 🔐 Option 3: Nginx + SSL (Production Recommended)

For HTTPS with Let's Encrypt:

### 1. Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx
```

### 2. Update Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/zarela
```

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;  # Redirect to HTTPS
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    # SSL certificates (certbot will add these)
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Security headers
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
    }
}
```

### 3. Get SSL Certificate

```bash
# Get certificate (certbot will auto-configure nginx)
sudo certbot --nginx -d your-domain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

**Now accessible at:**
- https://your-domain.com (secure!)
- http://your-domain.com (redirects to HTTPS)

---

## 📊 Port Mapping Explanation

### Understanding Docker Port Mapping

```
Host Port : Container Port
   ↓              ↓
"8080  :  80"
```

**Example configurations:**

```yaml
# Option 1: Port 8080 (as configured)
ports:
  - "8080:80"
# Access: http://server-ip:8080

# Option 2: Port 3001 (if 8080 also taken)
ports:
  - "3001:80"
# Access: http://server-ip:3001

# Option 3: Port 8888
ports:
  - "8888:80"
# Access: http://server-ip:8888
```

**Container always runs on port 80 internally** - we only change the external port!

---

## 🔍 Check What's Using Port 80

If you're curious what's using port 80:

```bash
# Find process on port 80
sudo lsof -i :80

# Or using netstat
sudo netstat -tulpn | grep :80

# Or using ss
sudo ss -tulpn | grep :80
```

**Common culprits:**
- nginx
- apache2
- Another Docker container
- Node.js application

---

## 🎛️ Custom Port Configuration

If you need a different port (8080 is also taken):

### Edit docker-compose.yml

```yaml
ports:
  - "YOUR_CHOSEN_PORT:80"
```

**Available ports from your info:**
- ✅ 8080 (using now)
- ✅ 3001, 3002, 3003... (range around 3000)
- ✅ 8888, 9001, 9090, etc.

**Ports to AVOID (in use on your server):**
- ❌ 3000
- ❌ 8181
- ❌ 9000
- ❌ 5678

---

## 🔄 Quick Fix Commands

### Current Configuration (Port 8080)

```bash
# Deploy
cd /path/to/zarela-WebApp
docker compose up -d

# Verify
docker compose ps
curl http://localhost:8080

# Access
http://your-server-ip:8080
```

### If You Need Different Port

```bash
# Edit compose file
nano docker-compose.yml

# Change port (e.g., to 3001)
ports:
  - "3001:80"

# Redeploy
docker compose down
docker compose up -d

# Access
http://your-server-ip:3001
```

---

## 🌐 Recommended Setup for Production

```
┌────────────────────────────────────────────────┐
│ Internet                                        │
└─────────────────┬──────────────────────────────┘
                  │
                  │ Port 80/443
                  ▼
┌────────────────────────────────────────────────┐
│ Server: Nginx (Port 80/443)                    │
│ - SSL/TLS termination                          │
│ - Reverse proxy                                │
│ - Load balancing (if needed)                   │
│ - Security headers                             │
└─────────────────┬──────────────────────────────┘
                  │
                  │ Internal proxy to localhost:8080
                  ▼
┌────────────────────────────────────────────────┐
│ Docker Container: zarela-webapp                │
│ - Nginx (internal port 80)                     │
│ - Mapped to host port 8080                     │
│ - Serves React application                     │
└────────────────────────────────────────────────┘
```

**Benefits:**
- ✅ Users access standard port 80/443
- ✅ Easy SSL certificate management
- ✅ Can host multiple apps on same server
- ✅ Better security (nginx in front)
- ✅ Caching and optimization

---

## 📋 Deployment Checklist

### Quick Deployment (Port 8080)
- [ ] Updated docker-compose.yml with port 8080
- [ ] Run `docker compose up -d`
- [ ] Access at `http://server-ip:8080`
- [ ] Works! ✅

### Production Deployment (with Nginx)
- [ ] Updated docker-compose.yml with port 8080
- [ ] Deployed container on port 8080
- [ ] Installed nginx
- [ ] Created nginx reverse proxy config
- [ ] Enabled nginx site
- [ ] Tested nginx configuration
- [ ] Reloaded nginx
- [ ] Access at `http://your-domain.com`
- [ ] Installed certbot
- [ ] Obtained SSL certificate
- [ ] Access at `https://your-domain.com`
- [ ] Works securely! ✅

---

## 🆘 Troubleshooting

### Error: Port 8080 also in use

```bash
# Check what's using 8080
sudo lsof -i :8080

# Change to different port in docker-compose.yml
ports:
  - "3001:80"
```

### Error: Cannot access from outside

```bash
# Check firewall
sudo ufw status

# Allow port
sudo ufw allow 8080/tcp
sudo ufw reload
```

### Container not starting

```bash
# Check logs
docker compose logs zarela-webapp

# Check if port is truly available
sudo netstat -tulpn | grep 8080
```

### Nginx errors

```bash
# Test nginx config
sudo nginx -t

# Check nginx logs
sudo tail -f /var/log/nginx/error.log

# Reload nginx
sudo systemctl reload nginx
```

---

## ✅ Summary

**Problem**: Port 80 already in use  
**Solution**: Changed to port 8080  

**Access your app at:**
```
http://your-server-ip:8080
```

**For production, set up nginx reverse proxy to use:**
```
http://your-domain.com (port 80)
https://your-domain.com (port 443 with SSL)
```

---

## 🎉 Ready to Deploy!

```bash
# Simple command to start
docker compose up -d

# Check it's running
docker compose ps

# View logs
docker compose logs -f

# Access
http://your-server-ip:8080
```

Your app is now running on port 8080! 🚀


