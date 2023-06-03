import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma';

/**
 * Connects a nested n relation with intermediate table
 *
 */
export async function connectPrismaMNCreateOne(
  prismaService: PrismaService,
  relationName: string,
  targetTable: string,
  targetValues: (string | number)[],
  targetFindKey: string,
  targetCreateIntermediateTableKey: string,
  targetCreateTargetTableKey: string,
) {
  const rc = await prismaService[targetTable].findMany({
    where: {
      [targetFindKey]: {
        in: targetValues,
      },
    },
  });

  if (rc.length !== targetValues.length) {
    const newValues = targetValues.filter(
      (v) => !rc.map((r) => r[targetFindKey]).includes(v),
    );

    throw new BadRequestException(
      'Not found ' + targetTable + ': ' + newValues.join(', '),
    );
  }

  const additional = {
    [relationName]: {
      createMany: {
        data: rc.map((r) => ({
          [targetCreateIntermediateTableKey]: r[targetCreateTargetTableKey],
        })),
      },
    },
  };

  return additional;
}
