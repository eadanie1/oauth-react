# OAuth Authentication with React Frontend and Node.js Backend

This project provides OAuth authentication with Facebook, Google, and LinkedIn using a React frontend and a Node.js backend.

## Features

- Login with Facebook, Google, or LinkedIn
- Display user information after login
- Sign out functionality

## Technologies Used

### Frontend

- React.js
- JWT Decode
- Axios

### Backend

- Express.js
- Axios
- Server-Sent Events (SSE)
- dotenv

## Getting Started

To get started with the project, follow these steps:

### Frontend

1. Clone the repository:

   ```bash
   git clone https://github.com/eadanie1/oauth-react.git
   ```

2. Navigate to the frontend directory:

   ```bash
   cd oauth-react/frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   - Create a `.env` file in the `constants` folder.
   - Add your Facebook app ID, Google client ID, and LinkedIn client ID to the `.env` file:

   ```env
   VITE_FB_APP_ID=your-facebook-app-id
   VITE_GOOGLE_CLIENT_ID=your-google-client-id
   VITE_LINKEDIN_CLIENT_ID=your-linkedin-client-id
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

### Backend

1. Navigate to the backend directory:

   ```bash
   cd oauth-react/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add your LinkedIn client ID and client secret to the `.env` file:

   ```env
   CLIENT_ID_LINKEDIN=your-linkedin-client-id
   CLIENT_SECRET_LINKEDIN=your-linkedin-client-secret
   ```

4. Start the server:

   ```bash
   npm run devstart-oauth
   ```

5. The server will start running on [http://localhost:3000](http://localhost:3000).

## Usage

- Click on the "Login with Facebook," "Login with Google," or "Login with LinkedIn" button to initiate the OAuth authentication process.
- After successful login, user information will be displayed.
- Click on the "Sign out" button to log out from the application.

## Endpoints

- `GET /auth/linkedin`: Initiates the OAuth authentication process with LinkedIn.
- `GET /auth/linkedin/callback`: Handles the OAuth callback from LinkedIn and sends user data via SSE.
- `GET /subscribe`: SSE endpoint for subscribing to user data updates.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
