export const getEmotionByNumber = (num: number): string => {
  if (num === 0) return '😐';
  if (num < 0) return '😢';
  if (num > 1000000) return '🤑';
  if (num > 100000) return '🤩';
  if (num > 10000) return '😊';
  if (num > 1000) return '😄';
  return '🙂';
};

export const getColors = (num: number): { bg: string; text: string } => {
  if (num < 0) return { 
    bg: 'bg-red-100', 
    text: 'text-red-900'
  };
  if (num > 1000000) return { 
    bg: 'bg-purple-100', 
    text: 'text-purple-900'
  };
  if (num > 100000) return { 
    bg: 'bg-yellow-100', 
    text: 'text-yellow-900'
  };
  if (num > 10000) return { 
    bg: 'bg-green-100', 
    text: 'text-green-900'
  };
  if (num > 1000) return { 
    bg: 'bg-blue-100', 
    text: 'text-blue-900'
  };
  return { 
    bg: 'bg-slate-100', 
    text: 'text-slate-900'
  };
}; 