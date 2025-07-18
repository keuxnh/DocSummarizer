import { PDFExtract } from 'pdf.js-extract';
import { Buffer } from 'buffer';

export async function processFile(file: Express.Multer.File): Promise<{ text: string; title: string }> {
  const { buffer, originalname, mimetype } = file;
  
  try {
    if (mimetype === 'application/pdf' || originalname.endsWith('.pdf')) {
      return await processPDF(buffer, originalname);
    } else if (originalname.endsWith('.hwp')) {
      return await processHWP(buffer, originalname);
    } else {
      throw new Error('Unsupported file type');
    }
  } catch (error) {
    console.error('Error processing file:', error);
    throw new Error('파일 처리 중 오류가 발생했습니다.');
  }
}

async function processPDF(buffer: Buffer, filename: string): Promise<{ text: string; title: string }> {
  const pdfExtract = new PDFExtract();
  
  return new Promise((resolve, reject) => {
    pdfExtract.extractBuffer(buffer, {}, (err, data) => {
      if (err) {
        reject(new Error('PDF 파일을 읽을 수 없습니다.'));
        return;
      }
      
      if (!data || !data.pages || data.pages.length === 0) {
        reject(new Error('PDF 파일에 텍스트가 없습니다.'));
        return;
      }
      
      const text = data.pages
        .map(page => page.content.map(item => item.str).join(' '))
        .join('\n\n');
      
      if (!text.trim()) {
        reject(new Error('PDF 파일에서 텍스트를 추출할 수 없습니다.'));
        return;
      }
      
      // Extract title from first few lines or use filename
      const title = extractTitle(text) || filename.replace('.pdf', '');
      
      resolve({ text, title });
    });
  });
}

async function processHWP(buffer: Buffer, filename: string): Promise<{ text: string; title: string }> {
  // HWP files are proprietary format, this is a basic implementation
  // In a real application, you would need a proper HWP parser library
  try {
    const text = buffer.toString('utf-8');
    const title = extractTitle(text) || filename.replace('.hwp', '');
    
    if (!text.trim()) {
      throw new Error('HWP 파일에서 텍스트를 추출할 수 없습니다.');
    }
    
    return { text, title };
  } catch (error) {
    throw new Error('HWP 파일 처리가 지원되지 않습니다. PDF 파일을 사용해주세요.');
  }
}

function extractTitle(text: string): string | null {
  const lines = text.split('\n').filter(line => line.trim());
  if (lines.length === 0) return null;
  
  // Try to find a title-like line (first non-empty line with reasonable length)
  for (const line of lines.slice(0, 5)) {
    const trimmed = line.trim();
    if (trimmed.length > 5 && trimmed.length < 100) {
      return trimmed;
    }
  }
  
  return null;
}
