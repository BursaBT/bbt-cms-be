import { Injectable } from '@nestjs/common';
import { CreateMenuDto, UpdateMenuDto } from 'src/lib/dto';

@Injectable()
export class MenuService {
    
    update(menuId: string, updateMenuDto: UpdateMenuDto) {
         
    }
    create(createMenuDto: CreateMenuDto) {
       
    }
    getActiveMenu() {
        
    }
    delete(menuId: string) {
        
    }

}
