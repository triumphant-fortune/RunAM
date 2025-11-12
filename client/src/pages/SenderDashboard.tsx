import { LayoutDashboard, Send, MapPin, Plane, Bell, User, AlertCircle, Package } from 'lucide-react';
import { useState } from 'react';
import logoImage from '@assets/logo_1761761867719.png';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import StarRating from '@/components/StarRating';
import { validateRequired, validatePositiveNumber } from '@/lib/validation';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

const mockTravelers = [
  { id: 1, name: 'Uche', rating: 4.8, route: 'Calabar → Lagos', from: 'Calabar', to: 'Lagos', available: '20kg available', availableKg: 20, pricePerKg: 5 },
  { id: 2, name: 'Inem', rating: 4.5, route: 'Calabar → Lagos', from: 'Calabar', to: 'Lagos', available: '20kg available', availableKg: 20, pricePerKg: 5 },
  { id: 3, name: 'Doria', rating: 5.0, route: 'Calabar → Lagos', from: 'Calabar', to: 'Lagos', available: '15kg available', availableKg: 15, pricePerKg: 7 },
];

interface ParcelFormData {
  pickupLocation: string;
  deliveryLocation: string;
  itemDescription: string;
  itemWeight: string;
  estimatedValue: string;
}

interface Booking {
  id: string;
  traveler: typeof mockTravelers[0];
  parcelData: ParcelFormData;
  deliveryFee: number;
  platformFee: number;
  total: number;
  status: string;
  createdAt: Date;
}

