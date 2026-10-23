
# Restaurant Menu Manager

A web-based restaurant menu management system built using the MERN stack. It allows restaurant staff to manage menu items and customers to view available dishes.

## Technologies Used

- React.js
- Vite
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- CSS

## Features

- View available dishes on the homepage
- Add new menu items
- Edit existing menu items
- Delete menu items
- Mark dishes as available or unavailable
- Filter dishes by category
- View menu statistics in the admin dashboard
- Validate menu item details and prices
- Responsive user interface

## Project Structure

- `client/` - React frontend
- `server/` - Express backend and MongoDB connection

## Installation and Setup

### Prerequisites

- Node.js and npm
- A MongoDB Atlas account or MongoDB connection

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd restaurant-menu-manager
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Install Backend Dependencies

Open another terminal in the project root and run:

```bash
cd server
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `server/` folder and add your MongoDB connection string and other required configuration.

Never upload your `.env` file or database credentials to GitHub.

### 5. Run the Application

Start the backend from the `server/` folder:

```bash
node server.js
```

Start the frontend from the `client/` folder in another terminal:

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

## Database

MongoDB Atlas is used to store menu items, including dish name, description, category, price, and availability.

## Future Improvements

- Deploy the application online
- Add secure administrator authentication
- Improve automated testing
