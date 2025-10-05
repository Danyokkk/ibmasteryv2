import React, { useState } from 'react';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';

const TeacherPortalPage: React.FC = () => {
    // Mock Data
    const teachers = [
        { id: 't1', name: 'Mr. Davies', subject: 'History', avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Davies' },
        { id: 't2', name: 'Ms. Gonzalez', subject: 'Biology', avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Gonzalez' },
    ];
    const messages = [
        { id: 'm1', teacher: 'Mr. Davies', preview: 'Hi Alex, I\'ve left some feedback on your EE draft. Great work on the analysis...', unread: true },
        { id: 'm2', teacher: 'Ms. Gonzalez', preview: 'Just a reminder that the lab report is due Friday. Let me know if you have questions.', unread: false },
    ];
    const assignments = [
        { id: 'a1', title: 'History Paper 2 Mock', status: 'Not Submitted', due: '3 days' },
        { id: 'a2', title: 'Cell Mitosis Lab Report', status: 'Graded: 6/7', due: 'Passed' },
    ];
    
    const [message, setMessage] = useState('');

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-heading font-extrabold text-text-primary">Teacher Portal</h1>
            <p className="text-slate-500 mt-1">Communicate with your teachers and track feedback.</p>
          </div>
          <Button>Add Teacher</Button>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Column: Inbox & Assignments */}
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <h2 className="text-lg font-heading font-extrabold text-text-neutral mb-4">Inbox</h2>
                <div className="space-y-3">
                    {messages.map(msg => (
                        <div key={msg.id} className="p-4 rounded-xl flex items-start gap-4 hover:bg-slate-50 cursor-pointer">
                            {msg.unread && <div className="w-2.5 h-2.5 rounded-full bg-secondary mt-1.5 flex-shrink-0"></div>}
                            <div className={msg.unread ? '' : 'pl-[14px]'}>
                                <p className={`font-extrabold text-sm ${msg.unread ? 'text-text-primary' : 'text-text-neutral'}`}>{msg.teacher}</p>
                                <p className="text-sm text-slate-500">{msg.preview}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <Card>
                <h2 className="text-lg font-heading font-extrabold text-text-neutral mb-4">Chat with Mr. Davies</h2>
                <div className="space-y-4 h-64 overflow-y-auto p-4 bg-slate-50 rounded-xl mb-4">
                    <div className="flex justify-start">
                        <div className="bg-slate-200 p-3 rounded-xl max-w-xs">
                            <p className="text-sm">Hi Alex, I've left some feedback on your EE draft. Great work on the analysis of primary sources!</p>
                        </div>
                    </div>
                     <div className="flex justify-end">
                        <div className="bg-secondary text-white p-3 rounded-xl max-w-xs">
                            <p className="text-sm">Thanks, Mr. Davies! I'll review it this afternoon.</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Input 
                        placeholder="Type your message..." 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-grow"
                    />
                    <Button onClick={() => alert('Message sent!')}>Send</Button>
                </div>
            </Card>

        </div>

        {/* Sidebar: Teacher List & Office Hours */}
        <div className="space-y-6">
            <Card>
                <h2 className="text-lg font-heading font-extrabold text-text-neutral mb-4">My Teachers</h2>
                <ul className="space-y-4">
                    {teachers.map(teacher => (
                        <li key={teacher.id} className="flex items-center gap-3">
                            <img src={teacher.avatar} alt={teacher.name} className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-extrabold text-sm">{teacher.name}</p>
                                <p className="text-xs text-slate-500">{teacher.subject}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </Card>
             <Card>
                <h2 className="text-lg font-heading font-extrabold text-text-neutral mb-4">Office Hours</h2>
                <p className="text-sm text-slate-500 mb-4">Book a slot to meet with one of your teachers.</p>
                <Button fullWidth variant="secondary">Book Appointment</Button>
            </Card>
        </div>

      </div>
    </div>
  );
};

export default TeacherPortalPage;