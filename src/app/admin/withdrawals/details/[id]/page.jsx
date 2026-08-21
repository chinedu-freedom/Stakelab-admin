'use client';

import { use } from 'react';
import AdminWithdrawDetailsPage from '../../../withdraw/details/[id]/page';

export default function AdminWithdrawalsDetailsAliasPage({ params }) {
  const resolvedParams = use(params);
  return <AdminWithdrawDetailsPage params={resolvedParams} />;
}
