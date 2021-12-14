import { Injectable,HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateReportDto } from './dto/create-report.dto';


@Injectable()
export class ReportService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return await this.prisma.report.findMany();
    }

    async findOne(id: string) {
        const report = await this.prisma.report.findFirst({ where: { id: id } });
        if (!report) {
          throw new HttpException(
            'User that you are requesting is not found',
            HttpStatus.NOT_FOUND,
          );
        }
        return report;
    }

    async remove(id: string) {
        return await this.prisma.report.delete({
          where: {
            id,
          },
        });
    }

    async create(data: CreateReportDto) {
        let d = new Date();
        let date: string = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();

        return await this.prisma.report.create({
          data: { location: data.location, amount: data.amount.toString(), date: date,reporterId: 'string'},
        });
      }
}
