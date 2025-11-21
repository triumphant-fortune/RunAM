import { LayoutDashboard, Plane, Bell, User, Menu, X, MapPin, Package, Calendar, DollarSign, TrendingUp, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import logoImage from '@assets/logo_1761761867719.png';
import WalletButton from '@/components/WalletButton';
import ConnectWalletModal from '@/components/ConnectWalletModal';
import NftReceiptModal from '@/components/NftReceiptModal';
import { apiRequest } from '@/lib/queryClient';
import { useWallet } from '@/contexts/WalletContext';
import { validateRequired, validatePositiveNumber, validateFutureDate } from '@/lib/validation';
import { useToast } from '@/hooks/use-toast';

interface TripFormData {
  from: string;
  to: string;
  departureDate: string;
  availableSpace: string;
  pricePerKg: string;
}

interface Trip {
  id: string;
  from: string;
  to: string;
  departureDate: string;
  availableSpace: number;
  pricePerKg: number;
  createdAt: Date;
}

interface Parcel {
  id: number;
  sender: string;
  item: string;
  weight: number;
  value: number;
  pickup: string;
  delivery: string;
  paymentAmount: number;
}

interface AcceptedDelivery extends Parcel {
  acceptedAt: Date;
  tripId: string;
  delivered?: boolean;
  deliveredAt?: Date;
}

const mockParcels: Parcel[] = [
  { id: 1, sender: 'Uche', item: 'Documents', weight: 2, value: 100, pickup: 'Calabar', delivery: 'Lagos', paymentAmount: 10 },
  { id: 2, sender: 'Inem', item: 'Electronics', weight: 5, value: 500, pickup: 'Calabar', delivery: 'Lagos', paymentAmount: 25 },
  { id: 3, sender: 'Doria', item: 'Clothing', weight: 3, value: 150, pickup: 'Calabar', delivery: 'Lagos', paymentAmount: 15 },
  { id: 4, sender: 'Emeka', item: 'Books', weight: 4, value: 80, pickup: 'Port Harcourt', delivery: 'Abuja', paymentAmount: 20 },
  { id: 5, sender: 'Amina', item: 'Gifts', weight: 1.5, value: 200, pickup: 'Calabar', delivery: 'Lagos', paymentAmount: 7.5 },
];

export default function TravelerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [createdTrips, setCreatedTrips] = useState<Trip[]>([]);
  const [acceptedDeliveries, setAcceptedDeliveries] = useState<AcceptedDelivery[]>([]);
  const [currentTripForMatching, setCurrentTripForMatching] = useState<Trip | null>(null);
  const [showNftReceipt, setShowNftReceipt] = useState(false);
  const [deliveryReceipt, setDeliveryReceipt] = useState<{
    tokenId?: string;
    serial?: number;
    hashscanUrl?: string;
    transactionId?: string;
  } | null>(null);
  const [completedDelivery, setCompletedDelivery] = useState<AcceptedDelivery | null>(null);
  const { toast } = useToast();
  const { walletAddress } = useWallet();

  const [formData, setFormData] = useState<TripFormData>({
    from: '',
    to: '',
    departureDate: '',
    availableSpace: '',
    pricePerKg: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof TripFormData, value: string) => {
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

    const fromValidation = validateRequired(formData.from, 'From location');
    if (!fromValidation.valid) errors.from = fromValidation.error!;

    const toValidation = validateRequired(formData.to, 'To location');
    if (!toValidation.valid) errors.to = toValidation.error!;

    const dateValidation = validateFutureDate(formData.departureDate, 'Departure date');
    if (!dateValidation.valid) errors.departureDate = dateValidation.error!;

    const spaceValidation = validatePositiveNumber(formData.availableSpace, 'Available space');
    if (!spaceValidation.valid) errors.availableSpace = spaceValidation.error!;

    const priceValidation = validatePositiveNumber(formData.pricePerKg, 'Price per kg');
    if (!priceValidation.valid) errors.pricePerKg = priceValidation.error!;

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getMatchingParcels = (trip: Trip): Parcel[] => {
    return mockParcels.filter(parcel => 
      parcel.pickup.toLowerCase() === trip.from.toLowerCase() &&
      parcel.delivery.toLowerCase() === trip.to.toLowerCase() &&
      !acceptedDeliveries.some(ad => ad.id === parcel.id)
    );
  };

  const handleCreateTrip = async () => {
    if (!validateForm()) {
      toast({
        title: 'Form validation failed',
        description: 'Please fill in all required fields correctly.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newTrip: Trip = {
      id: `TR-${Date.now()}`,
      from: formData.from,
      to: formData.to,
      departureDate: formData.departureDate,
      availableSpace: parseFloat(formData.availableSpace),
      pricePerKg: parseFloat(formData.pricePerKg),
      createdAt: new Date(),
    };

    setCreatedTrips(prev => [newTrip, ...prev]);
    setCurrentTripForMatching(newTrip);
    setIsLoading(false);

    const matchingParcels = getMatchingParcels(newTrip);

    toast({
      title: 'Trip created successfully!',
      description: matchingParcels.length > 0 
        ? `Found ${matchingParcels.length} matching parcel(s) for your route.`
        : 'Your trip has been posted. We\'ll notify you when parcels match your route.',
    });

    setFormData({
      from: '',
      to: '',
      departureDate: '',
      availableSpace: '',
      pricePerKg: '',
    });
  };

  const handleAcceptDelivery = (parcel: Parcel) => {
    if (!currentTripForMatching) return;

    const acceptedDelivery: AcceptedDelivery = {
      ...parcel,
      acceptedAt: new Date(),
      tripId: currentTripForMatching.id,
      delivered: false,
    };

    setAcceptedDeliveries(prev => [acceptedDelivery, ...prev]);

    toast({
      title: 'Delivery accepted!',
      description: `You've accepted to deliver ${parcel.item} from ${parcel.sender}. Payment: $${parcel.paymentAmount} USDC`,
    });
  };

  const handleMarkAsDelivered = async (delivery: AcceptedDelivery) => {
    setIsLoading(true);
    const updatedDelivery: AcceptedDelivery = {
      ...delivery,
      delivered: true,
      deliveredAt: new Date(),
    };

    setAcceptedDeliveries(prev => 
      prev.map(d => d.id === delivery.id ? updatedDelivery : d)
    );

    setCompletedDelivery(updatedDelivery);
    try {
      const res = await apiRequest('POST', `/api/bookings/${delivery.id}/mint-delivery`, {
        bookingId: delivery.id.toString(),
        travelerId: walletAddress || 'demo-traveler',
      });
      const receipt = await res.json();
      setDeliveryReceipt(receipt);
      setShowNftReceipt(true);
      toast({
        title: 'Delivery confirmed on Hedera',
        description: 'NFT delivery receipt minted. View on HashScan.',
      });
    } catch (err: any) {
      toast({
        title: 'Mint failed',
        description: err?.message || 'Could not mint delivery receipt.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const matchingParcels = currentTripForMatching ? getMatchingParcels(currentTripForMatching) : [];

  return (
    <div className="flex h-screen bg-gray-50">
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={() => setIsMobileSidebarOpen(false)}
          data-testid="backdrop-overlay"
        />
      )}

      <div className={`${isMobileSidebarOpen ? 'fixed' : 'hidden'} lg:flex w-64 bg-white border-r border-gray-200 flex-col z-50 h-full transition-transform`}>
        <div className="p-6 flex items-center justify-between">
          <img src={logoImage} alt="RunAm" className="h-8" />
          <button 
            onClick={() => setIsMobileSidebarOpen(false)} 
            className="lg:hidden"
            data-testid="button-close-sidebar"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setIsMobileSidebarOpen(false);
            }}
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
            onClick={() => {
              setActiveTab('my-trips');
              setIsMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeTab === 'my-trips' 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            data-testid="button-nav-my-trips"
          >
            <Plane className="w-5 h-5" />
            <span className="font-medium">My Trips</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('track');
              setIsMobileSidebarOpen(false);
            }}
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
            onClick={() => {
              setActiveTab('analytics');
              setIsMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeTab === 'analytics' 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            data-testid="button-nav-analytics"
          >
            <TrendingUp className="w-5 h-5" />
            <span className="font-medium">Analytics</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('profile');
              setIsMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeTab === 'profile' 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            data-testid="button-nav-profile"
          >
            <User className="w-5 h-5" />
            <span className="font-medium">Profile</span>
          </button>
        </nav>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
          <button 
            onClick={() => setIsMobileSidebarOpen(true)} 
            className="lg:hidden"
            data-testid="button-hamburger-menu"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <WalletButton />
            <button className="relative" data-testid="button-notifications">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center" data-testid="button-profile">
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 sm:p-8">
          {activeTab === 'dashboard' ? (
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6" data-testid="text-create-trip-title">
                    Create Trip
                  </h2>
                  <p className="text-sm text-gray-600 mb-4 sm:mb-6">
                    Post your trip details and earn by delivering parcels along your route.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">From *</label>
                      <input
                        type="text"
                        value={formData.from}
                        onChange={(e) => handleInputChange('from', e.target.value)}
                        placeholder="e.g., Calabar"
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] text-sm sm:text-base ${
                          formErrors.from ? 'border-red-500' : 'border-gray-300'
                        }`}
                        data-testid="input-from"
                      />
                      {formErrors.from && (
                        <p className="mt-1 text-sm text-red-600" data-testid="error-from">{formErrors.from}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">To *</label>
                      <input
                        type="text"
                        value={formData.to}
                        onChange={(e) => handleInputChange('to', e.target.value)}
                        placeholder="e.g., Lagos"
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] text-sm sm:text-base ${
                          formErrors.to ? 'border-red-500' : 'border-gray-300'
                        }`}
                        data-testid="input-to"
                      />
                      {formErrors.to && (
                        <p className="mt-1 text-sm text-red-600" data-testid="error-to">{formErrors.to}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Departure Date *</label>
                      <input
                        type="date"
                        value={formData.departureDate}
                        onChange={(e) => handleInputChange('departureDate', e.target.value)}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] text-sm sm:text-base ${
                          formErrors.departureDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                        data-testid="input-departure-date"
                      />
                      {formErrors.departureDate && (
                        <p className="mt-1 text-sm text-red-600" data-testid="error-departure-date">{formErrors.departureDate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Available Space (kg) *</label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.availableSpace}
                        onChange={(e) => handleInputChange('availableSpace', e.target.value)}
                        placeholder="e.g., 20"
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] text-sm sm:text-base ${
                          formErrors.availableSpace ? 'border-red-500' : 'border-gray-300'
                        }`}
                        data-testid="input-available-space"
                      />
                      {formErrors.availableSpace && (
                        <p className="mt-1 text-sm text-red-600" data-testid="error-available-space">{formErrors.availableSpace}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price per kg (USDC) *</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.pricePerKg}
                        onChange={(e) => handleInputChange('pricePerKg', e.target.value)}
                        placeholder="e.g., 5.00"
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] text-sm sm:text-base ${
                          formErrors.pricePerKg ? 'border-red-500' : 'border-gray-300'
                        }`}
                        data-testid="input-price-per-kg"
                      />
                      {formErrors.pricePerKg && (
                        <p className="mt-1 text-sm text-red-600" data-testid="error-price-per-kg">{formErrors.pricePerKg}</p>
                      )}
                    </div>

                    <button 
                      onClick={handleCreateTrip}
                      disabled={isLoading}
                      className="w-full bg-[#2D6A4F] hover:bg-[#2D6A4F]/90 text-white py-3 sm:py-3.5 rounded-lg font-semibold transition-colors disabled:opacity-50 text-sm sm:text-base min-h-[44px]" 
                      data-testid="button-create-trip"
                    >
                      {isLoading ? 'Creating Trip...' : 'Create Trip'}
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
                  <div className="mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2" data-testid="text-matching-parcels-title">
                      Matching Parcels
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-medium text-gray-900">USDC Payment Active</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>

                  {!currentTripForMatching ? (
                    <div className="text-center py-8 sm:py-12" data-testid="empty-matching-parcels">
                      <Package className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 text-sm sm:text-base">Create a trip to see matching parcels</p>
                    </div>
                  ) : matchingParcels.length === 0 ? (
                    <div className="text-center py-8 sm:py-12" data-testid="no-matching-parcels">
                      <Package className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 text-sm sm:text-base">No matching parcels found for this route</p>
                      <p className="text-gray-500 text-xs sm:text-sm mt-2">We'll notify you when parcels become available</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {matchingParcels.map((parcel) => (
                        <div key={parcel.id} className="border border-gray-200 rounded-lg p-3 sm:p-4" data-testid={`card-parcel-${parcel.id}`}>
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-gray-900 text-sm sm:text-base">{parcel.sender}</h3>
                                <span className="text-yellow-500 text-sm">★ 4.8</span>
                              </div>
                              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                                <span className="font-medium">Item:</span> {parcel.item} ({parcel.weight}kg)
                              </p>
                              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                                <span className="font-medium">Route:</span> {parcel.pickup} → {parcel.delivery}
                              </p>
                              <p className="text-xs sm:text-sm text-gray-600">
                                <span className="font-medium">Value:</span> ${parcel.value}
                              </p>
                            </div>
                            <button 
                              onClick={() => handleAcceptDelivery(parcel)}
                              className="w-full sm:w-auto bg-[#2D6A4F] hover:bg-[#2D6A4F]/90 text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors min-h-[44px]" 
                              data-testid={`button-accept-${parcel.id}`}
                            >
                              Accept Delivery
                            </button>
                          </div>
                          <div className="pt-2 border-t border-gray-100">
                            <p className="text-sm sm:text-base font-bold text-[#2D6A4F]" data-testid={`text-payment-${parcel.id}`}>
                              Payment: ${parcel.paymentAmount} USDC
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : activeTab === 'my-trips' ? (
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8" data-testid="text-my-trips-title">
                My Trips
              </h2>

              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4" data-testid="text-created-trips-title">
                    Created Trips
                  </h3>
                  {createdTrips.length === 0 ? (
                    <div className="bg-white rounded-xl p-8 sm:p-12 text-center" data-testid="empty-created-trips">
                      <Plane className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 text-sm sm:text-lg">No trips created yet</p>
                      <p className="text-gray-500 text-xs sm:text-sm mt-2">Create your first trip to start earning</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {createdTrips.map((trip) => (
                        <div key={trip.id} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200" data-testid={`card-trip-${trip.id}`}>
                          <div className="mb-3">
                            <p className="text-xs sm:text-sm text-gray-500 mb-1">Trip ID: {trip.id}</p>
                            <p className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                              {trip.from} → {trip.to}
                            </p>
                          </div>
                          <div className="space-y-1.5 text-xs sm:text-sm text-gray-600">
                            <p className="flex items-center gap-2">
                              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                              {new Date(trip.departureDate).toLocaleDateString()}
                            </p>
                            <p className="flex items-center gap-2">
                              <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                              {trip.availableSpace}kg available
                            </p>
                            <p className="flex items-center gap-2">
                              <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                              ${trip.pricePerKg}/kg
                            </p>
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <p className="text-xs text-gray-500">
                              Created {new Date(trip.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4" data-testid="text-accepted-deliveries-title">
                    Accepted Deliveries
                  </h3>
                  {acceptedDeliveries.length === 0 ? (
                    <div className="bg-white rounded-xl p-8 sm:p-12 text-center" data-testid="empty-accepted-deliveries">
                      <Package className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 text-sm sm:text-lg">No accepted deliveries yet</p>
                      <p className="text-gray-500 text-xs sm:text-sm mt-2">Accept parcels from the dashboard to see them here</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {acceptedDeliveries.map((delivery) => (
                        <div key={`${delivery.id}-${delivery.acceptedAt}`} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm" data-testid={`card-delivery-${delivery.id}`}>
                          <div className="flex flex-col gap-4">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-6">
                              <div className="flex-1">
                                <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-2">
                                  Parcel from {delivery.sender}
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-600">
                                  <div>
                                    <p><span className="font-medium">Item:</span> {delivery.item}</p>
                                    <p><span className="font-medium">Weight:</span> {delivery.weight}kg</p>
                                    <p><span className="font-medium">Value:</span> ${delivery.value}</p>
                                  </div>
                                  <div>
                                    <p><span className="font-medium">Pickup:</span> {delivery.pickup}</p>
                                    <p><span className="font-medium">Delivery:</span> {delivery.delivery}</p>
                                    <p><span className="font-medium">Trip ID:</span> {delivery.tripId}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="sm:text-right">
                                <p className="text-base sm:text-lg font-bold text-[#2D6A4F] mb-2">
                                  ${delivery.paymentAmount} USDC
                                </p>
                                {delivery.delivered ? (
                                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                    Delivered
                                  </span>
                                ) : (
                                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                    In Transit
                                  </span>
                                )}
                              </div>
                            </div>
                            {!delivery.delivered && (
                              <div className="pt-3 border-t border-gray-200">
                                <button
                                  onClick={() => handleMarkAsDelivered(delivery)}
                                  disabled={isLoading}
                                  className="w-full sm:w-auto px-6 py-2.5 bg-[#2D6A4F] hover:bg-[#2D6A4F]/90 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                  data-testid={`button-mark-delivered-${delivery.id}`}
                                >
                                  <CheckCircle className="w-4 h-4" />
                                  {isLoading ? 'Processing...' : 'Mark as Delivered'}
                                </button>
                              </div>
                            )}
                            {delivery.delivered && delivery.deliveredAt && (
                              <div className="pt-3 border-t border-gray-200 text-xs text-gray-500">
                                Delivered on {new Date(delivery.deliveredAt).toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : activeTab === 'track' ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-12 sm:p-16 text-center shadow-sm" data-testid="section-track-coming-soon">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#2D6A4F]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="w-10 h-10 sm:w-12 sm:h-12 text-[#2D6A4F]" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" data-testid="text-coming-soon-title">
                    Coming Soon
                  </h2>
                  <p className="text-lg text-gray-600 mb-3">
                    Real-time delivery tracking
                  </p>
                  <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                    Track your active deliveries in real-time with live location updates, pickup confirmations, and delivery notifications. Keep your senders informed with automated status updates throughout the delivery journey.
                  </p>
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-2 text-[#2D6A4F]">
                      <div className="w-2 h-2 bg-[#2D6A4F] rounded-full animate-pulse"></div>
                      <p className="text-sm font-medium">Feature in development</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'analytics' ? (
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Analytics</h2>
              <div className="bg-white rounded-xl p-8 sm:p-12 text-center">
                <TrendingUp className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-sm sm:text-base">Analytics features coming soon</p>
              </div>
            </div>
          ) : activeTab === 'profile' ? (
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Profile</h2>
              <div className="bg-white rounded-xl p-8 sm:p-12 text-center">
                <User className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-sm sm:text-base">Profile settings coming soon</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <ConnectWalletModal />

      {completedDelivery && (
        <NftReceiptModal
          isOpen={showNftReceipt}
          onClose={() => {
            setShowNftReceipt(false);
            setDeliveryReceipt(null);
            toast({
              title: 'Delivery completed!',
              description: `You've successfully delivered ${completedDelivery.item}. Your earnings of $${completedDelivery.paymentAmount} USDC have been released.`,
            });
          }}
          bookingId={`DL-${completedDelivery.id}`}
          route={`${completedDelivery.pickup} → ${completedDelivery.delivery}`}
          amount={completedDelivery.paymentAmount}
          status="COMPLETE"
          timestamp={completedDelivery.deliveredAt?.toLocaleString() || new Date().toLocaleString()}
          nftTokenId={deliveryReceipt?.tokenId}
          tokenId={deliveryReceipt?.tokenId}
          serial={deliveryReceipt?.serial}
          hashscanUrl={deliveryReceipt?.hashscanUrl}
        />
      )}
    </div>
  );
}
