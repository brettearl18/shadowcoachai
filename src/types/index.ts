export type UserRole = 'admin' | 'coach' | 'client';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  organizationId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Organization {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  questions: Question[];
  categories: Category[];
  createdBy: string;
  organizationId: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  type: 'multiple_choice' | 'scale' | 'text' | 'yes_no';
  text: string;
  categoryId: string;
  options?: string[];
  required: boolean;
  order: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  order: number;
}

export interface CheckIn {
  id: string;
  templateId: string;
  clientId: string;
  coachId: string;
  organizationId: string;
  responses: Response[];
  status: 'pending' | 'completed' | 'reviewed';
  scheduledFor: Date;
  submittedAt?: Date;
  reviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Response {
  questionId: string;
  answer: string | number | boolean;
  submittedAt: Date;
}

export interface AISummary {
  id: string;
  checkInId: string;
  content: string;
  recommendations: string[];
  createdAt: Date;
  updatedAt: Date;
} 