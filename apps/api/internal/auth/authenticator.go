package auth

import (
	"net/http"
	"time"

	"github.com/go-chi/jwtauth/v5"
)

func JWTAuthenticator(ja *jwtauth.JWTAuth) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		hfn := func(w http.ResponseWriter, r *http.Request) {
			_, claims, err := jwtauth.FromContext(r.Context())

			if err != nil {
				http.Error(w, err.Error(), http.StatusUnauthorized)
				return
			}

			// Check expiration
			expiresAtUnix := int64(claims["expiresAt"].(float64))
			expiresAt := time.Unix(expiresAtUnix, 0)
			if expiresAt.Before(time.Now()) {
				http.Error(w, "expired", http.StatusUnauthorized)
				return
			}

			// Token is authenticated, pass it through
			next.ServeHTTP(w, r)
		}
		return http.HandlerFunc(hfn)
	}
}
