#!/bin/bash
#
# Generate the certificates and keys for testing.
#

PROJECT_NAME="TLS Demo"

# Generate the openssl configuration files.
cat > ca_cert.conf << EOF
[req]
    distinguished_name = req_distinguished_name
    req_extensions = v3_req

[req_distinguished_name]
    countryName = Country Name (2 letter code)
    countryName_default = CN
    stateOrProvinceName = State or Province Name (full name)
    stateOrProvinceName_default = BeiJing
    localityName = Locality Name (eg, city)
    localityName_default = Beijing
    organizationalUnitName	= Organizational Unit Name (eg, section)
    organizationalUnitName_default	= YUCHAO
    commonName = Internet Widgits Ltd
    commonName_default = $PROJECT_NAME
    commonName_max	= 64

 [ v3_req ]
    # Extensions to add to a certificate request
    basicConstraints = CA:FALSE
    keyUsage = nonRepudiation, digitalSignature, keyEncipherment
    subjectAltName = @alt_names

[alt_names]
    DNS.1 = ns1.dns.com
    DNS.2 = ns2.dns.com
    DNS.3 = ns3.dns.com
    IP.1 = 10.101.3.140
    IP.2 = 192.168.10.147
    IP.3 = 127.0.0.1
EOF

cat > server_cert.conf << EOF
[req]
    distinguished_name = req_distinguished_name
    req_extensions = v3_req

[req_distinguished_name]
    countryName = Country Name (2 letter code)
    countryName_default = CN
    stateOrProvinceName = State or Province Name (full name)
    stateOrProvinceName_default = BeiJing
    localityName = Locality Name (eg, city)
    localityName_default = Beijing
    organizationalUnitName	= Organizational Unit Name (eg, section)
    organizationalUnitName_default	= YUCHAO
    commonName = Internet Widgits Ltd
    commonName_default = $PROJECT_NAME
    commonName_max	= 64

 [ v3_req ]
    # Extensions to add to a certificate request
    basicConstraints = CA:FALSE
    keyUsage = nonRepudiation, digitalSignature, keyEncipherment
    subjectAltName = @alt_names

[alt_names]
    DNS.1 = ns1.dns.com
    DNS.2 = ns2.dns.com
    DNS.3 = ns3.dns.com
    IP.1 = 10.101.3.140
    IP.2 = 192.168.10.147
    IP.3 = 127.0.0.1
EOF

cat > client_cert.conf << EOF
[req]
    distinguished_name = req_distinguished_name
    req_extensions = v3_req

[req_distinguished_name]
    countryName = Country Name (2 letter code)
    countryName_default = CN
    stateOrProvinceName = State or Province Name (full name)
    stateOrProvinceName_default = BeiJing
    localityName = Locality Name (eg, city)
    localityName_default = Beijing
    organizationalUnitName	= Organizational Unit Name (eg, section)
    organizationalUnitName_default	= YUCHAO
    commonName = Internet Widgits Ltd
    commonName_default = $PROJECT_NAME
    commonName_max	= 64

 [ v3_req ]
    # Extensions to add to a certificate request
    basicConstraints = CA:FALSE
    keyUsage = nonRepudiation, digitalSignature, keyEncipherment
    subjectAltName = @alt_names

[alt_names]
    DNS.1 = ns1.dns.com
    DNS.2 = ns2.dns.com
    DNS.3 = ns3.dns.com
    IP.1 = 10.101.3.140
    IP.2 = 192.168.10.147
    IP.3 = 127.0.0.1
EOF

mkdir ca
mkdir server
mkdir client
mkdir certDER

# private key generation
openssl genrsa -out ca.key 1024
openssl genrsa -out server.key 1024
openssl genrsa -out client.key 1024

# cert requests
openssl req -out ca.req -key ca.key -new -config ./ca_cert.conf
openssl req -out server.req -key server.key -new -config ./server_cert.conf
openssl req -out client.req -key client.key -new -config ./client_cert.conf

# generate the actual certs.
openssl x509 -req -in ca.req -out ca.crt -sha1 -days 5000 -signkey ca.key
openssl x509 -req -in server.req -out server.crt -sha1 -CAcreateserial -days 5000 -CA ca.crt -CAkey ca.key -extensions v3_req -extfile server_cert.conf
openssl x509 -req -in client.req -out client.crt -sha1 -CAcreateserial -days 5000 -CA ca.crt -CAkey ca.key -extensions v3_req -extfile client_cert.conf



# transfor pfx
#openssl pkcs12 -export -in server/server.crt -inkey server/server.key -certfile ca/ca.crt -out server/server.pfx
#openssl pkcs12 -export -in client/client.crt -inkey client/client.key -certfile ca/ca.crt -out client/client.p12

openssl x509 -in ca.crt -outform DER -out ca.der
openssl x509 -in server.crt -outform DER -out server.der
openssl x509 -in client.crt -outform DER -out client.der

mv ca.crt ca.key ca.req ca.srl ca_cert.conf ca/
mv server.crt server.key server.req server_cert.conf server/
mv client.crt client.key client.req client_cert.conf client/

mv ca.der server.der client.der certDER/

openssl verify -CAfile ca/ca.crt server/server.crt
openssl verify -CAfile ca/ca.crt client/client.crt

openssl s_client -connect 127.0.0.1:8000 -cert client/client.crt -key client/client.key -tls1 -CAfile ca/ca.crt -state -showcerts
