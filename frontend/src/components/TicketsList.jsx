import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const TicketsList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    priority: ''
  });
  const navigate = useNavigate();

  // Configure axios to send cookies with requests
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // Add filters as query parameters
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.priority) params.append('priority', filters.priority);
        
        const response = await axios.get(`http://localhost:5000/api/tickets?${params.toString()}`);
        setTickets(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // Handle unauthorized (redirect to login)
          navigate('/sign-in');
        } else {
          setError('Failed to load tickets. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [filters, navigate]);

  const handleEdit = (ticketId) => {
    navigate(`edit/${ticketId}`);
  };

  const handleDelete = async (ticketId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tickets/${ticketId}`);
      setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== ticketId));
    } catch (err) {
      console.error('Failed to delete ticket:', err);
      if (err.response && err.response.status === 401) {
        navigate('/sign-in');
      } else {
        setError('Failed to delete the ticket. Please try again.');
      }
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/tickets/${ticketId}/status`,
        { status: newStatus }
      );
      setTickets(prevTickets =>
        prevTickets.map(ticket =>
          ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      );
    } catch (err) {
      console.error('Failed to update status:', err);
      if (err.response && err.response.status === 401) {
        navigate('/sign-in');
      }
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading tickets...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 font-montserrat">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-4xl font-bold text-coral-red">
          Tickets <span className="text-black">Dashboard</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
          
          <select
            name="priority"
            value={filters.priority}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          
          <button 
            className="btn bg-coral-red text-white"
            onClick={() => navigate('add')}
          >
            Create Ticket
          </button>
        </div>
      </div>

      {tickets.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No tickets found. Create one to get started!</p>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{ticket.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{ticket.description}</p>
                  
                  <div className="flex gap-4 mt-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      ticket.status === 'todo' ? 'bg-yellow-100 text-yellow-800' :
                      ticket.status === 'inprogress' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.status}
                    </span>
                    
                    <span className={`px-2 py-1 rounded text-xs ${
                      ticket.priority === 'low' ? 'bg-gray-100 text-gray-800' :
                      ticket.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {ticket.priority} priority
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={ticket.status}
                    onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                    className="text-xs p-1 border rounded"
                  >
                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                  
                  <button
                    onClick={() => handleEdit(ticket.id)}
                    className="btn btn-primary text-white py-1 px-3 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(ticket.id)}
                    className="btn btn-error text-white py-1 px-3 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="mt-3 text-xs text-gray-500">
                Created: {new Date(ticket.created_at).toLocaleDateString()}
                {ticket.updated_at !== ticket.created_at && (
                  <span> • Updated: {new Date(ticket.updated_at).toLocaleDateString()}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketsList;