import { Module, Shared } from '@nestjs/common';

import { CategoryController } from './category.controller';

import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';

@Shared()
@Module({
    controllers: [ CategoryController ],
    components: [ CategoryService, CategoryRepository ]
})
export class CategoryModule {}