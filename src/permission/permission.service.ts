import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { PermissionRepository } from './permission.repository';
import { CreatePermissionDto } from './dto/create-permission-dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionRepository)
    private PermissionRepository: PermissionRepository,
  ) {}

  async getAllCategory(): Promise<Permission[]> {
    return this.PermissionRepository.find();
  }

  async createPermission(
    createPermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    const { name } = createPermissionDto;

    const permission = new Permission();

    permission.name = name;

    return permission.save();
  }
}
