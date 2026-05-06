import { X } from 'lucide-react'

export default function VideoModal({ open, onClose }) {
  if (!open) return null

  return (
    <div className="modal-overlay open" onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 100, 
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(10, 13, 10, 0.85)', backdropFilter: 'blur(4px)'
    }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{
        position: 'relative', background: '#000', borderRadius: '8px', 
        overflow: 'hidden', padding: 0, width: '100%', maxWidth: '1024px', 
        aspectRatio: '16/9', border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <button 
          onClick={onClose} 
          style={{
            position: 'absolute', top: 16, right: 16, zIndex: 10,
            background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff',
            borderRadius: '50%', padding: 8, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
          aria-label="Fechar Vídeo"
        >
          <X size={20} />
        </button>
        <video 
          controls 
          autoPlay 
          src="/video/institucional-15s.mp4" 
          style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
        />
      </div>
    </div>
  )
}
