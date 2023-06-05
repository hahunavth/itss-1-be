import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class AddDeviceDto {
  @IsString()
  name: string;
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(1)
  quantity: number;
  @IsString()
  status: string;
}
