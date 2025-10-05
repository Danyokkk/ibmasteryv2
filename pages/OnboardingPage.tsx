import { User, IBProgramme, UserSubjectSelection } from '../types';
import Card from '../components/shared/Card';
import React, { useState } from 'react';

// NOTE: These are placeholder components. You will need to create them based on your project's needs.
// I've added basic implementations so the code runs without errors.
const UserDetails: React.FC<{ user: Partial<User>, onComplete: (details: any) => void }> = ({ onComplete }) => (
    <div><h2 className="text-xl font-bold mb-4">Your Details</h2><button className="bg-primary text-white px-4 py-2 rounded-lg" onClick={() => onComplete({ firstName: 'John', lastName: 'Doe', pronouns: 'he/him', yearGroup: '12' })}>Complete Details</button></div>
);
const ProgrammeSelection: React.FC<{ onSelect: (programme: IBProgramme) => void }> = ({ onSelect }) => (
    <div><h2 className="text-xl font-bold mb-4">Select Your Programme</h2><button className="bg-primary text-white px-4 py-2 rounded-lg" onClick={() => onSelect(IBProgramme.DP)}>Select DP</button></div>
);
const DPSubjectSelection: React.FC<{ onComplete: (subjects: UserSubjectSelection[]) => void }> = ({ onComplete }) => (
    <div><h2 className="text-xl font-bold mb-4">Select Your DP Subjects</h2><button className="bg-primary text-white px-4 py-2 rounded-lg" onClick={() => onComplete([])}>Complete DP Subjects</button></div>
);
const MYPSubjectSelection: React.FC<{ onComplete: (subjects: UserSubjectSelection[]) => void }> = ({ onComplete }) => (
    <div><h2 className="text-xl font-bold mb-4">Select Your MYP Subjects</h2><button className="bg-primary text-white px-4 py-2 rounded-lg" onClick={() => onComplete([])}>Complete MYP Subjects</button></div>
);
const CPSubjectSelection: React.FC<{ onComplete: (subjects: UserSubjectSelection[]) => void }> = ({ onComplete }) => (
    <div><h2 className="text-xl font-bold mb-4">Select Your CP Subjects</h2><button className="bg-primary text-white px-4 py-2 rounded-lg" onClick={() => onComplete([])}>Complete CP Subjects</button></div>
);

interface OnboardingPageProps {
    user: User;
    onComplete: (user: User) => void;
}

const OnboardingPage: React.FC<OnboardingPageProps> = ({ user, onComplete }) => {
    const [step, setStep] = useState(1);
    const [onboardingData, setOnboardingData] = useState<Partial<User>>({});

    const handleUserDetailsComplete = (details: {firstName: string, lastName: string, pronouns: string, yearGroup: string}) => {
        setOnboardingData(prev => ({ ...prev, firstName: details.firstName, lastName: details.lastName, pronouns: details.pronouns, yearGroup: details.yearGroup }));
        setStep(2);
    };

    const handleProgrammeSelect = (programme: IBProgramme) => {
        setOnboardingData(prev => ({ ...prev, programme }));
        if (programme === IBProgramme.DP) {
            setStep(3);
        } else if (programme === IBProgramme.MYP) {
            setStep(4);
        } else if (programme === IBProgramme.CP) {
            setStep(5);
        }
    };
    
    const handleSubjectSelectionComplete = (subjects: UserSubjectSelection[]) => {
        const subjectProgress: User['subjectProgress'] = {};
        subjects.forEach(({ subject }) => {
            if (subject) { // Check if subject is defined
                subjectProgress[subject.id] = {
                    completion: Math.floor(Math.random() * 40) + 10, // 10-50%
                    predictedScore: Math.floor(Math.random() * 2) + 4, // 4-5
                };
            }
        });

        const updatedUser: User = { ...user, ...onboardingData, subjects, subjectProgress, onboardingComplete: true };
        onComplete(updatedUser);
    };

    const renderStep = () => {
        switch(step) {
            case 1: return <UserDetails user={user} onComplete={handleUserDetailsComplete} />;
            case 2: return <ProgrammeSelection onSelect={handleProgrammeSelect} />;
            case 3: return <DPSubjectSelection onComplete={handleSubjectSelectionComplete} />;
            case 4: return <MYPSubjectSelection onComplete={handleSubjectSelectionComplete} />;
            case 5: return <CPSubjectSelection onComplete={handleSubjectSelectionComplete} />;
            default: return <div>Loading...</div>;
        }
    };
    
    return (
        <div className="bg-background-light w-full min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-lg mx-auto">
                 <div className="flex flex-col items-center text-center mb-8">
                    <div className="h-12 w-12 text-secondary" />
                    <h1 className="text-3xl font-heading font-extrabold text-secondary mt-2">Welcome to IB Mastery Hub</h1>
                </div>
                <Card className="p-8">
                    {renderStep()}
                </Card>
            </div>
        </div>
    );
};

export default OnboardingPage;