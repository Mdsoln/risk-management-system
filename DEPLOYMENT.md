# Deployment Guide for Risk Management System

This guide provides instructions for deploying the Risk Management System to a Digital Ocean server.

## Prerequisites

- A Digital Ocean server with Ubuntu installed
- The IP address of the server
- The root password for the server
- Git installed on your local machine
- Docker and Docker Compose installed on your local machine (optional)

## Deployment Steps

### 1. Clone the Repository

If you haven't already, clone the repository to your local machine:

```bash
git clone <repository-url>
cd risk-management-system
```

### 2. Run the Deployment Script

The repository includes a deployment script that automates the deployment process. Run the script with the server IP address and password:

```bash
./deploy.sh <server-ip> <server-password>
```

For example:

```bash
./deploy.sh 123.456.789.0 mypassword
```

The script will:
1. Create a `.env` file from the template if it doesn't exist
2. Update the `BACKEND_URL` in the `.env` file to use the provided server IP
3. Copy the project files to the server
4. Install Docker and Docker Compose on the server if they're not already installed
5. Build and start the Docker containers on the server

### 3. Verify the Deployment

After the deployment script completes, you can verify that the application is running by accessing:

- Frontend: `http://<server-ip>:3000`
- Backend API: `http://<server-ip>:8080/api`
- PgAdmin (database management): `http://<server-ip>:8088`

## Manual Deployment

If you prefer to deploy manually or if the deployment script encounters issues, follow these steps:

### 1. Set Up Environment Variables

Copy the `.env.template` file to `.env` and update the values:

```bash
cp .env.template .env
```

Edit the `.env` file to set the appropriate values for your environment, especially:
- Database credentials
- PgAdmin credentials
- Backend URL (should be `http://<server-ip>:8080/api`)

### 2. Copy Files to the Server

Copy the project files to the server:

```bash
scp -r . root@<server-ip>:/root/risk-management-system
```

### 3. Install Docker and Docker Compose on the Server

SSH into the server:

```bash
ssh root@<server-ip>
```

Install Docker:

```bash
apt-get update
apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io
```

Install Docker Compose:

```bash
curl -L "https://github.com/docker/compose/releases/download/v2.20.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

### 4. Deploy the Application

Navigate to the project directory:

```bash
cd /root/risk-management-system
```

Create the `.env` file:

```bash
cp .env.template .env
```

Edit the `.env` file to set the appropriate values.

Build and start the Docker containers:

```bash
docker-compose down
docker-compose build
docker-compose up -d
```

## Troubleshooting

If you encounter issues during deployment, check the following:

1. **Docker Logs**: Check the logs of the Docker containers:
   ```bash
   docker-compose logs
   ```

2. **Container Status**: Check if all containers are running:
   ```bash
   docker-compose ps
   ```

3. **Network Connectivity**: Ensure that the ports (3000, 8080, 8088, 5432) are open and accessible.

4. **Environment Variables**: Verify that the environment variables in the `.env` file are set correctly.

## Security Considerations

- Change the default database credentials in the `.env` file
- Change the default PgAdmin credentials in the `.env` file
- Consider setting up a firewall to restrict access to the server
- Consider setting up HTTPS for secure communication