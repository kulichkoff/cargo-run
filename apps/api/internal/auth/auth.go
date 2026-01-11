package auth

import (
	"cargorun/internal/users"
	"time"

	"github.com/go-chi/jwtauth/v5"
)

const (
	expireOffset           = time.Hour * 2
	accessTokenCookieName  = "cgr-access"
	refreshTokenCookieName = "cgr-refresh"
)

var tokenAuth *jwtauth.JWTAuth

func MustInit(secret string) {
	tokenAuth = jwtauth.New("HS256", []byte(secret), nil)
}

// MustInit(secret) must be called before trying to get token auth
func TokenAuth() *jwtauth.JWTAuth {
	return tokenAuth
}

func MakeToken(user *users.User) string {
	_, tokenStr, _ := tokenAuth.Encode(map[string]interface{}{
		"username":  user.UserName,
		"expiresAt": time.Now().Add(expireOffset).Unix(),
	})
	return tokenStr
}
