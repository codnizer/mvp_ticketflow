const features = [
  {
    icon: '🚀',
    title: 'Lightning Fast',
    desc: 'Instant ticket updates across your team'
  },
  {
    icon: '🔒',
    title: 'Secure',
    desc: 'Enterprise-grade security with JWT'
  },
  {
    icon: '📊',
    title: 'Powerful Analytics',
    desc: 'Track progress with visual reports'
  }
];

export const Features = () => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-12">Why Choose TicketFlow</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="card bg-white p-6 shadow-md hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-slate-gray">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};