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
import {
  CreateBrandDto,
  UpdateBrandDto,
} from '../../../core/models/dtos/brand.dto';
import { JwtAuthGuard } from '../../../core/guards';
import { RolesGuard } from '../../../core/guards';
import { Public } from '../../../core/decorators';
import { Roles } from '../../../core/decorators';
import { RoleEnum } from '../../../core/enums';

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

  @Roles(RoleEnum.ADMIN)
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getBrandById(@Param('id', ParseIntPipe) id: number) {
    return this.brandService.findOne(id);
  }

  @Roles(RoleEnum.ADMIN)
  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandService.create(payload);
  }

  @Roles(RoleEnum.ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandService.update(id, payload);
  }

  @Roles(RoleEnum.ADMIN)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.brandService.remove(id);
  }
}
