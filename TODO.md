## DATABASE
- Custom user and database setup.
- Encrypted connections with SSL.
- Strong authentication methods.
- Network restrictions.
- Resource limits.
- Logging configuration.
- Automated backups.

```Docker
version: '3.8'

services:
  db:
    image: postgres:latest
    container_name: custom_postgres
    environment:
      POSTGRES_USER: custom_user
      POSTGRES_PASSWORD: custom_password
      POSTGRES_DB: custom_db
      POSTGRES_INITDB_ARGS: "-A scram-sha-256"
      POSTGRES_LOG_DESTINATION: "stderr"
      POSTGRES_LOGGING_COLLECTOR: "on"
      POSTGRES_LOG_DIRECTORY: "/var/log/postgresql"
    volumes:
      - db_data:/var/lib/postgresql/data
      - ./certs/server.crt:/var/lib/postgresql/server.crt
      - ./certs/server.key:/var/lib/postgresql/server.key
      - ./certs/root.crt:/var/lib/postgresql/root.crt
      - ./logs:/var/log/postgresql
    networks:
      - custom_network
    command: -c ssl=on -c ssl_cert_file=/var/lib/postgresql/server.crt -c ssl_key_file=/var/lib/postgresql/server.key -c ssl_ca_file=/var/lib/postgresql/root.crt
    deploy:
      resources:
        limits:
          cpus: "1.0"
          memory: 512M

  backup:
    image: appropriate/postgres-backup
    container_name: postgres_backup
    environment:
      POSTGRES_HOST: db
      POSTGRES_DB: custom_db
      POSTGRES_USER: custom_user
      POSTGRES_PASSWORD: custom_password
      BACKUP_DIR: /backups
      SCHEDULE: "0 3 * * *"  # Daily at 3 AM
    volumes:
      - ./backups:/backups
    networks:
      - custom_network

volumes:
  db_data:

networks:
  custom_network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.16.238.0/24


```









### DEFALT USER
```
################################################ 
###### Restrict postgres user access:
################################################
docker exec -it custom_postgres psql -U custom_user -d custom_db

-- Change password
ALTER USER postgres WITH PASSWORD 'new_secure_password';

-- Optionally, disable login for postgres user
ALTER USER postgres NOLOGIN;


################################################ 
###### Create roles and assign permissions:
################################################
CREATE ROLE readonly;
GRANT CONNECT ON DATABASE custom_db TO readonly;
GRANT USAGE ON SCHEMA public TO readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO readonly;

-- Assign the role to custom_user if necessary
GRANT readonly TO custom_user;


```

syntaxError24$


### FEATURES
- pagination
- sorting, filtering and searching
- audit trail
- logging
- seeding
- report

### FRONTEDN
- Show no network or any connection error
- reltime data loading
- notifications

Entity
* uuid1 (USED) - time-based UUID that can be later decoded to extract time information

list of checkpoints

ref:
- https://stackoverflow.com/questions/70070702/quarkus-hibernate-with-panache-adds-unexpected-id-column-to-select-query
https://docs.jboss.org/hibernate/orm/current/userguide/html_single/Hibernate_User_Guide.html#envers
https://kn-sandeep.medium.com/reactive-web-application-with-postgres-quarkus-3-and-java-17-7cde2c2f2960
https://github.com/sandeep540/tinyplm-quarkus
https://quarkus.io/guides/config-yaml
https://quarkus.io/guides/security-getting-started-tutorial
https://quarkus.io/guides/hibernate-orm-panache
https://quarkus.io/guides/security-getting-started-tutorial

https://github.com/quarkusio/quarkus-quickstarts/tree/development/hibernate-reactive-panache-quickstart

https://vertx.io/docs/vertx-pg-client/java/

https://quarkus.io/guides/rest-data-panache




# TODAY
- redux toolkit with navigation and layout