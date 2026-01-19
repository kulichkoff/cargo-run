package db

import (
	"cargorun/db/sqlc"
	"cargorun/internal/config"
	"context"
	"log/slog"
	"sync"

	"github.com/jackc/pgx/v5/pgxpool"
)

var (
	pool    *pgxpool.Pool
	poolMut sync.Mutex
)

func GetPool() *pgxpool.Pool {
	if pool == nil {
		slog.Debug("pool is nil, creating a new one")
		poolMut.Lock()
		defer poolMut.Unlock()

		if pool == nil {
			connString := config.DatabaseURL()
			tmpPool, err := pgxpool.New(context.Background(), connString)
			if err != nil {
				panic(err)
			}
			pool = tmpPool
			slog.Info("New pool has created")
		}
	}
	return pool
}

func GetQuerier() *sqlc.Queries {
	p := GetPool()
	return sqlc.New(p)
}
