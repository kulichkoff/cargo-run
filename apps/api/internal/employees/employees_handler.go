package employees

import (
	"cargorun/pkg/httperr"
	"context"
	"net/http"

	"github.com/go-chi/render"
)

type employeesRepo interface {
	Create(ctx context.Context, dto *createEmployeeDTO) (*EmployeeModel, error)
	List(ctx context.Context) ([]*EmployeeModel, error)
}

type EmployeesHandler struct {
	repository employeesRepo
}

func (h *EmployeesHandler) HandleCreate(w http.ResponseWriter, r *http.Request) {
	employeeDTO := &createEmployeeDTO{}
	err := render.DecodeJSON(r.Body, employeeDTO)
	if err != nil {
		render.Render(w, r, httperr.ErrInvalidRequest(err))
		return
	}
	ctx := r.Context()
	employee, err := h.repository.Create(ctx, employeeDTO)
	if err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}
	render.JSON(w, r, employee)
}

func (h *EmployeesHandler) HandleList(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	employeesList, err := h.repository.List(ctx)
	if err != nil {
		render.Render(w, r, httperr.ErrInternalServerError(err))
		return
	}
	render.JSON(w, r, employeesList)
}
