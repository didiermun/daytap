import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateReportDto } from './dto/create-report.dto';
import {ReportService} from './report.service'

@Controller('reports')
@ApiTags('reports')
export class ReportController {
    constructor(private readonly reportService: ReportService){}

@Get()
  async findAll() {
    return this.reportService.findAll();
  }

  @Get('report/:id')
  async findOne(@Param('id') id: string) {
    return this.reportService.findOne(id);
  }

  @Delete('report/:id')
  async remove(@Param('id') id: string) {
    return this.reportService.remove(id);
  }

  @Post('new')
  async create(@Body() dto: CreateReportDto) {
    return await this.reportService.create(dto);
  }
  
}
