import { userRoles } from "./role-select";

export interface formInput {
  name: string;
  type: string;
  placeholder: string;
  minLength?: number;
  prefixIcon: string;
  options?: userRoles[];
}