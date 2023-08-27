export class FileReq {
  fileDataId: string;

  constructor(data: Partial<FileReq>) {
    Object.assign(this, data);
  }
}

export class FileResp {
  fileDataId: string;
  fileData: string;
}
