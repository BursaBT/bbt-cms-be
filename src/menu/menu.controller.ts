 
import { CreateMenuDto, UpdateMenuDto } from 'src/lib/dto';
import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { MenuService } from './menu.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Menu Services')
@Controller('menu')
export class MenuController {
    constructor(private menuService: MenuService) {
    }

    @Get()
    getAllActiveMenu() {
        return this.menuService.getActiveMenu();
    }

    @Post()
    create(@Body() createMenuDto: CreateMenuDto) {
        return this.menuService.create(createMenuDto);
    }

    @Put('/:menuId')
    update(
        @Param('menuId') menuId: string,
        @Body() updateMenuDto: UpdateMenuDto): void {
        return this.menuService.update(menuId, updateMenuDto);
    }

    @Delete('/:menuId')
    delete(
        @Param('menuId') menuId: string) {
        return this.menuService.delete(menuId);
    }
}
