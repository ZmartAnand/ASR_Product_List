// src/services/pdf.service.ts
import { Injectable } from '@angular/core';

// Type declaration for pdfMake
declare var pdfMake: any;

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private pdfMakeInitialized = false;

  constructor() { }

  // Initialize pdfMake with fonts
  private async initializePdfMake(): Promise<void> {
    if (this.pdfMakeInitialized) return;

    try {
      // Method 1: Using dynamic imports
      const [pdfMakeModule, pdfFontsModule] = await Promise.all([
        import('pdfmake/build/pdfmake'),
        import('pdfmake/build/vfs_fonts')
      ]);

      const pdfMakeLib = (pdfMakeModule as any).default || pdfMakeModule;
      const fonts = (pdfFontsModule as any).vfs || (pdfFontsModule as any).default?.vfs;

      if (fonts) {
        pdfMakeLib.vfs = fonts;
      }

      // Make it globally available
      (window as any).pdfMake = pdfMakeLib;
      this.pdfMakeInitialized = true;
    } catch (error) {
      console.error('Failed to initialize pdfMake:', error);
      throw error;
    }
  }

  // Method 2: Alternative initialization using CDN (more reliable)
  private async initializePdfMakeCDN(): Promise<void> {
    if (this.pdfMakeInitialized) return;

    return new Promise((resolve, reject) => {
      // Load pdfMake from CDN
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

  async generateProductListPDF(products: string[]): Promise<void> {
    try {
      // Use CDN method for better reliability
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
            margin: [0, 0, 0, 10] as [number, number, number, number]
          },
          subheader: {
            fontSize: 12,
            alignment: 'center' as const,
            margin: [0, 0, 0, 15] as [number, number, number, number]
          }
        },
        pageMargins: [40, 60, 40, 60] as [number, number, number, number]
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

  // jsPDF method (recommended alternative)
  async generateProductListPDFWithJsPDF(products: any, name: any) {
    try {
      // Load jsPDF dynamically
      const { jsPDF }: any = await import('jspdf');

      const doc = new jsPDF();

      doc.setFontSize(20);
      doc.setFont("helvetica", 'bold');
      doc.text('ASR-Works - Product List', 105, 20, { align: 'center' });

      doc.setFontSize(12);
      doc.setFont("helvetica", 'normal');
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);

      doc.setFontSize(14);
      let yPosition = 50;
      for (const [index, p] of products.entries()) {
        const text = `${index + 1}. ${p.name} -  ${p.quantity}`;

        const splitText = doc.splitTextToSize(text, 170);
        doc.text(splitText, 20, yPosition);
        yPosition += splitText.length * 7;

        if (yPosition > 280) {
          doc.addPage();
          yPosition = 20;
        }
      }

      doc.save(name);

    } catch (error) {
      console.error('Error generating PDF with jsPDF:', error);
      throw error;
    }
  }
}