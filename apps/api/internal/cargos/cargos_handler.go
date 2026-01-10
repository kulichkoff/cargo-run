package cargos

import (
	"cargorun/pkg/httperr"
	"context"
	"log/slog"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
)

type cargosRepo interface {
	Create(ctx context.Context, dto *createCargoDTO) (*CargoModel, error)
	List(ctx context.Context) ([]*CargoModel, error)
	Get(ctx context.Context, id int64) (*CargoModel, error)
	Update(ctx context.Context, id int64, dto *updateCargoDTO) (*CargoModel, error)
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

func (h *CargosHandler) CargoContext(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cargoID := chi.URLParam(r, "cargoID")
		if cargoID == "" {
			next.ServeHTTP(w, r)
			return
		}
		idParsed, err := strconv.ParseInt(cargoID, 10, 64)
		if err != nil {
			render.Render(w, r, httperr.ErrInvalidRequest(err))
			return
		}
		ctx := r.Context()
		cargo, err := h.repository.Get(ctx, idParsed)
		if err != nil {
			// TODO better error handling
			slog.ErrorContext(ctx, "Failed to retrieve cargo", slog.Any("error", err))
			render.Render(w, r, httperr.ErrNotFound())
			return
		}
		newCtx := context.WithValue(ctx, "cargo", cargo)
		next.ServeHTTP(w, r.WithContext(newCtx))
	})
}

func (h *CargosHandler) HandleGet(w http.ResponseWriter, r *http.Request) {
	cargo, ok := r.Context().Value("cargo").(*CargoModel)
	if !ok {
		render.Render(w, r, httperr.ErrNotFound())
		return
	}
	render.JSON(w, r, cargo)
}

func (h *CargosHandler) HandlePatch(w http.ResponseWriter, r *http.Request) {
	cargo, ok := r.Context().Value("cargo").(*CargoModel)
	if !ok {
		render.Render(w, r, httperr.ErrNotFound())
		return
	}
	cargoID := cargo.ID

	dto := new(updateCargoDTO)
	if err := render.DecodeJSON(r.Body, dto); err != nil {
		render.Render(w, r, httperr.ErrInvalidRequest(err))
		return
	}

	ctx := r.Context()
	cargo, err := h.repository.Update(ctx, cargoID, dto)
	if err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}
	render.JSON(w, r, cargo)
}
