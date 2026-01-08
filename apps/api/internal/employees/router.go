package employees

import (
	"cargorun/internal/db"

	"github.com/go-chi/chi/v5"
)

func Router(r chi.Router) {
	// Init repository
	pool := db.GetPool()
	employeeRepo := NewRepository(pool)

	// Init handlers
	createEmployee := &createEmployeeHandler{
		repository: employeeRepo,
	}
	listEmployees := &listEmployeesHandler{
		repository: employeeRepo,
	}

	// Register routes
	r.Post("/", createEmployee.Handle)
	r.Get("/", listEmployees.Handle)
}
