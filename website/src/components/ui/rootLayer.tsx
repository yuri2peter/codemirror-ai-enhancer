'use client';

import { shortId } from '@/lib/string';
import React from 'react';
import { create } from 'zustand';

export const useRootLayer = create<{
  nodes: {
    id: string;
    element: React.ReactNode;
  }[];
  addElement: (element: React.ReactNode) => () => void;
}>()((set) => ({
  nodes: [],
  addElement: (element: React.ReactNode) => {
    const id = shortId();
    set((state) => ({ nodes: [...state.nodes, { id, element }] }));
    const remover = () => {
      set((state) => ({ nodes: state.nodes.filter((node) => node.id !== id) }));
    };
    return remover;
  },
}));

export function RootLayerRenderer() {
  const nodes = useRootLayer((s) => s.nodes);
  return (
    <>
      {nodes.map((node) => (
        <React.Fragment key={node.id}>{node.element}</React.Fragment>
      ))}
    </>
  );
}
