import { Repository } from './repository';
import { User } from './user';

export class Notification {
  id: number;
  teacherId: number;
  studentId: number;
  repositoryId: number;
  content: string;
  teacher: User;
  student: User;
  repository: Repository;
}
