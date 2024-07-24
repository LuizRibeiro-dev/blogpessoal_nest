import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Temas } from "../entities/tema.entity";

@Injectable()
export class TemaService {
    constructor(
        @InjectRepository(Temas)
        private temaRepository: Repository<Temas>
    ) { }

    async findAll(): Promise<Temas[]> {
        return await this.temaRepository.find({
            relations: {
                postagem: true
            }
        });
    }

    async findById(id: number): Promise<Temas> {

        let tema = await this.temaRepository.findOne({
            where: {
                id
            },
            relations: {
                postagem: true
            }
        });

        if (!tema)
            throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);

        return tema;
    }

    async findByTitulo(descricao: string): Promise<Temas[]> {
        return await this.temaRepository.find({
            where:{
                descricao: ILike(`%${descricao}%`)
            },
            relations: {
                postagem: true
            }
        })
    }

    async create(tema: Temas): Promise<Temas> {
        return await this.temaRepository.save(tema);
    }

    async update(tema: Temas): Promise<Temas> {
        
        let buscaTema = await this.findById(tema.id);

        if (!buscaTema || !tema.id)
            throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);
        
        return await this.temaRepository.save(tema);
    }

    async delete(id: number): Promise<DeleteResult> {
        
        let buscaTema = await this.findById(id);

        if (!buscaTema)
            throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);

        return await this.temaRepository.delete(id);

    }

}