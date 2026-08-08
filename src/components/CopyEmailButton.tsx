'use client';

import { EMAIL } from '@/data/site';
import { copyEmail } from './copy';

export function CopyEmailButton({ className = 'btn-outline' }: { className?: string }) {
  return (
    <button className={className} onClick={copyEmail}>
      {EMAIL}
    </button>
  );
}
