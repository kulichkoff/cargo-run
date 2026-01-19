package main

import (
	"cargorun/internal/auth"
	"cargorun/internal/config"
	"cargorun/internal/db"
	"cargorun/internal/transport/http/customershttp"
	"cargorun/internal/transport/http/drivershttp"
	"cargorun/internal/transport/http/truckhttp"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func main() {
	config.MustLoad()
	querier := db.GetQuerier()

	jwtSecret := config.JWTSecret()
	auth.MustInit(jwtSecret)
	jwtToken := auth.TokenAuth()

	r := chi.NewRouter()
	r.Use(middleware.Recoverer)
	// TODO configure and use slog
	r.Use(middleware.Logger)
	// Basic CORS
	// for more ideas, see: https://developer.github.com/v3/#cross-origin-resource-sharing
	r.Use(cors.Handler(cors.Options{
		// AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
		AllowedOrigins: []string{"https://*", "http://*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	r.Route("/auth", func(r chi.Router) {
		authHandler := &auth.HTTPHandler{}
		r.Post("/login", authHandler.HandleLogin)
	})

	r.Group(func(r chi.Router) {
		r.Use(auth.Verifier(jwtToken))
		r.Use(auth.JWTAuthenticator(jwtToken))

		r.Route("/drivers", func(r chi.Router) {
			handler := drivershttp.NewHandler(querier)
			r.Get("/", handler.HandleList)
			r.Post("/", handler.HandleCreate)
		})
		r.Route("/trucks", func(r chi.Router) {
			handler := truckhttp.NewHandler(querier)
			r.Get("/", handler.HandleList)
			r.Post("/", handler.HandleCreate)
		})
		r.Route("/customers", func(r chi.Router) {
			handler := customershttp.NewHandler(querier)
			r.Get("/", handler.HandleList)
			r.Post("/", handler.HandleCreate)
		})
	})

	println("Server started on http://localhost:3333")
	http.ListenAndServe(":3333", r)
}
