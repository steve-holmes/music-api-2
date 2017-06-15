import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';

let port = process.env.PORT || 3000
const app = NestFactory.create(ApplicationModule);
app.listen(port, () => console.log(`Application is listening on port ${port}.`));