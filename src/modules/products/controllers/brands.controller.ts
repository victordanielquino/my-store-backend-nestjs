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
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dtos';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Public } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/Models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('brands') // SWAGGER: AGRUPAR APIS POR TITULO
@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Lista de Brrands!!' }) // SWAGGER: Documentacion por end-point
  @HttpCode(HttpStatus.ACCEPTED)
  getBrandsAll(@Query('limit') limit = 0, @Query('offset') offset = 0) {
    return this.brandService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getBrandById(@Param('id', ParseIntPipe) id: number) {
    return this.brandService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandService.create(payload);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandService.update(id, payload);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.brandService.remove(id);
  }
}
