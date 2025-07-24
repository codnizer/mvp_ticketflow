import {  NavLink, useNavigate } from "react-router";


export const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      <div className="md:w-1/2">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Simplify Your Workflow with <span className="text-coral-red">TicketFlow</span>
        </h1>
        <p className="text-slate-gray mb-6 text-lg">
          The intuitive ticket management system for teams that want to focus on what matters.
        </p>
        <div className="flex gap-4">
          <NavLink to="/register" className="btn bg-coral-red text-white hover:bg-coral-red/90">
            Start Free Trial
          </NavLink>
          <NavLink to="/features" className="btn btn-outline border-coral-red text-coral-red">
            Learn More
          </NavLink>
        </div>
      </div>
      <div className="md:w-1/2">
       {/*  <img 
          src="/images/hero-dashboard.png" 
          alt="Dashboard Preview" 
          className="rounded-xl shadow-2xl"
        /> */}
      </div>
    </div>
  );
};