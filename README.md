# My Sara7a App - Authentication System

MyApp is a simple authentication system that allows users to register, log in, and receive a welcome email after successful registration. The system is built using Node.js, Express, and MongoDB.

## Features

- **User Registration**: Users can create a new account by providing a username, email, and password.
- **User Login**: Registered users can log in using their email and password.
- **Welcome Email**: After successful registration, a welcome email is sent to the user، must click "Get Started" link to be verified to do all requests.
- **Message Management**:
  - **Create Messages**: A user can create their own messages. These messages are private, and no one else can view them.
  - **Delete Messages**: A user can delete their own messages. No one else can delete another user's messages.
  - **Retrieve Messages**: A user can retrieve their own messages. No one else can access another user's messages.

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Email Integration**: Nodemailer
- **Password Hashing**: bcrypt

## Getting Started

Follow these steps to set up the project on your local machine:

### Prerequisites

- [Node.js](https://nodejs.org/) (Version 14 or higher)
- [MongoDB](https://www.mongodb.com/) (Version 4.4 or higher)

### Installation

1. Clone the repository:

   ```bash
    git clone https://github.com/3b3zeem/Sara7a-App-Api
    cd myapp

2. **Install dependencies:**:
    ```bash
    npm install
    ```
3. **Set up environment variables**:
   Create a ```.env``` file in the root directory and add the following variables:
    ```bash
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/myapp
    EMAIL_SERVICE=gmail
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASSWORD=your-email-password
    ```
    
4. **Start the server**:
    ```bash
    nodemon ./index.js
    ```

### Additional Notes

- **Privacy and Security**: All user messages are private and securely stored. Users can only access, delete, or retrieve their own messages, ensuring complete privacy and security.
- **Scalability**: The system is designed to be scalable, allowing for future enhancements and additional features.

----

### Contributing
  - If you would like to contribute to this project, please fork the repository and create a pull request with your changes. We welcome any improvements or new features!

