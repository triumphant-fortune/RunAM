import { X, Send, User, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import PhoneVerification from './PhoneVerification';
import { validateNIN, validateEmail, validatePhoneNumber, validateFullName } from '@/lib/validation';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SignUpStep = 'form' | 'verification' | 'success';

export default function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [selectedRole, setSelectedRole] = useState<'sender' | 'traveler'>('sender');
  const [step, setStep] = useState<SignUpStep>('form');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    nin: '',
    travelFrequency: '',
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const nameValidation = validateFullName(formData.fullName);
    if (!nameValidation.valid) newErrors.fullName = nameValidation.error!;

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.valid) newErrors.email = emailValidation.error!;

    const phoneValidation = validatePhoneNumber(formData.phone);
    if (!phoneValidation.valid) newErrors.phone = phoneValidation.error!;

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    const ninValidation = validateNIN(formData.nin);
    if (!ninValidation.valid) newErrors.nin = ninValidation.error!;

    if (selectedRole === 'traveler' && !formData.travelFrequency) {
      newErrors.travelFrequency = 'Please select how often you travel';
    }

    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    
    setStep('verification');
  };

  const handleVerificationComplete = () => {
    setStep('success');
    
    toast({
      title: "Account Created Successfully!",
      description: `Welcome to RunAm, ${formData.fullName.split(' ')[0]}!`,
    });

    setTimeout(() => {
      onClose();
      const dashboardPath = selectedRole === 'sender' ? '/sender-dashboard' : '/traveler-dashboard';
      setLocation(dashboardPath);
    }, 2000);
  };

  const handleResendCode = () => {
    toast({
      title: "Code Resent",
      description: `Verification code sent to ${formData.phone}`,
    });
  };

  const handleClose = () => {
    setStep('form');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      city: '',
      nin: '',
      travelFrequency: '',
      agreedToTerms: false,
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          data-testid="button-close-modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {step === 'form' && (
            <>
              <h2 className="text-2xl font-bold text-[#2D6A4F] mb-6" data-testid="text-modal-title">
                Become A Runner
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <p className="text-sm text-gray-700 mb-3">I want to:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      type="button"
                      onClick={() => setSelectedRole('sender')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedRole === 'sender' 
                          ? 'border-[#2D6A4F] bg-[#E8F5E9]' 
                          : 'border-gray-200 bg-white'
                      }`}
                      data-testid="button-role-sender"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Send className="w-5 h-5 text-[#2D6A4F]" />
                        <span className="text-sm font-medium">Send Item</span>
                      </div>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setSelectedRole('traveler')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedRole === 'traveler' 
                          ? 'border-[#2D6A4F] bg-[#E8F5E9]' 
                          : 'border-gray-200 bg-white'
                      }`}
                      data-testid="button-role-traveler"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <User className="w-5 h-5 text-[#2D6A4F]" />
                        <span className="text-sm font-medium">Earn as a Traveler</span>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Full Name</label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:border-transparent ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      data-testid="input-full-name"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="jane@gmail.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      data-testid="input-email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+234 803 123 4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      data-testid="input-phone"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">City</label>
                    <input
                      type="text"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:border-transparent ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      data-testid="input-city"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      NIN (National Identification Number)
                    </label>
                    <input
                      type="text"
                      placeholder="12345678901 (11 digits)"
                      value={formData.nin}
                      onChange={(e) => handleInputChange('nin', e.target.value)}
                      maxLength={11}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:border-transparent ${
                        errors.nin ? 'border-red-500' : 'border-gray-300'
                      }`}
                      data-testid="input-nin"
                    />
                    {errors.nin && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.nin}
                      </p>
                    )}
                  </div>

                  {selectedRole === 'traveler' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">How often do you travel?</label>
                      <select
                        value={formData.travelFrequency}
                        onChange={(e) => handleInputChange('travelFrequency', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:border-transparent bg-white ${
                          errors.travelFrequency ? 'border-red-500' : 'border-gray-300'
                        }`}
                        data-testid="select-travel-frequency"
                      >
                        <option value="">Select Frequency</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="occasionally">Occasionally</option>
                      </select>
                      {errors.travelFrequency && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.travelFrequency}
                        </p>
                      )}
                    </div>
                  )}

                  <div>
                    <div className="flex items-start gap-2">
                      <input 
                        type="checkbox" 
                        id="terms"
                        checked={formData.agreedToTerms}
                        onChange={(e) => handleInputChange('agreedToTerms', e.target.checked)}
                        className="mt-1 w-4 h-4 text-[#2D6A4F] border-gray-300 rounded focus:ring-[#2D6A4F]"
                        data-testid="checkbox-terms"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        Agree to <span className="text-[#2D6A4F] font-medium">Terms</span> and <span className="text-[#2D6A4F] font-medium">Condition</span>
                      </label>
                    </div>
                    {errors.agreedToTerms && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.agreedToTerms}
                      </p>
                    )}
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#2D6A4F] hover:bg-[#2D6A4F]/90 text-white py-3.5 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" 
                    data-testid="button-create-account"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Create an Account'
                    )}
                  </button>

                  <p className="text-center text-sm text-gray-600">
                    Have an account? <button type="button" onClick={handleClose} className="text-[#2D6A4F] font-medium hover:underline" data-testid="button-sign-in-link">Sign in</button>
                  </p>
                </div>
              </form>
            </>
          )}

          {step === 'verification' && (
            <PhoneVerification
              phoneNumber={formData.phone}
              onVerified={handleVerificationComplete}
              onResend={handleResendCode}
            />
          )}

          {step === 'success' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to RunAm!</h3>
              <p className="text-gray-600">Redirecting to your dashboard...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
