export class FileReq {
  fileDataId: string;

  constructor(data: Partial<FileReq>) {
    Object.assign(this, data);
  }
}

export class FileResp {
  fileDataId: string;
  fileData: Blob;
  fileName: string;
  fileLength: number;

  constructor(data: Partial<FileResp>) {
    Object.assign(this, data);
  }
}

export class FileRespWithBlob {
  fileResp: FileResp;
  blob: Blob;

  constructor(data: Partial<FileRespWithBlob>) {
    Object.assign(this, data);
  }
}
