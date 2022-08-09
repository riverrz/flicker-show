import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  public name: string;

  @IsInt()
  public age: number;
}

export class EditProfileDto {
  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsInt()
  public age?: number;
}
