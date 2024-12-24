import { create } from "zustand";
/*
 Zustand is a minimalistic state management solution for React
 that simplifies global state management by using hooks, 
 providing a simple API for creating stores and managing state
*/
import axios from "axios";

// ? BackEnd URL
const API_URL = "http://localhost:5000";

// ! Allowing Cross-Origin Requests (CORS)
axios.defaults.withCredentials = true;

const useAuthStore = create((set) => ({
  user: null,

  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  // * SignUp Handler
  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });

    try {
      const response = axios.post(`${API_URL}/api/auth/signup`, {
        email,
        password,
        name,
      });

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error in SignUp",
        isLoading: false,
      });
      throw error;
    }
  },
}));
