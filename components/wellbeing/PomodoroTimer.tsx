
import React, { useState, useEffect } from 'react';
import Card from '../shared/Card';
import Button from '../shared/Button';

const PomodoroTimer: React.FC = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive) {
            interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(interval!);
                        setIsActive(false);
                        setIsBreak(!isBreak);
                        setMinutes(isBreak ? 25 : 5); // 5 min break or 25 min session
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                }
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval!);
        }
        return () => clearInterval(interval!);
    }, [isActive, seconds, minutes, isBreak]);

    const toggle = () => {
        setIsActive(!isActive);
    };

    const reset = () => {
        setIsActive(false);
        setIsBreak(false);
        setMinutes(25);
        setSeconds(0);
    };

    return (
        <Card>
            <h2 className="text-lg font-heading font-extrabold text-text-neutral mb-4">Pomodoro Timer</h2>
            <div className="text-center">
                <p className="text-6xl font-bold font-mono text-primary">
                    {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                </p>
                <p className="text-slate-500">{isBreak ? "Time for a break!" : "Time to focus!"}</p>
            </div>
            <div className="flex justify-center space-x-4 mt-6">
                <Button onClick={toggle} variant={isActive ? 'danger' : 'primary'} size="lg">
                    {isActive ? 'Pause' : 'Start'}
                </Button>
                <Button onClick={reset} variant="secondary" size="lg">
                    Reset
                </Button>
            </div>
        </Card>
    );
};

export default PomodoroTimer;
