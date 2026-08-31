# 🐾 Pawnest --- Pet Adoption Platform

**Pawnest** is a modern full-stack pet adoption platform designed to
connect people with pets looking for a loving home. Users can explore
available pets, view detailed information, submit adoption requests, and
manage their own pet listings through a dedicated dashboard.

The project is built with a modern React/Next.js frontend and an
Express/MongoDB backend, with a focus on clean UI, responsive design,
authentication, and secure adoption-request management.

## 🌐 Live Project

**Live URL:** https://pawnest-project-client.vercel.app/

## 📌 Project Purpose

The purpose of Pawnest is to make pet adoption simple, transparent, and
user-friendly.

The platform allows users to:

-   Browse available pets.
-   Filter and explore pets by category.
-   View detailed pet information.
-   Submit adoption requests.
-   Prevent duplicate adoption requests for the same pet.
-   Manage pets they have listed.
-   Review and process adoption requests.
-   Approve or reject adoption requests.
-   Access a dedicated dashboard for managing adoption activity.

------------------------------------------------------------------------

## ✨ Key Features

### 🐶 Pet Discovery

-   Browse available pets from the platform.
-   Supported pet categories:
    -   Dog
    -   Cat
    -   Bird
    -   Rabbit
-   View pet information including:
    -   Pet name
    -   Breed
    -   Species
    -   Location
    -   Age
    -   Weight
    -   Gender
    -   Personality
    -   Health status
    -   Vaccination status
    -   Adoption fee
    -   Description
    -   Image

### ❤️ Adoption Requests

-   Authenticated users can submit adoption requests.
-   A user cannot submit multiple requests for the same pet.
-   Adoption requests have clear statuses such as:
    -   Pending
    -   Approved
    -   Rejected
-   Pet owners can review requests for their listed pets.
-   Approving a request updates the pet's adoption status.

### 🏠 Pet Management

Users can manage pets they have listed:

-   Add a new pet.
-   View their listed pets.
-   Edit pet information.
-   Delete pet listings.
-   View adoption requests related to their pets.

### 📊 Dashboard

The dashboard provides a centralized management experience with:

-   Dashboard overview.
-   My Pets.
-   Add Pet.
-   Adoption Requests.
-   Users.
-   Settings.

### 🔐 Authentication & Security

-   User authentication.
-   Protected dashboard functionality.
-   Authenticated adoption requests.
-   Protected pet-management operations.
-   Backend validation for important operations.

### 📱 Responsive UI

Pawnest is designed to work across:

-   Mobile devices
-   Tablets
-   Laptops
-   Desktop screens

The interface uses responsive layouts, glassmorphism, subtle animations,
rounded components, and a forest-green/warm-orange visual identity.

### 🚫 Custom Error & Loading States

The project includes branded:

-   Loading UI
-   404 Not Found UI

These states follow the Pawnest design system instead of relying on
generic browser or framework screens.

------------------------------------------------------------------------

## 🎨 Design System

Pawnest uses a nature-inspired visual language.

### Primary --- Forest Green

``` text
Primary 500: #3D6B57
Primary 800: #1E3A2F
Primary 900: #173328
```

### Secondary --- Warm Orange

``` text
Secondary 500: #E8892B
Secondary 700: #C4711A
```

### Typography

-   **DM Sans** --- primary interface font
-   **Playfair Display** --- display/headline font

### Design Characteristics

-   Forest-green backgrounds
-   Warm orange CTA accents
-   Glassmorphism
-   Soft shadows
-   Large rounded corners
-   Subtle gradients
-   Background glow effects
-   Floating animations
-   Responsive layouts

------------------------------------------------------------------------

## 🛠️ Technologies Used

### Frontend

-   Next.js
-   React
-   JavaScript
-   Tailwind CSS
-   HeroUI
-   Lucide React
-   Better Auth
-   Recharts

### Backend

-   Node.js
-   Express.js
-   MongoDB
-   MongoDB Node.js Driver
-   CORS
-   dotenv

### Development & Deployment

-   Git
-   GitHub
-   Vercel
-   npm

------------------------------------------------------------------------

## 📦 Important NPM Packages

### Frontend

``` bash
npm install next react react-dom
npm install lucide-react
npm install @heroui/styles
npm install recharts
```

Additional authentication and project dependencies are defined in the
frontend `package.json`.

### Backend

``` bash
npm install express mongodb cors dotenv
```

------------------------------------------------------------------------

## 📁 Project Structure

A simplified project structure:

``` text
pawnest-project-client/
│
├── public/
│
├── src/
│   └── app/
│       ├── (main)/
│       │   ├── all-pet/
│       │   ├── log-in/
│       │   ├── sign-up/
│       │   ├── layout.jsx
│       │   ├── loading.js
│       │   └── page.js
│       │
│       ├── (dashboard)/
│       │   ├── dashboard/
│       │   ├── layout.jsx
│       │   └── loading.js
│       │
│       ├── api/
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.js
│       ├── loading.js
│       ├── not-found.js
│       └── page.js
│
├── components/
├── hooks/
├── lib/
├── .env
├── package.json
└── README.md
```

> The exact folder structure may vary depending on the current project
> organization.

------------------------------------------------------------------------

## 🚀 Getting Started

Follow these steps to run Pawnest locally.

### 1. Clone the Repository

``` bash
git clone <your-github-repository-url>
```

### 2. Navigate to the Project

``` bash
cd pawnest-project-client
```

### 3. Install Dependencies

``` bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root.

Example:

``` env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Add any authentication and database-related environment variables
required by your current Better Auth configuration.

> Never commit secret keys, database credentials, or private environment
> variables to GitHub.

### 5. Start the Development Server

``` bash
npm run dev
```

Open:

``` text
http://localhost:3000
```

------------------------------------------------------------------------

## 🖥️ Backend Setup

Pawnest uses an Express backend for API operations.

### 1. Navigate to the Server Project

``` bash
cd pawnest-project-server
```

### 2. Install Dependencies

``` bash
npm install
```

### 3. Configure Environment Variables

Example:

``` env
PORT=8000
MONGO_URI=your-mongodb-connection-string
```

### 4. Start the Server

``` bash
npm start
```

or use the development script defined in the server's `package.json`.

The API should then be available at:

``` text
http://localhost:8000
```

------------------------------------------------------------------------

## 🔌 Main API Endpoints

The backend provides APIs for pets and adoption requests.

### Pets

``` text
GET    /pets
GET    /pets/:id
POST   /pets
PATCH  /pets/:id
DELETE /pets/:id
```

### Adoption Requests

``` text
GET    /adoption-requests
GET    /adoption-request/:id
GET    /adoption-requests/pet/:petId
POST   /adoption-requests
```

The exact available endpoints may depend on the current backend
implementation.

------------------------------------------------------------------------

## 🔄 Adoption Flow

The basic adoption workflow is:

``` text
User
  │
  ▼
Browse Pets
  │
  ▼
View Pet Details
  │
  ▼
Submit Adoption Request
  │
  ▼
Request Status: Pending
  │
  ▼
Pet Owner Reviews Request
  │
  ├───────────────┐
  ▼               ▼
Approve         Reject
  │               │
  ▼               ▼
Pet becomes      Request
Adopted          Rejected
```

------------------------------------------------------------------------

## 🧩 Dashboard Routes

The dashboard includes the following sections:

  Route          Purpose
  -------------- --------------------------
  `/dashboard`   Dashboard overview
  `/my-pets`     Manage listed pets
  `/add-pet`     Create a pet listing
  `/requests`    Manage adoption requests
  `/users`       Manage platform users
  `/settings`    Account preferences

The homepage and public routes are handled separately through the
`(main)` route group.

------------------------------------------------------------------------

## 🐾 Supported Pet Categories

Pawnest currently supports:

  Category   Examples
  ---------- ----------------------------------
  Dog        Labrador, Golden Retriever, etc.
  Cat        Siamese, Persian, etc.
  Bird       Parrot, Cockatiel, etc.
  Rabbit     Holland Lop, Lionhead, etc.

------------------------------------------------------------------------

## 📋 Pet Information

Each pet listing can contain:

``` text
Pet Name
Breed
Species
Location
Age
Weight
Gender
Adoption Fee
Personality
Health Status
Vaccination Status
Image URL
Description
Adoption Status
```

------------------------------------------------------------------------

## 🧠 Adoption Request Protection

Pawnest prevents users from submitting more than one adoption request
for the same pet.

The frontend checks existing requests before enabling the adoption
action, while the backend should also validate requests to ensure the
rule cannot be bypassed by manually calling the API.

Example UI behavior:

``` text
Available
    ↓
Adopt Pet
    ↓
Request Submitted
    ↓
Button Disabled
```

------------------------------------------------------------------------

## 🎯 Future Improvements

Potential future enhancements include:

-   Advanced pet search and filtering.
-   Location-based pet discovery.
-   Pagination and infinite scrolling.
-   Email notifications.
-   Adoption-request notifications.
-   Admin role management.
-   User profile management.
-   Image upload and cloud storage.
-   Pet favorites/wishlist.
-   Adoption history.
-   Analytics dashboard.
-   Improved accessibility.
-   Automated API validation and testing.

------------------------------------------------------------------------

## 🔒 Security Notes

For production deployment:

-   Keep MongoDB credentials private.
-   Keep authentication secrets private.
-   Use environment variables for sensitive configuration.
-   Validate request data on the backend.
-   Verify authenticated users on protected API routes.
-   Validate MongoDB ObjectIds before database operations.
-   Configure CORS for trusted frontend origins.
-   Never expose private server credentials through `NEXT_PUBLIC_*`
    variables.

------------------------------------------------------------------------

## 🌍 Deployment

The frontend can be deployed using Vercel.

Typical production build:

``` bash
npm run build
```

Start a production server locally with:

``` bash
npm start
```

Before deployment, make sure:

1.  Production API URL is configured.
2.  MongoDB is accessible from the deployed backend.
3.  Authentication base URL is configured correctly.
4.  CORS allows the production frontend.
5.  No localhost API URL remains in production code.
6.  Required environment variables are configured in the hosting
    platform.

------------------------------------------------------------------------

## 🤝 Contributing

Contributions are welcome.

### Steps

``` bash
git clone <your-github-repository-url>
cd pawnest-project-client
npm install
```

Create a feature branch:

``` bash
git checkout -b feature/your-feature-name
```

Make your changes and commit:

``` bash
git add .
git commit -m "Add your feature"
```

Push the branch:

``` bash
git push origin feature/your-feature-name
```

Then create a Pull Request.

------------------------------------------------------------------------

## 📄 License

This project is created for educational and portfolio purposes.

------------------------------------------------------------------------

## 👨‍💻 Author

**Md Fahim Miah**

### Pawnest

> **Rescue a Heart, Find a Best Friend.** 🐾
