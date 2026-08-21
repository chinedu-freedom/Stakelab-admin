'use client';

import { use } from 'react';
import AdminTransactionLogsPage from '../../../reports/transactions/page';

export default function UserTransactionLogsFilterPage({ params }) {
  const resolvedParams = use(params);
  const userId = resolvedParams?.userId || null;

  return <AdminTransactionLogsPage userId={userId} />;
}
