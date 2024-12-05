"use client"

import { useState, useCallback } from "react"
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  ControlButton,
  ConnectionMode,
  MarkerType,
  Node,
  Connection,
  Edge,
} from "reactflow"
import "reactflow/dist/style.css"
import { Eraser, Sidebar } from 'lucide-react'

import { SchemaSidebar } from "@/components/schema-sidebar"
import { TableNode } from "@/components/table-node"
import { TableFlow } from "@/types/schema"

const nodeTypes = {
  tableNode: TableNode,
}

// Custom edge style
const edgeOptions = {
  type: 'bezier',
  style: { stroke: '#ff9f43', strokeWidth: 2 },
  markerStart: {
    type: MarkerType.Arrow,
    color: '#ff9f43',
    width: 10,
    height: 10,
    strokeWidth: 2,
  },
  markerEnd: {
    type: MarkerType.Arrow,
    color: '#ff9f43',
    width: 20,
    height: 20,
    strokeWidth: 2,
  },
}

export default function SchemaVisualizer() {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onDragStart = (event: React.DragEvent, table: TableFlow) => {
    event.dataTransfer.setData("application/json", JSON.stringify(table))
  }

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault()

    const table = JSON.parse(
      event.dataTransfer.getData("application/json")
    ) as TableFlow

    // Check if table already exists
    if (nodes.some((node) => node.id === table.id)) {
      alert("This table already exists in the diagram")
      return
    }

    const position = {
      x: event.clientX - 100,
      y: event.clientY - 100,
    }

    const newNode: Node = {
      id: table.id,
      type: 'tableNode',
      position,
      data: table,
    }

    setNodes((nds) => [...nds, newNode])
  }

  const onRemoveNode = useCallback((id: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== id))
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id))
  }, [setNodes, setEdges])

  return (
    <div className="flex h-screen">
      {sidebarOpen && <SchemaSidebar onDragStart={onDragStart} onClose={() => setSidebarOpen(false)} />}
      <ReactFlowProvider>
        <div className="flex-1" onDragOver={onDragOver} onDrop={onDrop}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            connectionMode={ConnectionMode.Loose}
            defaultEdgeOptions={edgeOptions}
            fitView
          >
            <Background />
            <Controls position="top-right">
              <ControlButton
                onClick={() => {
                  setNodes([]);
                  setEdges([]);
                }}
              >
                <Eraser className="h-4 w-4" />
              </ControlButton>
              <ControlButton onClick={() => setSidebarOpen(true)} title="Open Sidebar">
                <Sidebar className="h-4 w-4" />
              </ControlButton>
            </Controls>
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  )
}