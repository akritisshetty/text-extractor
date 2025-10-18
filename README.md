# OCR Text Extractor - Full Stack

A complete OCR (Optical Character Recognition) application with Node.js backend and HTML frontend.

## Features
- Upload images and extract text
- Node.js + Express backend
- Tesseract.js OCR engine
- Drag and drop support
- Copy extracted text to clipboard
- Real-time server status

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Navigate to the backend folder:
```bash
   cd backend
```

2. Install dependencies:
```bash
   npm install
```

3. Start the server:
```bash
   npm start
```

4. Open `frontend/index.html` in your browser

## API Endpoints

- `POST /api/extract-text` - Upload image and extract text
- `GET /api/health` - Check server status

## Project Structure
```
ocr-fullstack/
├── backend/
│   ├── server.js           # Express server
│   ├── package.json        # Dependencies
│   └── uploads/            # Temporary upload folder
└── frontend/
    └── index.html          # Frontend interface
```

## Usage

1. Make sure the backend server is running (npm start)
2. Open frontend/index.html in your browser
3. Upload an image with text
4. Click "Extract Text"
5. Copy the extracted text

## Technologies Used

- **Backend:** Node.js, Express, Multer, Tesseract.js
- **Frontend:** HTML, JavaScript, Tailwind CSS
- **OCR Engine:** Tesseract.js