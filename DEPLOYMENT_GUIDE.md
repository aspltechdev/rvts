# RVTS Deployment Guide (Hostinger/Ubuntu VPS)

This guide outlines the steps to deploy the RVTS application (Frontend, Admin, Backend) on an Ubuntu VPS.

## Prerequisites
Ensure your VPS has the following installed:
- **Node.js** (v18 or later)
- **npm** (comes with Node.js)
- **Git**
- **Nginx** (Web Server)
- **PostgreSQL** (Database)
- **PM2** (Process Manager for keeping apps alive)

### 1. Initial Server Setup (Run once)
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install tools
sudo apt install -y nginx git postgresql postgresql-contrib

# Install Node.js (v20)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
sudo npm install -g pm2
```

## 2. Clone Repository
Navigate to your web directory (e.g., `/var/www`) and clone your repo.
```bash
cd /var/www
git clone https://github.com/aspltechdev/rvtstest.git rvts
cd rvts
```

## 3. Install Dependencies
Install dependencies for the entire monorepo.
```bash
npm install
```

## 4. Configure Environment Variables
You need to create 3 `.env` files.

### Backend (.env)
Create file: `apps/backend/.env`
```properties
DATABASE_URL="postgresql://your_db_user:your_db_password@localhost:5432/rvts_production"
API_BASE_URL=https://researchvisions.com/sapi
```

### Frontend (.env)
Create file: `apps/frontend/.env`
```properties
NEXT_PUBLIC_API_BASE_URL=https://researchvisions.com/sapi
```

### Admin (.env)
Create file: `apps/admin/.env`
```properties
NEXT_PUBLIC_API_BASE_URL=https://researchvisions.com/sapi
NEXT_PUBLIC_FRONTEND_URL=https://researchvisions.com
```

## 5. Database Setup
1. **Create Database**: Log into Postgres and create a database named `rvts_production`.
   ```bash
   sudo -u postgres psql
   CREATE DATABASE rvts_production;
   \q
   ```
2. **Run Migrations**:
   ```bash
   cd apps/backend
   npx prisma db push
   node prisma/seed.js
   cd ../..
   ```

## 6. Build Applications
Build the Frontend and Admin applications for production.
```bash
# Build Frontend
cd apps/frontend
npm run build
cd ../..

# Build Admin
cd apps/admin
npm run build
cd ../..
```

## 7. Start Applications with PM2
We will run all three apps using PM2.

```bash
# Start Backend (Port 3002)
cd apps/backend
pm2 start npm --name "rvts-backend" -- run start

# Start Frontend (Port 3000)
cd ../frontend
pm2 start npm --name "rvts-frontend" -- run start

# Start Admin (Port 3001)
cd ../admin
pm2 start npm --name "rvts-admin" -- run start

# Save PM2 list so they restart on reboot
pm2 save
pm2 startup
```

## 8. Nginx Configuration
Edit your Nginx config: `/etc/nginx/sites-available/default` (or create a new file).

```nginx
server {
    listen 80;
    server_name researchvisions.com www.researchvisions.com;

    # Frontend (Root)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # API / Backend (mapped to /sapi)
    location /sapi/ {
        # Strip the /sapi prefix before sending to backend
        rewrite ^/sapi/(.*) /$1 break;
        
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Admin Subdomain (Optional, or map to /admin path)
server {
    listen 80;
    server_name admin.researchvisions.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 9. Finalize
1. **Test Nginx**: `sudo nginx -t`
2. **Restart Nginx**: `sudo systemctl restart nginx`
3. **SSL (HTTPS)**: Run Certbot to secure your site.
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d researchvisions.com -d www.researchvisions.com
   ```
