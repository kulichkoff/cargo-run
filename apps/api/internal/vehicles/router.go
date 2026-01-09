package vehicles

import (
	"cargorun/internal/db"

	"github.com/go-chi/chi/v5"
)

func Router(r chi.Router) {
	querier := db.GetQuerier()
	vehiclesRepo := NewRepository(querier)

	handler := &HTTPHandler{
		repository: vehiclesRepo,
	}

	r.Get("/", handler.List)
	r.Post("/", handler.Create)
}
