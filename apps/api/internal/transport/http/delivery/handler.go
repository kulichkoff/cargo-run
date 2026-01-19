package deliveryhttp

import (
	app "cargorun/internal/application/delivery"
	"cargorun/pkg/httperr"
	"net/http"

	"github.com/go-chi/render"
)

func mapCargo(cargo []CreateCargoRequest) []app.CreateCargoItem {
	cargoItems := make([]app.CreateCargoItem, len(cargo))
	for i, cg := range cargo {
		cargoItems[i] = app.CreateCargoItem{
			WeightKg:    cg.WeightKg,
			VolumeM3:    cg.VolumeM3,
			Description: cg.Description,
			Category:    cg.Category,
		}
	}
	return cargoItems
}

type handler struct {
	service *app.DeliveryService
}

func NewHandler(service *app.DeliveryService) *handler {
	return &handler{
		service: service,
	}
}

func (h *handler) HandleCreate(w http.ResponseWriter, r *http.Request) {
	var req CreateDeliveryRequest
	if err := render.DecodeJSON(r.Body, &req); err != nil {
		render.Render(w, r, httperr.ErrInvalidRequest(err))
		return
	}

	cmd := app.CreateDeliveryCommand{
		PickupAddress:    req.PickupAddress,
		DeliveryAddress:  req.DeliveryAddress,
		DeliveryDeadline: req.DeliveryDeadline,
		CustomerID:       req.CustomerID,
		Cargo:            mapCargo(req.Cargo),
	}
	ctx := r.Context()
	err := h.service.CreateDelivery(ctx, cmd)
	if err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}
	w.WriteHeader(http.StatusCreated)
}
