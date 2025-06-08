import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Check } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageSelect: (imageUrl: string) => void;
  title: string;
  acceptedFormats?: string[];
  maxSize?: number; // in MB
  recommendedSize?: string;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  onImageSelect,
  title,
  acceptedFormats = ['PNG', 'JPG', 'JPEG', 'WEBP'],
  maxSize = 5,
  recommendedSize
}) => {
  const { t } = useTranslation();
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Validate file type
    const fileExtension = file.name.split('.').pop()?.toUpperCase();
    if (!fileExtension || !acceptedFormats.includes(fileExtension)) {
      alert(`Format non supporté. Formats acceptés: ${acceptedFormats.join(', ')}`);
      return;
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`Fichier trop volumineux. Taille maximum: ${maxSize}MB`);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setSelectedImage(result);
      setImageFile(file);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedImage || !imageFile) return;
    
    setUploading(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you would upload to your server here
    // For now, we'll just use the data URL
    onImageSelect(selectedImage);
    setUploading(false);
    handleClose();
  };

  const handleClose = () => {
    setSelectedImage(null);
    setImageFile(null);
    setUploading(false);
    setDragActive(false);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 max-w-2xl w-full max-h-[95vh] overflow-y-auto border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-700 rounded-lg flex items-center justify-center">
              <ImageIcon size={14} className="sm:w-4 sm:h-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>
              <p className="text-gray-400 text-xs sm:text-sm hidden sm:block">{t('imageUpload.selectImage')}</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X size={16} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Upload Area */}
        {!selectedImage ? (
          <div
            className={`border-2 border-dashed rounded-2xl p-4 sm:p-6 lg:p-8 text-center transition-all duration-300 cursor-pointer ${
              dragActive 
                ? 'border-purple-500 bg-purple-500/10' 
                : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/30'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-colors ${
                dragActive ? 'bg-purple-500/20' : 'bg-gray-700'
              }`}>
                <Upload size={20} className={`sm:w-6 sm:h-6 ${dragActive ? 'text-purple-400' : 'text-gray-400'}`} />
              </div>
              
              <div>
                <p className="text-white font-medium mb-2 text-sm sm:text-base">
                  {dragActive ? t('imageUpload.dropHere') : t('imageUpload.dragAndDrop')}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                  {t('imageUpload.orClickToSelect')}
                </p>
                
                <div className="text-xs text-gray-500 space-y-1">
                  <p>{t('imageUpload.supportedFormats')}: {acceptedFormats.join(', ')}</p>
                  <p>{t('imageUpload.maxSize')}: {maxSize}MB</p>
                  {recommendedSize && (
                    <p className="hidden sm:block">{t('imageUpload.recommendedSize')}: {recommendedSize}</p>
                  )}
                </div>
              </div>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptedFormats.map(format => `.${format.toLowerCase()}`).join(',')}
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        ) : (
          /* Preview Area */
          <div className="space-y-4 sm:space-y-6">
            <div className="relative bg-gray-900 rounded-2xl p-3 sm:p-4 border border-gray-700">
              <img 
                src={selectedImage} 
                alt="Preview" 
                className="w-full h-48 sm:h-64 object-contain rounded-lg"
              />
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setImageFile(null);
                }}
                className="absolute top-1 right-1 sm:top-2 sm:right-2 w-6 h-6 sm:w-8 sm:h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={12} className="sm:w-4 sm:h-4 text-white" />
              </button>
            </div>
            
            {imageFile && (
              <div className="bg-gray-700/50 rounded-lg p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm gap-2 sm:gap-0">
                  <span className="text-gray-300 truncate">{t('imageUpload.fileName')}: {imageFile.name}</span>
                  <span className="text-gray-400">{(imageFile.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
          <button 
            onClick={handleClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
            disabled={uploading}
          >
            {t('action.cancel')}
          </button>
          <button 
            onClick={handleUpload}
            disabled={!selectedImage || uploading}
            className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 sm:py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            {uploading ? (
              <>
                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="text-xs sm:text-sm">{t('imageUpload.uploading')}</span>
              </>
            ) : (
              <>
                <Check size={14} className="sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">{t('imageUpload.useImage')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal; 