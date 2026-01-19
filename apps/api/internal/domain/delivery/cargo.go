package delivery

type CargoItem struct {
	id          int64
	description string
	category    string
	weightKg    *float64
	volumeM3    *float64
}

func newCargoItem(
	description string,
	category string,
	weightKg *float64,
	volumeM3 *float64,
) CargoItem {
	return CargoItem{
		description: description,
		category:    category,
		weightKg:    weightKg,
		volumeM3:    volumeM3,
	}
}

func (c *CargoItem) WightKG() *float64 {
	return c.weightKg
}
func (c *CargoItem) VolumeM3() *float64 {
	return c.volumeM3
}
func (c *CargoItem) Description() string {
	return c.description
}
func (c *CargoItem) Category() string {
	return c.category
}
