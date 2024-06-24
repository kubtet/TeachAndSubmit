import { User } from "./user";
import { Repository } from "./repository";

export class UserRepository {
  repositoryId: number | undefined;
  userId: number | undefined;
  user: User | undefined;
  repository: Repository | undefined;
}
