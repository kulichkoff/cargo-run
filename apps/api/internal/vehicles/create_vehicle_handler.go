package vehicles

import (
	"cargorun/pkg/httperr"
	"context"
	"net/http"

	"github.com/go-chi/render"
)

type createVehicleRepository interface {
	CreateVehicle(ctx context.Context, dto *createVehicleDTO) (*VehicleModel, error)
}

type createVehicleHandler struct {
	repository createVehicleRepository
}

func (h *createVehicleHandler) Handle(w http.ResponseWriter, r *http.Request) {
	vehicleDTO := &createVehicleDTO{}
	err := render.DecodeJSON(r.Body, vehicleDTO)
	if err != nil {
		render.Render(w, r, httperr.ErrInvalidRequest(err))
		return
	}
	ctx := r.Context()
	vehicle, err := h.repository.CreateVehicle(ctx, vehicleDTO)
	if err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}
	render.JSON(w, r, vehicle)
}
