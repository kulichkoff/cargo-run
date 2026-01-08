# Cargo Run

## Development

### Prerequisites

- Go
- Node.js
- `go-migrate` migration tool installed by `go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@v4.18.3`
- [air](https://github.com/air-verse/air?tab=readme-ov-file#via-go-install-recommended) is live-reloading CLI tool for Go backend
- [pnpm](https://pnpm.io) is a `Node.js` package manager replacing `npm`

### Migrations

To create a new migration you can simply run following comand:

```bash
migrate create -ext sql -dir ./database/migrations -seq <migration_name>

# Example
migrate create -ext sql -dir ./database/migrations -seq create_articles_table
```
