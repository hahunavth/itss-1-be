# Setup postgres database in fly.io

## Create a postgres database
```shell
flyctl postgres create
```
Note that you need save your database secret in a secure place because you won't be able to see it again.

## Allocate ipv6 address for external access
```shell
flyctl ips allocate-v6 --app <pg-app-name>
```

## Save config for database
```shell
fly config save
```

## Show current image info
```shell
fly image show
```

## Deploy database
```shell
fly deploy . --app <pg-app-name> --image flyio/postgres:<major-version>
```

## Attach to other app
```shell
fly pg attach <db-name> --app <app-name>
```

## Connect from terminal
```shell
fly postgres connect -a itss-1-be-db
```

fly services list
fly checks list
fly ssh console
 fly logs
