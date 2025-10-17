import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout';
import {
  LayoutDashboard,
  FileText,
  Search,
  Eye
} from 'lucide-react';
import { requestsAPI } from '../../services/api';
import toast from 'react-hot-toast';

const OfficerDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const menuItems = [
    { path: '/officer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/officer/dashboard', label: 'Requests', icon: FileText },
  ];

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [searchTerm, statusFilter, requests]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await requestsAPI.getAll();
      setRequests(response.data.requests  []);
    } catch (error) {
      console.error('Error fetching requests:', error);
      // Mock data
      const mockRequests = [
        {
          id: 1,
          citizen_name: 'John Smith',
          service_name: 'Business License',
          status: 'pending',
          created_at: new Date().toISOString(),
          description: 'New business registration'
        },
        {
          id: 2,
          citizen_name: 'Jane Doe',
          service_name: 'ID Renewal',
          status: 'processing',
          created_at: new Date(Date.now() - 86400000).toISOString(),
          description: 'National ID renewal'
        },
        {
          id: 3,
          citizen_name: 'Bob Johnson',
          service_name: 'Building Permit',
          status: 'pending',
          created_at: new Date(Date.now() - 172800000).toISOString(),
          description: 'Construction permit'
        },
      ];
      setRequests(mockRequests);
    } finally {
      setLoading(false);
    }
  };

  const filterRequests = () => {
    let filtered = requests;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(req => req.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(req =>
        req.service_name?.toLowerCase().includes(searchTerm.toLowerCase()) 
        req.citizen_name?.toLowerCase().includes(searchTerm.toLowerCase()) 
        req.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRequests(filtered);
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'badge-pending',
      processing: 'badge-processing',
      approved: 'badge-approved',
      rejected: 'badge-rejected',
      completed: 'badge-completed',
    };
    return badges[status]  'badge-pending';
  };

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    processing: requests.filter(r => r.status === 'processing').length,
    approved: requests.filter(r => r.status === 'approved').length,
  };

  return (
    <Layout menuItems={menuItems} title="Officer Portal">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '32px' }}>
          Request Management
        </h2>{/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <FileText size={24} />
            </div>
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Requests</div>
          </div>
          <div className="stat-card accent">
            <div className="stat-icon">
              <FileText size={24} />
            </div>
            <div className="stat-value">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card secondary">
            <div className="stat-icon">
              <FileText size={24} />
            </div>
            <div className="stat-value">{stats.processing}</div>
            <div className="stat-label">Processing</div>
          </div>
          <div className="stat-card secondary">
            <div className="stat-icon">
              <FileText size={24} />
            </div>
            <div className="stat-value">{stats.approved}</div>
            <div className="stat-label">Approved</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="search-filter-bar">
          <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
            <div style={{ position: 'relative' }}>
              <Search
                size={20}
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)' }}
              />
              <input
                type="text"
                className="form-input"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '44px' }}
              />
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <select
              className="form-select filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>{/* Requests Table */}
        <div className="card">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <div className="spinner"></div>
              <p style={{ marginTop: '20px', color: 'var(--gray)' }}>Loading requests...</p>
            </div>
          ) : filteredRequests.length > 0 ? (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Citizen</th>
                    <th>Service</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request) => (
                    <tr key={request.id}>
                      <td><strong>#{request.id}</strong></td>
                      <td>{request.citizen_name || 'N/A'}</td>
                      <td>{request.service_name}</td>
                      <td>{request.description}</td>
                      <td>
                        <span className={badge ${getStatusBadge(request.status)}}>
                          {request.status}
                        </span>
                      </td>
                      <td>{new Date(request.created_at).toLocaleDateString()}</td>
                      <td>
                        <Link
                          to={/officer/request/${request.id}}
                          className="btn btn-outline btn-sm"
                        >
                          <Eye size={16} />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <FileText className="empty-state-icon" size={64} />
              <h3 className="empty-state-title">No Requests Found</h3>
              <p className="empty-state-text">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'No requests available'}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </Layout>
  );
};

export default OfficerDashboard;