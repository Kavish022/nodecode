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
  id: string
  label: string
  icon: LucideIcon
  color: string
  files: BrickFile[] // Added this
}

export const brickTypes: BrickType[] = [
  {
    id: 'mongodb',
    label: 'MongoDB',
    icon: Database,
    color: 'text-green-500',
    files: [
      { name: 'schema.ts', content: '// MongoDB Schema\nexport const UserSchema = {};' },
      { name: 'connection.ts', content: 'const URL = "mongodb://localhost:27017";' }
    ]
  },
  // Repeat 'files' for other bricks like Express, Auth, etc.
]