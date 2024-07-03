import { Role } from "./role";

export class User {
  id: number | undefined;
  name: string | undefined;
  surname: string | undefined;
  email: string | undefined;
  dateOfBirth: Date | undefined;
  roleId: number | undefined;
  role: Role | undefined;
}
