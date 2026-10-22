import { useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { OceanQuote } from './components/OceanQuote'
import { FeaturedExpedition } from './components/FeaturedExpedition'
import { HostCard } from './components/HostCard'
import { Experiences } from './components/Experiences'
import { Gallery } from './components/Gallery'
import { Destinations } from './components/Destinations'
import { Benefits } from './components/Benefits'
import { Testimonials } from './components/Testimonials'
import { About } from './components/About'
import { Footer } from './components/Footer'
import { ScrollProgress } from './components/ScrollProgress'
import { FilmModal } from './components/modals/FilmModal'
import { TripModal } from './components/modals/TripModal'
import { useScrollRefresh } from './lib/anim'

export default function App() {
  const [filmOpen, setFilmOpen] = useState(false)
  const [tripOpen, setTripOpen] = useState(false)
  useScrollRefresh()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-navy focus:px-4 focus:py-2.5 focus:text-[11px] focus:uppercase focus:tracking-[0.16em] focus:text-ivory"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Header />

      <div className="page-shell py-6 sm:py-8 lg:py-10">
        <main id="main" className="shell-linear">
          {/* 1. Hero: Cinematic Grand Showcase */}
          <Hero onWatchFilm={() => setFilmOpen(true)} />

          {/* 2. Brand Ethos & Ocean Philosophy */}
          <OceanQuote />

          {/* 3. Featured Expedition Spotlight (Maldives Maafushi) */}
          <FeaturedExpedition onViewTrip={() => setTripOpen(true)} />

          {/* 4. Meet Your Host: Dr. Purva */}
          <HostCard />

          {/* 5. Dive Experiences For Every Explorer */}
          <Experiences />

          {/* 6. Curated Ocean Gallery */}
          <Gallery />

          {/* 7. Future Horizons: Destinations Coming Soon */}
          <Destinations />

          {/* 8. Why Dive With Us: Core Pillars */}
          <Benefits />

          {/* 9. Verified Guest Testimonials */}
          <Testimonials />

          {/* 10. About Section: Short, sweet, and intimate (Second to last!) */}
          <About />
        </main>
      </div>

      {/* 11. Contact Hub & Footer (Last) */}
      <Footer />

      <FilmModal open={filmOpen} onClose={() => setFilmOpen(false)} />
      <TripModal open={tripOpen} onClose={() => setTripOpen(false)} />
    </>
  )
}
