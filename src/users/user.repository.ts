import { EntityRepository, Repository } from 'typeorm';
import { UserCredentialDto } from './dto/user-credential.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userCredentialDto: UserCredentialDto): Promise<User> {
    const { username, password } = userCredentialDto;
    const user = new User();
    user.username = username;
    user.password = password;
    await user.save();
    return user;
  }
}
