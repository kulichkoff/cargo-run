package main

import (
	"cargorun/internal/config"
	"cargorun/internal/employees"
	"cargorun/internal/vehicles"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func main() {
	config.MustLoad()

	r := chi.NewRouter()
	r.Use(middleware.Recoverer)
	// TODO configure and use slog
	r.Use(middleware.Logger)
	// Basic CORS
  // for more ideas, see: https://developer.github.com/v3/#cross-origin-resource-sharing
  r.Use(cors.Handler(cors.Options{
    // AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
    AllowedOrigins:   []string{"https://*", "http://*"},
    // AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
    AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
    AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
    ExposedHeaders:   []string{"Link"},
    AllowCredentials: false,
    MaxAge:           300, // Maximum value not ignored by any of major browsers
  }))

	r.Route("/employees", employees.Router)
	r.Route("/vehicles", vehicles.Router)

	println("Server started on http://localhost:3333")
	http.ListenAndServe(":3333", r)
}
