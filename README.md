# klyppr

A web-based tool for detecting and trimming silent parts in videos using FFmpeg.js.

## Features

- 🎥 Video upload and preview
- 🔍 Silence detection with adjustable threshold
- ✂️ Automatic silence trimming
- 📊 Visual timeline of silent segments
- 🌐 Multi-language support (English/Turkish)
- 🎨 Modern dark theme UI
- 📱 Responsive design

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- FFmpeg.js
- WebAssembly

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Click "Select Video" to upload a video file
2. Adjust audio threshold and minimum silence duration if needed
3. Click "Detect Silent Parts" to analyze the video
4. Review detected silent segments in the timeline
5. Click "Trim Silent Parts" to process the video
6. Download the processed video without silent parts

## Developer

Muzaffer Kadir YILMAZ

## License

MIT
