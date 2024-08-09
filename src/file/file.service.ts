import { BadRequestException, Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';

export interface IFileService {
  saveFiles(
    files: Express.Multer.File[],
    folder: EnumFoldersNames,
    userId?: number,
  ): Promise<IFileResponse[]>;
  getUploadPath(folder: EnumFoldersNames, userId?: number): string;
  getFileName(originalName: string): string;
}

export interface IFileResponse {
  url: string;
  name: string;
}

export enum EnumFoldersNames {
  AVATARS = 'avatars',
  USER_PHOTOS = 'user-photos',
  WORKOUT_ICONS = 'workout-icons',
}

@Injectable()
export class FileService {
  async saveFiles(
    files: Express.Multer.File[],
    folder: EnumFoldersNames,
    userId?: number,
  ): Promise<IFileResponse[]> {
    console.log(files);

    if (!Object.values(EnumFoldersNames).includes(folder)) {
      throw new BadRequestException(`Invalid folder name: ${folder}`);
    }

    if (folder === EnumFoldersNames.AVATARS && files.length > 1) {
      throw new BadRequestException('Only one file can be uploaded for avatars.');
    }

    const uploadPath = this.getUploadPath(folder, userId);

    await ensureDir(uploadPath);

    const response: IFileResponse[] = await Promise.all(
      files.map(async (file) => {
        const fileName = this.getFileName(file.originalname);
        const filePath = `${uploadPath}/${fileName}`;

        await writeFile(filePath, file.buffer);

        return {
          url: filePath.replace(`${path}/`, ''),
          name: fileName,
        };
      }),
    );

    return response;
  }

  private getUploadPath(folder: EnumFoldersNames, userId?: number): string {
    let folderPath = `${path}/uploads/${folder}`;

    if (folder === EnumFoldersNames.USER_PHOTOS && userId) {
      folderPath = `${folderPath}/user-${userId}`;
    }

    return folderPath;
  }

  private getFileName(originalName: string): string {
    const timestamp = Date.now();
    const uniqueId = uuidv4();
    const extension = originalName.split('.').pop();

    const baseName = slugify(originalName.replace(`.${extension}`, ''), {
      lower: true,
      strict: true,
    });

    return `${baseName}-${timestamp}-${uniqueId}.${extension}`;
  }
}
