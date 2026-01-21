package transactions

import "testing"

func Test_ValidateTransactionType(t *testing.T) {
	t.Run("should return nil for supported types", func(t *testing.T) {
		testCases := []string{"income", "expense"}

		for _, tcIn := range testCases {
			result := ValidateTransactionType(tcIn)
			if result != nil {
				t.Errorf("expected: nil; got: %v", result)
			}
		}
	})

	t.Run("should return error for unexpected types", func(t *testing.T) {
		testCases := []string{"incame", "nnnpense222"}

		for _, tcIn := range testCases {
			result := ValidateTransactionType(tcIn)
			if result != ErrUnexpectedType {
				t.Errorf("expected: %v; got: %v", ErrUnexpectedType, result)
			}
		}
	})
}
