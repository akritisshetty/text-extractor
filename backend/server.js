const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Configure file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
});

// OCR endpoint
app.post('/api/extract-text', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: 'No image file uploaded' 
      });
    }

    const imagePath = req.file.path;
    console.log('Processing image:', req.file.originalname);

    // Perform OCR
    const { data: { text } } = await Tesseract.recognize(
      imagePath,
      'eng',
      {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            console.log(`Progress: ${Math.round(m.progress * 100)}%`);
          }
        }
      }
    );

    // Delete uploaded file after processing
    fs.unlinkSync(imagePath);

    console.log('Text extraction completed');

    res.json({ 
      success: true,
      text: text,
      filename: req.file.originalname
    });

  } catch (error) {
    console.error('OCR Error:', error);
    
    // Clean up file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ 
      success: false,
      error: 'Failed to extract text from image' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
});