import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * @see https://docs.nestjs.com/recipes/prisma#set-up-prisma
 */
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
