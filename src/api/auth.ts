import HTTPTransport from "../core/httpTransport";
import { APIError, CreateUser, LoginRequestData, SignUpResponse, UserDTO } from "./type";

const authApi = new HTTPTransport("/auth");

export default class AuthApi {
  async signup(data: CreateUser): Promise<SignUpResponse> {
    return await authApi.post("/signup", { data })
      .then((response) => response as SignUpResponse)
      .catch((error) => {
        throw { reason: error.reason || "Signup failed" } as APIError;
      })
  }

  async signin(data: LoginRequestData): Promise<void | APIError> {
    return await authApi.post("/signin", { data })
      .then(() => undefined)
      .catch((error) => {
        throw { reason: error.reason || "Signin failed" } as APIError;
      });
  }

  async user(): Promise<UserDTO | APIError> {
    return await authApi.get("/user")
      .then((response) => response as UserDTO)
      .catch((error) => {
        throw { reason: error.reason || "Could not fetch user data" } as APIError;
      });
  }

  async logout(): Promise<void | APIError> {
    return await authApi.post("/logout")
      .then(() => undefined)
      .catch((error) => {
        throw { reason: error.reason || "Logout failed" } as APIError;
      });
  }
}
