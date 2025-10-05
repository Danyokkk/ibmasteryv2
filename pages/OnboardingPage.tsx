import { User, IBProgramme, IBLevel, UserSubjectSelection, Subject } from '../types';
import Card from '../components/shared/Card';
import React, { useState } from 'react';
import { GraduationCapIcon } from '../components/IconComponents';

// --- Step 1: User Details ---
interface UserDetailsProps {
    user: Partial<User>;
    onComplete: (details: {firstName: string, lastName: string, pronouns: string, yearGroup: string}) => void;
}
const UserDetails: React.FC<UserDetailsProps> = ({ user, onComplete }) => {
    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');
    const [pronouns, setPronouns] = useState('');
    const [yearGroup, setYearGroup] = useState('11');

    const canContinue = firstName.trim().length > 0 && lastName.trim().length > 0;

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-text-primary text-center mb-4">Tell us about yourself</h2>
            <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value.slice(0,60))} required />
                <Input label="Last Name" id="lastName" value={lastName} onChange={e => setLastName(e.target.value.slice(0,60))} required />
            </div>
             <Input label="Preferred Pronouns (Optional)" id="pronouns" value={pronouns} onChange={e => setPronouns(e.target.value)} placeholder="e.g., she/her, they/them" />
             <Input label="Year Group / Grade" id="yearGroup" value={yearGroup} onChange={e => setYearGroup(e.target.value)} placeholder="e.g., 11, 12" />
            <Button fullWidth onClick={() => onComplete({firstName, lastName, pronouns, yearGroup})} disabled={!canContinue}>Continue</Button>
        </div>
    )
}


// --- Step 2: Programme Selection ---
interface ProgrammeSelectionProps {
  onSelect: (programme: IBProgramme) => void;
}
const ProgrammeSelection: React.FC<ProgrammeSelectionProps> = ({ onSelect }) => (
    <div className="text-center">
        <h2 className="text-2xl font-extrabold text-text-primary mb-2">Choose Your Programme</h2>
        <p className="text-slate-500 mb-6">Let's personalize IBPolina for your academic journey.</p>
        <div className="space-y-4">
            <Card as="button" onClick={() => onSelect(IBProgramme.DP)} className="w-full text-left hover:border-secondary border-2 border-transparent">
                <h3 className="font-extrabold text-text-primary">Diploma Programme (DP)</h3>
                <p className="text-sm text-slate-600">The full IB Diploma with 6 subjects and the Core.</p>
            </Card>
            <Card as="button" onClick={() => onSelect(IBProgramme.CP)} className="w-full text-left hover:border-secondary border-2 border-transparent">
                 <h3 className="font-extrabold text-text-primary">Career-related Programme (CP)</h3>
                <p className="text-sm text-slate-600">A blend of DP courses and career-focused studies.</p>
            </Card>
             <Card as="button" onClick={() => onSelect(IBProgramme.MYP)} className="w-full text-left hover:border-secondary border-2 border-transparent">
                 <h3 className="font-extrabold text-text-primary">Middle Years Programme (MYP)</h3>
                <p className="text-sm text-slate-600">For students in earlier stages of their IB education.</p>
            </Card>
        </div>
    </div>
);

