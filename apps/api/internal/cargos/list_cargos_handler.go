package cargos

import (
	"cargorun/pkg/httperr"
	"context"
	"net/http"

	"github.com/go-chi/render"
)

type listCargosRepository interface {
	ListCargos(ctx context.Context) ([]*CargoModel, error)
}

type listCargosHandler struct {
	repository listCargosRepository
}

func (h *listCargosHandler) Handle(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	cargosList, err := h.repository.ListCargos(ctx)
	if err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}
	render.JSON(w, r, cargosList)
}
