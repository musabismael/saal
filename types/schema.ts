import { Connection as ReactFlowConnection } from 'reactflow';

export interface Column {
  column_id: string;
  name: string;
  column_data_type: string;
}

export interface Table {
  id: string;
  name: string;
  columns: Column[];
}

export interface TableNode extends Table {
  position: {
    x: number;
    y: number;
  };
}

export type TableFlow = Table;

export type Connection = ReactFlowConnection;

// Additional types that might be useful for the schema visualizer

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface NodeData {
  label: string;
  columns: Column[];
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  sourceHandle: string;
  targetHandle: string;
  type?: string;
}

export interface SchemaVisualizerState {
  nodes: TableNode[];
  edges: Edge[];
}

export interface DragItem {
  type: string;
  id: string;
  data: Table;
}