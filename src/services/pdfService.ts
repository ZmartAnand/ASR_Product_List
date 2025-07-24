import { Injectable } from '@angular/core';

declare var pdfMake: any;

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private pdfMakeInitialized = false;

  constructor() {}

  // Initialize pdfMake using CDN
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

  // Basic list PDF with pdfMake
  async generateProductListPDF(products: string[]): Promise<void> {
    try {
      await this.initializePdfMakeCDN();

      const pdfContent = products.map((product: string, index: number) => {
        return { text: `${index + 1}. ${product}`, fontSize: 12, margin: [0, 4] };
      });

      const docDefinition = {
        content: [
          { text: 'ASR-Works - Product List', style: 'header' },
          { text: `Generated on: ${new Date().toLocaleDateString()}`, style: 'subheader' },
          { text: '\n' },
          ...pdfContent
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            alignment: 'center' as const,
            margin: [0, 0, 0, 10]
          },
          subheader: {
            fontSize: 12,
            alignment: 'center' as const,
            margin: [0, 0, 0, 15]
          }
        },
        pageMargins: [40, 60, 40, 60]
      };

      const pdfMakeLib = (window as any).pdfMake;
      if (pdfMakeLib) {
        pdfMakeLib.createPdf(docDefinition).download('ASR-Works-Products.pdf');
      } else {
        throw new Error('pdfMake not initialized');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  }

  // jsPDF version with Product Name and Quantity (No Size)
  async generateProductListPDFWithJsPDF(products: any[], filename: string): Promise<void> {
    try {
      const { jsPDF }: any = await import('jspdf');

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
}
