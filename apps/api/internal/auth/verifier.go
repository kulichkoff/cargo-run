package auth

import (
	"net/http"

	"github.com/go-chi/jwtauth/v5"
)

func TokenFromCookie(r *http.Request) string {
	cookie, err := r.Cookie(accessTokenCookieName)
	if err != nil {
		return ""
	}
	return cookie.Value
}

func Verifier(ja *jwtauth.JWTAuth) func(http.Handler) http.Handler {
	return jwtauth.Verify(ja, TokenFromCookie)
}
