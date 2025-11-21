import { useEffect, useState } from 'react';
import { Loader2, Shield, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Receipt {
  id: string;
  bookingId: string;
  type: 'BOOKING' | 'DELIVERY';
  status: 'PENDING' | 'COMPLETE';
  tokenId: string;
  serial: number;
  hashscanUrl: string;
  transactionId: string;
  mintedAt: string;
}

interface Booking {
  id: string;
  senderId: string;
  travelerId?: string;
  route?: string;
  usdcAmount?: number;
  status: 'PENDING' | 'COMPLETE';
  createdAt: string;
  receipts: Receipt[];
}

export default function SupportAdmin() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/bookings', { credentials: 'include' });
        if (!res.ok) {
          throw new Error(`Failed to load: ${res.status}`);
        }
        const data = (await res.json()) as Booking[];
        setBookings(data);
      } catch (err: any) {
        toast({
          title: 'Failed to load bookings',
          description: err?.message || 'Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [toast]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Shield className="w-6 h-6 text-blue-700" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Support / Admin</h1>
            <p className="text-gray-600 text-sm">
              Audit bookings and on-chain receipts (HashScan).
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Bookings</h2>
            {loading && (
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading…
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Receipts</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-4 py-3 text-sm font-mono text-gray-900">{booking.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{booking.route || '—'}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {booking.usdcAmount !== undefined ? `$${booking.usdcAmount.toFixed(2)} USDC` : '—'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          booking.status === 'COMPLETE'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm space-y-1">
                      {booking.receipts.length === 0 && <span className="text-gray-400 text-xs">No receipts</span>}
                      {booking.receipts.map((r) => (
                        <div key={r.id} className="flex items-center gap-2 text-xs">
                          <a
                            href={r.hashscanUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            <LinkIcon className="w-3 h-3" />
                            {r.type} #{r.serial}
                          </a>
                          <span className="text-gray-500">{r.status}</span>
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
