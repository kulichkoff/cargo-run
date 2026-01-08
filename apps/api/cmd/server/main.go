package main

import (
	"cargorun/internal/config"
	"cargorun/internal/employees"
	"cargorun/internal/vehicles"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func main() {
	config.MustLoad()

	r := chi.NewRouter()

	r.Route("/employees", employees.Router)
	r.Route("/vehicles", vehicles.Router)

	println("Server started on http://localhost:3333")
	http.ListenAndServe(":3333", r)
}
