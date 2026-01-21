package deliveryhttp

import (
	"cargorun/internal/domain/delivery"
	"cargorun/pkg/httperr"
	"context"
	"log/slog"
	"net/http"

	"github.com/go-chi/render"
)

func DeliveryContext(repo delivery.Repository) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			deliveryID, err := getDeliveryIDParam(r)
			if err != nil {
				render.Render(w, r, httperr.ErrInvalidRequest(ErrRequstedBadID))
				return
			}
			ctx := r.Context()
			d, err := repo.Load(ctx, deliveryID)
			if err != nil {
				slog.ErrorContext(
					ctx,
					"Failed to retrieve delivery",
					slog.Any("error", err),
				)
				render.Render(w, r, httperr.ErrNotFound())
				return
			}
			newCtx := context.WithValue(ctx, "delivery", d)
			next.ServeHTTP(w, r.WithContext(newCtx))
		})
	}
}

func deliveryFromContext(r *http.Request) (*delivery.Delivery, error) {
	ctx := r.Context()
	d, ok := ctx.Value("delivery").(*delivery.Delivery)
	if !ok || d == nil {
		return nil, ErrRequstedBadID
	}
	return d, nil
}
