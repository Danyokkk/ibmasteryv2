import React, { useState } from 'react';
import { User, AtlSkill } from '../types';
import StreakCounter from '../components/dashboard/StreakCounter';
import DiplomaProgress from '../components/dashboard/DiplomaProgress';
import UpcomingTasks from '../components/dashboard/UpcomingTasks';
import AtlSkillsChart from '../components/dashboard/AtlSkillsChart';
import Card from '../components/shared/Card';

interface DashboardPageProps {
  user: User;
}

const AtlSkillSelector: React.FC<{
    allSkills: User['atlSkills'], 
    focusedSkills: AtlSkill[], 
    onToggle: (skill: AtlSkill) => void 
}> = ({ allSkills, focusedSkills, onToggle }) => (
    <Card>
        <h3 className="text-lg font-heading font-bold mb-4">Set ATL Focus</h3>
        <ul className="space-y-2">
            {(Object.keys(allSkills) as AtlSkill[]).map(skill => (
                <li key={skill}>
                    <label className="flex items-center p-2 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                        <input
                            type="checkbox"
                            checked={focusedSkills.includes(skill)}
                            onChange={() => onToggle(skill)}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="ml-3 font-semibold text-sm">{skill}</span>
                    </label>
                </li>
            ))}
        </ul>
    </Card>
);


const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  const [focusedSkills, setFocusedSkills] = useState<AtlSkill[]>([]);

  const toggleFocusSkill = (skill: AtlSkill) => {
    setFocusedSkills(prev => 
        prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-heading font-extrabold text-text-primary">Welcome back, {user.firstName}!</h1>
        <p className="text-slate-500 mt-1">Here's your academic snapshot for today.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="md:col-span-2 lg:col-span-1">
          <StreakCounter streak={user.streak} />
        </div>
        <div className="md:col-span-2 lg:col-span-3">
            <UpcomingTasks events={user.timetable} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <DiplomaProgress user={user} />
        </div>
        <div className="space-y-6">
            <AtlSkillsChart skills={user.atlSkills} focusedSkills={focusedSkills} />
            <AtlSkillSelector allSkills={user.atlSkills} focusedSkills={focusedSkills} onToggle={toggleFocusSkill} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;