import type { SkillGroup } from '@/types'

export const skillGroups: SkillGroup[] = []
export const skillsByCategory: SkillGroup[] = [
  {
    label: 'Frontend',
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vite', 'Tailwind CSS', 'CSS Modules'],
  },
  {
    label: 'Backend',
    skills: ['Node.js', 'Express.js'],
  },
  {
    label: 'Database',
    skills: ['MySQL'],
  },
  {
    label: 'Programming Languages',
    skills: ['Python', 'JavaScript', 'TypeScript'],
  },
  {
    label: 'Data Science',
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Scikit-Learn'],
  },
  {
    label: 'Tools',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman'],
  },
]
