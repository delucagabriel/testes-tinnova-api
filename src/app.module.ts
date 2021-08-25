import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { VehiclesModule } from './vehicles/vehicles.module';
import { BrandsModule } from './brands/brands.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './vehicles/entities/vehicle.entity';
import { Brand } from 'src/brands/entities/brand.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        // @ts-ignore
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: +process.env.PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Vehicle, Brand],
        synchronize: true,
      })
    }),
    VehiclesModule,
    BrandsModule
  ]
  ,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
