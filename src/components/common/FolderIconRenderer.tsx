import React from 'react';
import {
  Folder,
  MessageSquare,
  Coins,
  Code,
  Palette,
  TrendingUp,
  Microscope,
  Zap,
  Bot,
  BookOpen,
  Target,
  Rocket,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';

interface FolderIconRendererProps {
  iconName?: string;
  className?: string;
  size?: number;
}

export const FolderIconRenderer: React.FC<FolderIconRendererProps> = ({
  iconName = 'folder',
  className = 'w-3.5 h-3.5',
  size,
}) => {
  const props = { className, ...(size ? { size } : {}) };

  switch (iconName?.toLowerCase()) {
    case 'message-square':
    case 'chat':
    case '💬':
      return <MessageSquare {...props} />;
    case 'coins':
    case 'crypto':
    case '🪙':
      return <Coins {...props} />;
    case 'code':
    case 'dev':
    case '💻':
      return <Code {...props} />;
    case 'palette':
    case 'ui':
    case '🎨':
      return <Palette {...props} />;
    case 'trending-up':
    case 'trading':
    case '📈':
      return <TrendingUp {...props} />;
    case 'microscope':
    case 'research':
    case '🔬':
      return <Microscope {...props} />;
    case 'zap':
    case '⚡':
      return <Zap {...props} />;
    case 'bot':
    case 'ai':
    case '🤖':
      return <Bot {...props} />;
    case 'book-open':
    case 'learn':
    case '📚':
      return <BookOpen {...props} />;
    case 'target':
    case '🎯':
      return <Target {...props} />;
    case 'rocket':
    case '🚀':
      return <Rocket {...props} />;
    case 'shield':
      return <Shield {...props} />;
    case 'layers':
      return <Layers {...props} />;
    case 'sparkles':
      return <Sparkles {...props} />;
    default:
      return <Folder {...props} />;
  }
};
