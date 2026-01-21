package deliveryhttp

import (
	"cargorun/pkg/httperr"
	"net/http"

	deliveryapp "cargorun/internal/application/delivery"
	transactionsrepo "cargorun/internal/infra/db/transactions"

	"github.com/go-chi/render"
)

// Transactions handler nested in deliveryhttp package
// serves to manage transactions related to a certain celivery
type transactionsHandler struct {
	transactionRepo *transactionsrepo.TransactionsRepository
}

func NewTransactionsHandler(transactionRepo *transactionsrepo.TransactionsRepository) *transactionsHandler {
	return &transactionsHandler{
		transactionRepo: transactionRepo,
	}
}

func (h *transactionsHandler) HandleCreate(w http.ResponseWriter, r *http.Request) {
	delivery, err := deliveryFromContext(r)
	if err != nil {
		render.Render(w, r, httperr.ErrInvalidRequest(err))
		return
	}
	var req CreateTransactionRequest
	if err := render.DecodeJSON(r.Body, &req); err != nil {
		render.Render(w, r, httperr.ErrInvalidRequest(err))
		return
	}

	cmd := deliveryapp.CreateTransactionCommand{
		TransactionRepo: h.transactionRepo,
		DeliveryID:      delivery.ID(),
		Amount:          req.Amount,
		Description:     req.Description,
		Category:        req.Category,
		Type:            req.Type,
		Status:          req.Status,
	}
	ctx := r.Context()
	err = cmd.Execute(ctx)
	if err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}
	w.WriteHeader(http.StatusCreated)
}
