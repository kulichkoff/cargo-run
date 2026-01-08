include .env

dev:
	make -j2 dev-api dev-front

dev-api:
	cd apps/api && air --build.cmd 'go build -o bin/knoweb-api cmd/main.go' --build.entrypoint 'bin/knoweb-api'

dev-web:
	cd apps/front && pnpm dev

migrate-up:
	migrate -path ./database/migrations -database "postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?sslmode=disable" up

migrate-down:
	migrate -path ./database/migrations -database "postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?sslmode=disable" down
