# MusicCart - MERN Stack React App

This is a full-stack web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It comprises a client-side interface developed with React.js and a server-side backend built with Node.js and Express.js, utilizing MongoDB as the database.

## **Live Project:** https://musi-cart.vercel.app/


## Images
### Home Page:
![Screenshot from 2024-05-02 11-40-38](https://github.com/CodyHarsh/MusiCart/assets/71979122/9b398def-f07e-450f-9af7-8454b418beb3)
### Home Page:
![Screenshot from 2024-05-02 11-38-27](https://github.com/CodyHarsh/MusiCart/assets/71979122/592936a3-729c-4a45-b6ce-2f641e0a7ebd)
### Product Page:
![Screenshot from 2024-05-02 11-39-06](https://github.com/CodyHarsh/MusiCart/assets/71979122/9cc41d94-dae6-4005-b6f7-0481d1106e8f)
### Sign In Page:
![Screenshot from 2024-05-02 11-39-35](https://github.com/CodyHarsh/MusiCart/assets/71979122/b5e1ba8e-e2d1-4c20-a811-58e96bd78d25)

## Tech Stack

- **Frontend**:
  - React.js
  - HTML
  - CSS
  - JavaScript

- **Backend**:
  - Node.js
  - Express.js

- **Database**:
  - MongoDB

### Setting Up the Project from GitHub

1. **Clone the Repository**: Clone the GitHub repository to your local machine using the following command:
    ```bash
    git clone https://github.com/CodyHarsh/MusiCart.git
    ```

2. **Navigate to the Project Directory**: Move into the project directory:
    ```bash
    cd MusiCart
    ```

3. **Install Client Dependencies**:
    - Navigate to the client folder:
        ```bash
        cd client
        ```
    - Install dependencies:
        ```bash
        npm install
        ```

4. **Install Server Dependencies**:
    - Navigate to the server folder:
        ```bash
        cd ../server
        ```
    - Install dependencies:
        ```bash
        npm install
        ```

5. **Environment Setup**:
    - Both the client and server folders contain a `.env.example` file. Create a `.env` file in each folder based on the provided example file.
    - Configure the environment variables according to your setup. Ensure sensitive information like API keys and database credentials are kept secure.

6. **Start the Client**:
    - Navigate back to the project root directory:
        ```bash
        cd ..
        ```
    - Start the client:
        ```bash
        npm start
        ```

7. **Start the Server**:
    - Navigate to the server folder:
        ```bash
        cd server
        ```
    - Start the server:
        - Using Nodemon:
            ```bash
            nodemon index.js
            ```
        - Without Nodemon:
            ```bash
            node index.js
            ```

Once you've completed these steps, users should be able to set up and run your project smoothly from the GitHub repository.


