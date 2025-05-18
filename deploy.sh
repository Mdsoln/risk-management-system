#!/bin/bash

# Usage: ./deploy.sh

SERVER_IP="68.183.158.185"
SERVER_USER="root"
# shellcheck disable=SC2016
SERVER_PASSWORD='p$$$F2o25Dodoma'
REMOTE_DIR="/root/risk-management-system"

# Ensure .env exists
if [ ! -f .env ]; then
  echo "⚙️ .env not found. Creating it with default values..."
  cat > .env <<EOF
DB_USER=myuser
DB_PASSWORD=mypassword
DB_NAME=mydatabase

PGADMIN_EMAIL=admin@example.com
PGADMIN_PASSWORD=admin

BACKEND_URL=http://$SERVER_IP:8080/api
EOF
fi

# Install sshpass if needed
if ! command -v sshpass &> /dev/null; then
  echo "📦 Installing sshpass..."
  sudo apt-get update && sudo apt-get install -y sshpass
fi

# Copy project files to the server
echo "📤 Copying project files to $SERVER_IP..."
sshpass -p "$SERVER_PASSWORD" scp -o StrictHostKeyChecking=no -r . "$SERVER_USER@$SERVER_IP:$REMOTE_DIR"

# Run remote Docker setup and deployment
echo "🚀 Deploying on server..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" << EOF
  # Install Docker if not present
  if ! command -v docker &> /dev/null; then
    echo "🔧 Installing Docker..."
    apt-get update
    apt-get install -y apt-transport-https ca-certificates curl software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu \$(lsb_release -cs) stable"
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io
  fi

  # Install Docker Compose if not present
  if ! command -v docker-compose &> /dev/null; then
    echo "🔧 Installing Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/download/v2.20.3/docker-compose-\$(uname -s)-\$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
  fi

  # Move into the project directory
  cd "$REMOTE_DIR"

  echo "🐳 Starting Docker containers..."
  docker-compose down
  docker-compose build
  docker-compose up -d

  echo "✅ Deployment completed!"
EOF
