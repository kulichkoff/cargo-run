include .env

dev:
	make -j2 dev-api dev-front

dev-api:
	cd apps/api && \
	JWT_SECRET=${JWT_SECRET} \
	DB_NAME=${DB_NAME} \
	DB_HOST=${DB_HOST} \
	DB_USER=${DB_USER} \
	DB_PASSWORD=${DB_PASSWORD} \
	air --build.cmd 'go build -o bin/cargorun-api cmd/server/main.go' --build.entrypoint 'bin/cargorun-api'

dev-web:
	cd apps/front && pnpm dev

migrate-up:
	migrate -path ./database/migrations -database "postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?sslmode=disable" up

migrate-down:
	migrate -path ./database/migrations -database "postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?sslmode=disable" down
