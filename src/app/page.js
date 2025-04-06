'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  const handleAddWithdrawal = () => {
    router.push('/withdrawal-form');
  };

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Payment Dashboard</h1>
        <p className="dashboard-subtitle">
          Schedule Crypto Withdrawals seamlessly with our secure and fast bot.
        </p>
        <button 
          onClick={handleAddWithdrawal}
          className="button"
        >
          Add Scheduled Withdrawal
        </button>
      </div>
    </div>
  );
}