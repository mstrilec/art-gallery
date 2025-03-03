import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export const ArtworkTypes = [
  'painting',
  'sculpture',
  'photography',
  'digital',
  'installation',
] as const;
type ArtworkType = (typeof ArtworkTypes)[number];

export class CreateArtworkDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(99, { message: 'Назва твору не може перевищувати 99 символів' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: "Ім'я митця не може перевищувати 50 символів" })
  artist: string;

  @IsEnum(ArtworkTypes, {
    message:
      'Тип твору має бути одним з: painting, sculpture, photography, digital, installation',
  })
  @IsNotEmpty()
  type: ArtworkType;

  @IsNumber()
  @Min(0.01, { message: 'Ціна має бути більше 0' })
  price: number;

  @IsBoolean()
  @IsOptional()
  availability?: boolean;
}
