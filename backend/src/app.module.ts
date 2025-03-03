import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtworkModule } from './artwork/artwork.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ArtworkModule,
    MongooseModule.forRoot(
      'mongodb+srv://mstriletswork:Hf3Uac7ULedF9N87@cluster0.jnlyl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
