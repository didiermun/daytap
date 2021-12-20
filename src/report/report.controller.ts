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

  @Get('/reporter/:reporterId')
  async userReport(@Param('reporterId') reporterId: string) {
    return await this.reportService.findUserReports(reporterId);
  }

  @Get('/date-range/:date1/:date2')
  async dateRangeReports(@Param('date1') date1: string, @Param('date2') date2: string) {
    return []
  }

  @Get('/date/:date')
  async dateReports(@Param('date') date: string) {
    return await this.reportService.findDateReports(date);
  }

  @Post('new')
  async create(@Body() dto: CreateReportDto) {
    return await this.reportService.create(dto);
  }

  @Delete('report/:id')
  async remove(@Param('id') id: string) {
    return this.reportService.remove(id);
  }  
  
}