// --- Step 3: DP Subject Selection ---
interface DPSubjectSelectionProps {
    onComplete: (subjects: UserSubjectSelection[]) => void;
}
const DPSubjectSelection: React.FC<DPSubjectSelectionProps> = ({ onComplete }) => {
    const [selections, setSelections] = useState<UserSubjectSelection[]>([]);
    const MAX_HL = 3, MAX_SL = 3, TOTAL_SUBJECTS = 6;
    const hlCount = selections.filter(s => s.level === IBLevel.HL).length;
    const slCount = selections.filter(s => s.level === IBLevel.SL).length;

    const handleSelect = (subject: Subject, level: IBLevel) => {
        const existing = selections.find(s => s.subject.id === subject.id);
        if (existing) {
            if (existing.level === level) { // Deselect
                setSelections(selections.filter(s => s.subject.id !== subject.id));
            } else { // Switch level
                if (level === IBLevel.HL && hlCount >= MAX_HL) return;
                if (level === IBLevel.SL && slCount >= MAX_SL) return;
                setSelections(selections.map(s => s.subject.id === subject.id ? {...s, level} : s));
            }
        } else { // Add new
            if (selections.length >= TOTAL_SUBJECTS) return;
            if (level === IBLevel.HL && hlCount >= MAX_HL) return;
            if (level === IBLevel.SL && slCount >= MAX_SL) return;
            setSelections([...selections, { subject, level }]);
        }
    };
    
    const canFinish = hlCount === MAX_HL && slCount === MAX_SL;

    return (
        <div>
            <div className="text-center mb-6">
                <h2 className="text-2xl font-extrabold text-text-primary">Select Your DP Subjects</h2>
                <p className="text-slate-500">Choose 3 Higher Level (HL) and 3 Standard Level (SL) subjects.</p>
                <div className="mt-4 font-mono text-sm space-x-4">
                    <span className={hlCount === MAX_HL ? 'text-success font-bold' : 'text-text-neutral'}>HL: {hlCount}/{MAX_HL}</span>
                    <span className={slCount === MAX_SL ? 'text-success font-bold' : 'text-text-neutral'}>SL: {slCount}/{MAX_SL}</span>
                </div>
            </div>
            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                {IB_SUBJECTS.map(subject => {
                    const currentSelection = selections.find(s => s.subject.id === subject.id);
                    return (
                        <div key={subject.id} className="bg-white p-3 rounded-2xl shadow-soft">
                            <p className="font-semibold text-sm text-text-neutral">{subject.name}</p>
                            <p className="text-xs text-slate-400 mb-2">{subject.group}</p>
                            <div className="flex space-x-2">
                                <Button onClick={() => handleSelect(subject, IBLevel.HL)} size="sm" fullWidth variant={currentSelection?.level === IBLevel.HL ? 'primary' : 'secondary'}>HL</Button>
                                <Button onClick={() => handleSelect(subject, IBLevel.SL)} size="sm" fullWidth variant={currentSelection?.level === IBLevel.SL ? 'primary' : 'secondary'}>SL</Button>
                            </div>
                        </div>
                    )
                })}
            </div>
             <div className="mt-6">
                <Button onClick={() => onComplete(selections)} fullWidth disabled={!canFinish}>
                    Confirm Subjects & Start
                </Button>
            </div>
        </div>
    )
}

// --- Step 4: MYP Subject Selection ---
interface MYPSubjectSelectionProps {
    onComplete: (subjects: UserSubjectSelection[]) => void;
}
const MYPSubjectSelection: React.FC<MYPSubjectSelectionProps> = ({ onComplete }) => {
    const [selections, setSelections] = useState<UserSubjectSelection[]>([]);
    const TOTAL_SUBJECTS = 5;

    const handleSelect = (subject: Subject, level: IBLevel) => {
        const existing = selections.find(s => s.subject.id === subject.id);
        if (existing) {
            if (existing.level === level) { // Deselect
                setSelections(selections.filter(s => s.subject.id !== subject.id));
            } else { // Switch level
                setSelections(selections.map(s => s.subject.id === subject.id ? {...s, level} : s));
            }
        } else { // Add new
            if (selections.length >= TOTAL_SUBJECTS) return;
            setSelections([...selections, { subject, level }]);
        }
    };

    const canFinish = selections.length === TOTAL_SUBJECTS;

    return (
        <div>
            <div className="text-center mb-6">
                <h2 className="text-2xl font-extrabold text-text-primary">Select Your MYP Subjects</h2>
                <p className="text-slate-500">Choose {TOTAL_SUBJECTS} subjects for your programme.</p>
                <div className="mt-4 font-mono text-sm">
                    <span className={canFinish ? 'text-success font-bold' : 'text-text-neutral'}>
                        Selected: {selections.length}/{TOTAL_SUBJECTS}
                    </span>
                </div>
            </div>
            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
                {IB_SUBJECTS.map(subject => {
                    const currentSelection = selections.find(s => s.subject.id === subject.id);
                    return (
                        <Card
                            as="button"
                            key={subject.id}
                            onClick={() => handleSelect(subject, IBLevel.SL)}
                            className={`w-full text-left border-2 transition-all p-3 ${currentSelection?.level === IBLevel.SL ? 'border-primary bg-primary/5' : 'border-transparent'}`}
                        >
                            <p className="font-semibold text-sm text-text-neutral">{subject.name}</p>
                            <p className="text-xs text-slate-400">{subject.group}</p>
                        </Card>
                    );
                })}
            </div>
            <div className="mt-6">
                <Button
                    onClick={() => onComplete(selections)}
                    fullWidth
                    disabled={!canFinish}
                >
                    Confirm Subjects & Start
                </Button>
            </div>
        </div>
    );
};

