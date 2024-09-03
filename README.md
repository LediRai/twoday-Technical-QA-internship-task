# twoday-Technical-QA-internship-task

This repository contains an automated test suite for an online shop using the Playwright framework in JavaScript. The tests are written to validate various functionalities of the web application at [Magento Test Site](https://magento.softwaretestingboard.com/).

**Note:** This project is a technical task as part of an internship application for a QA Engineer position.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js**
- **npm**
- **Git**

## Setup Instructions

Follow these steps to set up the project on your local machine:

1. **Clone the repository**:

```
https://github.com/LediRai/twoday-Technical-QA-internship-task
```

2. **Install dependencies**:

```
npm install
```

## Run tests
You can run the tests using the following command:

```
npx playwright test
```

# Test scenarios:

## Scenario one:

- Using navigation menu, find mens Hoodies & Sweatshirts section.
- Check/Assert that the displayed number of jackets matches the selected
  number of jackets displayed per page.
- Select “Frankie Sweatshirt” and open its details.
- Select size, colour and quantity.
- Add product to cart and check that cart icon is updated with product quantity.
- Open cart and check if product match the one You added to the cart.
- Proceed to checkout
- Complete the order.

## Scenario two:

- Using navigation menu, find women pants section.
- Filter section to show the cheapest products available.
- Select the cheapest pants and add them to the cart.
- Add 2 more products to the cart. Check that cart icon is updated with each
  product.
- Remove product from the cart.
- Proceed to checkout.
- Add product to the cart from suggested products.
- Complete the order.
