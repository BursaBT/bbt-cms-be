import { Test, TestingModule } from '@nestjs/testing';
import { PlacePropertiesController } from './placeproperties.controller';


describe('PlacePropertiesController', () => {
  let controller: PlacePropertiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlacePropertiesController],
    }).compile();

    controller = module.get<PlacePropertiesController>(PlacePropertiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
