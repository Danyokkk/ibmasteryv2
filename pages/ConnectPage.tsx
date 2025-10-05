import React from 'react';
import { User } from '../types';
import { MOCK_COMMUNITIES, MOCK_POSTS, MOCK_STUDY_BUDDIES } from '../constants';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';

interface ConnectPageProps {
  user: User;
}

const ConnectPage: React.FC<ConnectPageProps> = ({ user }) => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-heading font-extrabold text-text-primary">Connect</h1>
        <p className="text-slate-500 mt-1">Join study groups, ask questions, and collaborate with peers.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
             <textarea
                className="w-full p-3 border border-slate-200 rounded-2xl text-sm placeholder-slate-400 focus:ring-2 focus:ring-secondary focus:outline-none"
                rows={3}
                placeholder={`What's on your mind, ${user.firstName}?`}
             />
             <div className="flex justify-end mt-2">
                 <Button size="sm">Post</Button>
             </div>
          </Card>

          {MOCK_POSTS.map(post => (
            <Card key={post.id}>
                <div className="flex items-start space-x-3">
                    <img src={post.author.avatarUrl} alt={post.author.firstName} className="w-10 h-10 rounded-full"/>
                    <div>
                        <p className="font-extrabold text-sm text-text-neutral">{post.author.firstName}</p>
                        <p className="text-xs text-slate-400">{new Date(post.timestamp).toLocaleString()}</p>
                    </div>
                </div>
                <p className="my-4 text-sm text-text-primary">{post.content}</p>
                <div className="flex space-x-4 text-xs font-semibold text-slate-500">
                    <span>{post.likes} Likes</span>
                    <span>{post.comments} Comments</span>
                </div>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <h2 className="text-lg font-heading font-extrabold text-text-neutral mb-4">My Communities</h2>
            <ul className="space-y-2">
                {MOCK_COMMUNITIES.map(community => (
                    <li key={community.id} className="p-3 bg-slate-50 rounded-lg">
                        <p className="font-semibold text-sm text-text-neutral">{community.name}</p>
                        <p className="text-xs text-slate-500">{community.memberCount} members</p>
                    </li>
                ))}
            </ul>
          </Card>

          <Card>
            <h2 className="text-lg font-heading font-extrabold text-text-neutral mb-4">Find Study Buddies</h2>
            <ul className="space-y-4">
              {MOCK_STUDY_BUDDIES.map(buddy => (
                <li key={buddy.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={buddy.avatarUrl} alt={buddy.firstName} className="w-10 h-10 rounded-full"/>
                    <div>
                      <p className="font-bold text-sm text-text-neutral">{buddy.firstName} {buddy.lastName}</p>
                      <p className="text-xs text-slate-500">Shares {buddy.commonSubjects.length} subjects</p>
                    </div>
                  </div>
                  <Button size="sm" variant="secondary">Connect</Button>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConnectPage;