import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { RefreshCw } from 'lucide-react';
import { adminApi } from '@/api/admin.api';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/common/Loader';

export default function AdminSync() {
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['sync-logs'],
    queryFn: () => adminApi.syncLogs(),
  });

  const sync = useMutation({
    mutationFn: () => adminApi.triggerSync(),
    onSuccess: () => { toast.success('Sync started'); qc.invalidateQueries({ queryKey: ['sync-logs'] }); },
    onError: (e) => toast.error(e.message || 'Sync endpoint not available'),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl">Catalog Sync</h1>
        <Button onClick={() => sync.mutate()} disabled={sync.isPending}>
          <RefreshCw size={16} className={`mr-2 ${sync.isPending ? 'animate-spin' : ''}`} />
          {sync.isPending ? 'Syncing…' : 'Sync now'}
        </Button>
      </div>

      <p className="text-sm text-brand-muted mb-6">
        Pulls the latest product catalog from your Google Sheet. The cron also runs automatically every 5 minutes.
      </p>

      <h2 className="font-serif text-lg mt-10 mb-4">Recent Syncs</h2>
      {isLoading ? <Loader /> : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-brand-cream text-left">
              <tr>
                <th className="p-3">Started</th>
                <th className="p-3">Inserted</th>
                <th className="p-3">Updated</th>
                <th className="p-3">Deactivated</th>
                <th className="p-3">Errors</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-cream">
              {(data?.data || []).map((l, i) => (
                <tr key={i}>
                  <td className="p-3">{new Date(l.startedAt).toLocaleString('en-IN')}</td>
                  <td className="p-3">{l.inserted || 0}</td>
                  <td className="p-3">{l.updated || 0}</td>
                  <td className="p-3">{l.deactivated || 0}</td>
                  <td className="p-3">{l.errors?.length ? <span className="text-red-700">{l.errors.length}</span> : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!data?.data || data.data.length === 0) && <p className="text-center py-8 text-brand-muted">No sync history yet</p>}
        </div>
      )}
    </div>
  );
}
