import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { Roles } from './enums/roles.enum';

@Injectable()
export class RolesRepository {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  async getRoles(paginationDto: {page: number , limit: number}) {
    const { page, limit } = paginationDto;
    const queryBuilder = this.rolesRepository
      .createQueryBuilder('Roles')
      .select('Roles')
      .skip((page - 1) * limit)
      .take(limit);

    return await queryBuilder.getMany();
  }

  async roleByName(name: Roles): Promise<Role> {
    const role: Role = await this.rolesRepository.findOne({
      where: {
        name,
      },
    });
    if (!role)
      throw new BadRequestException('No existe rol con ese nombre.');
    return role;
  }
}
