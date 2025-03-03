import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Artwork } from 'src/schemas/artwork.schema';
import { ArtworkService } from './artwork.service';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';

@Controller('artworks')
export class ArtworkController {
  constructor(private readonly artworkService: ArtworkService) {}

  @Get()
  async findAll(
    @Query('price') price?: 'asc' | 'desc',
    @Query('artist') artist?: string,
    @Query('type') type?: string,
  ): Promise<Artwork[]> {
    return this.artworkService.findAll({ price, artist, type });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Artwork> {
    return this.artworkService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createArtworkDto: CreateArtworkDto): Promise<Artwork> {
    return this.artworkService.create(createArtworkDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: string,
    @Body() updateArtworkDto: UpdateArtworkDto,
  ): Promise<Artwork> {
    return this.artworkService.update(id, updateArtworkDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Artwork> {
    return this.artworkService.remove(id);
  }
}
