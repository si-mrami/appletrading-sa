const PDFDocument = require('pdfkit');
const fs = require('fs');


function generatePDF(orderDetails, productDetails, total, monthlyInstallment, Peroid) {
    return new Promise((resolve) => {
      const buffers = [];
      const doc = new PDFDocument({ autoFirstPage: false });
      const customFontRegular = fs.readFileSync('./Fonts/Amiri-Regular.ttf');
      const customFontBold = fs.readFileSync('./Fonts/Amiri-Bold.ttf');
      doc.registerFont('Amiri-Regular', customFontRegular);
      doc.registerFont('Amiri-Bold', customFontBold);
  
      doc.addPage();
  
      doc.font('Amiri-Regular').fontSize(20).text('    الشرائية   فاتورتك'   , { align: 'center' }).moveDown(1);
  
      doc.fontSize(16).text('    : الطلب تفاصيل    ', { underline: true, align: 'right' }).moveDown(0.5);
      doc.text(` ${orderDetails.fullName}   : العميل اسم  `, { align: 'right' });
      doc.text(`   ${orderDetails.address} العنوان: `, { align: 'right' });
      doc.text(` ${orderDetails.phone} :   الهاتف رقم  `, { align: 'right' });
      doc.text(`   ${orderDetails.discountCode} : الخصم كود`, { align: 'right' }).moveDown(1);
      doc.fontSize(16).text('  : المنتج تفاصيل', { underline: true, align: 'right' }).moveDown(0.5);
      productDetails.forEach((product) => {
        doc.text(`  ${product.name}   : المنتج  اسم `, { align: 'right' });
        doc.text(`    ${product.quantity}: الكمية `, { align: 'right' });
        doc.text(`    ${product.price}: السعر`, { align: 'right' }).moveDown(0.5);
      });
      doc.fontSize(16).text('الإجمالي:', { underline: true, align: 'right' }).moveDown(0.5);
      doc.text(`  ${total}:   ر.س الإجمالي`, { align: 'right' }).moveDown(1);
      doc.fontSize(16).text('   :  الإقساط تفاصيل  ', { underline: true, align: 'right' }).moveDown(0.5);
      doc.text(`   ${monthlyInstallment}:     ر.س الشهري القسط  `, { align: 'right' });
      doc.text(`      ${Peroid}:  شهر  الفترة `, { align: 'right' }).moveDown(1);
      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.end();
    });
  }
 module.exports = generatePDF;
