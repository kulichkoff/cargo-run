package customers

import (
	"cargorun/pkg/httperr"
	"context"
	"net/http"

	"github.com/go-chi/render"
)

type customersRepo interface {
	Create(ctx context.Context, dto *createCustomerDTO) (*CustomerModel, error)
	List(ctx context.Context) ([]CustomerModel, error)
}

type HTTPHandler struct {
	repo customersRepo
}

func NewHandler(repo customersRepo) *HTTPHandler {
	return &HTTPHandler{
		repo: repo,
	}
}

func (h *HTTPHandler) HandleCreate(w http.ResponseWriter, r *http.Request) {
	dto := &createCustomerDTO{}
	err := render.DecodeJSON(r.Body, dto)
	if err != nil {
		render.Render(w, r, httperr.ErrInvalidRequest(err))
		return
	}
	ctx := r.Context()
	customer, err := h.repo.Create(ctx, dto)
	if err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}
	render.JSON(w, r, customer)
}

func (h *HTTPHandler) HandleList(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	customersList, err := h.repo.List(ctx)
	if err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}
	render.JSON(w, r, customersList)
}
