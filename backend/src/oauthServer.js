import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import querystring from 'querystring';
import SSE from 'express-sse';
import { tryCatch } from './global-logic/tryCatch.js';

const app = express();
app.use(express.json(), cors());
dotenv.config();

const { CLIENT_ID_LINKEDIN, CLIENT_SECRET_LINKEDIN } = process.env;
const REDIRECT_URI = 'http://localhost:3000/auth/linkedin/callback';
const scope = 'openid%20profile%20w_member_social%20email';
const stateStore = new Map();
const sse = new SSE();

app.get(
  '/auth/linkedin', 
  tryCatch(
    (req, res) => {
    const state = Math.random().toString(36).substr(2, 9);
    stateStore.set(state, true);
  
    const redirectUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID_LINKEDIN}&redirect_uri=${REDIRECT_URI}&state=${state}&scope=${scope}
    `;
    res.json({ redirectUrl });
    }
  )
);

app.get(
  '/auth/linkedin/callback', 
  tryCatch(
    async (req, res) => {
    const code = req.query.code;
    const state = req.query.state;
  
      if (!state || !stateStore.get(state)) {
        throw new Error('Invalid state parameter');
      }
      stateStore.delete(state);
  
      const data = querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        client_id: CLIENT_ID_LINKEDIN,
        client_secret: CLIENT_SECRET_LINKEDIN,
        redirect_uri: REDIRECT_URI
      });
  
      const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
  
      const accessToken = tokenResponse.data.access_token;
  
      const profileResponse = await axios.get('https://api.linkedin.com/v2/userinfo', { 
        headers: { 'Authorization': `Bearer ${accessToken}` } 
      });
  
      const profileData = profileResponse.data;
  
      sse.send({ type: 'linkedinUserData', userData: profileData });
  
      res.json({ type: 'linkedinUserData', userData: profileData });
    }
  )
);

app.get('/subscribe', sse.init);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});