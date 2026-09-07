import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import type { OccurrenceRecord } from '../types'
import 'leaflet/dist/leaflet.css'

export function MapView({ records }: { records: OccurrenceRecord[] }) {
  const plotted = records.filter((record) => record.latitude !== undefined && record.longitude !== undefined)
  return <MapContainer center={[1.2, 110.2]} zoom={5} scrollWheelZoom={false} className="map">
    <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {plotted.map((record) => <CircleMarker key={record.sourceId} center={[record.latitude!, record.longitude!]} radius={6} pathOptions={{ color: '#d66b3d', fillColor: '#f2ae58', fillOpacity: 0.85 }}>
      <Popup><strong>{record.scientificName}</strong><br />{record.country || '—'}<br /><a href={record.originalUrl} target="_blank" rel="noreferrer">GBIF {record.sourceId}</a></Popup>
    </CircleMarker>)}
  </MapContainer>
}
