import { useState } from 'react';
import { Dashboard } from './components/layout/Dashboard';
import { CreateGoalForm } from './components/goals/CreateGoalForm';
import { Onboarding } from './components/onboarding/Onboarding';
import { useAppStore } from './stores/useAppStore';

function App() {
  const { user } = useAppStore();
  const [showCreateGoal, setShowCreateGoal] = useState(false);
  
  if (!user || !user.onboardingCompleted) {
    return <Onboarding />;
  }
  
  return (
    <>
      <Dashboard onCreateGoal={() => setShowCreateGoal(true)} />
      <CreateGoalForm
        isOpen={showCreateGoal}
        onClose={() => setShowCreateGoal(false)}
      />
    </>
  );
}

export default App;
