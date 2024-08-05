import { IsNotEmpty } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Postagem } from "../../postagem/entities/postagem.entity"
import { ApiProperty } from "@nestjs/swagger"

@Entity({name: "tb_tema"})
export class Temas {

    @PrimaryGeneratedColumn()    
    @ApiProperty()
    id: number

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    @ApiProperty()
    descricao: string
    
    @ApiProperty()
    @OneToMany(() => Postagem, (postagem) => postagem.tema)
    postagem: Postagem[]

}