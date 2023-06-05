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
  additionalIntermediateData?: any[],
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

  const rc2 = [];
  if (additionalIntermediateData && additionalIntermediateData.length > 0) {
    if (additionalIntermediateData.length !== targetValues.length) {
      throw new BadRequestException(
        'additionalIntermediateData length must be equal to targetValues length',
      );
    }
    for (let i = 0; i < rc.length; i++) {
      rc2.push({
        [targetCreateIntermediateTableKey]: rc[i][targetCreateTargetTableKey],
        ...additionalIntermediateData[i],
      });
    }
  } else {
    for (let i = 0; i < rc.length; i++) {
      rc2.push({
        [targetCreateIntermediateTableKey]: rc[i][targetCreateTargetTableKey],
      });
    }
  }

  const additional = {
    [relationName]: {
      createMany: {
        data: rc2,
        // rc.map((r) => ({
        //   [targetCreateIntermediateTableKey]: r[targetCreateTargetTableKey],
        // })),
      },
    },
  };

  return additional;
}
