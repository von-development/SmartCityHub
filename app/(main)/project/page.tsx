import { Context } from './_components/context'
import { Analysis } from './_components/analysis'
import { Limitations } from './_components/limitations'
import { Feedback } from './_components/feedback'
import { Vision } from './_components/vision'
import { Impact } from './_components/impact'
import { CityExamples } from './_components/city-examples'
import { Hero } from './_components/hero'

export default function ProjectPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Context />
      <Analysis />
      <Limitations />
      <Feedback />
      <Vision />
      <Impact />
      <CityExamples />
       <Hero />
    </div>
  )
}
