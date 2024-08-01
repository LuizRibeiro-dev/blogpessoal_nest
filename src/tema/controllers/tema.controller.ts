import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { Temas } from "../entities/tema.entity";
import { TemaService } from "../services/tema.service";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("/temas")
export class TemaController {
  constructor(private readonly TemaService: TemaService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Temas[]> {
    return this.TemaService.findAll();
  }

  
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Temas> {
    return this.TemaService.findById(id);
  }

  @Get('/descricao/:descricao')
  @HttpCode(HttpStatus.OK)
  findByTitulo(@Param('descricao') Temas: string): Promise<Temas[]> {
    return this.TemaService.findByTitulo(Temas);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() tema: Temas): Promise<Temas> {
    return this.TemaService.create(tema);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() tema: Temas): Promise<Temas> {
    return this.TemaService.update(tema);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.TemaService.delete(id);
  }

}