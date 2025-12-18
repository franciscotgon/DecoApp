import { LoginDto, RegisterDto } from "@/data-layer/types/Auth";
import { AuthResponse } from "@/data-layer/types/AuthResponse";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/auth";

export const authService = {
  async login(credentials: LoginDto): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  async register(data: RegisterDto): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  },
};
