import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Permission } from './permission.entity';
import { CreatePermissionDto } from './dto/create-permission-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('permission')
@UseGuards(AuthGuard('jwt'))
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Get()
  getAllPermission(): Promise<Permission[]> {
    return this.permissionService.getAllCategory();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProduct(
    @Body() createCategoryDto: CreatePermissionDto,
  ): Promise<Permission> {
    return this.permissionService.createPermission(createCategoryDto);
  }
}
