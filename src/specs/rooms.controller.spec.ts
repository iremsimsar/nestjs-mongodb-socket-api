import { Test } from '@nestjs/testing';
import { RoomController } from '../controllers/room/room.controller';
import { RoomService } from '../services/room.service';

describe('RoomController', () => {
  let roomController: RoomController;
  let catsService: RoomService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [RoomController],
      providers: [RoomService],
    }).compile();

    catsService = moduleRef.get<RoomService>(RoomService);
    roomController = moduleRef.get<RoomController>(RoomController);
  });

  describe('findAll', async () => {
    it('should return an array of cats', async () => {
      const result = {
        items: [{
          _id: '1',
          name: 'test',
          owner: '1',
          messages: [],
          connected_users: [],
        }],
        total: 1,
        page: 1,
        page_size: 1,
      }

      jest.spyOn(catsService, 'findAll').mockImplementation(() => result);

      expect(await roomController.get()).toBe(result);
    });
  });
});
