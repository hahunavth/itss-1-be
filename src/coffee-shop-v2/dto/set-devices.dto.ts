import { ApiProperty } from '@nestjs/swagger';
import { AddDeviceDto } from './add-device.dto';
import { IsDefined } from 'class-validator';

export class SetDevicesDto {
  @IsDefined()
  @ApiProperty({
    type: AddDeviceDto,
    isArray: true,
  })
  devices: AddDeviceDto[];
}
