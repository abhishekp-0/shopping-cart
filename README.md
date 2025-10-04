# ShopCart - A React Shopping Cart Application

This project is a simple, modern e-commerce front-end built with React and Vite. It demonstrates core concepts like component-based architecture, client-side routing, state management, and interaction with a live API. The user interface is crafted using Radix UI Themes for a clean and accessible experience.

## Features

-   **Product Catalog**: Browse products fetched from the [Fake Store API](https://fakestoreapi.com/).
-   **Shopping Cart**: Add items, update quantities, and remove products from the cart.
-   **Dynamic UI**: The navigation bar shows a real-time count of items in the cart.
-   **Responsive Design**: The layout is designed to work on various screen sizes, from mobile to desktop.
-   **Client-Side Routing**: Seamless navigation between the Home, Shop, and Cart pages using React Router.

## Tech Stack

-   **Framework**: React
-   **Build Tool**: Vite
-   **UI Components**: Radix UI Themes
-   **Routing**: React Router
-   **Icons**: Lucide React
-   **Linting**: ESLint

## Project Structure

The project is organized into the following main directories:

```
src/
├── components/   # Reusable UI components (Navbar, ProductCard, etc.)
├── pages/        # Top-level page components for each route (Home, Shop, Cart)
├── services/     # API interaction logic (fetching products)
├── App.jsx       # Main application component with routing and state management
└── main.jsx      # Application entry point
```

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm or a compatible package manager

### Installation & Setup

1.  **Clone the repository** (or download the source code):
    ```sh
    git clone <repository-url>
    cd shopping-cart
    ```

2.  **Install dependencies**:
    ```sh
    npm install
    ```

3.  **Run the development server**:
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Available Scripts

In the project directory, you can run:

-   `npm run dev`: Starts the development server with Hot Module Replacement (HMR).
-   `npm run build`: Bundles the app for production into the `dist` folder.
-   `npm run lint`: Lints the project files using ESLint.
-   `npm run preview`: Serves the production build locally to preview it.
