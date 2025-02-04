<div>
  <img src="https://i.ibb.co.com/NdFqdpQY/smartpicksss.png"/>
</div>

# Project Name: Smart Picks 📦

The server-side implementation of a Product Recommendation Platform "Smart Picks" built with Express.js, MongoDB, and JWT for authentication. The backend provides RESTful APIs to manage queries, recommendations, while handling authentication and secure cookie management using cookie-parser.

# Features

• Authentication: Secure user authentication using JWT stored in cookies <br/>
• CRUD Operations: <br/> - Queries: Create, read, update, and delete user queries. <br/> - Recommendations: Add, update, and delete product recommendations. - Comments: Manage user comments on queries and recommendations.

• Cookie Management: Securely store authentication tokens using cookie-parser.
• Database: Uses MongoDB for data persistence.

## Tech Stack 👨🏻‍💻

• Framework: Express.js <br/>
• Database: MongoDB <br/>
• Authentication: JWT (JSON Web Tokens) <br/>
• Middleware: CORS, cookie-parser <br/>

## Installation

### **1. Clone the Repository**  
```sh
git clone https://github.com/golamsarwar96/smart-picks-app-server.git
```
### **2. Install Dependencies**

```sh
npm install
```
### **3. Environment Configuration**
Create a .env file in the project root and add the following environment variables <br/>

```sh
# Database Configuration
MONGO_URI=mongodb://localhost:27017/smartpicksDB

# JWT Secret for Authentication
JWT_SECRET=your_jwt_secret_key

```

### **4. Run the Project**
```sh
npm run dev
```

## LIVE LINK: 🌐

https://smart-picks-server.vercel.app
