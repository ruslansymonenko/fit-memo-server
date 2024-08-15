import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CLIENT_URL } from './consts/client';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { WorkoutModule } from './workout/workout.module';
import { TagsModule } from './tags/tags.module';
import { ExerciseModule } from './exercise/exercise.module';
import { SetModule } from './set/set.module';
import { RepeatModule } from './repeat/repeat.module';
import { MeasureModule } from './measure/measure.module';
import { UserDataModule } from './user-data/user-data.module';
import { FileModule } from './file/file.module';
import { WorkoutTypeIconsModule } from './workout-type-icons/workout-type-icons.module';
import { WorkoutTypeModule } from './workout-type/workout-type.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({
      baseURL: CLIENT_URL,
      withCredentials: true,
    }),
    UserModule,
    AuthModule,
    WorkoutModule,
    TagsModule,
    ExerciseModule,
    SetModule,
    RepeatModule,
    MeasureModule,
    UserDataModule,
    FileModule,
    WorkoutTypeIconsModule,
    WorkoutTypeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
