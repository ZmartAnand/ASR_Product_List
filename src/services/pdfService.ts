import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FileOpenerService } from './file-opener.service';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Platform } from '@ionic/angular';

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
  ) { }

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
exportToPDF(products: any[], name: string, customerDetails?: any): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const pdf: any = new jsPDF('p', 'mm', 'a4'); // Explicitly set A4 format
    const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm
    const margin = 20;
    
    // Rich, professional color palette
    const primaryColor: any = [28, 49, 94];          // Deep navy blue
    const accentColor: any = [67, 97, 238];          // Modern blue accent
    const lightBlue : any= [239, 246, 255];          // Very light blue
    const darkGray: any = [55, 65, 81];              // Professional dark gray
    const lightGray: any = [249, 250, 251];          // Subtle light gray
    const borderGray: any = [229, 231, 235];         // Soft border color

    const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    // ===== 1. ELEGANT HEADER SECTION =====
    // Main header background with professional gradient effect
    pdf.setFillColor(...primaryColor);
    pdf.rect(0, 0, pageWidth, 45, 'F');

    // Company name with elegant typography
    pdf.setFontSize(20);
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.text('ASR ELECTRICAL & PLUMBING', margin + 0, 18);
    
    // Subtitle
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Professional Electrical & Plumbing Works', margin + 0, 26);

    // Contact information in professional layout
    pdf.setFontSize(15);
    pdf.setTextColor(255, 255, 255);
    pdf.text(' Sivakumar', pageWidth - margin, 15, { align: 'right' });
    pdf.setFontSize(9);
    pdf.text('+91 8144443313', pageWidth - margin, 21, { align: 'right' });
    pdf.text('+91 9788753313', pageWidth - margin, 27, { align: 'right' });

    // ===== 2. REPORT TITLE SECTION =====
    const reportY = 0;
   
    
    // ===== 3. CUSTOMER INFORMATION SECTION =====
    const customerY = reportY + 35;
    
    pdf.setFontSize(14);
    pdf.setTextColor(...primaryColor);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Customer Name: ${formattedName}`, margin + 6 , customerY + 22);
    
    if (customerDetails?.address) {
      pdf.setFontSize(10);
      pdf.setTextColor(...darkGray);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Address: ${customerDetails.address}`, margin + 10, customerY + 27);
    }

    // ===== 4. PRODUCTS TABLE WITH RICH STYLING =====
    const tableStartY = customerY + 30;
    
    autoTable(pdf, {
      startY: tableStartY,
      head: [['S.No', 'Product Name', 'Qty']],
      body: products.map((prod, i) => [
        (i + 1).toString(),
        prod.size ? `${this.capitalize(prod.productName)} ${prod.size}` : this.capitalize(prod.productName),
        (prod.quantity || 1).toString()
      ]),
      theme: 'plain',
      
      // Header styling
      headStyles: {
        fillColor: primaryColor,
        textColor: '#ffffff',
        fontStyle: 'bold',
        fontSize: 12,
        cellPadding: { top: 3, bottom: 3, left: 5, right: 5 },
        halign: 'center',
        valign: 'middle'
      },
      
      // Body styling
      bodyStyles: {
        fontSize: 11,
        cellPadding: { top: 4, bottom: 4, left: 7, right: 7 },
        textColor: darkGray,
        lineColor: borderGray,
        lineWidth: 0.5,
        valign: 'middle'
      },
      
      // Alternating row colors for better readability
      alternateRowStyles: {
        fillColor: lightGray
      },
      
      // Column-specific styling
      columnStyles: {
        0: { 
          cellWidth: 20, 
          halign: 'center',
          fontStyle: 'bold',
          textColor: primaryColor
        },
        1: { 
          cellWidth: 80, 
          halign: 'left',
          fontStyle: 'bold',
          cellPadding: { left: 8 }
        },
        2: { 
          cellWidth: 20, 
          halign: 'center',
          fontStyle: 'bold'
        }
      },
      
      // Table styling
      styles: {
        overflow: 'linebreak',
        cellWidth: 'wrap',
        minCellHeight: 12
      },
      
      // Margins for perfect A4 fit
      margin: { 
        left: 45, 
        right: margin,
        top: 5,
        bottom: 5
      },
    });

    // ===== 5. SUMMARY SECTION =====
    const summaryY = pdf.lastAutoTable.finalY + 20;
   

    // ===== 6. PROFESSIONAL FOOTER =====
    const footerY = Math.max(summaryY + 40, pageHeight - 50);
    
    // Decorative line
    pdf.setDrawColor(...accentColor);
    pdf.setLineWidth(1.5);
    pdf.line(margin, footerY, pageWidth - margin, footerY);
    
    // Thank you message
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...primaryColor);
    pdf.text('Thank you for choosing ASR Electrical & Plumbing!', pageWidth / 2, footerY + 10, { align: 'center' });
    
    // Contact footer
    pdf.setFontSize(9);
    pdf.setTextColor(120, 120, 120);
    pdf.text('ASR Electrical & Plumbing | +91 8144443313 | +91 9788753313', pageWidth / 2, footerY + 18, { align: 'center' });
    

    // Professional filename
    const fileName = `ASR_ProductReport_${formattedName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;

    // Platform-specific handling
    if (this.platform.is('capacitor') || this.platform.is('cordova')) {
      const blob = pdf.output('blob');
      try {
        await this.fileOpenerService.previewBlob(blob, fileName, 'application/pdf');
        resolve();
      } catch (err) {
        reject(err);
      }
    } else {
      pdf.save(fileName);
      resolve();
    }
  });
}

  private capitalize(text: string): string {
    return text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : '';
  }
}
