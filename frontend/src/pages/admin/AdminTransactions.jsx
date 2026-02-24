import React, { useMemo, useState } from 'react';
import { FiCalendar, FiDownload, FiFilter, FiLock } from 'react-icons/fi';
import AdminLayout from '../../components/Admin/AdminLayout';
import './AdminTransactions.css';

const transactionsSeed = [
  { id: 't-1001', userName: 'Riya Patel', plan: 'Pro', amount: 2999, method: 'Card · Visa', status: 'Paid', date: '2026-02-21T10:12:00Z' },
  { id: 't-1002', userName: 'Arjun Mehta', plan: 'Basic', amount: 999, method: 'UPI', status: 'Pending', date: '2026-02-22T09:30:00Z' },
  { id: 't-1003', userName: 'Nidhi Shah', plan: 'Enterprise', amount: 15999, method: 'Bank Transfer', status: 'Paid', date: '2026-02-20T16:22:00Z' },
  { id: 't-1004', userName: 'Dhruv Mehta', plan: 'Pro', amount: 2999, method: 'Card · Mastercard', status: 'Failed', date: '2026-02-19T11:08:00Z' },
  { id: 't-1005', userName: 'Aanya Desai', plan: 'Basic', amount: 999, method: 'Card · RuPay', status: 'Paid', date: '2026-02-18T14:44:00Z' },
];

export const AdminTransactions = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('7d');

  const filteredTransactions = useMemo(() => {
    const now = new Date();
    const days = dateFilter === '30d' ? 30 : dateFilter === '90d' ? 90 : 7;
    const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    return transactionsSeed.filter((entry) => {
      const matchesStatus = statusFilter === 'All' || entry.status === statusFilter;
      const entryDate = new Date(entry.date);
      const matchesDate = entryDate >= cutoff;
      return matchesStatus && matchesDate;
    });
  }, [statusFilter, dateFilter]);

  const revenueTotal = filteredTransactions
    .filter((entry) => entry.status === 'Paid')
    .reduce((sum, entry) => sum + entry.amount, 0);

  const handleDownloadInvoice = (entry) => {
    const content = [
      `Transaction ID: ${entry.id}`,
      `User: ${entry.userName}`,
      `Plan: ${entry.plan}`,
      `Amount: ₹${entry.amount}`,
      `Method: ${entry.method}`,
      `Status: ${entry.status}`,
      `Date: ${new Date(entry.date).toLocaleString()}`
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${entry.id}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <section className="admin-transaction-page">
        <header className="admin-transaction-header">
          <div>
            <h1>Transaction Management</h1>
            <p>Securely monitor billing activity, payment status and invoice delivery.</p>
          </div>
          <div className="admin-transaction-summary">
            <FiLock />
            <div>
              <span>Revenue (filtered)</span>
              <strong>₹{revenueTotal.toLocaleString()}</strong>
            </div>
          </div>
        </header>

        <div className="admin-transaction-controls">
          <div className="admin-transaction-filters">
            <label>
              <FiCalendar />
              <select value={dateFilter} onChange={(event) => setDateFilter(event.target.value)}>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </label>

            <label>
              <FiFilter />
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                <option value="All">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </label>
          </div>
        </div>

        <div className="admin-transaction-table-wrap">
          <table className="admin-transaction-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Date</th>
                <th>Invoice Download</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.userName}</td>
                  <td>{entry.plan}</td>
                  <td>₹{entry.amount.toLocaleString()}</td>
                  <td>{entry.method}</td>
                  <td>
                    <span className={`transaction-status ${entry.status.toLowerCase()}`}>
                      {entry.status}
                    </span>
                  </td>
                  <td>{new Date(entry.date).toLocaleDateString()}</td>
                  <td>
                    <button type="button" className="transaction-download" onClick={() => handleDownloadInvoice(entry)}>
                      <FiDownload /> Download
                    </button>
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan="7" className="admin-transaction-empty">No transactions found for the selected filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AdminLayout>
  );
};
