package cargos

import (
	"cargorun/pkg/httperr"
	"context"
	"net/http"

	"github.com/go-chi/render"
)

type cargosRepo interface {
	Create(ctx context.Context, dto *createCargoDTO) (*CargoModel, error)
	List(ctx context.Context) ([]*CargoModel, error)
}

type CargosHandler struct {
	repository cargosRepo
}

func (h *CargosHandler) HandleCreate(w http.ResponseWriter, r *http.Request) {
	cargoDTO := &createCargoDTO{}
	err := render.DecodeJSON(r.Body, cargoDTO)
	if err != nil {
		render.Render(w, r, httperr.ErrInvalidRequest(err))
		return
	}
	ctx := r.Context()
	employee, err := h.repository.Create(ctx, cargoDTO)
	if err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}
	render.JSON(w, r, employee)
}

func (h *CargosHandler) HandleList(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	cargosList, err := h.repository.List(ctx)
	if err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}
	render.JSON(w, r, cargosList)
}
