import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query
} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";

import {BrandsService} from "../services/brands.service";
import {CreateBrandDto, UpdateBrandDto} from "../dtos/brands.dtos";

@ApiTags('brands') // SWAGGER: AGRUPAR APIS POR TITULO
@Controller('brands')
export class BrandsController {

    constructor(private brandService: BrandsService) {
    }

    @Get()
    @ApiOperation({summary: 'Lista de Brrands!!'})  // SWAGGER: Documentacion por end-point
    @HttpCode(HttpStatus.ACCEPTED)
    getUsersAll(@Query('limit') limit = 0, @Query('offset') offset = 0) {
        return this.brandService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.brandService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateBrandDto) {
        return this.brandService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateBrandDto,
    ) {
        return this.brandService.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.brandService.remove(id);
    }}
