'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL, fetchFile } from '@ffmpeg/util';
import { translations } from '@/locales/translations';

const DesktopAppAnnouncement = ({ lang }: { lang: 'tr' | 'en' }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const tr = lang === 'tr';

  return (
    <div className="relative flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 border-b border-hairline bg-surface-raised px-9 py-2 backdrop-blur-md sm:gap-x-3 sm:py-2.5">
      {/* Title */}
      <span className="text-[12px] font-semibold text-ink sm:text-sm">
        🎉 {tr ? 'Klyppr Masaüstü' : 'Klyppr Desktop'}
        <span className="hidden font-medium text-ink-2 sm:inline"> · 15x {tr ? 'Daha Hızlı' : 'Faster'}</span>
      </span>

      {/* Feature badges */}
      <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success ring-1 ring-inset ring-success/25 sm:text-xs">
        <svg viewBox="0 0 16 16" className="h-3 w-3 fill-current" aria-hidden="true"><path d="M13.7 4.3a1 1 0 010 1.4l-6 6a1 1 0 01-1.4 0l-3-3a1 1 0 011.4-1.4L7 9.6l5.3-5.3a1 1 0 011.4 0z" /></svg>
        {tr ? 'Ücretsiz' : 'Free'}
      </span>
      <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent ring-1 ring-inset ring-accent/30 sm:text-xs">
        <svg viewBox="0 0 16 16" className="h-3 w-3 fill-current" aria-hidden="true"><path d="M6.2 3.3a1 1 0 010 1.4L3 8l3.3 3.3a1 1 0 01-1.4 1.4l-4-4a1 1 0 010-1.4l4-4a1 1 0 011.4 0zm3.6 0a1 1 0 011.4 0l4 4a1 1 0 010 1.4l-4 4a1 1 0 01-1.4-1.4L13 8 9.8 4.7a1 1 0 010-1.4z" /></svg>
        {tr ? 'Açık Kaynak' : 'Open Source'}
      </span>
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] font-semibold text-amber-300 ring-1 ring-inset ring-amber-400/25 sm:text-xs">
        <svg viewBox="0 0 20 12" className="h-3 w-3.5 fill-current" aria-hidden="true"><path d="M5 1a5 5 0 100 10c1.6 0 2.7-.9 3.9-2.1l.9-.9-1.5-1.4-.8.9C6.4 8.5 5.9 9 5 9a3 3 0 110-6c.9 0 1.4.5 2.5 1.6l4 4C12.6 9.6 13.7 11 15 11a5 5 0 000-10c-1.3 0-2.4 1.4-3.6 2.6l-.8.8 1.5 1.4.8-.9C14.1 3.5 14.1 3 15 3a3 3 0 110 6c-.9 0-1.4-.5-2.5-1.6l-4-4C7.4 2.4 6.4 1 5 1z" /></svg>
        {tr ? 'Sınırsız' : 'Unlimited'}
      </span>

      {/* Download links */}
      <span className="text-[12px] text-ink-2 sm:text-sm">
        <span className="hidden sm:inline">{tr ? 'İndir: ' : 'Get it: '}</span>
        <a href="/download" className="font-semibold text-accent underline underline-offset-2 hover:text-accent-hover">Mac</a>
        <span className="mx-1 text-ink-3">·</span>
        <a href="/download" className="font-semibold text-accent underline underline-offset-2 hover:text-accent-hover">Windows</a>
      </span>

      {/* GitHub */}
      <a
        href="https://github.com/muzafferkadir/klyppr-desktop"
        className="rounded-full border border-stroke bg-surface px-2.5 py-0.5 text-[11px] font-medium text-ink transition-colors hover:bg-surface-hover sm:text-xs"
      >
        GitHub <span aria-hidden="true">&rarr;</span>
      </a>

      {/* Dismiss */}
      <button
        type="button"
        className="absolute right-2 top-2 p-1 text-ink-3 transition-colors hover:text-ink sm:top-1/2 sm:-translate-y-1/2"
        onClick={() => setIsVisible(false)}
      >
        <span className="sr-only">Dismiss</span>
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </button>
    </div>
  );
};

const INSTALL_CMDS = {
  mac: 'curl -fsSL https://raw.githubusercontent.com/muzafferkadir/klyppr-desktop/main/install.sh | bash',
  win: 'irm https://raw.githubusercontent.com/muzafferkadir/klyppr-desktop/main/install.ps1 | iex',
};

