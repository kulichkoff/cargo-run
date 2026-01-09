package employees

import (
	"cargorun/internal/db"

	"github.com/go-chi/chi/v5"
)

func Router(r chi.Router) {
	// Init repository
	querier := db.GetQuerier()
	employeeRepo := NewRepository(querier)

	// Init handlers
	handler := &EmployeesHandler{
		repository: employeeRepo,
	}

	// Register routes
	r.Post("/", handler.HandleCreate)
	r.Get("/", handler.HandleList)
}
