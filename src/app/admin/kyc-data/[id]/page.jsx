'use client';

import { use } from 'react';
import AdminKycDataPage from '../../users/kyc-data/[id]/page';

export default function AdminKycDataAliasPage({ params }) {
  const resolvedParams = typeof params?.then === 'function' ? use(params) : (params || {});
  return <AdminKycDataPage params={resolvedParams} />;
}
