const steps = [
  {
    title: 'Create Tickets',
    desc: 'Easily create tickets with titles, descriptions and priorities'
  },
  {
    title: 'Track Progress',
    desc: 'Move tickets through todo → in progress → done'
  }
];

export const HowItWorks = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
      
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="bg-coral-red text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
              {index + 1}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-slate-gray">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};