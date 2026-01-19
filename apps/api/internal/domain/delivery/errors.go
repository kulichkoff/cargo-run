package delivery

import "errors"

var (
	ErrCargoModificationNotAllowed = errors.New("cannot modify cargo after pickup")
	ErrAssignmentNotAllowed        = errors.New("assignment not allowed")
	ErrInvalidStateTransition      = errors.New("invalid state transition")
	ErrCancelNotAllowed            = errors.New("cannot cancel delivered delivery")
)
