# VPS Deployment Pipeline (Hostinger Ubuntu)

## 1. Initial VPS Setup
SSH into your Ubuntu server:
```bash
ssh root@your_vps_ip
```

Update system:
```bash
apt update && apt upgrade -y
```

Install Node.js (v18+), npm, and git:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs git
```

Install PM2 (Process Manager) and Nginx (Web Server):
```bash
npm install -g pm2
apt install -y nginx
```

## 2. Project Setup
Clone the repository (use HTTPS or setup SSH keys):
```bash
git clone https://github.com/aspltechdev/rvts.git
cd rvts
```

Install dependencies:
```bash
npm install
# If you have workspaces, ensure all dependencies are installed
npm run install:all # (if you have this script) or go into each app folder
```
*Note: In your current monorepo structure, `npm install` in the root usually installs everything if configured correctly with workspaces. Otherwise:*
```bash
cd apps/frontend && npm install
cd ../../apps/backend && npm install
cd ../../apps/admin && npm install
cd ../..
```

## 3. Environment Configuration
Create `.env` files for production.

**Backend (`apps/backend/.env`):**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/rvts_db"
PORT=3002
# Other secrets...
```

**Frontend (`apps/frontend/.env`):**
```env
NEXT_PUBLIC_API_BASE_URL="https://your-domain.com" 
# OR "https://api.your-domain.com" depending on your Nginx setup
```

**Admin (`apps/admin/.env`):**
```env
NEXT_PUBLIC_API_BASE_URL="https://your-domain.com"
```

## 4. Build
Build the Next.js apps:
```bash
cd apps/frontend
npm run build
cd ../../apps/admin
npm run build
```

## 5. Database Setup
Ensure PostgreSQL is installed and running.
```bash
apt install -y postgresql postgresql-contrib
sudo -u postgres psql
# Create database and user...
```
Run Prisma migrations/push:
```bash
cd apps/backend
npx prisma db push
node prisma/seed.js # Optional: run seed
```

## 6. Process Management (PM2)
Start the services:

```bash
# Backend
cd apps/backend
pm2 start src/index.js --name "rvts-backend" 
# (Or whatever your entry point is, check package.json)

# Frontend
cd ../frontend
pm2 start npm --name "rvts-frontend" -- start -- -p 3000

# Admin
cd ../admin
pm2 start npm --name "rvts-admin" -- start -- -p 3001
```

Save PM2 list:
```bash
pm2 save
pm2 startup
```

## 7. Nginx Configuration
Edit default config or create new:
```bash
nano /etc/nginx/sites-available/default
```

Sample Config (Using one domain `rvts.com` with paths, or subdomains):
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:3002; # Backend Port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Admin (e.g., /admin path or valid subdomain)
    # If using path /admin, Next.js 'basePath' might need config, 
    # EASIER: Use admin.your-domain.com
}
```

Enable and Restart Nginx:
```bash
systemctl restart nginx
```

## 8. SSL (Certbot)
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Identified Changes Required
1.  **Codebase**: 
    *   Ensure all `fetch` calls use `process.env.NEXT_PUBLIC_API_BASE_URL` (Verified: We added this).
    *   Remove any hardcoded `localhost` references (Verified: `api-client.js` handles this).
    *   Ensure `npm run build` succeeds locally before deploying (Verified: Frontend/Admin builds should pass).
2.  **VPS**:
    *   You must install **PostgreSQL**.
    *   You must configure **ENV variables** correctly (especially Database URL).
