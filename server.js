import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Enable compression (gzip/brotli)
app.use(compression());

// Image Optimization Endpoint
app.get('/api/image', async (req, res) => {
  const { url, w, h } = req.query;

  if (!url) {
    return res.status(400).send('URL is required');
  }

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');

    let pipeline = sharp(buffer);

    if (w || h) {
      pipeline = pipeline.resize(
        w ? parseInt(w) : null,
        h ? parseInt(h) : null,
        { fit: 'cover' }
      );
    }

    const optimized = await pipeline
      .webp({ quality: 80 })
      .toBuffer();

    res.set({
      'Content-Type': 'image/webp',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Access-Control-Allow-Origin': '*'
    });

    res.send(optimized);
  } catch (error) {
    console.error('Image optimization failed:', error);
    res.status(500).send('Failed to process image');
  }
});

// Test for compression (as requested by user)
console.log('Compression enabled: true');

// Serve static files from the Vite build directory
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1y',
  etag: true,
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// SPA Routing: Forward all other requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
