package cargos

import (
	"cargorun/pkg/httperr"
	"context"
	"net/http"

	"github.com/go-chi/render"
)

type createCargoRepository interface {
	CreateCargo(ctx context.Context, dto *createCargoDTO) (*CargoModel, error)
}

type createCargoHandler struct {
	repository createCargoRepository
}

func (h *createCargoHandler) Handle(w http.ResponseWriter, r *http.Request) {
	cargoDTO := &createCargoDTO{}
	err := render.DecodeJSON(r.Body, cargoDTO)
	if err != nil {
		render.Render(w, r, httperr.ErrInvalidRequest(err))
		return
	}
	ctx := r.Context()
	employee, err := h.repository.CreateCargo(ctx, cargoDTO)
	if err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}
	render.JSON(w, r, employee)
}
