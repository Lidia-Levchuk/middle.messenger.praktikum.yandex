import AuthApi from "../api/auth";
import { APIError, LoginRequestData, CreateUser } from "../api/type"
import { AUTH_ROUTES, MAIN_ROUTS } from "../constants"

const authApi = new AuthApi();

export const signup = async (model: CreateUser) => {
  window.store.set({isLoading: true});
  try {
    window.store.set({registrationError: ""});

    await authApi.signup(model);
    window.store.set({isLoggedIn: true});

    const redirectRout = AUTH_ROUTES.find(r => r.component === MAIN_ROUTS.auth) || { path: "" };
    window.router.go(redirectRout.path);
  } catch (responseError) {
    const error = responseError as APIError;
    if (error.reason === "Login already exists") {
      window.store.set({registrationError: "Такой логин уже существует. Попробуйте создать себе другой."});
    } else {
      window.store.set({registrationError: error.reason});
    }

    window.store.set({isLoggedIn: false});
  } finally {
    window.store.set({isLoading: false});
  }
}

export const signin = async (model: LoginRequestData) => {
  window.store.set({isLoading: true});
  try {
    window.store.set({loginError: ""});

    await authApi.signin(model);
     
    window.store.set({isLoggedIn: true});

    const redirectRout = AUTH_ROUTES.find(r => r.component === MAIN_ROUTS.auth) || { path: "" };
    window.router.go(redirectRout.path);
  } catch (responseError) {
    const error = responseError as APIError;
    if (error.reason === "Login or password is incorrect") {
      window.store.set({loginError: "Ошибка аутентификации: неверный логин или пароль"});
    } else {
      window.store.set({loginError: error.reason});
    }
    
    window.store.set({isLoggedIn: false});
  } finally {
    window.store.set({isLoading: false});
  }
}

export const user = async () => {
  try {

    await authApi.user();
    
    window.store.set({isLoggedIn: true});
  } catch (responseError) {
    const error = responseError as APIError;
    console.log(error.reason);
    
    window.store.set({isLoggedIn: false});
    
    console.log(window.store.get("isLoggedIn"))
  } finally {
    
  }
}
