import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMenuDto, UpdateMenuDto } from 'src/lib/dto';
import { Menu } from 'src/lib/entities/menu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {

    constructor(
        @InjectRepository(Menu)
        private readonly repository: Repository<Menu>
    ) { }

    update(menuId: string, updateMenuDto: UpdateMenuDto) {
         
    }
    create(createMenuDto: CreateMenuDto) {
       
    }
    getActiveMenu() {
        
    }
    delete(menuId: string) {
        
    }

}
