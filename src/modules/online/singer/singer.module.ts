import { Module, Shared } from '@nestjs/common';

import { SingerController } from './singer.controller';

import { SingerService } from './singer.service';
import { SingerLoader } from './singer.loader';
import { SingerAPI } from './singer.api';
import { SingerRepository } from '../../singer/singer.repository';

@Shared()
@Module({
    controllers: [ SingerController ],
    components: [ SingerService, SingerLoader, SingerAPI, SingerRepository ]
})
export class SingersModule {}