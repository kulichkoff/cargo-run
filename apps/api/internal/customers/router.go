package customers

import (
	"cargorun/internal/db"

	"github.com/go-chi/chi/v5"
)

func Router(r chi.Router) {
	querier := db.GetQuerier()
	repo := NewRepository(querier)

	handler := NewHandler(repo)

	r.Post("/", handler.HandleCreate)
	r.Get("/", handler.HandleList)
}
