import { useState } from 'react';
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
  Circle
} from 'lucide-react';
import { cameras } from '../data/mockData';

// Demo video URLs for the demo page
const demoVideos = [
  'https://assets.mixkit.co/videos/preview/mixkit-surveillance-camera-in-a-city-at-night-4555-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-man-walking-on-the-street-at-night-3448-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-view-of-a-parking-lot-at-night-3446-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-security-camera-in-a-buildings-4556-large.mp4',
];

const LiveView = ({ isDemoMode = false }) => {
  const [gridSize, setGridSize] = useState(4);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const onlineCameras = cameras.filter((c) => c.status === 'online');

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
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2';
      case 9:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2';
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-orbitron text-3xl font-bold text-text-primary">
            Live <span className="text-accent">Monitoring</span>
          </h1>
          <p className="text-text-secondary font-inter text-sm mt-1">
            {onlineCameras.length} cameras online • {cameras.filter((c) => c.isRecording).length} recording
          </p>
        </div>

        {/* Grid Size Selector */}
        <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
          {[1, 2, 4, 9].map((size) => (
            <button
              key={size}
              onClick={() => setGridSize(size)}
              className={`px-3 py-1.5 rounded-md font-inter text-sm transition-colors ${
                gridSize === size
                  ? 'bg-accent text-background'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {size === 1 ? '1×1' : size === 2 ? '2×2' : size === 4 ? '4×4' : '9×9'}
            </button>
          ))}
        </div>
      </div>

      {/* Camera Grid */}
      <div className={`grid ${getGridCols()} gap-4`}>
        {onlineCameras.slice(0, gridSize).map((camera, index) => (
          <div
            key={camera.id}
            className="glass rounded-xl overflow-hidden relative group"
          >
            {/* Video Feed */}
            <div className="relative aspect-video bg-primary">
              {/* Show demo videos in demo mode, otherwise show placeholder */}
              {isDemoMode ? (
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  src={demoVideos[index % demoVideos.length]}
                />
              ) : (
                <div className="camera-feed w-full h-full flex items-center justify-center">
                  <Video className="w-16 h-16 text-text-secondary opacity-30" />
                  {isPlaying && <div className="scan-line"></div>}
                </div>
              )}

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
                <p className="text-text-secondary text-xs font-inter">Last motion: {camera.lastMotion}</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-success rounded-full"></span>
                <span className="text-success text-xs font-inter">Online</span>
              </div>
            </div>
          </div>
        ))}
      </div>

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
          <div className="w-full h-full camera-feed flex items-center justify-center">
            <Video className="w-24 h-24 text-text-secondary opacity-30" />
            {isPlaying && <div className="scan-line"></div>}
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

      {/* Offline Cameras Notice */}
      {cameras.filter((c) => c.status === 'offline').length > 0 && (
        <div className="mt-8 p-4 bg-secondary/50 rounded-xl border border-border">
          <h3 className="font-orbitron text-lg font-semibold text-text-primary mb-3">Offline Cameras</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {cameras
              .filter((c) => c.status === 'offline')
              .map((camera) => (
                <div key={camera.id} className="flex items-center gap-3 p-3 bg-primary rounded-lg">
                  <div className="w-10 h-10 bg-danger/20 rounded-lg flex items-center justify-center">
                    <Video className="w-5 h-5 text-danger" />
                  </div>
                  <div>
                    <p className="text-text-primary font-inter text-sm">{camera.name}</p>
                    <p className="text-text-secondary text-xs font-inter">{camera.location}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveView;
