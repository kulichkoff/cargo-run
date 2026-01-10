package cargos

import (
	"cargorun/internal/db"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func Router(r chi.Router) {
	// Init repository
	querier := db.GetQuerier()
	repo := NewRepository(querier)

	// Init handlers
	handler := &CargosHandler{
		repository: repo,
	}

	// Register routes
	r.Post("/", handler.HandleCreate)
	r.Get("/", handler.HandleList)
}

func cargoContext(next http.Handler) http.Handler {
	return http.HandlerFunc(func (w http.ResponseWriter, r *http.Request) {})
}
