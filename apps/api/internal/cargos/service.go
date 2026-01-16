package cargos

import (
	"cargorun/internal/transactions"
	"cargorun/pkg/timeformat"
	"context"
	"fmt"
)

type transactionsRepository interface {
	Create(
		ctx context.Context,
		dto *transactions.CreateTransactionDTO,
	) (*transactions.FinancialTransaction, error)
	Update(
		ctx context.Context,
		dto *transactions.UpdateTransactionDTO,
	) (*transactions.FinancialTransaction, error)
}

type Service struct {
	cargoRepo        cargosRepo
	transactionsRepo transactionsRepository
}

func NewService(cargoRepo cargosRepo, transactionsRepo transactionsRepository) *Service {
	return &Service{
		cargoRepo:        cargoRepo,
		transactionsRepo: transactionsRepo,
	}
}

func (s *Service) CreateCargo(ctx context.Context, dto *createCargoDTO) (*CargoModel, error) {
	cargo, err := s.cargoRepo.Create(ctx, dto)
	if err != nil {
		return nil, err
	}
	description := fmt.Sprintf("Оплата перевозки %s — %s",
		cargo.StartDate.Format(timeformat.DDMMYYYYKebab),
		cargo.DeadlineDate.Format(timeformat.DDMMYYYYKebab),
	)
	_, err = s.transactionsRepo.Create(ctx, &transactions.CreateTransactionDTO{
		Amount:          cargo.Price,
		CargoID:         cargo.ID,
		Type:            string(transactions.TransactionTypeIncome),
		Status:          string(transactions.TransactionStatusPending),
		TransactionDate: cargo.DeadlineDate,
		Description:     &description,
	})

	return cargo, err
}
