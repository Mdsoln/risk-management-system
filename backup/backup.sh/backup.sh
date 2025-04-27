#!/bin/sh

# Backup directory
BACKUP_DIR=/backup

# Database credentials
DB_USER=myuser
DB_PASSWORD=mypassword
DB_NAME=mydatabase
DB_HOST=postgres
DB_PORT=5432

# Create backup file with date and time
BACKUP_FILE="$BACKUP_DIR/$DB_NAME-$(date +%Y%m%d%H%M%S).sql"

# Export PostgreSQL password
export PGPASSWORD=$DB_PASSWORD

# Run pg_dump to create a backup
pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER -F c -b -v -f $BACKUP_FILE $DB_NAME

# Clean up backups older than 7 days
find $BACKUP_DIR -type f -name "*.sql" -mtime +7 -exec rm {} \;

echo "Backup completed: $BACKUP_FILE"
