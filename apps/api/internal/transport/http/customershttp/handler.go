package customershttp

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
	dto := &sqlc.CreateCustomerParams{}
	err := render.DecodeJSON(r.Body, dto)
	if err != nil {
		render.Render(w, r, httperr.ErrInvalidRequest(err))
		return
	}
	ctx := r.Context()
	customer, err := h.querier.CreateCustomer(ctx, *dto)
	if err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}
	render.JSON(w, r, customer)
}

func (h *handler) HandleList(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	customersList, err := h.querier.ListCustomers(ctx, sqlc.ListCustomersParams{
		Limit:  100,
		Offset: 0,
	})
	if err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}
	render.JSON(w, r, customersList)
}
