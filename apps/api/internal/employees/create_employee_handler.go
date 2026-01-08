package employees

import (
	"cargorun/pkg/httperr"
	"context"
	"net/http"

	"github.com/go-chi/render"
)

type createArticleRepository interface {
	CreateEmployee(ctx context.Context, dto *createEmployeeDTO) (*EmployeeModel, error)
}

type createEmployeeHandler struct {
	repository createArticleRepository
}

func (h *createEmployeeHandler) Handle(w http.ResponseWriter, r *http.Request) {
	employeeDTO := &createEmployeeDTO{}
	err := render.DecodeJSON(r.Body, employeeDTO)
	if err != nil {
		render.Render(w, r, httperr.ErrInvalidRequest(err))
		return
	}
	ctx := r.Context()
	employee, err := h.repository.CreateEmployee(ctx, employeeDTO)
	if err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}
	render.JSON(w, r, employee)
}
