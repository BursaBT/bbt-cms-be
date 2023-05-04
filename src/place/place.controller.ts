import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('place')
@ApiTags('PlaceModules')
export class PlaceController {
    @Post()
    create(){
        console.log('Created')
    }
}
