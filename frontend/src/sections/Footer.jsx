export const Footer = () => {
  return (
    <footer className="bg-white py-8 mt-12">
      <div className="container mx-auto px-4 text-center text-slate-gray">
        <p>© {new Date().getFullYear()} TicketFlow. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-coral-red">Terms</a>
          <a href="#" className="hover:text-coral-red">Privacy</a>
          <a href="#" className="hover:text-coral-red">Contact</a>
        </div>
      </div>
    </footer>
  );
};