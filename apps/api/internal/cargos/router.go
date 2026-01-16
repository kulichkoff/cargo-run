package cargos

import (
	"cargorun/internal/db"
	"cargorun/internal/transactions"

	"github.com/go-chi/chi/v5"
)

func Router(r chi.Router) {
	// Init repository
	querier := db.GetQuerier()
	repo := NewRepository(querier)
	service := NewService(repo, transactions.NewRepository(querier))

	// Init handlers
	handler := &CargosHandler{
		repository: repo,
		service:    service,
	}

	// Register routes
	r.Post("/", handler.HandleCreate)
	r.Get("/", handler.HandleList)
	r.Route("/{cargoID}", func(r chi.Router) {
		r.Use(handler.CargoContext)
		r.Get("/", handler.HandleGet)
		r.Patch("/", handler.HandlePatch)
	})
}
