package config

import (
	"fmt"
	"os"
	"strings"
)

var (
	databaseURL string
	jwtSecret   string
)

// Must load configuration or panics
//
// Requires the following environment variables:
//
// - DB_USER (or DB_USER_FILE)
//
// - DB_PASSWORD (or DB_PASSWORD_FILE)
//
// - DB_HOST
//
// - DB_NAME
func MustLoad() {
	jwtSecret = mustLoadSecret("JWT_SECRET", "JWT_SECRET_FILE")
	postgresUser := mustLoadSecret("DB_USER", "DB_USER_FILE")
	postgresPswd := mustLoadSecret("DB_PASSWORD", "DB_PASSWORD_FILE")

	postgresHost := mustGetEnv("DB_HOST")
	postgresDBName := mustGetEnv("DB_NAME")

	databaseURL = fmt.Sprintf(
		"postgresql://%s:%s@%s/%s?sslmode=disable",
		postgresUser,
		postgresPswd,
		postgresHost,
		postgresDBName,
	)
}

// Tries *_FILE first, then direct env var
func mustLoadSecret(envKey, fileEnvKey string) string {
	if filePath, ok := os.LookupEnv(fileEnvKey); ok {
		value, err := loadFromFile(filePath)
		if err != nil {
			panic(err)
		}
		return value
	}

	if value, ok := os.LookupEnv(envKey); ok {
		return value
	}

	panic(fmt.Sprintf("Neither %s nor %s is set", envKey, fileEnvKey))
}

func mustGetEnv(key string) string {
	value, ok := os.LookupEnv(key)
	if !ok {
		panic(fmt.Sprintf("No %s env", key))
	}
	return value
}

func loadFromFile(filePath string) (string, error) {
	bytes, err := os.ReadFile(filePath)
	if err != nil {
		return "", err
	}
	return strings.TrimSpace(string(bytes)), nil
}

//
// Getters
//

func DatabaseURL() string {
	return databaseURL
}

func JWTSecret() string {
	return jwtSecret
}
