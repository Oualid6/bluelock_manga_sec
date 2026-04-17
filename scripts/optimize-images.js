import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = './public';

async function optimizeImages() {
  const files = fs.readdirSync(publicDir);
  
  for (const file of files) {
    const filePath = path.join(publicDir, file);
    const ext = path.extname(file).toLowerCase();
    
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const outputName = file.replace(ext, '.webp');
      const outputPath = path.join(publicDir, outputName);
      
      console.log(`Converting ${file} to WebP...`);
      
      await sharp(filePath)
        .webp({ quality: 80 })
        .toFile(outputPath);
        
      console.log(`Saved: ${outputName}`);
    }
  }
}

optimizeImages().catch(console.error);
