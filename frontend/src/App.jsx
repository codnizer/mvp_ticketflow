
import { Hero, Features, HowItWorks, CTA } from './sections';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pale-blue to-white-400">
      
      
      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-12 md:py-24">
          <Hero />
        </section>
        
        {/* Features Section */}
        <section className="py-12">
          <Features />
        </section>
        
        {/* How It Works */}
        <section className="py-12 bg-white rounded-xl shadow-sm">
          <HowItWorks />
        </section>
        
     
        
        {/* Call to Action */}
        <section className="py-12">
          <CTA />
        </section>
      </main>
      
    
    </div>
  );
};

export default App;