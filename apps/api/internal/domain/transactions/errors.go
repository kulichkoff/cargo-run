package transactions

import "errors"

var (
	ErrUnexpectedType     = errors.New("Unexpected type provided")
	ErrUnexpectedStatus   = errors.New("Unexpected status provided")
	ErrBadStateTransition = errors.New("Bad state transition")
)
