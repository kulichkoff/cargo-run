package truckhttp

import (
	"cargorun/db/sqlc"
	"cargorun/pkg/httperr"
	"net/http"

	"github.com/go-chi/render"
)

type handler struct {
	querier sqlc.Querier
}

func NewHandler(querier sqlc.Querier) *handler {
	return &handler{
		querier: querier,
	}
}

func (h *handler) HandleCreate(w http.ResponseWriter, r *http.Request) {
	dto := &sqlc.CreateTruckParams{}
	err := render.DecodeJSON(r.Body, dto)
	if err != nil {
		render.Render(w, r, httperr.ErrInvalidRequest(err))
		return
	}
	ctx := r.Context()
	driver, err := h.querier.CreateTruck(ctx, *dto)
	if err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}
	render.JSON(w, r, driver)
}

func (h *handler) HandleList(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	trucksList, err := h.querier.ListTrucks(ctx, sqlc.ListTrucksParams{
		Limit:  100,
		Offset: 0,
	})
	if err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}
	render.JSON(w, r, trucksList)
}
