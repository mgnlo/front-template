import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-download-file',
  templateUrl: './download-file.component.html',
  styleUrls: ['./download-file.component.scss']
})
export class DownloadFileComponent implements OnInit {

  fileId: string;
  fileData: Blob;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onDownload(): void {
    this.http.get('http://your-backend-api/download/' + this.fileId, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        this.fileData = response;
        this.downloadFile();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  downloadFile(): void {
    const blob = new Blob([this.fileData], { type: 'application/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'downloaded_file.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
