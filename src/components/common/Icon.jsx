import { icons } from 'lucide-react';

const Icon = ({ name, color = 'currentColor', size = 20 }) => {
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    console.warn(`Warning: Icon "${name}" not found. Please check the icon name.`);
    return null;
  }

  return <LucideIcon color={color} size={size} />;
};

export default Icon;
