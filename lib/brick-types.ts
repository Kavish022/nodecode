import { 
  type LucideIcon, 
  Database, 
  Server, 
  Lock, 
  Mail, 
  FileText, 
  Globe, 
  Zap 
} from 'lucide-react';

export interface BrickFile {
  name: string;
  content: string;
}

export interface BrickType {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  category: 'database' | 'server' | 'auth' | 'frontend'; // Added this
  files: BrickFile[];
  exportName?: string; // e.g., "dbClient"
}

export const brickTypes: BrickType[] = [
  {
    id: 'mongodb',
    label: 'MongoDB',
    category: 'database',
    icon: Database,
    color: 'text-green-500',
    exportName: 'connectDB',
    files: [
      { name: 'db.ts', content: 'export const connectDB = () => console.log("DB Connected");' }
    ]
  },
  {
    id: 'express',
    label: 'Express Server',
    category: 'server',
    icon: Server,
    color: 'text-blue-500',
    files: [
      { name: 'server.ts', content: '// Express Server init\n' }
    ]
  }
];