'use client';

import { use } from 'react';
import AdminDepositDetailsPage from '../../../deposit/details/[id]/page';

export default function AdminDepositsDetailsAliasPage({ params }) {
  const resolvedParams = use(params);
  return <AdminDepositDetailsPage params={resolvedParams} />;
}
