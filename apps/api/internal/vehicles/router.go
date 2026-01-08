package vehicles

import (
	"cargorun/internal/db"

	"github.com/go-chi/chi/v5"
)

func Router(r chi.Router) {
	pool := db.GetPool()
	vehiclesRepo := NewRepository(pool)

	createVehicle := &createVehicleHandler{
		repository: vehiclesRepo,
	}
	listVehicles := &listVehiclesHandler{
		repository: vehiclesRepo,
	}

	r.Get("/", listVehicles.Handle)
	r.Post("/", createVehicle.Handle)
}
