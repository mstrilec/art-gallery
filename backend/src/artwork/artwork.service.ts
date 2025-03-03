import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artwork, ArtworkDocument } from 'src/schemas/artwork.schema';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';

@Injectable()
export class ArtworkService {
  constructor(
    @InjectModel(Artwork.name)
    private readonly artworkModel: Model<ArtworkDocument>,
  ) {
    this.initializeData();
  }

  private async initializeData() {
    const count = await this.artworkModel.countDocuments().exec();
    if (count === 0) {
      const initialArtworks = [
        {
          title: 'Abstract Vibrance',
          artist: 'Alex Johnson',
          type: 'painting',
          price: 5500,
          availability: true,
        },
        {
          title: 'Tranquil Lake',
          artist: 'Maria Garcia',
          type: 'photography',
          price: 3500,
          availability: false,
        },
        {
          title: 'Geometric Harmony',
          artist: 'Lion Smith',
          type: 'sculpture',
          price: 11000,
          availability: true,
        },
        {
          title: 'The Golden Hour',
          artist: 'Emma Brown',
          type: 'photography',
          price: 2500,
          availability: true,
        },
      ];

      await this.artworkModel.insertMany(initialArtworks);
    }
  }

  async findAll(query: any): Promise<Artwork[]> {
    const { price, artist, type } = query;
    const filter: any = {};

    if (artist) {
      filter.artist = { $regex: artist, $options: 'i' };
    }

    if (type) {
      filter.type = type;
    }

    let artworksQuery = this.artworkModel.find(filter);

    if (price === 'asc') {
      artworksQuery = artworksQuery.sort({ price: 1 });
    } else if (price === 'desc') {
      artworksQuery = artworksQuery.sort({ price: -1 });
    }

    return artworksQuery.exec();
  }

  async findOne(id: string): Promise<Artwork> {
    const artwork = await this.artworkModel.findById(id).exec();
    if (!artwork) {
      throw new NotFoundException(`Artwork with ID "${id}" not found`);
    }
    return artwork;
  }

  async create(createArtworkDto: CreateArtworkDto): Promise<Artwork> {
    const newArtwork = new this.artworkModel(createArtworkDto);
    return newArtwork.save();
  }

  async update(
    id: string,
    updateArtworkDto: UpdateArtworkDto,
  ): Promise<Artwork> {
    const existingArtwork = await this.artworkModel
      .findByIdAndUpdate(id, updateArtworkDto, { new: true })
      .exec();

    if (!existingArtwork) {
      throw new NotFoundException(`Artwork with ID "${id}" not found`);
    }

    return existingArtwork;
  }

  async remove(id: string): Promise<Artwork> {
    const deletedArtwork = await this.artworkModel.findByIdAndDelete(id).exec();

    if (!deletedArtwork) {
      throw new NotFoundException(`Artwork with ID "${id}" not found`);
    }

    return deletedArtwork;
  }
}