export default function SenderDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bookingStep, setBookingStep] = useState<'form' | 'travelers'>('form');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTraveler, setSelectedTraveler] = useState<typeof mockTravelers[0] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { toast } = useToast();

  const [formData, setFormData] = useState<ParcelFormData>({
    pickupLocation: '',
    deliveryLocation: '',
    itemDescription: '',
    itemWeight: '',
    estimatedValue: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const TRANSACTION_LIMIT = 50;

  const handleInputChange = (field: keyof ParcelFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    const pickupValidation = validateRequired(formData.pickupLocation, 'Pickup location');
    if (!pickupValidation.valid) errors.pickupLocation = pickupValidation.error!;

    const deliveryValidation = validateRequired(formData.deliveryLocation, 'Delivery location');
    if (!deliveryValidation.valid) errors.deliveryLocation = deliveryValidation.error!;

    const descriptionValidation = validateRequired(formData.itemDescription, 'Item description');
    if (!descriptionValidation.valid) errors.itemDescription = descriptionValidation.error!;

    const weightValidation = validatePositiveNumber(formData.itemWeight, 'Weight');
    if (!weightValidation.valid) errors.itemWeight = weightValidation.error!;

    const valueValidation = validatePositiveNumber(formData.estimatedValue, 'Estimated value');
    if (!valueValidation.valid) errors.estimatedValue = valueValidation.error!;

    if (valueValidation.valid && parseFloat(formData.estimatedValue) > TRANSACTION_LIMIT) {
      errors.estimatedValue = `New users have a $${TRANSACTION_LIMIT} transaction limit. Complete verification to increase your limit.`;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFindTravelers = () => {
    if (validateForm()) {
      setBookingStep('travelers');
      toast({
        title: 'Matching travelers found!',
        description: `Found ${mockTravelers.length} travelers on your route.`,
      });
    } else {
      toast({
        title: 'Form validation failed',
        description: 'Please fill in all required fields correctly.',
        variant: 'destructive',
      });
    }
  };

  const handleSelectTraveler = (traveler: typeof mockTravelers[0]) => {
    const itemValue = parseFloat(formData.estimatedValue);
    if (itemValue > TRANSACTION_LIMIT) {
      toast({
        title: 'Transaction limit exceeded',
        description: `New users have a $${TRANSACTION_LIMIT} transaction limit. Complete verification to increase your limit.`,
        variant: 'destructive',
      });
      return;
    }
    setSelectedTraveler(traveler);
    setShowConfirmModal(true);
  };

  const calculatePricing = () => {
    if (!selectedTraveler) return { deliveryFee: 0, platformFee: 0, total: 0 };
    
    const weight = parseFloat(formData.itemWeight);
    const deliveryFee = weight * selectedTraveler.pricePerKg;
    const platformFee = deliveryFee * 0.2;
    const total = deliveryFee + platformFee;

    return { deliveryFee, platformFee, total };
  };

  const handleConfirmBooking = async () => {
    if (!selectedTraveler) return;

    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));

    const pricing = calculatePricing();
    const newBooking: Booking = {
      id: `BK-${Date.now()}`,
      traveler: selectedTraveler,
      parcelData: { ...formData },
      deliveryFee: pricing.deliveryFee,
      platformFee: pricing.platformFee,
      total: pricing.total,
      status: 'Pending Pickup',
      createdAt: new Date(),
    };

    setBookings(prev => [newBooking, ...prev]);
    setIsLoading(false);
    setShowConfirmModal(false);
    setSelectedTraveler(null);
    
    setFormData({
      pickupLocation: '',
      deliveryLocation: '',
      itemDescription: '',
      itemWeight: '',
      estimatedValue: '',
    });
    setBookingStep('form');
    
    toast({
      title: 'Booking confirmed!',
      description: `Your parcel has been booked with ${newBooking.traveler.name}. Check "My Parcels" tab for details.`,
    });

    setActiveTab('parcels');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <img src={logoImage} alt="RunAm" className="h-8" />
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeTab === 'dashboard' 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            data-testid="button-nav-dashboard"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('send')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeTab === 'send' 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            data-testid="button-nav-send"
          >
            <Send className="w-5 h-5" />
            <span className="font-medium">Send Parcel</span>
          </button>

          <button
            onClick={() => setActiveTab('parcels')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeTab === 'parcels' 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            data-testid="button-nav-parcels"
          >
            <Package className="w-5 h-5" />
            <span className="font-medium">My Parcels</span>
          </button>

          <button
            onClick={() => setActiveTab('track')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeTab === 'track' 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            data-testid="button-nav-track"
          >
            <MapPin className="w-5 h-5" />
            <span className="font-medium">Track</span>
          </button>

          <button
            onClick={() => setActiveTab('travel')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeTab === 'travel' 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            data-testid="button-nav-travel"
          >
            <Plane className="w-5 h-5" />
            <span className="font-medium">Travel</span>
          </button>
        </nav>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-end gap-4">
          <button className="relative" data-testid="button-notifications">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center" data-testid="button-profile">
            <User className="w-5 h-5 text-gray-600" />
          </button>
        </header>

        <div className="flex-1 overflow-auto p-8">
          {activeTab === 'dashboard' ? (
            <AnalyticsDashboard />
          ) : activeTab === 'send' ? (
            <div className="max-w-7xl mx-auto">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start gap-3" data-testid="banner-transaction-limit">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    New User Limit: ${TRANSACTION_LIMIT} per transaction. Complete verification to increase your limit.
                  </p>
                </div>
              </div>

              {bookingStep === 'form' ? (
                <div className="bg-white rounded-xl p-8 shadow-sm max-w-2xl mx-auto">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8" data-testid="text-send-parcel-title">
                    Send a Parcel
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location *</label>
                      <input
                        type="text"
                        value={formData.pickupLocation}
                        onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                        placeholder="Enter pickup location"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] ${
                          formErrors.pickupLocation ? 'border-red-500' : 'border-gray-300'
                        }`}
                        data-testid="input-pickup-location"
                      />
                      {formErrors.pickupLocation && (
                        <p className="mt-1 text-sm text-red-600" data-testid="error-pickup-location">{formErrors.pickupLocation}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Location *</label>
                      <input
                        type="text"
                        value={formData.deliveryLocation}
                        onChange={(e) => handleInputChange('deliveryLocation', e.target.value)}
                        placeholder="Enter delivery location"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] ${
                          formErrors.deliveryLocation ? 'border-red-500' : 'border-gray-300'
                        }`}
                        data-testid="input-delivery-location"
                      />
                      {formErrors.deliveryLocation && (
                        <p className="mt-1 text-sm text-red-600" data-testid="error-delivery-location">{formErrors.deliveryLocation}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Item Description *</label>
                      <input
                        type="text"
                        value={formData.itemDescription}
                        onChange={(e) => handleInputChange('itemDescription', e.target.value)}
                        placeholder="What are you sending?"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] ${
                          formErrors.itemDescription ? 'border-red-500' : 'border-gray-300'
                        }`}
                        data-testid="input-item-description"
                      />
                      {formErrors.itemDescription && (
                        <p className="mt-1 text-sm text-red-600" data-testid="error-item-description">{formErrors.itemDescription}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Item Weight (kg) *</label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.itemWeight}
                        onChange={(e) => handleInputChange('itemWeight', e.target.value)}
                        placeholder="0.0"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] ${
                          formErrors.itemWeight ? 'border-red-500' : 'border-gray-300'
                        }`}
                        data-testid="input-item-weight"
                      />
                      {formErrors.itemWeight && (
                        <p className="mt-1 text-sm text-red-600" data-testid="error-item-weight">{formErrors.itemWeight}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Value (USD) *</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.estimatedValue}
                        onChange={(e) => handleInputChange('estimatedValue', e.target.value)}
                        placeholder="0.00"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] ${
                          formErrors.estimatedValue ? 'border-red-500' : 'border-gray-300'
                        }`}
                        data-testid="input-estimated-value"
                      />
                      {formErrors.estimatedValue && (
                        <p className="mt-1 text-sm text-red-600" data-testid="error-estimated-value">{formErrors.estimatedValue}</p>
                      )}
                    </div>

                    <button 
                      onClick={handleFindTravelers}
                      className="w-full bg-[#2D6A4F] hover:bg-[#2D6A4F]/90 text-white py-3.5 rounded-lg font-semibold transition-colors" 
                      data-testid="button-find-travelers"
                    >
                      Find Travelers
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-900" data-testid="text-matching-travelers-title">
                      Matching Travelers
                    </h2>
                    <button
                      onClick={() => setBookingStep('form')}
                      className="text-[#2D6A4F] hover:underline font-medium"
                      data-testid="button-back-to-form"
                    >
                      ← Back to form
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockTravelers.map((traveler) => (
                      <div key={traveler.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow" data-testid={`card-traveler-${traveler.id}`}>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1" data-testid={`text-traveler-name-${traveler.id}`}>{traveler.name}</h3>
                            <StarRating rating={traveler.rating} size="sm" />
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <p className="text-sm text-gray-600" data-testid={`text-traveler-route-${traveler.id}`}>
                            <span className="font-medium">Route:</span> {traveler.route}
                          </p>
                          <p className="text-sm text-gray-600" data-testid={`text-traveler-available-${traveler.id}`}>
                            <span className="font-medium">Available:</span> {traveler.available}
                          </p>
                          <p className="text-lg font-bold text-[#2D6A4F]" data-testid={`text-traveler-price-${traveler.id}`}>
                            ${traveler.pricePerKg}/kg
                          </p>
                        </div>

                        <button 
                          onClick={() => handleSelectTraveler(traveler)}
                          className="w-full bg-[#2D6A4F] hover:bg-[#2D6A4F]/90 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors" 
                          data-testid={`button-select-traveler-${traveler.id}`}
                        >
                          Select
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === 'parcels' ? (
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8" data-testid="text-my-parcels-title">
                My Parcels
              </h2>

              {bookings.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center" data-testid="empty-parcels">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">No parcels yet</p>
                  <p className="text-gray-500 mt-2">Book your first parcel to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-xl p-6 shadow-sm" data-testid={`booking-${booking.id}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1" data-testid={`text-booking-id-${booking.id}`}>
                            Booking {booking.id}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {new Date(booking.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-semibold" data-testid={`status-${booking.id}`}>
                          {booking.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Parcel Details</h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p><span className="font-medium">From:</span> {booking.parcelData.pickupLocation}</p>
                            <p><span className="font-medium">To:</span> {booking.parcelData.deliveryLocation}</p>
                            <p><span className="font-medium">Item:</span> {booking.parcelData.itemDescription}</p>
                            <p><span className="font-medium">Weight:</span> {booking.parcelData.itemWeight} kg</p>
                            <p><span className="font-medium">Value:</span> ${booking.parcelData.estimatedValue}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Traveler & Pricing</h4>
                          <div className="space-y-1 text-sm text-gray-600 mb-3">
                            <p><span className="font-medium">Traveler:</span> {booking.traveler.name}</p>
                            <StarRating rating={booking.traveler.rating} size="sm" />
                            <p><span className="font-medium">Route:</span> {booking.traveler.route}</p>
                          </div>
                          <div className="space-y-1 text-sm">
                            <p className="text-gray-600">Delivery Fee: <span className="font-medium">${booking.deliveryFee.toFixed(2)}</span></p>
                            <p className="text-gray-600">Platform Fee (20%): <span className="font-medium">${booking.platformFee.toFixed(2)}</span></p>
                            <p className="text-lg font-bold text-[#2D6A4F]">Total: ${booking.total.toFixed(2)} USDC</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="max-w-2xl" data-testid="modal-confirm-booking">
          <DialogHeader>
            <DialogTitle className="text-2xl">Confirm Booking</DialogTitle>
          </DialogHeader>

          {selectedTraveler && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Parcel Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-600">From:</span> <span className="font-medium">{formData.pickupLocation}</span></p>
                    <p><span className="text-gray-600">To:</span> <span className="font-medium">{formData.deliveryLocation}</span></p>
                    <p><span className="text-gray-600">Item:</span> <span className="font-medium">{formData.itemDescription}</span></p>
                    <p><span className="text-gray-600">Weight:</span> <span className="font-medium">{formData.itemWeight} kg</span></p>
                    <p><span className="text-gray-600">Value:</span> <span className="font-medium">${formData.estimatedValue}</span></p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Traveler Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-600">Name:</span> <span className="font-medium">{selectedTraveler.name}</span></p>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Rating:</span>
                      <StarRating rating={selectedTraveler.rating} size="sm" />
                    </div>
                    <p><span className="text-gray-600">Route:</span> <span className="font-medium">{selectedTraveler.route}</span></p>
                    <p><span className="text-gray-600">Available:</span> <span className="font-medium">{selectedTraveler.available}</span></p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">Price Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Item Value:</span>
                    <span className="font-medium">${parseFloat(formData.estimatedValue).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee ({formData.itemWeight} kg × ${selectedTraveler.pricePerKg}/kg):</span>
                    <span className="font-medium">${calculatePricing().deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Platform Fee (20%):</span>
                    <span className="font-medium">${calculatePricing().platformFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between">
                    <span className="font-bold text-lg">Total:</span>
                    <span className="font-bold text-lg text-[#2D6A4F]">${calculatePricing().total.toFixed(2)} USDC</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-3">
            <button
              onClick={() => setShowConfirmModal(false)}
              disabled={isLoading}
              className="px-6 py-2.5 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
              data-testid="button-cancel-booking"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmBooking}
              disabled={isLoading}
              className="px-6 py-2.5 bg-[#2D6A4F] hover:bg-[#2D6A4F]/90 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
              data-testid="button-confirm-booking"
            >
              {isLoading ? 'Confirming...' : 'Confirm Booking'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
