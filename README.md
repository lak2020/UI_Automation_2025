# UI Automation Project

## Project Overview
This project focuses on automating UI testing for web applications, ensuring high-quality standards and reducing manual testing efforts. It provides a comprehensive framework for developing and executing automated test cases.


## Page Objects Overview

### BasePage.ts
Base class containing shared functionality for all page objects:
- **Geolocation Management**: Block, override, and dismiss geolocation popups
- **Dialog Handling**: Automatically dismiss all dialogs
- **Navigation Utilities**: Navigate to URLs with proper wait conditions
- **Scroll Methods**: Scroll down functionality for page interaction

### HomePage.ts
Handles home page interactions:
- `goto()` - Navigate to homepage
- `searchProduct(query)` - Search for products
- `setPriceFilter(minPrice, maxPrice)` - Apply price range filters
- `toggleSalesItems(action)` - Include/exclude sale items
- `applyFilter()` - Apply filters and display results
- `addToCart(products)` - Add products to cart

### CartPage.ts
Manages shopping cart operations:
- `viewMiniCart()` - View mini cart on page
- `assertProductInCart(index)` - Verify product in cart
- `increaseProductQuantity(index)` - Increase product quantity
- `viewCartPage()` - Navigate to full cart page
- `assertProductInViewCart(index)` - Verify product in full cart
- `checkAvailability(postcode)` - Check product availability

### CheckOut.ts
Handles checkout and order placement:
- `checkout()` - Initiate checkout process
- `enterEmail(email)` - Enter customer email
- `selectClickAndCollect()` - Select click and collect delivery
- `selectClosestStore()` - Select closest store for pickup
- `removeUnavailableProducts()` - Remove unavailable items
- `fillCollectionDetails(name, lastname, phonenumber)` - Fill contact details
- `assertProductIn_CheckOutPage(...indices)` - Verify products on checkout

## Architecture

The project follows the **Page Object Model (POM)** design pattern:

- **BasePage**: Foundation class providing common functionality
- **Derived Page Objects**: Individual classes for each page, inheriting from BasePage
- **Test Files**: Test scripts that use page objects for clear, reusable test cases
- **Test Framework**: Playwright for robust cross-browser automation

### Benefits of POM:
✅ Improved maintainability and readability  
✅ Reduced code duplication  
✅ Easier updates when UI changes  
✅ Better test organization and scalability  

## Setup Instructions

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/lak2020/UI_Automation_2025.git

## Architecture
The architecture of the project consists of the following key components:
- **Test Scripts**: Organized into modules for clarity and reusability.
- **Test Framework**: Built on Playwright for robust browser interactions.

## Setup Instructions
To set up the project locally, follow these steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/lak2020/UI_Automation_2025.git
   ```
2. Navigate to the project directory:
   ```bash
   cd UI_Automation_2025
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Ensure that you have the necessary drivers installed for your browser (e.g., ChromeDriver for Chrome).

## Test Execution
To execute the tests, run the following command:
```bash
npm test
```
Ensure that the test environment is properly set up and that all dependencies are installed.

## CI/CD Integration
The project employs [CI/CD Tool] for continuous integration and deployment. Pushes to the main branch trigger automated builds and tests, which helps maintain code quality.

## Best Practices
- Write clear and concise test cases.
- Keep your test data separate from the test scripts.
- Regularly review and refactor your tests to ensure they remain effective.
- Use descriptive naming conventions for test cases.
- Implement proper error handling within your test scripts.
