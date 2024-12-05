export interface Column {
  column_id: string
  name: string
  column_data_type: string
}

export interface TableFlow {
  id: string
  name: string
  columns: Column[]
}

export interface TableNode extends TableFlow {
  position: {
    x: number
    y: number
  }
}

export interface Connection {
  id: string
  source: string
  sourceHandle: string
  target: string
  targetHandle: string
}

export interface SidebarItem {
  id: string
  name: string
  type: 'folder' | 'table'
  children?: SidebarItem[]
  columns?: Column[]
}

