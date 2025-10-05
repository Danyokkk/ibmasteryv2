import React, { useState } from 'react';
import { User, LessonTopic, Lesson } from '../types';
import { Page } from '../App';
import { MOCK_LESSON_TOPICS } from '../constants';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import { CheckCircleIcon } from '../components/IconComponents';
import LessonLauncherModal from '../components/learn/LessonLauncherModal';

interface LearnPageProps {
  user: User;
  onStartLesson: (lesson: Lesson) => void;
  setActivePage: (page: Page) => void;
}

type LessonFilter = 'all' | 'quiz' | 'video' | 'reading';

const LearnPage: React.FC<LearnPageProps> = ({ user, onStartLesson, setActivePage }) => {
  const [selectedSubject, setSelectedSubject] = useState(user.subjects[0].subject.id);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [activeFilter, setActiveFilter] = useState<LessonFilter>('all');

  const topicsForSubject = MOCK_LESSON_TOPICS.filter(topic => topic.subjectId === selectedSubject);

  const filteredTopics = topicsForSubject.map(topic => ({
    ...topic,
    lessons: topic.lessons.filter(lesson => activeFilter === 'all' || lesson.type === activeFilter)
  })).filter(topic => topic.lessons.length > 0);

  const filterButtons: { label: string; filter: LessonFilter }[] = [
    { label: 'All', filter: 'all' },
    { label: 'Quizzes', filter: 'quiz' },
    { label: 'Videos', filter: 'video' },
    { label: 'Reading', filter: 'reading' },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-heading font-extrabold text-text-primary">Learn</h1>
        <p className="text-slate-500 mt-1">Interactive lessons and quizzes tailored to your subjects.</p>
      </header>

      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div className="flex space-x-2 border-b border-slate-200 overflow-x-auto">
          {user.subjects.map(({ subject, level }) => (
            <button
              key={subject.id}
              onClick={() => setSelectedSubject(subject.id)}
              className={`py-3 px-4 font-extrabold text-sm transition-colors whitespace-nowrap ${
                selectedSubject === subject.id
                  ? 'border-b-2 border-secondary text-secondary'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {subject.name} <span className="text-xs font-medium">{level}</span>
            </button>
          ))}
        </div>
        <Button variant="secondary" size="sm" onClick={() => setActivePage('Teachers')}>Contact Teacher</Button>
      </div>
      
      <div className="flex items-center gap-2 flex-wrap">
        {filterButtons.map(({ label, filter }) => (
            <Button key={filter} size="sm" variant={activeFilter === filter ? 'primary' : 'secondary'} onClick={() => setActiveFilter(filter)}>
                {label}
            </Button>
        ))}
      </div>


      <div className="space-y-6">
        {filteredTopics.length > 0 ? filteredTopics.map(topic => (
          <Card key={topic.id}>
            <h2 className="text-lg font-heading font-extrabold text-text-neutral mb-4">{topic.name}</h2>
            <ul className="space-y-3">
              {topic.lessons.map(lesson => (
                <li key={lesson.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center">
                     <CheckCircleIcon className={`w-6 h-6 mr-3 flex-shrink-0 ${lesson.completed ? 'text-success' : 'text-slate-300'}`} />
                    <div>
                      <p className="font-semibold text-text-neutral">{lesson.title}</p>
                      <p className="text-xs text-slate-500 capitalize">{lesson.type} &middot; {lesson.duration} mins &middot; {lesson.xp} XP</p>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => setSelectedLesson(lesson)} className="w-full sm:w-auto">
                    {lesson.completed ? 'Review' : 'Start'}
                  </Button>
                </li>
              ))}
            </ul>
          </Card>
        )) : (
            <Card className="text-center py-10">
                <p className="text-slate-500 font-semibold">No '{activeFilter}' lessons found for this subject.</p>
                <p className="text-sm text-slate-400 mt-1">Try selecting a different filter.</p>
            </Card>
        )}
      </div>
      
      {selectedLesson && (
        <LessonLauncherModal
          lesson={selectedLesson}
          onClose={() => setSelectedLesson(null)}
          onStart={() => { onStartLesson(selectedLesson); setSelectedLesson(null); }}
        />
      )}
    </div>
  );
};

export default LearnPage;