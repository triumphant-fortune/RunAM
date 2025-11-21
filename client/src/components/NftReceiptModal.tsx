import { ExternalLink, Check, FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface NftReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  route: string;
  amount: number;
  status: 'PENDING' | 'COMPLETE';
  timestamp: string;
  nftTokenId?: string;
  hashscanUrl?: string;
  serial?: number;
  tokenId?: string;
}

export default function NftReceiptModal({
  isOpen,
  onClose,
  bookingId,
  route,
  amount,
  status,
  timestamp,
  nftTokenId = '0.0.9876543',
  hashscanUrl,
  serial,
  tokenId,
}: NftReceiptModalProps) {
  const resolvedTokenId = tokenId || nftTokenId;
  const resolvedHashscanUrl =
    hashscanUrl || `https://hashscan.io/testnet/token/${resolvedTokenId}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md" data-testid="modal-nft-receipt">
        <DialogHeader>
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <DialogTitle className="text-2xl text-center">
            {status === 'COMPLETE' ? 'Delivery Complete!' : 'Booking Confirmed!'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <FileText className="w-4 h-4" />
              <span className="font-medium">NFT Receipt Details</span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID:</span>
                <span className="font-mono font-medium text-gray-900">{bookingId}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Route:</span>
                <span className="font-medium text-gray-900">{route}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-bold text-[#2D6A4F]">${amount.toFixed(2)} USDC</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium px-2 py-0.5 rounded text-xs ${
                  status === 'COMPLETE' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {status}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Timestamp:</span>
                <span className="font-medium text-gray-900">{timestamp}</span>
              </div>

              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">NFT Token ID:</span>
                  <span className="font-mono text-xs font-medium text-gray-900">
                    {resolvedTokenId}
                  </span>
                </div>
                {serial !== undefined && (
                  <div className="flex justify-between mt-1">
                    <span className="text-gray-600">Serial:</span>
                    <span className="font-mono text-xs font-medium text-gray-900">{serial}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-800 mb-2">
              ✓ This transaction has been permanently recorded on the Hedera blockchain as an NFT receipt.
            </p>
            <p className="text-xs text-blue-600">
              Your proof of {status === 'COMPLETE' ? 'delivery' : 'booking'} is immutable and verifiable.
            </p>
          </div>

          <a
            href={resolvedHashscanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#FFD700] hover:bg-[#FFD700]/90 text-gray-900 rounded-lg font-medium transition-colors"
            data-testid="button-view-hashscan"
          >
            <ExternalLink className="w-4 h-4" />
            View on HashScan
          </a>

          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
            data-testid="button-close-receipt"
          >
            Close
          </button>

          <p className="text-xs text-gray-500 text-center pt-2">
            Demo Mode: This is a simulated NFT receipt for testing purposes.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
