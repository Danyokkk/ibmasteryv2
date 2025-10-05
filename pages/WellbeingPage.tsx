
import Card from '../components/shared/Card';
import React from 'react';
import { MOCK_WELLBEING_ACTIVITIES } from '../constants';
import Button from '../components/shared/Button';
import PomodoroTimer from '../components/wellbeing/PomodoroTimer';

const WellbeingPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-heading font-extrabold text-text-primary">Stress Relief Hub</h1>
        <p className="text-slate-500 mt-1">Tools to help you stay balanced, focused, and healthy.</p>
      </header>
      
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PomodoroTimer />
            <Card>
                 <h2 className="text-lg font-heading font-extrabold text-text-neutral mb-4">Guided Exercises</h2>
                 <div className="space-y-3">
                    {MOCK_WELLBEING_ACTIVITIES.map(act => (
                        <div key={act.id} className="p-3 bg-slate-50 rounded-lg flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-sm">{act.title}</p>
                                <p className="text-xs text-slate-500 capitalize">{act.type} &middot; {act.duration}s</p>
                            </div>
                            <Button size="sm" variant="secondary">Start</Button>
                        </div>
                    ))}
                 </div>
            </Card>
       </div>

        <Card>
            <h2 className="text-lg font-heading font-extrabold text-text-neutral mb-2">Mental Health Resources</h2>
            <p className="text-sm text-slate-500 mb-4">It's okay to not be okay. If you need to talk to someone, help is available. These resources are a starting point, not a substitute for professional advice.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <a href="https://www.mentalhealth.gov/" target="_blank" rel="noopener noreferrer" className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <h3 className="font-bold text-secondary">MentalHealth.gov</h3>
                    <p className="text-sm text-slate-500 mt-1">Information and resources from the U.S. government.</p>
                </a>
                <a href="https://www.who.int/teams/mental-health-and-substance-use/mental-health-in-the-workplace" target="_blank" rel="noopener noreferrer" className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <h3 className="font-bold text-secondary">World Health Organization (WHO)</h3>
                    <p className="text-sm text-slate-500 mt-1">Global resources and information on mental wellbeing.</p>
                </a>
            </div>
        </Card>
    </div>
  );
};

export default WellbeingPage;
