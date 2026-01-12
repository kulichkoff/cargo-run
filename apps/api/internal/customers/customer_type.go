package customers

type CustomerType string

const (
    CustomerTypeIndividual CustomerType = "individual" // Физ. лицо (разовый заказ)
    CustomerTypeLegal      CustomerType = "legal"      // Юр. лицо (постоянный клиент)
    CustomerTypePartner    CustomerType = "partner"    // Партнер (логистическая компания)
)
