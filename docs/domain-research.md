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

### Profit per delivery

Delivery **does NOT** own profit because transactions arrive later, expenses may be posted after delivery, accounting rules change.

#### Reporting model

A denormalized projection may look like this:

```
DeliveryProfitView
- deliveryId
- revenue
- expenses
- profit
```

, where 

```
profit(delivery) =
  sum(INCOME where relates_to delivery) 
  - sum(EXPENSE where relates_to delivery)
```

For **contract-based** payments it must work naturally. One INCOME -> Many Deliveries. So the revenue is distributed by rule (distance, weight, manual allocation).

## Domain rules

> Delivery is a business operation

> Transaction is a financial fact

> Profit is a report, not a domain object

By aggregate roots.

### Delivery

- Cannot assign driver after delivery completed
- Cannot remove cargo after pickup
- Cannot be delivered without a truck

### Transaction

- Amount never changes after posting
- Must be linked to at least one delivery
- Must have type & status
