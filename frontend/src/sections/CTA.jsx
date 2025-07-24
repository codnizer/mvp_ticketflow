import {  NavLink, useNavigate } from "react-router";

export const CTA = () => {
  return (
    <div className="bg-coral-red text-white rounded-xl p-8 md:p-12 text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Workflow?</h2>
      <p className="mb-6 max-w-2xl mx-auto">
        Join thousands of teams who manage their work efficiently with TicketFlow
      </p>
      <NavLink 
        to="/sign-in" 
        className="btn btn-outline border-white text-white hover:bg-white hover:text-coral-red"
      >
        Get Started for Free
      </NavLink>
    </div>
  );
};