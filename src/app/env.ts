/* eslint-disable */
interface ENV {
  [key: string]: any;
}

const env: ENV = {
  baseGatewayUrl: process.env.REACT_APP_BASE_GATEWAY_URL,
  keycloakUrl: process.env.REACT_APP_KEYCLOAK_SERVER_URL,
  realm: process.env.REACT_APP_KEYCLOAK_REALM,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
  redirectUri: process.env.REACT_APP_FE_REDIRECT_URI,
};

export default env;
