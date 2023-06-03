import { BadRequestException, Injectable } from '@nestjs/common';
import { users, Prisma } from '@prisma/client';
import { PrismaService } from '@src/common';
import { hash } from 'argon2';
import { CRUDService } from '@app/prisma-crud';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService extends CRUDService<
  UserEntity,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(private prisma: PrismaService) {
    super(prisma.users, prisma);
  }

  async create(data: CreateUserDto): Promise<UserEntity> {
    // NOTE: CHECK USER EXISTS
    const userExists = await this.checkExists(data);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    // NOTE: HASH PASSWORD BEFORE SAVE TO DB
    // if (typeof data.password == 'string') {
    // data.password = await hash(data.password);
    // }
    // PARENT CLASS
    return super.create(data);
  }

  async update(id: number, data: UpdateUserDto): Promise<UpdateUserDto> {
    // NOTE: HASH PASSWORD BEFORE SAVE TO DB
    if (typeof data.password == 'string') {
      data.password = await hash(data.password);
    }
    // PARENT CLASS
    return super.update(id, data);
  }

  // Overrride
  public async checkExists(
    data: UserEntity | CreateUserDto | UpdateUserDto,
    checkAttr?: string | string[],
  ): Promise<boolean> {
    const userExists = await this.prisma.users.findFirst({
      where: { email: data.email },
    });
    return !!userExists;
  }
}
