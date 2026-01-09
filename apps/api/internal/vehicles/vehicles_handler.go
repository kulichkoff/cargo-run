package vehicles

import (
	"cargorun/pkg/httperr"
	"context"
	"net/http"

	"github.com/go-chi/render"
)

type vehiclesRepo interface {
	Create(ctx context.Context, dto *createVehicleDTO) (*VehicleModel, error)
	List(ctx context.Context) ([]*VehicleModel, error)
}

type HTTPHandler struct {
	repository vehiclesRepo
}

func (h *HTTPHandler) Create(w http.ResponseWriter, r *http.Request) {
	vehicleDTO := &createVehicleDTO{}
	err := render.DecodeJSON(r.Body, vehicleDTO)
	if err != nil {
		render.Render(w, r, httperr.ErrInvalidRequest(err))
		return
	}
	ctx := r.Context()
	vehicle, err := h.repository.Create(ctx, vehicleDTO)
	if err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}
	render.JSON(w, r, vehicle)
}

func (h *HTTPHandler) List(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	vehiclesList, err := h.repository.List(ctx)
	if err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}
	render.JSON(w, r, vehiclesList)
}
