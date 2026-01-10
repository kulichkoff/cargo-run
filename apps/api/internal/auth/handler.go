package auth

import (
	"cargorun/internal/users"
	"cargorun/pkg/httperr"
	"net/http"

	"github.com/go-chi/render"
)

type HTTPHandler struct{}

type loginDTO struct {
	UserName string `json:"username"`
	Password string `json:"password"`
}

func (h *HTTPHandler) HandleLogin(w http.ResponseWriter, r *http.Request) {
	credentials := &loginDTO{}
	if err := render.DecodeJSON(r.Body, credentials); err != nil {
		render.Render(w, r, httperr.ErrInvalidRequest(err))
		return
	}
	// TODO chamge password, use it from env variables temporary
	if credentials.UserName == "admin" && credentials.Password == "topsecret" {
		accessToken := MakeToken(&users.User{UserName: credentials.UserName})
		render.JSON(w, r, map[string]interface{}{
			"accessToken": accessToken,
		})
		return
	}

	render.Render(w, r, httperr.ErrUnauthorized())
}
