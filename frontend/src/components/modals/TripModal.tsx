import { ArrowRight, BedDouble, Ship, Users, Waves } from 'lucide-react'
import { FEATURED } from '../../data/site'
import { Modal } from '../ui/Modal'

const INCLUDES = [
  { icon: Waves, label: 'Scuba diving for all levels' },
  { icon: BedDouble, label: 'Comfortable stay' },
  { icon: Ship, label: 'Boat dives as per package' },
  { icon: Users, label: 'Maximum 10 travellers' },
]

export function TripModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="trip-title" size="lg">
      <div className="relative h-52 w-full overflow-hidden sm:h-64">
        <img src={FEATURED.image} alt={FEATURED.imageAlt} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,18,27,0.9)] via-[rgba(3,18,27,0.25)] to-transparent" />
        <div className="absolute bottom-5 left-6 right-6">
          <p className="eyebrow text-ivory/65">{FEATURED.eyebrow}</p>
          <h2 id="trip-title" className="display mt-2 text-[clamp(32px,4vw,44px)] leading-none text-ivory">
            Maldives Maafushi
          </h2>
        </div>
      </div>

      <div className="grid gap-8 px-6 py-7 sm:grid-cols-[1.15fr_1fr] sm:px-8">
        <div>
          <p className="flex flex-wrap items-center gap-x-2 text-[10px] font-medium uppercase tracking-[0.14em] text-navy/70">
            <span>{FEATURED.dates}</span>
            <span className="text-navy/25">|</span>
            <span>{FEATURED.duration}</span>
          </p>
          <p className="mt-4 text-[13.5px] leading-[1.8] text-navy/72">{FEATURED.blurb}</p>
          <p className="mt-3 text-[12px] leading-[1.8] text-navy/55">
            Maafushi is a local island in Kaafu Atoll: quiet beaches, a house reef within swimming distance
            and short boat rides to the atoll’s most-loved dive sites. Days follow the water — two dives, a
            long surface interval, and evenings slow enough to actually talk to each other.
          </p>

          <div className="mt-6 rounded-[2px] border border-navy/10 bg-white/45 px-4 py-3">
            <p className="text-[10.5px] leading-[1.7] text-navy/60">
              Dates shown are the planned expedition dates. Availability, pricing and the full itinerary are
              shared personally after your enquiry — nothing is booked or charged from this page.
            </p>
          </div>
        </div>

        <div>
          <p className="eyebrow text-navy/45">What’s included</p>
          <ul className="mt-3 divide-y divide-navy/8 border-y border-navy/8">
            {INCLUDES.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 py-3">
                <Icon size={16} strokeWidth={1.25} className="text-navy/70" aria-hidden="true" />
                <span className="text-[12px] leading-snug text-navy/75">{label}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[11px] leading-[1.7] text-navy/50">
            Only 10 spots on this expedition. Flights, visas and personal dive insurance are arranged
            separately.
          </p>
          <a href="#contact" onClick={onClose} className="btn btn-dark group mt-5 w-full justify-between">
            <span>Enquire About This Trip</span>
            <ArrowRight className="btn-arrow" size={13} strokeWidth={1.6} aria-hidden="true" />
          </a>
        </div>
      </div>
    </Modal>
  )
}
