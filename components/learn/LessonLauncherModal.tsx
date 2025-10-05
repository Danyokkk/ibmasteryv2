import React from 'react';
import { Lesson } from '../../types';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import { LightbulbIcon } from '../IconComponents';

interface LessonLauncherModalProps {
  lesson: Lesson;
  onClose: () => void;
  onStart: () => void;
}

const LessonLauncherModal: React.FC<LessonLauncherModalProps> = ({ lesson, onClose, onStart }) => {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
             <LightbulbIcon className="h-6 w-6 text-primary" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-bold font-heading mb-2">{lesson.title}</h2>
        <p className="text-slate-500 mb-2">
          This is a <span className="font-semibold">{lesson.type}</span> lesson and will take approximately <span className="font-semibold">{lesson.duration} minutes</span> to complete.
        </p>
        <div className="my-4 space-y-2">
            <div className="font-semibold text-lg text-primary">+{lesson.xp || 100} XP</div>
            {lesson.atlSkills && lesson.atlSkills.length > 0 && (
                <div className="flex justify-center items-center gap-2 flex-wrap">
                    <span className="font-bold text-xs">ATL Focus:</span>
                    {lesson.atlSkills.map(skill => (
                        <span key={skill} className="text-xs bg-slate-100 text-slate-600 font-semibold px-2 py-1 rounded-full">{skill}</span>
                    ))}
                </div>
            )}
        </div>
        <div className="space-y-3 mt-6">
          <Button onClick={onStart} fullWidth size="lg">
            {lesson.completed ? 'Review Lesson' : 'Start Lesson'}
          </Button>
          <Button onClick={onClose} fullWidth variant="secondary">
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LessonLauncherModal;
