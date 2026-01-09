package cargos

import (
	"cargorun/internal/db"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func Router(r chi.Router) {
	// Init repository
	pool := db.GetPool()
	repo := NewRepository(pool)

	// Init handlers
	createCargo := &createCargoHandler{
		repository: repo,
	}
	listCargos := &listCargosHandler{
		repository: repo,
	}

	// Register routes
	r.Post("/", createCargo.Handle)
	r.Get("/", listCargos.Handle)
}

func cargoContext(next http.Handler) http.Handler {
	return http.HandlerFunc(func (w http.ResponseWriter, r *http.Request) {})
}
