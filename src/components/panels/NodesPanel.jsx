

// Palette of draggable node types
export default function NodesPanel({ onDragStart }) {
  return (
    <div style={{ padding: 20 }}>
      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#111827' }}>Nodes Panel</h3>
      <div style={{ height: 16 }} />

      {/* Message node draggable item */}
      <div
        draggable
        onDragStart={(e) => onDragStart(e, 'textNode')}
        style={{
          padding: 16,
          border: '2px solid #3b82f6',
          background: '#eff6ff',
          borderRadius: 8,
          cursor: 'grab',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div style={{ fontSize: 24 }}>💬</div>
        <div style={{ fontWeight: 700, color: '#1e40af', fontSize: 14 }}>Message</div>
        <div style={{ fontSize: 12, color: '#6b7280' }}>Drag to canvas</div>
      </div>

      <div style={{ marginTop: 16, fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>
        Drag and drop the message node onto the canvas to start building your flow.
      </div>
    </div>
  );
}