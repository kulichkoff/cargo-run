package transactionshttp

import (
	"cargorun/internal/application/transactionsapp"
	transactionsrepo "cargorun/internal/infra/db/transactions"
	"cargorun/pkg/httperr"
	"net/http"

	"github.com/go-chi/render"
)

type handler struct {
	repo *transactionsrepo.TransactionsRepository
}

func NewHandler(repo *transactionsrepo.TransactionsRepository) *handler {
	return &handler{
		repo: repo,
	}
}

func (h *handler) HandleCreate(w http.ResponseWriter, r *http.Request) {
	var req CreateTransactionRequest
	if err := render.DecodeJSON(r.Body, &req); err != nil {
		render.Render(w, r, httperr.ErrInvalidRequest(err))
		return
	}

	cmd := transactionsapp.CreateTransactionCommand{
		TransactionsRepo: h.repo,
		Amount:           req.Amount,
		Description:      req.Description,
		Category:         req.Category,
		Type:             req.Type,
		Status:           req.Status,
		Deliveries:       req.Deliveries,
	}
	ctx := r.Context()
	if err := cmd.Execute(ctx); err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}

	w.WriteHeader(http.StatusCreated)
}
