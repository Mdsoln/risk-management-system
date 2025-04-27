# Generate JWT Keys

```bash
openssl genpkey -algorithm RSA -out privateKey.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in privateKey.pem -out publicKey.pem
```


## Test endpoints

- token 

```bash
curl --location --request POST 'http://localhost:8080/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "user",
    "password": "password"
}'

	
	curl --location --request GET 'http://localhost:8080/secure-endpoint' \
		 --header 'Authorization: Bearer <your-jwt-token>'

```
  