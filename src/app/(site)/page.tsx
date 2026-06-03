import { AboutSection } from '@/sections/about'
import { CertificationsSection } from '@/sections/certifications'
import { ContactSection } from '@/sections/contact'
import { ExperienceSection } from '@/sections/experience'
import { HeroSection } from '@/sections/hero'
import { ProjectsSection } from '@/sections/projects'
import { ResearchSection } from '@/sections/research'
import { SkillsSection } from '@/sections/skills'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ResearchSection />
      <CertificationsSection />
      <ContactSection />
    </>
  )
}
