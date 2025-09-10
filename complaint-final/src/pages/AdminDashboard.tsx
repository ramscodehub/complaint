import { useState, useEffect, useMemo } from 'react';
import { type Complaint } from '../types';
import { getAllComplaints, updateComplaintStatus, deleteComplaint } from '../services/complaintService';

type FilterStatus = 'All' | 'Pending' | 'Resolved';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('All');

  const fetchComplaints = async () => {
    try {
      setIsLoading(true);
      const data = await getAllComplaints();
      setComplaints(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch complaints. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const filteredComplaints = useMemo(() => {
    if (activeFilter === 'All') {
      return complaints;
    }
    return complaints.filter(c => c.status === activeFilter);
  }, [complaints, activeFilter]);


  const handleToggleStatus = async (id: number, currentStatus: Complaint['status']) => {
    const newStatus = currentStatus === 'Pending' ? 'Resolved' : 'Pending';
    try {
      const updatedComplaint = await updateComplaintStatus(id, newStatus);
      setComplaints(complaints.map(c => c.id === id ? updatedComplaint : c));
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      try {
        await deleteComplaint(id);
        setComplaints(complaints.filter(c => c.id !== id));
      } catch (err) {
        alert('Failed to delete complaint.');
      }
    }
  };

  if (isLoading) {
    return <p className="text-center text-gray-400">Loading complaints...</p>;
  }

  if (error) {
    return <p className="text-center text-red-400">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-8 text-white">Admin Dashboard</h2>

      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveFilter('All')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeFilter === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-600 hover:bg-gray-500'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveFilter('Pending')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeFilter === 'Pending' ? 'bg-yellow-500 text-yellow-900' : 'bg-gray-600 hover:bg-gray-500'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setActiveFilter('Resolved')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeFilter === 'Resolved' ? 'bg-green-500 text-green-900' : 'bg-gray-600 hover:bg-gray-500'
          }`}
        >
          Resolved
        </button>
      </div>
      
      {filteredComplaints.length === 0 ? (
        <p className="text-center text-gray-400">No complaints match the current filter.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-700 rounded-lg">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="p-4 text-left text-sm font-semibold text-gray-300">Name</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-300">Email</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-300">Complaint</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-300">Submitted</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-300">Status</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint) => (
                <tr key={complaint.id} className="border-b border-gray-800 hover:bg-gray-600/50">
                  <td className="p-4 align-top">{complaint.name}</td>
                  <td className="p-4 align-top">{complaint.email}</td>
                  <td className="p-4 align-top whitespace-pre-wrap">{complaint.complaint}</td>
                  <td className="p-4 align-top">{new Date(complaint.created_at).toLocaleString()}</td>
                  <td className="p-4 align-top">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      complaint.status === 'Pending' ? 'bg-yellow-500 text-yellow-900' : 'bg-green-500 text-green-900'
                    }`}>
                      {complaint.status}
                    </span>
                  </td>
                  <td className="p-4 align-top flex items-start space-x-2">
                    <button
                      onClick={() => handleToggleStatus(complaint.id, complaint.status)}
                      className={`whitespace-nowrap px-3 py-1 rounded text-white text-xs font-semibold transition-colors ${
                        complaint.status === 'Pending' ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-600 hover:bg-yellow-700'
                      }`}
                    >
                      {complaint.status === 'Pending' ? 'Mark Resolved' : 'Mark Pending'}
                    </button>
                    <button
                      onClick={() => handleDelete(complaint.id)}
                      className="whitespace-nowrap px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-xs font-semibold transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;