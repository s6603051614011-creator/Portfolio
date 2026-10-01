// Real, interactive map (Leaflet + CARTO basemap tiles built on OpenStreetMap data).
// Loaded lazily — only downloaded when the visitor expands the map.
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const TILES = {
  light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
}
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'

// Custom pin (avoids Leaflet's default marker-image path problems in bundlers)
const pinIcon = L.divIcon({
  className: 'lmap-marker',
  html: '<svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" class="pin-body"/><circle cx="12" cy="9" r="2.5" class="pin-dot"/></svg>',
  iconSize: [32, 32],
  iconAnchor: [16, 30],
})

function useColorScheme() {
  const get = () => {
    const forced = document.documentElement.dataset.theme
    if (forced === 'dark' || forced === 'light') return forced
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  const [scheme, setScheme] = useState(get)
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)')
    const onChange = () => setScheme(get())
    mq?.addEventListener('change', onChange)
    return () => mq?.removeEventListener('change', onChange)
  }, [])
  return scheme
}

export default function RealMap({ lat, lng, zoom = 12, label }) {
  const scheme = useColorScheme()
  const [status, setStatus] = useState('loading') // loading | ok | failed

  return (
    <div className="lmap-real">
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        minZoom={4}
        maxZoom={16}
        scrollWheelZoom={false}
        zoomControl
        className="lmap-leaflet"
        aria-label={`Map of ${label}`}
      >
        <TileLayer
          key={scheme}
          url={TILES[scheme]}
          attribution={ATTRIBUTION}
          subdomains="abcd"
          eventHandlers={{
            tileload: () => setStatus('ok'),
            tileerror: () => setStatus((s) => (s === 'ok' ? s : 'failed')),
          }}
        />
        <Marker position={[lat, lng]} icon={pinIcon} keyboard={false} />
      </MapContainer>
      {status === 'failed' && (
        <div className="lmap-failed" role="status">
          Map tiles couldn’t load here.
        </div>
      )}
    </div>
  )
}
