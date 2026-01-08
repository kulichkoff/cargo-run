package vehicles

import (
	"cargorun/pkg/httperr"
	"context"
	"net/http"

	"github.com/go-chi/render"
)

type listVehiclesRepository interface {
	ListVehicles(ctx context.Context) ([]*VehicleModel, error)
}

type listVehiclesHandler struct {
	repository listVehiclesRepository
}

func (h *listVehiclesHandler) Handle(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	vehiclesList, err := h.repository.ListVehicles(ctx)
	if err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}
	render.JSON(w, r, vehiclesList)
}
