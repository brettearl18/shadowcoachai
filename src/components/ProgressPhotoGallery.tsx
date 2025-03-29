import React, { useState } from 'react';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';

interface Photo {
  url: string;
  date: Date;
  type: 'front' | 'side' | 'back';
  weekNumber: number;
}

interface ProgressPhotoGalleryProps {
  photos: Photo[];
  className?: string;
}

export default function ProgressPhotoGallery({ photos, className = '' }: ProgressPhotoGalleryProps) {
  const [selectedPhotos, setSelectedPhotos] = useState<Photo[]>([]);
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPhotoType, setCurrentPhotoType] = useState<'front' | 'side' | 'back'>('front');

  // Group photos by type and sort by date
  const photosByType = photos.reduce((acc, photo) => {
    if (!acc[photo.type]) {
      acc[photo.type] = [];
    }
    acc[photo.type].push(photo);
    return acc;
  }, {} as Record<string, Photo[]>);

  Object.values(photosByType).forEach(typePhotos => {
    typePhotos.sort((a, b) => b.date.getTime() - a.date.getTime());
  });

  const handlePhotoSelect = (photo: Photo) => {
    if (selectedPhotos.includes(photo)) {
      setSelectedPhotos(selectedPhotos.filter(p => p !== photo));
    } else if (selectedPhotos.length < 2) {
      setSelectedPhotos([...selectedPhotos, photo]);
    }
  };

  const handleCompare = () => {
    if (selectedPhotos.length === 2) {
      setIsCompareMode(true);
      setIsModalOpen(true);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setCurrentPhotoType('front')}
          className={`px-4 py-2 rounded-md ${
            currentPhotoType === 'front' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Front View
        </button>
        <button
          onClick={() => setCurrentPhotoType('side')}
          className={`px-4 py-2 rounded-md ${
            currentPhotoType === 'side' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Side View
        </button>
        <button
          onClick={() => setCurrentPhotoType('back')}
          className={`px-4 py-2 rounded-md ${
            currentPhotoType === 'back' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Back View
        </button>
      </div>

      {selectedPhotos.length > 0 && (
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600">
            {selectedPhotos.length} photo{selectedPhotos.length !== 1 ? 's' : ''} selected
          </div>
          <button
            onClick={handleCompare}
            disabled={selectedPhotos.length !== 2}
            className={`px-4 py-2 rounded-md ${
              selectedPhotos.length === 2
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-200 cursor-not-allowed'
            }`}
          >
            Compare Selected
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photosByType[currentPhotoType]?.map((photo, index) => (
          <div
            key={index}
            className={`relative cursor-pointer rounded-lg overflow-hidden ${
              selectedPhotos.includes(photo) ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => handlePhotoSelect(photo)}
          >
            <Image
              src={photo.url}
              alt={`Week ${photo.weekNumber} - ${photo.type} view`}
              width={300}
              height={400}
              className="object-cover w-full h-48"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              <div className="text-sm">Week {photo.weekNumber}</div>
              <div className="text-xs">{photo.date.toLocaleDateString()}</div>
            </div>
          </div>
        ))}
      </div>

      <Transition show={isModalOpen} as={React.Fragment}>
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />

            <div className="relative bg-white rounded-lg p-6 max-w-6xl w-full mx-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <span className="sr-only">Close</span>
                ×
              </button>

              {isCompareMode && selectedPhotos.length === 2 && (
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  {selectedPhotos.map((photo, index) => (
                    <div key={index} className="flex-1">
                      <div className="relative aspect-[3/4]">
                        <Image
                          src={photo.url}
                          alt={`Week ${photo.weekNumber} comparison`}
                          fill
                          className="object-cover rounded-lg"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
                          <div className="text-sm">Week {photo.weekNumber}</div>
                          <div className="text-xs">{photo.date.toLocaleDateString()}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
} 