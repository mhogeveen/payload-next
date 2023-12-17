import type { Access } from "payload/config";

export const readAccessWithAuth: Access = ({ req }) => {
  if (req.user) return true;

  const reqAuthToken = req.header("x-auth-token");
  const envAuthToken = process.env.AUTHORIZATION_HEADER;

  if (reqAuthToken === envAuthToken) {
    return true;
  }

  return false;
};
