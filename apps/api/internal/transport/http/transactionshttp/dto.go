package transactionshttp

type CreateTransactionRequest struct {
	Amount      float64 `json:"amount"`
	Description string  `json:"description"`
	Category    string  `json:"category"`
	Type        string  `json:"type"`
	Status      *string `json:"status"`
	Deliveries  []int64   `json:"deliveries"`
}
