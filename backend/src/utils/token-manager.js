// Import all needs
require('dotenv').config();
const axios = require('axios');

// Credential
const tokenUrl = "https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token";
const clientID = process.env.OPENSKY_CLIENT_ID;
const clientSecret = process.env.OPENSKY_CLIENT_SECRET;

// Token variable 
let activeToken = null;
let expiresAt = null;

// Function get token 
const getToken = async () => {
  const currentTime = Date.now();

  // Check active status token 
  if (activeToken && currentTime < expiresAt) {
    return activeToken;
  }

  // If status token inactive or almost inactive, get new token 
  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientID);
    params.append('client_secret', clientSecret);

    const response = await axios.post(tokenUrl, params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    // Fresh token 
    activeToken = response.data.access_token;

    // Manage expired token 
    const expiredToken = response.data.expires_in * 1000;
    const tresshold = 60 * 1000; // 60 second before 30 minute
    expiresAt = Date.now() + (expiredToken + tresshold);

    return activeToken
  }

  catch (error) {
    console.error('Gagal fetch token:', error.message);
    throw error;
  }
}

// Export module
module.exports = { getToken }
