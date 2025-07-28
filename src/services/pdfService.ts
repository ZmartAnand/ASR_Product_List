import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FileOpenerService } from './file-opener.service';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Platform } from '@angular/cdk/platform';

declare var pdfMake: any;

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private pdfMakeInitialized = false;

  constructor(
    private fileOpenerService: FileOpenerService,
    private file: File,
    private platform: Platform
  ) {}

  // Load pdfMake from CDN
  private async initializePdfMakeCDN(): Promise<void> {
    if (this.pdfMakeInitialized) return;

    return new Promise((resolve, reject) => {
      const script1 = document.createElement('script');
      script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js';
      script1.onload = () => {
        const script2 = document.createElement('script');
        script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js';
        script2.onload = () => {
          this.pdfMakeInitialized = true;
          resolve();
        };
        script2.onerror = reject;
        document.head.appendChild(script2);
      };
      script1.onerror = reject;
      document.head.appendChild(script1);
    });
  }

  // Generate simple product list using pdfMake
  async generateProductListPDF(products: string[]): Promise<void> {
    try {
      await this.initializePdfMakeCDN();

      const pdfContent = products.map((product, index) => ({
        text: `${index + 1}. ${product}`, fontSize: 12, margin: [0, 4]
      }));

      const docDefinition = {
        content: [
          { text: 'ASR-Works - Product List', style: 'header' },
          { text: `Generated on: ${new Date().toLocaleDateString()}`, style: 'subheader' },
          { text: '\n' },
          ...pdfContent,
        ],
        styles: {
          header: { fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
          subheader: { fontSize: 12, alignment: 'center', margin: [0, 0, 0, 15] }
        },
        pageMargins: [40, 60, 40, 60]
      };

      const pdfMakeLib = (window as any).pdfMake;
      pdfMakeLib.createPdf(docDefinition).download('ASR-Works-Products.pdf');

    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  }

  // Generate structured product list using jsPDF
  async generateProductListPDFWithJsPDF(products: any[], filename: string): Promise<void> {
    try {
      const doc = new jsPDF();

      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('ASR-Works - Product List', 105, 20, { align: 'center' });

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);

      doc.setFontSize(14);
      let yPosition = 50;

      for (const [index, p] of products.entries()) {
        const text = `${index + 1}. ${p.name} - Qty: ${p.quantity}`;
        const splitText = doc.splitTextToSize(text, 170);
        doc.text(splitText, 20, yPosition);
        yPosition += splitText.length * 7;

        if (yPosition > 280) {
          doc.addPage();
          yPosition = 20;
        }
      }

      doc.save(`${filename}.pdf`);
    } catch (error) {
      console.error('Error generating PDF with jsPDF:', error);
      throw error;
    }
  }

  // Main export with autoTable and mobile preview support
  exportToPDF(products: any[], name: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const pdf = new jsPDF();

      pdf.setFontSize(14);
      pdf.text('ASR Electrical & Plumbing', 14, 15);
      pdf.setFontSize(12);

      const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      pdf.text(`Customer Name: ${formattedName}`, 14, 23);
      pdf.text('Contact Detail:', 150, 15);
      pdf.text('Sivakumar', 150, 21);
      pdf.text('+91 8144443313', 150, 27);
      pdf.text('+91 9788753313', 150, 33);

      autoTable(pdf, {
        startY: 40,
        head: [['S.No', 'Product Name', 'Product Quantity']],
        body: products.map((prod, i) => [
          i + 1,
          prod.size ? `${this.capitalize(prod.productName)} ${prod.size}` : this.capitalize(prod.productName),
          prod.quantity || 1,
        ]),
        theme: 'grid',
      });

      const fileName = `ASR-Products-${name}.pdf`;

      if (!this.platform.ANDROID && !this.platform.IOS) {
        // For Web
        pdf.save(fileName);
        resolve();
      } else {
        // For Mobile
        const blob = pdf.output('blob');
        try {
          await this.fileOpenerService.previewBlob(blob, fileName, 'application/pdf');
          resolve();
        } catch (err) {
          reject(err);
        }
      }
    });
  }

  private capitalize(text: string): string {
    return text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : '';
  }
}