// --- Step 5: CP Subject Selection ---
interface CPSubjectSelectionProps {
    onComplete: (subjects: UserSubjectSelection[]) => void;
}
const CPSubjectSelection: React.FC<CPSubjectSelectionProps> = ({ onComplete }) => {
    const [selections, setSelections] = useState<Subject[]>([]);
    const TOTAL_SUBJECTS = 3;

    const handleSelect = (subject: Subject) => {
        const isSelected = selections.some(s => s.id === subject.id);
        if (isSelected) {
            setSelections(selections.filter(s => s.id !== subject.id));
        } else {
            if (selections.length < TOTAL_SUBJECTS) {
                setSelections([...selections, subject]);
            }
        }
    };

    const canFinish = selections.length === TOTAL_SUBJECTS;

    return (
        <div>
            <div className="text-center mb-6">
                <h2 className="text-2xl font-extrabold text-text-primary">Select Your CP Subjects</h2>
                <p className="text-slate-500">Choose {TOTAL_SUBJECTS} DP subjects for your programme.</p>
                <div className="mt-4 font-mono text-sm">
                    <span className={canFinish ? 'text-success font-bold' : 'text-text-neutral'}>
                        Selected: {selections.length}/{TOTAL_SUBJECTS}
                    </span>
                </div>
            </div>
            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
                {IB_SUBJECTS.map(subject => {
                    const isSelected = selections.some(s => s.id === subject.id);
                    return (
                        <Card
                            as="button"
                            key={subject.id}
                            onClick={() => handleSelect(subject)}
                            className={`w-full text-left border-2 transition-all p-3 ${isSelected ? 'border-primary bg-primary/5' : 'border-transparent'}`}
                        >
                            <p className="font-semibold text-sm text-text-neutral">{subject.name}</p>
                            <p className="text-xs text-slate-400">{subject.group}</p>
                        </Card>
                    );
                })}
            </div>
            <div className="mt-6">
                <Button
                    onClick={() => onComplete(selections.map(s => ({ subject: s, level: IBLevel.SL })))}
                    fullWidth
                    disabled={!canFinish}
                >
                    Confirm Subjects & Start
                </Button>
            </div>
        </div>
    );
};


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
            subjectProgress[subject.id] = {
                completion: Math.floor(Math.random() * 40) + 10, // 10-50%
                predictedScore: Math.floor(Math.random() * 2) + 4, // 4-5
            };
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
            default: return <div>Onboarding Complete!</div>;
        }
    };

    return (
        <div className="min-h-screen bg-background-light flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md mx-auto">
                <div className="flex justify-center mb-6">
                    <GraduationCapIcon className="w-12 h-12 text-primary" />
                </div>
                <Card className="p-6 sm:p-8">
                    {renderStep()}
                </Card>
            </div>
        </div>
    );
};

export default OnboardingPage;