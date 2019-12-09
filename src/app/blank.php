RewriteRule ^(.*)$ $1 [R=200,L,E=HTTP_ORIGIN:%{HTTP:ORIGIN}]]
