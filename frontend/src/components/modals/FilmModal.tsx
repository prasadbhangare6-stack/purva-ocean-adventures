import { Play } from 'lucide-react'
import { FILM_POSTER, FILM_SRC } from '../../data/site'
import { Modal } from '../ui/Modal'

/**
 * Expedition film player.
 *
 * Integration point: set FILM_SRC in `src/data/site.ts` to an MP4 (self-hosted
 * or CDN) and the player below renders automatically. While it is empty we show
 * the poster and an honest "not connected" state rather than a fake video.
 */
export function FilmModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="film-title" size="xl" tone="navy" className="p-2 sm:p-3">
      <div className="overflow-hidden rounded-[2px]">
        {FILM_SRC ? (
          <video
            className="aspect-video w-full bg-black"
            src={FILM_SRC}
            poster={FILM_POSTER}
            controls
            autoPlay
            playsInline
            aria-label="Purva Ocean Adventures expedition film"
          />
        ) : (
          <div className="relative aspect-video w-full overflow-hidden bg-navy">
            <img
              src={FILM_POSTER}
              alt="Divers beneath sunbeams in an underwater cavern"
              className="h-full w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgb(3,18,27)] via-[rgba(3,18,27,0.45)] to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ivory/40 text-ivory/80">
                <Play size={17} strokeWidth={1.4} className="ml-[2px] fill-ivory/70" />
              </span>
              <h2 id="film-title" className="display mt-5 text-[clamp(26px,3.4vw,38px)] text-ivory">
                The film is on its way
              </h2>
              <p className="mt-3 max-w-[30rem] text-[12.5px] leading-[1.7] text-ivory/60">
                A short expedition film is being cut. Until it lands, the stills on this page are the closest
                thing to being there — and the water is always better in person.
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 px-3 pb-4 pt-4 sm:px-4">
        <div>
          <p className="eyebrow text-ivory/45">Purva Ocean Adventures</p>
          <h3 className="mt-1.5 font-serif text-[19px] text-ivory/90">Expedition Film</h3>
        </div>
        <p className="max-w-[22rem] text-[10.5px] leading-[1.6] text-ivory/35">
          {FILM_SRC
            ? 'Filmed on expedition.'
            : 'Video integration point: add a film source to enable playback.'}
        </p>
      </div>
    </Modal>
  )
}
