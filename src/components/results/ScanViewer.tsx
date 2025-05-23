import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Maximize, Download } from 'lucide-react';
import Button from '../ui/Button';

interface ScanViewerProps {
  imageUrl: string;
  alt?: string;
}

const ScanViewer: React.FC<ScanViewerProps> = ({ imageUrl, alt = 'MRI Scan' }) => {
  const [zoom, setZoom] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);

  const zoomIn = () => {
    if (zoom < 3) {
      setZoom(zoom + 0.25);
    }
  };

  const zoomOut = () => {
    if (zoom > 0.5) {
      setZoom(zoom - 0.25);
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'mri-scan.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrightness(Number(e.target.value));
  };

  const handleContrastChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContrast(Number(e.target.value));
  };

  return (
    <div className="card">
      <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">MRI Scan</h3>
        <div className="flex space-x-2">
          <Button
            onClick={zoomOut}
            variant="ghost"
            size="sm"
            icon={<ZoomOut className="w-4 h-4" />}
            aria-label="Zoom out"
          />
          <Button
            onClick={zoomIn}
            variant="ghost"
            size="sm"
            icon={<ZoomIn className="w-4 h-4" />}
            aria-label="Zoom in"
          />
          <Button
            onClick={toggleFullScreen}
            variant="ghost"
            size="sm"
            icon={<Maximize className="w-4 h-4" />}
            aria-label="Full screen"
          />
          <Button
            onClick={downloadImage}
            variant="ghost"
            size="sm"
            icon={<Download className="w-4 h-4" />}
            aria-label="Download"
          />
        </div>
      </div>

      <div className={`relative overflow-hidden ${isFullScreen ? 'fixed inset-0 z-50 bg-black flex items-center justify-center' : 'p-4'}`}>
        {isFullScreen && (
          <Button
            onClick={toggleFullScreen}
            className="absolute top-4 right-4 z-10"
            variant="outline"
            size="sm"
          >
            Close
          </Button>
        )}

        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center">
            <img
              src={imageUrl}
              alt={alt}
              onDoubleClick={toggleFullScreen}
              className="transition-transform duration-200 ease-in-out max-h-full"
              style={{
                transform: `scale(${zoom})`,
                filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                transition: 'transform 200ms ease, filter 200ms ease'
              }}
            />
          </div>

          {/* Controls for brightness and contrast */}
          <div className="mt-4 w-full max-w-xs space-y-2">
            <div>
              <label htmlFor="brightness" className="text-xs text-gray-700 block">
                Brightness: {brightness}%
              </label>
              <input
                id="brightness"
                type="range"
                min="50"
                max="150"
                value={brightness}
                onChange={handleBrightnessChange}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="contrast" className="text-xs text-gray-700 block">
                Contrast: {contrast}%
              </label>
              <input
                id="contrast"
                type="range"
                min="50"
                max="150"
                value={contrast}
                onChange={handleContrastChange}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanViewer;