export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "Admin" | "Customer";
}
export interface UserResponse {
  id?: string;
  Id?: string;
  email?: string;
  Email?: string;
  firstName?: string;
  FirstName?: string;
  lastName?: string;
  LastName?: string;
  role?: "Admin" | "Customer";
  Role?: "Admin" | "Customer";
}
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}
export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
