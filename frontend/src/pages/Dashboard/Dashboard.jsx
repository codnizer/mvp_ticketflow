import { FiFileText } from "react-icons/fi";
import { useNavigate } from "react-router";
import { UserContext } from '../../context/UserContext';
import { useEffect, useContext } from 'react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  }, [user, navigate]);

  return (
    <div className="max-w-screen-lg mx-auto mt-10 font-montserrat px-4">
      <h2 className='text-4xl font-montserrat text-coral-red font-bold my-6'>
        {user?.username} <span className='text-black'>Dashboard</span>
      </h2>
      
      <div className="flex justify-center p-6">
        {/* Simple Ticket Management Card */}
        <div className="card bg-white shadow-lg hover:shadow-xl transition-all w-full max-w-md">
          <div className="card-body flex flex-col items-center text-center">
            <div className="text-coral-red mb-4">
              <FiFileText className="text-4xl" />
            </div>
            <h2 className="card-title text-lg font-bold">Ticket Management</h2>
            <p className="text-sm text-gray-500 mb-4">Manage all support tickets in one place</p>
            <button 
              onClick={() => navigate('/dashboard/tickets')} 
              className="btn bg-coral-red hover:bg-coral-red/90 text-white w-full"
            >
              Manage Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;