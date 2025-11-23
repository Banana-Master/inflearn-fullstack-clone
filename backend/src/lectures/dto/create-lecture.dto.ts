import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLectureDto {
  @ApiProperty({ description: '개별 강의 제목', required: true })
  @IsNotEmpty()
  @IsString()
  title: string;
}
