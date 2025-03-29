'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  CameraIcon,
  PhotoIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { checkInService, CheckInData } from '@/services/checkInService';
import CheckInQuestionnaire from '@/components/CheckInQuestionnaire';

export default function CheckIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showQuestionnaire, setShowQuestionnaire] = useState(true);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<Record<number, number>>({});
  const [weekNumber, setWeekNumber] = useState(1);
  const [checkInData, setCheckInData] = useState<CheckInData>({
    weight: '',
    measurements: {
      chest: '',
      waist: '',
      hips: '',
      arms: '',
      legs: '',
    },
    notes: '',
    photos: {
      front: null,
      back: null,
      side: null,
    },
  });

  const fileInputRefs = {
    front: useRef<HTMLInputElement>(null),
    back: useRef<HTMLInputElement>(null),
    side: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    // Fetch the week number from the service
    const fetchWeekNumber = async () => {
      try {
        // TODO: Replace with actual client ID
        const clientId = 'mock-client-id';
        const totalCheckIns = await checkInService.getClientCheckInCount(clientId);
        setWeekNumber(totalCheckIns + 1);
      } catch (err) {
        console.error('Error fetching week number:', err);
        // Default to week 1 if there's an error
        setWeekNumber(1);
      }
    };

    fetchWeekNumber();
  }, []);

  const handlePhotoUpload = (type: 'front' | 'back' | 'side', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCheckInData(prev => ({
        ...prev,
        photos: {
          ...prev.photos,
          [type]: file,
        },
      }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const value = e.target.value;
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setCheckInData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof CheckInData],
          [child]: value,
        },
      }));
    } else {
      setCheckInData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleQuestionnaireComplete = (answers: Record<number, number>) => {
    setQuestionnaireAnswers(answers);
    setShowQuestionnaire(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual client ID from auth context
      const clientId = 'mock-client-id';
      
      // Create client if doesn't exist
      await checkInService.ensureClientExists(clientId);
      
      await checkInService.submitCheckIn(clientId, {
        ...checkInData,
        questionnaireAnswers,
        weekNumber,
      });
      
      setSuccess(true);
      setTimeout(() => {
        router.push('/client/dashboard');
      }, 2000);
    } catch (err) {
      console.error('Submission error:', err);
      setError('Failed to submit check-in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Submit Check-in</h1>
              <span className="text-lg font-medium text-emerald-600">
                Week {weekNumber}
              </span>
            </div>

            {success ? (
              <div className="text-center py-12">
                <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Check-in submitted successfully!</h3>
                <p className="mt-1 text-sm text-gray-500">Redirecting to dashboard...</p>
              </div>
            ) : showQuestionnaire ? (
              <CheckInQuestionnaire onComplete={handleQuestionnaireComplete} />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Progress Photos Section */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Progress Photos</h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    {(['front', 'back', 'side'] as const).map((type) => (
                      <div key={type} className="relative">
                        <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden bg-gray-100">
                          {checkInData.photos[type] ? (
                            <img
                              src={URL.createObjectURL(checkInData.photos[type]!)}
                              alt={`${type} view`}
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <PhotoIcon className="h-12 w-12 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="mt-2">
                          <input
                            type="file"
                            ref={fileInputRefs[type]}
                            onChange={(e) => handlePhotoUpload(type, e)}
                            accept="image/*"
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRefs[type].current?.click()}
                            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                          >
                            <CameraIcon className="h-5 w-5 mr-2" />
                            {checkInData.photos[type] ? 'Change Photo' : 'Upload Photo'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Measurements Section */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Measurements</h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        id="weight"
                        value={checkInData.weight}
                        onChange={(e) => handleInputChange(e, 'weight')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                        required
                      />
                    </div>
                    {Object.entries(checkInData.measurements).map(([key, value]) => (
                      <div key={key}>
                        <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                          {key.charAt(0).toUpperCase() + key.slice(1)} (cm)
                        </label>
                        <input
                          type="number"
                          id={key}
                          value={value}
                          onChange={(e) => handleInputChange(e, `measurements.${key}`)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes Section */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Notes</h2>
                  <textarea
                    id="notes"
                    rows={4}
                    value={checkInData.notes}
                    onChange={(e) => handleInputChange(e, 'notes')}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    placeholder="Add any notes about your progress, challenges, or achievements..."
                  />
                </div>

                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">{error}</h3>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                        Submit Check-in
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 