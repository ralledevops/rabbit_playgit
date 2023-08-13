import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  exports: [UserService]  // Export UserService so it can be imported and used by other modules.
})
export class UserModule {}
 