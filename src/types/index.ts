export type Project = {
  slug: string
  title: string
  description: string
  features: string[]
  technologies: string[]
}

export type ExperienceItem = {
  company: string
  role: string
  period: string
  highlights: string[]
}

export type SkillGroup = {
  label: string
  skills: string[]
}

export type ResearchItem = {
  title: string
  areas: string[]
  goal: string
}

export type Certification = {
  title: string
}

export type ContactLink = {
  label: string
  href: string
}

export type JourneySection = {
  id: string
  label: string
  concept: string
}
