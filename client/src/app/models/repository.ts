import { RepoUser } from './repouser';
import { Teacher } from './teacher';
import { UserRepository } from './userrepository';

export class Repository {
  id: number | undefined;
  numberOfStudents: number | undefined;
  numberOfTasks: number | undefined;
  repoUsers: RepoUser[] | undefined;
  subject: string | undefined;
  teachers: Teacher[] | undefined;
  userRepositories: UserRepository[] | undefined;
}