const DesktopInstall = ({ lang }: { lang: 'tr' | 'en' }) => {
  const tr = lang === 'tr';
  const [os, setOs] = useState<'mac' | 'win'>('mac');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.userAgent.includes('Windows')) setOs('win');
  }, []);

  const cmd = INSTALL_CMDS[os];

  return (
    <div className="bg-surface border border-stroke rounded-group p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-ink-3">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
          </svg>
          {tr ? 'Masaüstü Uygulaması · 15x Daha Hızlı' : 'Desktop App · 15x Faster'}
        </h2>
        <div className="flex gap-1 rounded-full bg-field p-0.5">
          {(['mac', 'win'] as const).map((o) => (
            <button
              key={o}
              onClick={() => setOs(o)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                os === o ? 'bg-accent text-white' : 'text-ink-2 hover:text-ink'
              }`}
            >
              {o === 'mac' ? '🍎 macOS' : '🪟 Windows'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto rounded-field border border-stroke bg-field px-3.5 py-3">
        <span className="select-none font-mono text-accent">{os === 'mac' ? '$' : '>'}</span>
        <code className="whitespace-nowrap font-mono text-[13px] text-ink">{cmd}</code>
        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(cmd);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            } catch {}
          }}
          className={`ml-auto flex-shrink-0 rounded-lg px-3.5 py-1.5 text-[13px] font-semibold text-white transition-colors ${
            copied ? 'bg-success' : 'bg-accent hover:bg-accent-hover'
          }`}
        >
          {copied ? (tr ? 'Kopyalandı!' : 'Copied!') : tr ? 'Kopyala' : 'Copy'}
        </button>
      </div>

      <p className="mt-2.5 text-[12.5px] text-ink-3">
        {os === 'mac'
          ? tr
            ? 'Terminal’i aç, komutu yapıştır. Apple Silicon & Intel — Gatekeeper uyarısı çıkmaz.'
            : 'Open Terminal, paste the command. Apple Silicon & Intel — no Gatekeeper prompt.'
          : tr
            ? 'PowerShell’i aç, komutu yapıştır. En son imzalı kurulumu indirir.'
            : 'Open PowerShell, paste the command. Downloads the latest signed installer.'}
        {' · '}
        <a href="https://github.com/muzafferkadir/klyppr-desktop/releases/latest" className="text-accent hover:underline">
          {tr ? 'elle indir' : 'download manually'}
        </a>
      </p>
    </div>
  );
};

export default function Home() {
  const [video, setVideo] = useState<File | null>(null);
  const [silentSegments, setSilentSegments] = useState<{ start: number; end: number }[]>([]);
  const [progress, setProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [threshold, setThreshold] = useState(-45);
  const [minDuration, setMinDuration] = useState(0.6);
  const [padding, setPadding] = useState(0.05);
  const [videoDuration, setVideoDuration] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const silenceLogsRef = useRef<string[]>([]);
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const isDetectingRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLogsOpen, setIsLogsOpen] = useState(false);
  const [isSegmentsOpen, setIsSegmentsOpen] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [lang, setLang] = useState<'tr' | 'en'>('en');
  const t = translations[lang];
  const detectButtonRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [maxFileSize, setMaxFileSize] = useState<number>(0);
  const [processingTimes, setProcessingTimes] = useState<{
    detection: number;
    trimming: number;
  }>({ detection: 0, trimming: 0 });
  const [isFFmpegLoading, setIsFFmpegLoading] = useState(true);
  const [systemMetrics, setSystemMetrics] = useState<{
    cpu: number;
    memory: number;
    estimatedTimeLeft: number;
    originalSize: number;
    processedSize: number;
  }>({
    cpu: 0,
    memory: 0,
    estimatedTimeLeft: 0,
    originalSize: 0,
    processedSize: 0
  });

  const load = async () => {
    if (typeof window === 'undefined') return;
    
    try {
      setIsFFmpegLoading(true);
      if (!ffmpegRef.current) {
        const ffmpeg = new FFmpeg();
        ffmpegRef.current = ffmpeg;

        // Log handler
        ffmpeg.on('log', ({ message }) => {
          if (message.includes('Aborted()')) {
            setLogs(prev => [...prev, lang === 'tr' ? 
              '⚠️ Web sürümünde performans sorunu tespit edildi. Daha iyi performans için masaüstü uygulamasını kullanmanızı öneririz.' :
              '⚠️ Performance issue detected in web version. We recommend using the desktop app for better performance.'
            ]);
            return;
          }
          
          if (isDetectingRef.current && message.includes('silence_')) {
            silenceLogsRef.current.push(message);
            console.log('Silence detection:', message);
          }
          setLogs(prev => [...prev, message]);
        });

        // Progress handler
        ffmpeg.on('progress', (event: any) => {
          const ratio = event.ratio || event.progress || 0;
          if (ratio >= 0 && ratio <= 1) {
            setProgress(Math.round(ratio * 100));
          }
        });
      
        await ffmpeg.load({
          coreURL: await toBlobURL('https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/umd/ffmpeg-core.js', 'text/javascript'),
          wasmURL: await toBlobURL('https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/umd/ffmpeg-core.wasm', 'application/wasm'),
          workerURL: await toBlobURL('https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/umd/ffmpeg-core.worker.js', 'text/javascript'),
        });

        setLoaded(true);
        setLogs([t.ffmpegReady]);
      }
    } catch (err) {
      const error = err as Error;
      console.error(t.ffmpegError, error);
      setLogs(prev => [...prev, `${t.error}${error.message}`]);
    } finally {
      setIsFFmpegLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Performance test function
  const testPerformance = useCallback(async () => {
    try {
      const memory = (navigator as any).deviceMemory || 4; // Default to 4GB if not available
      const cores = navigator.hardwareConcurrency || 4; // Default to 4 cores if not available
      
      // Base size is 100MB
      const baseSize = 100;
      
      // Adjust based on device capabilities
      const memoryFactor = memory / 4; // Scale based on RAM (4GB as baseline)
      const coreFactor = cores / 4; // Scale based on CPU cores (4 cores as baseline)
      
      // Calculate max file size (in MB)
      const calculatedSize = Math.floor(baseSize * Math.min(memoryFactor, coreFactor));
      
      // Set limits based on device capabilities
      const maxSize = Math.min(Math.max(calculatedSize, 50), 500); // Between 50MB and 500MB
      setMaxFileSize(maxSize);
      
      console.log(`Device capabilities: ${memory}GB RAM, ${cores} cores`);
      console.log(`Calculated max file size: ${maxSize}MB`);
    } catch (error) {
      console.error('Error testing performance:', error);
      setMaxFileSize(100); // Default to 100MB if testing fails
    }
  }, []);

  useEffect(() => {
    testPerformance();
  }, [testPerformance]);

  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size and show warning
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxFileSize) {
        const shouldContinue = window.confirm(
          `${t.fileSizeWarning} (${Math.round(fileSizeMB)}MB > ${maxFileSize}MB)\n\n${t.continueAnyway}`
        );
        if (!shouldContinue) {
          return;
        }
        // Add warning to logs
        setLogs([`${t.fileSizeWarning} (${Math.round(fileSizeMB)}MB > ${maxFileSize}MB)`]);
      } else {
        setLogs([]);
      }

      setVideo(file);
      setSilentSegments([]);
      setProgress(0);
      setProcessingTimes({ detection: 0, trimming: 0 });

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Generate thumbnail
      const video = document.createElement('video');
      video.src = url;
      await new Promise((resolve) => {
        video.onloadedmetadata = () => {
          setVideoDuration(video.duration);
          video.currentTime = 0; // Seek to first frame
          resolve(null);
        };
      });

      // Create thumbnail when first frame is loaded
      await new Promise((resolve) => {
        video.onseeked = () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
          setThumbnailUrl(canvas.toDataURL());
          resolve(null);
        };
      });

      // Scroll to detect button
      setTimeout(() => {
        detectButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const scrollToProgress = () => {
    setTimeout(() => {
      progressRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const detectSilence = async () => {
    if (!video || !loaded || !ffmpegRef.current) return;
    
    scrollToProgress();
    const startTime = performance.now();
    
    try {
      setProcessing(true);
      setProgress(0);
      setLogs([t.detectingSilence]);
      silenceLogsRef.current = [];
      isDetectingRef.current = true;
      
      const ffmpeg = ffmpegRef.current;

      // Clear any existing files
      try {
        await ffmpeg.deleteFile('input.mp4');
      } catch (e) {
        // Ignore if file doesn't exist
      }
      
      // Write input file with error handling
      try {
        await ffmpeg.writeFile('input.mp4', await fetchFile(video));
        setLogs(prev => [...prev, t.videoLoaded]);
      } catch (error) {
        throw new Error('Failed to load video file');
      }

      // Only disable video processing since we only need audio for silence detection
      const ffmpegCommand = [
        '-i', 'input.mp4',
        '-vn',  // Disable video processing since we only need audio
        '-af', `silencedetect=n=${threshold}dB:d=${minDuration}`,
        '-f', 'null',
        '-'
      ];

      await ffmpeg.exec(ffmpegCommand);

      // Parse silence detection from collected logs
      const logStr = silenceLogsRef.current.join('\n');
      console.log('Silence detection logs:', logStr);

      const silenceStartRegex = /silence_start: ([\d.]+)/g;
      const silenceEndRegex = /silence_end: ([\d.]+)/g;
      
      const starts = Array.from(logStr.matchAll(silenceStartRegex)).map(match => parseFloat(match[1]));
      const ends = Array.from(logStr.matchAll(silenceEndRegex)).map(match => parseFloat(match[1]));

      if (starts.length === 0 || ends.length === 0) {
        setLogs(prev => [...prev, t.noSilenceFound]);
        return;
      }

      const segments = starts.map((start, i) => ({
        start,
        end: ends[i]
      })).filter(segment => segment.end);

      if (segments.length > 0) {
        setLogs(prev => [...prev, `${segments.length}${t.silenceFound}`]);
        setSilentSegments(segments);
      }

      // Clean up
      try {
        await ffmpeg.deleteFile('input.mp4');
      } catch (e) {
        // Ignore cleanup errors
      }
    } catch (err) {
      const error = err as Error;
      console.error('Sessiz kısım tespiti hatası:', error);
      setLogs(prev => [...prev, `Hata: ${error.message}`, 
        lang === 'tr' ? 
        '💡 İpucu: Daha iyi performans için masaüstü uygulamasını kullanın.' :
        '💡 Tip: Use the desktop app for better performance.'
      ]);
    } finally {
      const endTime = performance.now();
      const detectionTime = (endTime - startTime) / 1000; // Convert to seconds
      setProcessingTimes(prev => ({ ...prev, detection: detectionTime }));
      isDetectingRef.current = false;
      setProcessing(false);
      setProgress(100);
    }
  };

  // Monitor system performance
  const updateSystemMetrics = useCallback(async () => {
    try {
      // Get memory usage
      const memory = (performance as any).memory;
      const usedMemory = memory ? (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100 : 0;

      // Estimate CPU usage based on processing time
      const cpuUsage = processing ? Math.min((progress + 20), 100) : 0;

      setSystemMetrics(prev => ({
        ...prev,
        cpu: Math.round(cpuUsage),
        memory: Math.round(usedMemory)
      }));
    } catch (error) {
      console.error('Error updating metrics:', error);
    }
  }, [progress, processing]);

  useEffect(() => {
    const interval = setInterval(updateSystemMetrics, 1000);
    return () => clearInterval(interval);
  }, [updateSystemMetrics]);

  // Calculate estimated time left
  const updateEstimatedTime = useCallback((currentProgress: number) => {
    if (currentProgress > 0 && processing) {
      const elapsedTime = (performance.now() - startTimeRef.current) / 1000;
      const estimatedTotal = (elapsedTime * 100) / currentProgress;
      const timeLeft = Math.max(0, estimatedTotal - elapsedTime);
      
      setSystemMetrics(prev => ({
        ...prev,
        estimatedTimeLeft: Math.round(timeLeft)
      }));
    }
  }, [processing]);

  // Add startTimeRef for time tracking
  const startTimeRef = useRef<number>(0);

  const trimSilence = async () => {
    if (!video || !loaded || !ffmpegRef.current || silentSegments.length === 0) return;
    
    scrollToProgress();
    startTimeRef.current = performance.now();
    const startTime = performance.now();
    setProcessing(true);
    const ffmpeg = ffmpegRef.current;
    
    // Store original file size
    setSystemMetrics(prev => ({
      ...prev,
      originalSize: video.size
    }));

    try {
      // Write the input video file
      await ffmpeg.writeFile('input.mp4', await fetchFile(video));
      setLogs(prev => [...prev, t.trimmingStarted]);

      // Create filter complex command for trimming
      const filterParts = [];
      const totalParts = silentSegments.length + 1;

      // First part (0 to first silence)
      filterParts.push(`[0:v]trim=0:${silentSegments[0].start + padding},setpts=PTS-STARTPTS[v0];`);
      filterParts.push(`[0:a]atrim=0:${silentSegments[0].start + padding},asetpts=PTS-STARTPTS[a0];`);

      // Middle parts (between silences)
      for (let i = 0; i < silentSegments.length - 1; i++) {
        const start = silentSegments[i].end - padding;
        const end = silentSegments[i + 1].start + padding;
        filterParts.push(
          `[0:v]trim=start=${start}:end=${end},setpts=PTS-STARTPTS[v${i + 1}];` +
          `[0:a]atrim=start=${start}:end=${end},asetpts=PTS-STARTPTS[a${i + 1}];`
        );
      }

      // Last part (after last silence)
      const lastIndex = silentSegments.length;
      filterParts.push(
        `[0:v]trim=start=${silentSegments[lastIndex - 1].end - padding},setpts=PTS-STARTPTS[v${lastIndex}];` +
        `[0:a]atrim=start=${silentSegments[lastIndex - 1].end - padding},asetpts=PTS-STARTPTS[a${lastIndex}];`
      );

      // Concatenate all parts
      const videoInputs = Array.from({ length: totalParts }, (_, i) => `[v${i}]`).join('');
      const audioInputs = Array.from({ length: totalParts }, (_, i) => `[a${i}]`).join('');
      
      const filterComplex = filterParts.join('') +
        `${videoInputs}concat=n=${totalParts}:v=1:a=0[vout];` +
        `${audioInputs}concat=n=${totalParts}:v=0:a=1[aout]`;

      setLogs(prev => [...prev, 'Kırpma işlemi başladı...']);

      // Process the video with high quality and ultrafast preset
      await ffmpeg.exec([
        '-i', 'input.mp4',
        '-filter_complex', filterComplex,
        '-map', '[vout]',
        '-map', '[aout]',
        '-c:v', 'libx264',     // Use H.264 codec
        '-preset', 'ultrafast', // Fastest processing
        '-crf', '17',          // Very high quality (0-51, lower is better)
        '-tune', 'film',       // Optimize for high quality video content
        '-c:a', 'aac',         // Use AAC codec for audio
        '-b:a', '192k',        // High quality audio bitrate
        '-movflags', '+faststart', // Enable fast start for web playback
        'output.mp4'
      ]);

      setLogs(prev => [...prev, t.processingVideo]);

      // Read the output file
      const data = await ffmpeg.readFile('output.mp4');
      const blob = new Blob([data], { type: 'video/mp4' });
      const url = URL.createObjectURL(blob);

      // Create download link
      const a = document.createElement('a');
      a.href = url;
      a.download = 'processed_video.mp4';
      a.click();

      setLogs(prev => [...prev, t.completed]);

      // Clean up
      await ffmpeg.deleteFile('input.mp4');
      await ffmpeg.deleteFile('output.mp4');

      const endTime = performance.now();
      const trimmingTime = (endTime - startTime) / 1000; // Convert to seconds
      setProcessingTimes(prev => ({ ...prev, trimming: trimmingTime }));
      
      setLogs(prev => [...prev, `${t.completed} ${t.totalProcessingTime}: ${(processingTimes.detection + trimmingTime).toFixed(1)}s`]);

      // After processing, update processed size
      setSystemMetrics(prev => ({
        ...prev,
        processedSize: blob.size
      }));

    } catch (err) {
      const error = err as Error;
      console.error('Error trimming silence:', error);
      setLogs(prev => [...prev, `${t.error}${error.message}`]);
    } finally {
      setProcessing(false);
      setProgress(0);
    }
  };

  // Add PerformanceMetrics component
  const PerformanceMetrics = () => (
    <div className="bg-surface border border-stroke rounded-group p-4 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-ink-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
          <span className="text-xs text-ink-2 truncate">{t.cpuUsage}</span>
        </div>
        <div className="w-24 bg-white/10 rounded-full h-1.5 flex-shrink-0">
          <div
            className="bg-accent h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${systemMetrics.cpu}%` }}
          />
        </div>
        <span className="text-xs text-ink-3 tabular-nums w-9 text-right">{systemMetrics.cpu}%</span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-ink-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-xs text-ink-2 truncate">{t.memoryUsage}</span>
        </div>
        <div className="w-24 bg-white/10 rounded-full h-1.5 flex-shrink-0">
          <div
            className="bg-accent h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${systemMetrics.memory}%` }}
          />
        </div>
        <span className="text-xs text-ink-3 tabular-nums w-9 text-right">{systemMetrics.memory}%</span>
      </div>

      {processing && systemMetrics.estimatedTimeLeft > 0 && (
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-ink-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs text-ink-2">
            {t.estimatedTimeLeft}: <span className="tabular-nums text-ink">{Math.round(systemMetrics.estimatedTimeLeft)}s</span>
          </span>
        </div>
      )}
    </div>
  );

  // Add ProcessingSummary component
  const ProcessingSummary = () => {
    if (!systemMetrics.originalSize || !systemMetrics.processedSize) return null;

    const originalMB = (systemMetrics.originalSize / (1024 * 1024)).toFixed(1);
    const processedMB = (systemMetrics.processedSize / (1024 * 1024)).toFixed(1);
    const reduction = Math.abs(((systemMetrics.originalSize - systemMetrics.processedSize) / systemMetrics.originalSize * 100)).toFixed(1);
    const isReduced = systemMetrics.processedSize < systemMetrics.originalSize;

    return (
      <div className="bg-surface border border-stroke rounded-group p-4 sm:p-5 space-y-3">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.04em] text-ink-3">{t.processingSummary}</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="space-y-1 bg-field border border-stroke rounded-field p-3">
            <p className="text-ink-3">{t.originalSize}</p>
            <p className="text-sm text-ink tabular-nums">{originalMB} MB</p>
          </div>
          <div className="space-y-1 bg-field border border-stroke rounded-field p-3">
            <p className="text-ink-3">{t.processedSize}</p>
            <p className="text-sm text-ink tabular-nums">{processedMB} MB</p>
          </div>
          <div className="space-y-1 bg-field border border-stroke rounded-field p-3">
            <p className="text-ink-3">{t.sizeReduction}</p>
            <p className={`text-sm tabular-nums ${isReduced ? "text-success" : "text-danger"}`}>{reduction}%</p>
          </div>
          <div className="space-y-1 bg-field border border-stroke rounded-field p-3">
            <p className="text-ink-3">{t.processingTime}</p>
            <p className="text-sm text-ink tabular-nums">{processingTimes.detection + processingTimes.trimming}s</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen text-ink">
      {/* FFmpeg Loading State — top-level overlay, outside content wrappers
          (no space-y margin-top, no wrapper containing-block offset) */}
      {isFFmpegLoading && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl flex items-center justify-center">
          <div className="bg-[#2b2b2e] border border-stroke-strong px-8 py-7 rounded-2xl shadow-[0_24px_70px_rgba(0,0,0,0.6)] flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-white/15 border-t-accent"></div>
            <p className="text-ink-2 text-sm">{t.loadingFFmpeg}</p>
          </div>
        </div>
      )}
      <DesktopAppAnnouncement lang={lang} />

      <div className="p-4 sm:p-6 md:p-8">
        <div className="max-w-5xl mx-auto space-y-4 sm:space-y-5">
          {/* Language Selector */}
          <div className="flex flex-row items-center justify-end gap-1.5 -mb-2 sm:-mb-3">
            <button
              onClick={() => setLang('tr')}
              className={`w-8 h-8 flex items-center justify-center overflow-hidden rounded-full transition-colors ${
                lang === 'tr' ? 'ring-2 ring-accent ring-offset-2 ring-offset-window' : 'ring-1 ring-inset ring-stroke opacity-60 hover:opacity-100'
              }`}
              title="Türkçe"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#ed4c5c"/><g fill="#fff"><path d="m41.3 39l.1-5.4L36 32l5.4-1.6l-.1-5.4l3.3 4.3l5.4-1.6l-3.3 4.3l3.3 4.3l-5.4-1.6z"/><path d="M33.2 44c-6.6 0-11.9-5.4-11.9-12s5.3-12 11.9-12c2.5 0 4.8.8 6.8 2.1C37.3 19 33.3 17 28.8 17C20.6 17 14 23.7 14 32s6.6 15 14.8 15c4.5 0 8.5-2 11.2-5.1c-1.9 1.3-4.2 2.1-6.8 2.1"/></g></svg>
            </button>
            <button
              onClick={() => setLang('en')}
              className={`w-8 h-8 flex items-center justify-center overflow-hidden rounded-full transition-colors ${
                lang === 'en' ? 'ring-2 ring-accent ring-offset-2 ring-offset-window' : 'ring-1 ring-inset ring-stroke opacity-60 hover:opacity-100'
              }`}
              title="English"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><mask id="circleFlagsGb0"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#circleFlagsGb0)"><path fill="#eee" d="m0 0l8 22l-8 23v23l32 54l-32 54v32l32 48l-32 48v32l32 54l-32 54v68l22-8l23 8h23l54-32l54 32h32l48-32l48 32h32l54-32l54 32h68l-8-22l8-23v-23l-32-54l32-54v-32l-32-48l32-48v-32l-32-54l32-54V0l-22 8l-23-8h-23l-54 32l-54-32h-32l-48 32l-48-32h-32l-54 32L68 0z"/><path fill="#0052b4" d="M336 0v108L444 0Zm176 68L404 176h108zM0 176h108L0 68ZM68 0l108 108V0Zm108 512V404L68 512ZM0 444l108-108H0Zm512-108H404l108 108Zm-68 176L336 404v108z"/><path fill="#d80027" d="M0 0v45l131 131h45zm208 0v208H0v96h208v208h96V304h208v-96H304V0zm259 0L336 131v45L512 0zM176 336L0 512h45l131-131zm160 0l176 176v-45L381 336z"/></g></svg>
            </button>
          </div>
          <h1 className="flex items-center justify-center gap-3 px-2 pt-1 pb-1">
            <img src="/logo.png" alt="Klyppr" className="h-10 w-10 sm:h-11 sm:w-11 flex-shrink-0" />
            <span className="flex flex-col leading-tight text-left">
              <span className="text-lg sm:text-xl font-semibold text-ink">Klyppr</span>
              <span className="text-xs sm:text-sm font-normal text-ink-2">Automatic Video Silence Clipper</span>
            </span>
          </h1>

          <DesktopInstall lang={lang} />

          {/* Main Content */}
          <div className="space-y-4 sm:space-y-6">
            {/* First Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-start">
              {/* Video Upload Section */}
              <div className="bg-surface border border-stroke rounded-group p-4 sm:p-5">
                <h2 className="flex items-center gap-1.5 mb-3 text-[11px] font-semibold uppercase tracking-[0.04em] text-ink-3">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
                    <path d="M13 2v7h7" />
                  </svg>
                  {lang === 'tr' ? 'Kaynak' : 'Source'}
                </h2>
                <div className="flex flex-col gap-3 sm:gap-4">
                  {/* Video Selection Button */}
                  <label className="group w-full cursor-pointer bg-field border border-dashed border-stroke-strong hover:border-accent hover:bg-surface-hover px-6 py-8 sm:py-10 rounded-field transition-colors flex flex-col items-center justify-center gap-2 text-center">
                    <span className="flex items-center justify-center w-11 h-11 rounded-full bg-accent/15 text-accent transition-colors group-hover:bg-accent/25">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <span className="text-sm sm:text-base font-medium text-ink-2 group-hover:text-ink transition-colors">{t.selectVideo}</span>
                    <span className="text-[11px] text-ink-3">MP4 · MOV · WEBM · MKV</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="hidden"
                    />
                  </label>

                  {/* Max File Size Info */}
                  <div className="text-center space-y-1 p-2.5 bg-field border border-stroke rounded-field">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-[11px] sm:text-xs text-ink-2">
                        <span className="font-semibold text-accent">{maxFileSize}MB</span> {t.maxFileSizeInfo}
                      </p>
                    </div>
                    <p className="text-[10px] sm:text-xs text-ink-3 leading-relaxed">
                      {t.deviceBasedLimit}
                    </p>
                  </div>

                  {/* Thumbnail and Info */}
                  {video && (
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex-shrink-0 bg-field rounded-field overflow-hidden border border-stroke">
                        {thumbnailUrl && (
                          <img
                            src={thumbnailUrl}
                            alt="Video thumbnail"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="space-y-1 sm:space-y-1.5">
                          <p className="font-medium text-ink truncate text-sm sm:text-base">{video.name}</p>
                          <p className="text-xs sm:text-sm text-ink-2">{t.duration}: <span className="tabular-nums text-ink">{videoDuration.toFixed(1)}s</span></p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Detection Controls */}
              <div className="bg-surface border border-stroke rounded-group p-4 sm:p-5 space-y-5">
                <h2 className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-ink-3">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />
                  </svg>
                  {lang === 'tr' ? 'Algılama' : 'Detection'}
                </h2>
                <div className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="flex items-center justify-between text-xs sm:text-sm font-medium text-ink-2 mb-2">
                      <span>{t.audioThreshold}</span>
                      <span className="tabular-nums text-ink">{threshold}dB</span>
                    </label>
                    <input
                      type="range"
                      min="-60"
                      max="-10"
                      value={threshold}
                      onChange={(e) => setThreshold(parseInt(e.target.value))}
                      className="w-full cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-ink-3 mt-1.5">
                      <span>-60dB ({t.sensitive})</span>
                      <span>-10dB ({t.rough})</span>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center justify-between text-xs sm:text-sm font-medium text-ink-2 mb-2">
                      <span>{t.minSilenceDuration}</span>
                      <span className="tabular-nums text-ink">{minDuration}s</span>
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="2"
                      step="0.1"
                      value={minDuration}
                      onChange={(e) => setMinDuration(parseFloat(e.target.value))}
                      className="w-full cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-ink-3 mt-1.5">
                      <span>0.1s ({t.short})</span>
                      <span>2.0s ({t.long})</span>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center justify-between text-xs sm:text-sm font-medium text-ink-2 mb-2">
                      <span>{t.padding}</span>
                      <span className="tabular-nums text-ink">{padding}s</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="0.5"
                      step="0.05"
                      value={padding}
                      onChange={(e) => setPadding(parseFloat(e.target.value))}
                      className="w-full cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-ink-3 mt-1.5">
                      <span>0s</span>
                      <span>0.5s</span>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    ref={detectButtonRef}
                    onClick={detectSilence}
                    disabled={processing || !loaded}
                    className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-hover active:bg-accent-press text-accent-fg px-6 py-3 sm:py-3.5 rounded-field shadow-control transition-colors text-sm sm:text-base font-semibold disabled:bg-white/[0.08] disabled:text-ink-3 disabled:shadow-none disabled:cursor-not-allowed"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                    {t.detectSilence}
                  </button>
                </div>
              </div>
            </div>

            {/* Timeline Section */}
            {video && (
              <div className="bg-surface border border-stroke rounded-group p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-ink-3">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="10" rx="2" />
                      <path d="M6 7v10M10 7v10M14 7v10M18 7v10" />
                    </svg>
                    {lang === 'tr' ? 'Zaman Çizelgesi' : 'Timeline'}
                  </h2>
                  <span className="text-[11px] sm:text-xs text-ink-2">
                    {t.duration}: <span className="tabular-nums text-ink">{videoDuration.toFixed(1)}s</span>
                  </span>
                </div>
                <div className="relative">
                  {/* Timeline Bar */}
                  <div className="h-16 sm:h-20 bg-field border border-stroke rounded-field relative overflow-hidden">
                    {silentSegments.map((segment, index) => {
                      const startPercent = (segment.start / videoDuration) * 100;
                      const widthPercent = ((segment.end - segment.start) / videoDuration) * 100;
                      return (
                        <div
                          key={index}
                          className="absolute h-full bg-danger/25 border-x border-danger/40"
                          style={{
                            left: `${startPercent}%`,
                            width: `${widthPercent}%`,
                          }}
                        />
                      );
                    })}

                    {/* Time markers - Only show on larger screens */}
                    <div className="absolute top-0 left-0 w-full h-full hidden sm:flex justify-between px-2">
                      {Array.from({ length: 11 }).map((_, i) => (
                        <div key={i} className="h-full flex flex-col justify-center items-center">
                          <div className="h-full w-px bg-white/10"></div>
                          <span className="text-[10px] text-ink-3 mt-1 tabular-nums">
                            {((videoDuration * i) / 10).toFixed(1)}s
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Mobile Time markers - Simplified */}
                    <div className="absolute top-0 left-0 w-full h-full flex sm:hidden justify-between px-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-full flex flex-col justify-center items-center">
                          <div className="h-full w-px bg-white/10"></div>
                          <span className="text-[10px] text-ink-3 mt-1 tabular-nums">
                            {((videoDuration * i) / 4).toFixed(0)}s
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Trim Button */}
                {silentSegments.length > 0 && (
                  <div>
                    <button
                      onClick={trimSilence}
                      disabled={processing}
                      className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-hover active:bg-accent-press text-accent-fg px-6 py-3 sm:py-3.5 rounded-field shadow-control transition-colors text-sm sm:text-base font-semibold disabled:bg-white/[0.08] disabled:text-ink-3 disabled:shadow-none disabled:cursor-not-allowed"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {t.trimSilence}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Detected Segments */}
            {silentSegments.length > 0 && (
              <div className="bg-surface border border-stroke rounded-group overflow-hidden">
                <button
                  onClick={() => setIsSegmentsOpen(!isSegmentsOpen)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-surface-hover transition-colors"
                >
                  <div className="flex items-center gap-2 text-ink-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-3.5 w-3.5 text-ink-3 transform transition-transform ${isSegmentsOpen ? 'rotate-90' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.04em] text-ink-3">
                      {t.detectedSegments} ({silentSegments.length})
                    </span>
                  </div>
                </button>

                {isSegmentsOpen && (
                  <div className="border-t border-hairline p-3 sm:p-4">
                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
                      {silentSegments.map((segment, index) => (
                        <div
                          key={index}
                          className="bg-field p-1.5 sm:p-2 rounded-field text-xs border border-stroke hover:border-accent/60 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                            <span className="text-accent font-semibold text-[10px] sm:text-xs tabular-nums">{(segment.end - segment.start).toFixed(1)}s</span>
                          </div>
                          <div className="flex justify-between text-ink-2 text-[8px] sm:text-[10px] tabular-nums">
                            <div className="text-center">
                              <div>{segment.start.toFixed(1)}s</div>
                            </div>
                            <div className="text-center">
                              <div>{segment.end.toFixed(1)}s</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Progress Bar */}
            {processing && (
              <div ref={progressRef} className="bg-surface border border-stroke rounded-group p-4">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.04em] text-ink-3">{lang === 'tr' ? 'Durum' : 'Status'}</span>
                  <span className="text-xs font-medium text-ink tabular-nums">{t.processing}... {Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Logs Section */}
            {logs.length > 0 && (
              <div className="bg-surface border border-stroke rounded-group overflow-hidden">
                <button
                  onClick={() => setIsLogsOpen(!isLogsOpen)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-surface-hover transition-colors"
                >
                  <div className="flex items-center gap-2 text-ink-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-3.5 w-3.5 text-ink-3 transform transition-transform ${isLogsOpen ? 'rotate-90' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.04em] text-ink-3">{t.processLogs}</span>
                  </div>
                </button>

                {isLogsOpen && (
                  <div className="border-t border-hairline max-h-40 sm:max-h-60 overflow-y-auto p-3 sm:p-4 bg-[#161618]">
                    <pre className="font-mono text-[11px] sm:text-xs leading-relaxed text-[#7ee787] whitespace-pre-wrap">
                      {logs.join('\n')}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* Add PerformanceMetrics before Progress Bar */}
            {processing && <PerformanceMetrics />}

            {/* Add ProcessingSummary after Logs Section */}
            {!processing && systemMetrics.processedSize > 0 && <ProcessingSummary />}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-hairline">
          <div className="text-center text-sm text-ink-2">
            <p className="flex items-center justify-center gap-2">
              Built by{' '}
              <a
                href="https://mkdir.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover transition-colors flex items-center gap-1"
              >
                Muzaffer Kadir YILMAZ
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </p>
            <p className="mt-2">
              <a
                href="https://github.com/muzafferkadir"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-ink-2 hover:text-ink transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                @muzafferkadir
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
