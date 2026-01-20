import { type LucideIcon, Database, Server, Lock, Mail, FileText, Globe, Zap } from 'lucide-react'

export interface BrickType {
  id: string
  label: string
  icon: LucideIcon
  color: string
}

export const brickTypes: BrickType[] = [
  {
    id: 'mongodb',
    label: 'MongoDB',
    icon: Database,
    color: 'text-green-500',
  },
  {
    id: 'express',
    label: 'Express',
    icon: Server,
    color: 'text-gray-400',
  },
  {
    id: 'auth',
    label: 'Auth',
    icon: Lock,
    color: 'text-blue-500',
  },
  {
    id: 'email',
    label: 'Email',
    icon: Mail,
    color: 'text-yellow-500',
  },
  {
    id: 'api',
    label: 'API',
    icon: Globe,
    color: 'text-purple-500',
  },
  {
    id: 'storage',
    label: 'Storage',
    icon: FileText,
    color: 'text-orange-500',
  },
  {
    id: 'queue',
    label: 'Queue',
    icon: Zap,
    color: 'text-cyan-500',
  },
]
