export const motivationalQuotes = [
  { category: 'discipline', text: 'Discipline is choosing between what you want now and what you want most.' },
  { category: 'focus', text: 'Consistency beats intensity when intensity fades.' },
  { category: 'consistency', text: 'Small daily improvements are the key to staggering long-term results.' },
  { category: 'discipline', text: 'Motivation gets you started. Habit keeps you going.' },
  { category: 'focus', text: 'The secret to getting ahead is getting started.' },
  { category: 'consistency', text: 'Success is the sum of small efforts repeated day in and day out.' },
  { category: 'discipline', text: 'You don\'t have to be great to start, but you have to start to be great.' },
  { category: 'focus', text: 'The only way to do great work is to love what you do.' },
  { category: 'consistency', text: 'Champions keep playing until they get it right.' },
  { category: 'discipline', text: 'Your future is created by what you do today, not tomorrow.' },
  { category: 'focus', text: 'Focus on being productive instead of busy.' },
  { category: 'consistency', text: 'It\'s not about perfect. It\'s about effort.' },
  { category: 'discipline', text: 'Discipline is the bridge between goals and accomplishment.' },
  { category: 'focus', text: 'Where focus goes, energy flows.' },
  { category: 'consistency', text: 'Success is nothing more than a few simple disciplines, practiced every day.' },
];

export const getDailyQuote = (): string => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const index = dayOfYear % motivationalQuotes.length;
  return motivationalQuotes[index].text;
};
