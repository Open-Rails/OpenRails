import fs from 'fs'

export const createFolder = (folderPath: string) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
};

export const deleteFolderRecursive = (filePath: string) => {
  fs.rmdirSync(filePath, { recursive: true });
};

interface IDownloadStreamFile {
  path: string; 
  stream: any, 
  callback: () => void;
}

export const downloadStreamFile = async (params: IDownloadStreamFile) => {
  const { path, stream, callback } = params; 

  const destination = fs.createWriteStream(path);
  await stream.data
    .pipe(destination)
    .on('finish', () => callback());
};

export const deleteFile = (path: string) => {
  fs.unlinkSync(path);
};