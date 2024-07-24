import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TemaController } from "./controllers/tema.controller";
import { Temas } from "./entities/tema.entity";
import { TemaService } from "./services/tema.service";

@Module({
    imports: [TypeOrmModule.forFeature([Temas])],
    providers: [TemaService],
    controllers: [TemaController],
    exports: [TypeOrmModule]
})
export class TemaModule {}