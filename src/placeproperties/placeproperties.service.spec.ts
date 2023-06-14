import { Test, TestingModule } from '@nestjs/testing';
import { PlacePropertiesService } from './placeproperties.service';

describe('PlacePropertiesService', () => {
  let service: PlacePropertiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlacePropertiesService],
    }).compile();

    service = module.get<PlacePropertiesService>(PlacePropertiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
