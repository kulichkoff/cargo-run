package employees

import (
	"cargorun/pkg/httperr"
	"context"
	"net/http"

	"github.com/go-chi/render"
)

type listEmployeesRepository interface {
	ListEmployees(ctx context.Context) ([]*EmployeeModel, error)
}

type listEmployeesHandler struct {
	repository listEmployeesRepository
}

func (h *listEmployeesHandler) Handle(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	employeesList, err := h.repository.ListEmployees(ctx)
	if err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}
	render.JSON(w, r, employeesList)
}
