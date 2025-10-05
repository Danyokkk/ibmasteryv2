// types.ts

export enum IBProgramme {
  DP = 'Diploma Programme',
  CP = 'Career-related Programme',
  MYP = 'Middle Years Programme',
}

export enum IBLevel {
  HL = 'Higher Level',
  SL = 'Standard Level',
}

export type SubjectGroup = 'Group 1: Studies in Language and Literature' | 'Group 2: Language Acquisition' | 'Group 3: Individuals and Societies' | 'Group 4: Sciences' | 'Group 5: Mathematics' | 'Group 6: The Arts';

export interface Subject {
  id: string;
  name: string;
  group: SubjectGroup;
}

export interface UserSubjectSelection {
  subject: Subject;
  level: IBLevel;
}

export type CoreStatus = 'on-track' | 'at-risk' | 'needs-attention';

export interface CoreProgress {
  tok: CoreStatus;
  ee: CoreStatus;
  cas: CoreStatus;
}

export type AtlSkill = 'Thinking' | 'Communication' | 'Social' | 'Self-management' | 'Research';

export interface SubjectProgress {
  completion: number; // percentage
  predictedScore: number; // out of 7
}

export type CalendarEventType = 'subject' | 'ia' | 'ee' | 'cas' | 'exam' | 'test' | 'personal';

export interface TimetableEvent {
  id: string;
  title: string;
  start: string; // ISO date string
  end: string;   // ISO date string
  type: CalendarEventType;
  completed: boolean;
  description?: string;
  subjectId?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  programme: IBProgramme;
  subjects: UserSubjectSelection[];
  streak: number;
  coreProgress: CoreProgress;
  subjectProgress: {
    [subjectId: string]: SubjectProgress;
  };
  atlSkills: {
    [key in AtlSkill]: number; // score out of 100
  };
  timetable: TimetableEvent[];
  onboardingComplete: boolean;
}

// For CorePage
export interface ExtendedEssay {
    id: string;
    researchQuestion: string;
    subject: string;
    supervisor: string;
    rubricProgress: {
        A: number;
        B: number;
        C: number;
        D: number;
        E: number;
    };
}

export type CASActivityType = 'Creativity' | 'Activity' | 'Service';
export type CASLearningOutcome = 'LO1' | 'LO2' | 'LO3' | 'LO4' | 'LO5' | 'LO6' | 'LO7';

export interface CASActivity {
    id: string;
    title: string;
    type: CASActivityType;
    hours: number;
    learningOutcomes: CASLearningOutcome[];
}

export interface CASPortfolio {
    activities: CASActivity[];
}

// For LearnPage
export interface Question {
    id: string;
    text: string;
    type: 'mcq' | 'frq'; // Multiple Choice, Free Response
    options?: string[];
    correctAnswer: string;
    explanation?: string;
}

export interface Lesson {
  id: string;
  title: string;
  subjectId: string;
  topicId: string;
  type: 'video' | 'quiz' | 'reading';
  duration: number; // in minutes
  completed: boolean;
  xp?: number;
  atlSkills?: AtlSkill[];
  content?: string;
  questions?: Question[];
}


export interface LessonTopic {
  id:string;
  name: string;
  subjectId: string;
  lessons: Lesson[];
}

// For ConnectPage
export interface Community {
    id: string;
    name: string;
    description: string;
    memberCount: number;
}

export interface Post {
    id: string;
    author: Pick<User, 'id' | 'firstName' | 'avatarUrl'>;
    content: string;
    timestamp: string; // ISO string
    likes: number;
    comments: number;
    communityId: string;
}

export interface StudyBuddy {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  programme: IBProgramme;
  commonSubjects: string[];
}