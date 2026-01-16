## The key domain insight

In truck delivery, there are three different things :

- Cargo
    - The physical goods
        > Example: “20 pallets of electronics, 8 tons”
- Delivery / Shipment
    - A logistics job
        > Example: “Move this cargo from Moscow to Kazan between Jan 10–12 using truck X and driver Y”
- Transaction
    - Money & accounting
        > Example: “Customer paid €5,000 for this delivery”


### Correct conceptual model

| Entity                     | Meaning                       |
| -------------------------- | ----------------------------- |
| **Cargo**                  | What is being transported     |
| **Delivery** (or Shipment) | The act of transporting cargo |
| **Truck**                  | Vehicle                       |
| **Driver**                 | Person driving                |
| **Customer**               | Who orders delivery           |
| **Transaction**            | Payment / billing             |

- Cargo (WHAT) is about stable, physical facts.
- Delivery (HOW / WHEN / WHERE)

## Financial domain view

In logistics, transactions are not all the same. You have at least two financial flows:

- **Income**
    - Customer pays you for deliveries

- **Expenses**
    - You pay others to perform deliveries: fuel, driver salary / tip pay, tolls, truck maintanance, third-party carrier payment
    
**One transaction may cover many deliveries**. How? Montly invoice, contract based payment, or prepaid balance. I have to design better UX for this case but the domain must manage it.
