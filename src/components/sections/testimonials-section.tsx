import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-01/testimonials-component-01'
import type { TestimonialItem } from '@/components/shadcn-studio/blocks/testimonials-component-01/testimonials-component-01'

const testimonials: TestimonialItem[] = [
  {
    name: 'Craig Bator',
    role: 'CEO & Co Founder',
    company: 'Zendesk',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png?width=40&height=40&format=auto',
    rating: 5,
    content: "I've been using shadcn/studio for a year now and it's made managing my finances so much easier and quick."
  },
  {
    name: 'Martin Dorwart',
    role: 'Product manager',
    company: 'Orbit',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png?width=40&height=40&format=auto',
    rating: 4,
    content: "With shadcn/studio, I can easily track my investments and see how they're performing in real-time."
  },
  {
    name: 'Sarah Johnson',
    role: 'Lead Designer',
    company: 'Figma',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png?width=40&height=40&format=auto',
    rating: 5,
    content:
      "The UI components are beautifully designed and incredibly easy to customize. It's transformed our design workflow."
  },
  {
    name: 'Alex Chen',
    role: 'Frontend Developer',
    company: 'Vercel',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png?width=40&height=40&format=auto',
    rating: 4,
    content:
      'shadcn/studio has saved us countless hours in development. The component library is comprehensive and well-documented.'
  },
  {
    name: 'Emma Wilson',
    role: 'UX Designer',
    company: 'Adobe',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png?width=40&height=40&format=auto',
    rating: 3,
    content: 'Good components, but could use more customization options. Overall decent experience.'
  },
  {
    name: 'Michael Brown',
    role: 'Developer',
    company: 'GitHub',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png?width=40&height=40&format=auto',
    rating: 2,
    content: 'Not quite what I expected. Some features are missing, but it works for basic needs.'
  },
  {
    name: 'Lisa Anderson',
    role: 'Product Manager',
    company: 'Microsoft',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-7.png?width=40&height=40&format=auto',
    rating: 3,
    content: 'Functional and reliable. Would like to see more updates and improvements in the future.'
  },
  {
    name: 'David Lee',
    role: 'Full Stack Dev',
    company: 'Netflix',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-8.png?width=40&height=40&format=auto',
    rating: 4,
    content: 'Great tool for rapid prototyping. The component library saves a lot of development time.'
  }
]

const TestimonialsSection = () => {
  return <TestimonialsComponent testimonials={testimonials} />
}

export default TestimonialsSection
