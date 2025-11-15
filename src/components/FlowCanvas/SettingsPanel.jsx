
// SettingsPanel: dynamic settings per node type
export default function SettingsPanel({ selectedNode, nodeText, setNodeText, onClose }) {
  if (!selectedNode) return null;

  // Handle settings per node type
  switch (selectedNode.type) {
    case 'textNode':
      return (
        <div style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <button 
              onClick={onClose} 
              style={{ 
                border: 'none', 
                background: 'none', 
                cursor: 'pointer', 
                fontSize: 18,
                padding: 4
              }}
            >
              ←
            </button>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Message Settings</h3>
          </div>

          <label style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', display: 'block', marginBottom: 8 }}>
            Text
          </label>
          <textarea
            value={nodeText}
            onChange={(e) => setNodeText(e.target.value)}
            placeholder="Enter message text..."
            style={{ 
              width: '100%', 
              minHeight: 120, 
              padding: 10, 
              borderRadius: 6, 
              border: '1px solid #e5e7eb',
              fontSize: 14,
              fontFamily: 'inherit',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
        </div>
      );

    default:
      return (
        <div style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 18 }}>←</button>
            <h3 style={{ margin: 0 }}>Settings</h3>
          </div>
          <div>No settings for this node type yet.</div>
        </div>
      );
  }
}