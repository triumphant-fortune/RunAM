import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface PhoneVerificationProps {
  phoneNumber: string;
  onVerified: () => void;
  onResend: () => void;
  autoVerifyDemo?: boolean;
}

const DEMO_CODE = '123456';

export default function PhoneVerification({
  phoneNumber,
  onVerified,
  onResend,
  autoVerifyDemo = true,
}: PhoneVerificationProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  useEffect(() => {
    if (!autoVerifyDemo) return;
    setCode(DEMO_CODE.split(''));
    verifyCode(DEMO_CODE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoVerifyDemo]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
      verifyCode(newCode.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...code];
    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i];
    }
    setCode(newCode);

    if (pastedData.length === 6) {
      verifyCode(pastedData);
    } else {
      inputRefs.current[pastedData.length]?.focus();
    }
  };

  const verifyCode = async (codeToVerify: string) => {
    setIsVerifying(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 1500));

    if (codeToVerify === DEMO_CODE) {
      onVerified();
    } else {
      setError('Invalid verification code. Try 123456 for demo.');
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
    
    setIsVerifying(false);
  };

  const handleResend = () => {
    if (!canResend) return;
    
    onResend();
    setCountdown(30);
    setCanResend(false);
    setCode(['', '', '', '', '', '']);
    setError('');
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-testid="text-verify-title">
          Verify Your Phone Number
        </h3>
        <p className="text-sm text-gray-600" data-testid="text-verify-subtitle">
          We've sent a 6-digit code to
        </p>
        <p className="text-sm font-semibold text-gray-900 mt-1" data-testid="text-phone-display">
          {phoneNumber}
        </p>
        <p className="text-xs text-gray-500 mt-4">
          Demo: Use code <span className="font-mono font-semibold">123456</span>
        </p>
      </div>

      <div className="flex gap-2 justify-center" onPaste={handlePaste}>
        {code.map((digit, index) => (
          <input
            key={index}
            ref={el => inputRefs.current[index] = el}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(index, e.target.value)}
            onKeyDown={e => handleKeyDown(index, e)}
            disabled={isVerifying}
            className="w-12 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:border-[#2D8A54] focus:ring-2 focus:ring-[#2D8A54]/20 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid={`input-code-${index}`}
            autoFocus={index === 0}
          />
        ))}
      </div>

      {error && (
        <p className="text-sm text-red-600 text-center" data-testid="text-verification-error">
          {error}
        </p>
      )}

      {isVerifying && (
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Verifying...</span>
        </div>
      )}

      <div className="text-center pt-4">
        <p className="text-sm text-gray-600 mb-3">
          Didn't receive the code?
        </p>
        <Button
          type="button"
          variant="ghost"
          onClick={handleResend}
          disabled={!canResend}
          className="text-[#2D8A54] hover:text-[#2D8A54]/80"
          data-testid="button-resend-code"
        >
          {canResend ? 'Resend Code' : `Resend in ${countdown}s`}
        </Button>
      </div>
    </div>
  );
}
