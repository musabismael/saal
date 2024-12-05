"use client"

import { useEffect, useRef, useState } from "react"
import { X, Table } from 'lucide-react'
import { Handle, Position, useUpdateNodeInternals } from "reactflow"
import { TableFlow as TableType } from "../types/schema"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';

interface TableNodeProps {
  data: TableType
  id: string
  onRemove: (id: string) => void
}

export function TableNode({ data, id, onRemove }: TableNodeProps) {
  const updateNodeInternals = useUpdateNodeInternals()
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    updateNodeInternals(id)
  }, [id, scrollTop, updateNodeInternals])

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop)
    updateNodeInternals(id)
  }

  return (
    <>
      <NodeResizer minWidth={200} minHeight={100} />
      <div className="bg-white rounded-lg shadow-lg w-full h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b">
          <div className="flex items-center gap-2">
            <Table className="h-4 w-4 text-black" />
            <span className="font-medium">{data.name}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(id)}
            className="h-6 w-6 text-blue-500 hover:text-blue-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Columns */}
        <div>
          {/* Column Header */}
          <div className="flex px-3 py-2 bg-blue-50/80 text-sm font-bold text-muted-foreground border-b">
            <div className="w-[120px]">Column</div>
            <div className="flex-1">Data Type</div>
          </div>

          {/* Column List */}
          <div 
            ref={containerRef}
            className="max-h-[300px] overflow-y-auto"
            onScroll={handleScroll}
          >
            {data.columns?.map((column, index) => (
              <div
                key={column.column_id}
                className="flex items-center px-3 py-2 hover:bg-muted/50 group relative"
                style={{ height: '36px' }}
              >
                <Handle
                  type="source"
                  position={Position.Right}
                  id={`${column.column_id}-right`}
                  className="w-3 h-3 bg-[#ff9f43] -right-1.5 border-2 border-white rounded-full cursor-crosshair"
                  style={{ top: '50%' }}
                />
                <Handle
                  type="target"
                  position={Position.Left}
                  id={`${column.column_id}-left`}
                  className="w-3 h-3 bg-[#ff9f43] -left-1.5 border-2 border-white rounded-full cursor-crosshair"
                  style={{ top: '50%' }}
                />
                <div className="flex items-center gap-2 w-[120px]">
                  <Checkbox className="border-muted-foreground data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" />
                  <span className="text-sm">{column.name}</span>
                </div>
                <div className="flex-1 text-sm text-muted-foreground">
                  {column.column_data_type}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}