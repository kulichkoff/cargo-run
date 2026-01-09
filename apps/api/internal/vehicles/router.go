package vehicles

import (
	"cargorun/internal/db"

	"github.com/go-chi/chi/v5"
)

func Router(r chi.Router) {
	querier := db.GetQuerier()
	vehiclesRepo := NewRepository(querier)

	createVehicle := &createVehicleHandler{
		repository: vehiclesRepo,
	}
	listVehicles := &listVehiclesHandler{
		repository: vehiclesRepo,
	}

	r.Get("/", listVehicles.Handle)
	r.Post("/", createVehicle.Handle)
}
