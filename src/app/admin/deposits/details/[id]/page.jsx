'use client';

import { use } from 'react';
import AdminDepositDetailsPage from '../../../deposit/details/[id]/page';

export default function AdminDepositsDetailsAliasPage({ params }) {
  const resolvedParams = typeof params?.then === 'function' ? use(params) : (params || {});
  return <AdminDepositDetailsPage params={resolvedParams} />;
}
