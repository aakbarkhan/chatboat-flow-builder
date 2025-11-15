import React from 'react';
import { Handle, Position } from 'reactflow';

// TextNode: a simple message node with VISIBLE border and header
export default function TextNode({ data, selected }) {
  return (
    <div
      style={{
        padding: '12px',
        border: selected ? '3px solid #376fe6ff' : '3px solid #9ca3af',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        minWidth: '220px',
        maxWidth: '300px',
        position: 'relative',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        display: 'block',
      }}
    >
      {/* Header with icon and text */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-start',
          gap: '8px', 
          marginBottom: '10px', 
          paddingBottom: '10px', 
          borderBottom: '2px solid #e5e7eb',
          backgroundColor: '#f9fafb',
          padding: '8px',
          borderRadius: '4px',
        }}
      >
        <span style={{ fontSize: '20px', lineHeight: 1 }}>💬</span>
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827', lineHeight: 1 }}>
          Send Message
        </span>
      </div>

      {/* Message content */}
      <div 
        style={{ 
          color: '#111827', 
          fontSize: '14px', 
          minHeight: '24px', 
          fontWeight: 500,
          padding: '4px 0',
          wordWrap: 'break-word',
        }}
      >
        {data?.label || 'Enter message...'}
      </div>

      {/* Target handle: LEFT side - BLUE - receives connections */}
      <Handle
        type="target"
        position={Position.Left}
        id="target"
        style={{ 
          backgroundColor: '#3b82f6', 
          width: '16px', 
          height: '16px', 
          border: '3px solid #ffffff', 
          left: '-10px',
          top: '50%',
          cursor: 'crosshair',
          zIndex: 100,
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      />

      {/* Source handle: RIGHT side - GREEN - sends connections */}
      <Handle
        type="source"
        position={Position.Right}
        id="source"
        style={{ 
          backgroundColor: '#10b981', 
          width: '16px', 
          height: '16px', 
          border: '3px solid #ffffff', 
          right: '-10px',
          top: '50%',
          cursor: 'crosshair',
          zIndex: 100,
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      />
    </div>
  );
}