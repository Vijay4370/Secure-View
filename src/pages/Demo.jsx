import { useState, useRef, useEffect } from 'react';
import { 
  Video, 
  Maximize2, 
  Minimize2, 
  Pause, 
  Play, 
  Volume2, 
  VolumeX,
  Move,
  ZoomIn,
  ZoomOut,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  Shield,
  Eye,
  Clock,
  Wifi,
  ArrowRight
} from 'lucide-react';

// Demo camera data for the demo page
const demoCameras = [
  { id: 1, name: 'Front Entrance', location: 'Building A - Main Door', model: 'Dome-4K-Pro', resolution: '4K Ultra HD', isRecording: true },
  { id: 2, name: 'Parking Lot', location: 'Building A - Parking', model: 'Bullet-X5-2024', resolution: '5MP', isRecording: true },
  { id: 3, name: 'Back Office', location: 'Building B - Office', model: 'PTZ-Elite-360', resolution: '4K Ultra HD', isRecording: false },
  { id: 4, name: 'Reception', location: 'Building A - Lobby', model: 'Mini-Dome-WiFi', resolution: '1080p', isRecording: true },
];

// Demo video URLs - Using Mixkit videos (free to use)
const demoVideos = [
  'https://assets.mixkit.co/videos/preview/mixkit-surveillance-camera-in-a-city-at-night-4555-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-man-walking-on-the-street-at-night-3448-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-view-of-a-parking-lot-at-night-3446-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-security-camera-in-a-buildings-4556-large.mp4',
];

// Video player component with autoplay
const VideoPlayer = ({ src, className }) => {
  const videoRef = useRef(null);
  
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playVideo = async () => {
        try {
          await video.play();
        } catch (err) {
          // Autoplay was prevented, try again on user interaction
          console.log('Autoplay prevented, waiting for user interaction');
        }
      };
      playVideo();
    }
  }, []);
  
  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      src={src}
    />
  );
};

