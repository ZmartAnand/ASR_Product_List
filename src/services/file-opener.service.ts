import { Injectable } from '@angular/core';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class FileOpenerService {
  constructor(
    private file: File,
    private fileOpener: FileOpener,
    private platform: Platform
  ) {}

  async previewBlob(blob: Blob, fileName: string, mimeType: string): Promise<void> {
    await this.platform.ready();

    const isAndroid = this.platform.is('android');
    const folderPath = isAndroid ? this.file.externalDataDirectory : this.file.dataDirectory;
    const filePath = folderPath + fileName;

    try {
      const arrayBuffer = await blob.arrayBuffer();
      await this.file.writeFile(folderPath, fileName, arrayBuffer, { replace: true });
      await this.fileOpener.open(filePath, mimeType);
    } catch (error) {
      console.error('Error opening file:', error);
      throw error;
    }
  }
}