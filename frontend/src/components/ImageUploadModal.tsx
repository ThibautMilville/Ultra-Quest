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
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full mx-4 border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
              <ImageIcon size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <p className="text-gray-400 text-sm">{t('imageUpload.selectImage')}</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Upload Area */}
        {!selectedImage ? (
          <div
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${
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
            <div className="flex flex-col items-center gap-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                dragActive ? 'bg-purple-500/20' : 'bg-gray-700'
              }`}>
                <Upload size={24} className={dragActive ? 'text-purple-400' : 'text-gray-400'} />
              </div>
              
              <div>
                <p className="text-white font-medium mb-2">
                  {dragActive ? t('imageUpload.dropHere') : t('imageUpload.dragAndDrop')}
                </p>
                <p className="text-gray-400 text-sm mb-4">
                  {t('imageUpload.orClickToSelect')}
                </p>
                
                <div className="text-xs text-gray-500 space-y-1">
                  <p>{t('imageUpload.supportedFormats')}: {acceptedFormats.join(', ')}</p>
                  <p>{t('imageUpload.maxSize')}: {maxSize}MB</p>
                  {recommendedSize && (
                    <p>{t('imageUpload.recommendedSize')}: {recommendedSize}</p>
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
          <div className="space-y-6">
            <div className="relative bg-gray-900 rounded-2xl p-4 border border-gray-700">
              <img 
                src={selectedImage} 
                alt="Preview" 
                className="w-full h-64 object-contain rounded-lg"
              />
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setImageFile(null);
                }}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={16} className="text-white" />
              </button>
            </div>
            
            {imageFile && (
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">{t('imageUpload.fileName')}: {imageFile.name}</span>
                  <span className="text-gray-400">{(imageFile.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-8">
          <button 
            onClick={handleClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
            disabled={uploading}
          >
            {t('action.cancel')}
          </button>
          <button 
            onClick={handleUpload}
            disabled={!selectedImage || uploading}
            className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {t('imageUpload.uploading')}
              </>
            ) : (
              <>
                <Check size={16} />
                {t('imageUpload.useImage')}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal; 