const Demo = ({ onBack }) => {
  const [gridSize, setGridSize] = useState(4);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const handleFullscreen = (camera) => {
    setSelectedCamera(camera);
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    setSelectedCamera(null);
    setIsFullscreen(false);
  };

  const getGridCols = () => {
    switch (gridSize) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2';
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 bg-primary overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full mb-4">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-accent font-inter text-sm">Live Demo</span>
            </div>
            <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Experience <span className="text-accent">SecureView</span> in Action
            </h1>
            <p className="text-text-secondary font-inter text-lg max-w-2xl mx-auto mb-8">
              Watch live demo footage from our advanced CCTV cameras. See the crystal clear 4K quality, night vision, and AI-powered detection in real-time.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
                <Eye className="w-5 h-5 text-accent" />
                <span className="text-text-primary font-inter text-sm">4K Ultra HD</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
                <Clock className="w-5 h-5 text-accent" />
                <span className="text-text-primary font-inter text-sm">24/7 Recording</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
                <Wifi className="w-5 h-5 text-accent" />
                <span className="text-text-primary font-inter text-sm">Smart Detection</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Camera Grid Section */}
      <section className="py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-orbitron text-2xl font-bold text-text-primary">
                Live Camera <span className="text-accent">Feeds</span>
              </h2>
              <p className="text-text-secondary font-inter text-sm mt-1">
                {demoCameras.length} cameras active • {demoCameras.filter((c) => c.isRecording).length} recording
              </p>
            </div>

            {/* Grid Size Selector */}
            <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
              {[1, 2, 4].map((size) => (
                <button
                  key={size}
                  onClick={() => setGridSize(size)}
                  className={`px-3 py-1.5 rounded-md font-inter text-sm transition-colors ${
                    gridSize === size
                      ? 'bg-accent text-background'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {size === 1 ? '1×1' : size === 2 ? '2×2' : '4×4'}
                </button>
              ))}
            </div>
          </div>

          {/* Camera Grid */}
          <div className={`grid ${getGridCols()} gap-4`}>
            {demoCameras.slice(0, gridSize).map((camera, index) => (
              <div
                key={camera.id}
                className="glass rounded-xl overflow-hidden relative group"
              >
                {/* Video Feed */}
                <div className="relative aspect-video bg-primary">
                  <VideoPlayer 
                    src={demoVideos[index % demoVideos.length]} 
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay Info */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Top Bar */}
                    <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/60 to-transparent flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {camera.isRecording && (
                          <div className="flex items-center gap-1">
                            <Circle className="w-2 h-2 fill-danger text-danger recording-pulse" />
                            <span className="text-danger text-xs font-inter">REC</span>
                          </div>
                        )}
                        <span className="text-white text-sm font-inter">{camera.resolution}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                        <span className="text-white text-xs font-inter">LIVE</span>
                      </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                      <h3 className="text-white font-inter font-semibold">{camera.name}</h3>
                      <p className="text-white/70 text-xs font-inter">{camera.location}</p>
                    </div>
                  </div>

                  {/* Hover Controls */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleFullscreen(camera)}
                      className="p-3 bg-secondary/80 text-white rounded-full hover:bg-accent transition-colors"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-3 bg-secondary/80 text-white rounded-full hover:bg-accent transition-colors"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-3 bg-secondary/80 text-white rounded-full hover:bg-accent transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Camera Info Bar */}
                <div className="p-3 bg-secondary/50 flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-xs font-inter">{camera.model}</p>
                    <p className="text-text-secondary text-xs font-inter">Last motion: Just now</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-success rounded-full"></span>
                    <span className="text-success text-xs font-inter">Online</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <p className="text-text-secondary font-inter mb-4">Ready to get these amazing cameras?</p>
            <button 
              onClick={() => window.location.hash = 'shop'}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-background font-inter font-semibold rounded-xl hover:bg-amber-400 transition-all btn-glow"
            >
              Browse Our Cameras
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      {isFullscreen && selectedCamera && (
        <div className="fixed inset-0 z-50 bg-background">
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between">
            <div>
              <h2 className="text-white font-orbitron text-xl font-bold">{selectedCamera.name}</h2>
              <p className="text-white/70 text-sm font-inter">{selectedCamera.location}</p>
            </div>
            <button
              onClick={exitFullscreen}
              className="p-2 bg-secondary text-white rounded-lg hover:bg-accent transition-colors"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>

          {/* Video Feed */}
          <div className="w-full h-full flex items-center justify-center">
            <video
              className="w-full h-full object-contain"
              autoPlay
              muted={true}
              loop
              playsinline
              src={demoVideos[demoCameras.findIndex(c => c.id === selectedCamera.id) % demoVideos.length]}
              onLoadedData={(e) => {
                if (e.target.paused) {
                  e.target.play().catch(() => {});
                }
              }}
            />
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/80 to-transparent">
            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 bg-secondary text-white rounded-full hover:bg-accent transition-colors"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-3 bg-secondary text-white rounded-full hover:bg-accent transition-colors"
              >
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
            </div>

            {/* PTZ Controls */}
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-3 gap-2">
                <div></div>
                <button className="p-3 bg-secondary/50 text-white rounded-lg hover:bg-accent transition-colors">
                  <ChevronUp className="w-5 h-5" />
                </button>
                <div></div>
                <button className="p-3 bg-secondary/50 text-white rounded-lg hover:bg-accent transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="p-3 bg-secondary text-white rounded-lg hover:bg-accent transition-colors">
                  <Move className="w-5 h-5" />
                </button>
                <button className="p-3 bg-secondary/50 text-white rounded-lg hover:bg-accent transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div></div>
                <button className="p-3 bg-secondary/50 text-white rounded-lg hover:bg-accent transition-colors">
                  <ChevronDown className="w-5 h-5" />
                </button>
                <div></div>
              </div>
              <div className="flex items-center gap-2 ml-8">
                <button className="p-3 bg-secondary/50 text-white rounded-lg hover:bg-accent transition-colors">
                  <ZoomOut className="w-5 h-5" />
                </button>
                <button className="p-3 bg-secondary text-white rounded-lg hover:bg-accent transition-colors">
                  <ZoomIn className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Demo;

