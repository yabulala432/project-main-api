export interface ZemaTypes {
  amharicImage: Express.Multer.File;
  geezImage: Express.Multer.File;

  geezAudio?: Express.Multer.File;
  ezlAudio?: Express.Multer.File;

  zema: Express.Multer.File;

  title: string;
  description: string;
}
