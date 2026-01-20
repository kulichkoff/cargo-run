package deliveryhttp

import (
	app "cargorun/internal/application/delivery"
	"cargorun/pkg/httperr"
	"errors"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
)

var (
	ErrRequstedBadID = errors.New("Bad Delivery ID provided in request")
)

func getDeliveryIDParam(r *http.Request) (int64, error) {
	deliveryID := chi.URLParam(r, "deliveryID")
	if deliveryID == "" {
		return 0, ErrRequstedBadID
	}
	return strconv.ParseInt(deliveryID, 10, 64)
}

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

func (h *handler) HandleList(w http.ResponseWriter, r *http.Request) {
	queryParams := r.URL.Query()
	limitStr := queryParams.Get("limit")
	pageStr := queryParams.Get("page")
	var limit, page int32
	if limitStr == "" {
		limit = 100
	} else {
		lim, _ := strconv.ParseInt(limitStr, 10, 32)
		limit = int32(lim)
	}
	if pageStr == "" {
		page = 1
	} else {
		pg, _ := strconv.ParseInt(pageStr, 10, 32)
		page = int32(pg)
	}

	query := app.ListDeliveriesQuery{
		Limit: limit,
		Page:  page,
	}
	ctx := r.Context()
	list, err := h.service.ListDeliveries(ctx, query)
	if err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}
	render.JSON(w, r, list)
}

func (h *handler) HandleAssignDriver(w http.ResponseWriter, r *http.Request) {
	var req AssignDriverRequest
	if err := render.DecodeJSON(r.Body, &req); err != nil {
		render.Render(w, r, httperr.ErrInvalidRequest(err))
		return
	}
	deliveryID, err := getDeliveryIDParam(r)
	if err != nil {
		render.Render(w, r, httperr.ErrInvalidRequest(err))
		return
	}
	cmd := app.AssignDriverCommand{
		DeliveryID: deliveryID,
		DriverID:   int64(req.DriverID),
	}
	ctx := r.Context()
	if err := h.service.AssignDriver(ctx, cmd); err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}
	w.WriteHeader(http.StatusOK)
}

func (h *handler) HandleAssignTruck(w http.ResponseWriter, r *http.Request) {
	var req AssignTruckRequest
	if err := render.DecodeJSON(r.Body, &req); err != nil {
		render.Render(w, r, httperr.ErrInvalidRequest(err))
		return
	}
	deliveryID, err := getDeliveryIDParam(r)
	if err != nil {
		render.Render(w, r, httperr.ErrInvalidRequest(err))
		return
	}
	cmd := app.AssignTruckCommand{
		DeliveryID: deliveryID,
		TruckID:    int64(req.TruckID),
	}
	ctx := r.Context()
	if err := h.service.AssignTruck(ctx, cmd); err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}
	w.WriteHeader(http.StatusOK)
}

func (h *handler) HandlePickUp(w http.ResponseWriter, r *http.Request) {
	var req PickUpRequest
	if err := render.DecodeJSON(r.Body, &req); err != nil {
		render.Render(w, r, httperr.ErrInvalidRequest(err))
		return
	}
	deliveryID, err := getDeliveryIDParam(r)
	if err != nil {
		render.Render(w, r, httperr.ErrInvalidRequest(err))
		return
	}
	cmd := app.PickUpCommand{
		DeliveryID: deliveryID,
		PickedUpAt: req.PickedUpAt,
	}
	ctx := r.Context()
	if err := h.service.PickUp(ctx, cmd); err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}
	w.WriteHeader(http.StatusOK)
}

func (h *handler) HandleDeliver(w http.ResponseWriter, r *http.Request) {
	deliveryID, err := getDeliveryIDParam(r)
	if err != nil {
		render.Render(w, r, httperr.ErrInvalidRequest(err))
		return
	}
	cmd := app.MarkDeliveredCommand{
		DeliveryID: deliveryID,
	}
	ctx := r.Context()
	if err := h.service.Deliver(ctx, cmd); err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}
	w.WriteHeader(http.StatusOK)
}
