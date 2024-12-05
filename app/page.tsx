"use client"

import { useState, useCallback, useMemo } from "react"
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

export default function SchemaVisualizer() {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const edgeOptions = useMemo(() => ({
    type: 'smoothstep',
    style: { 
      stroke: '#ff9f43', 
      strokeWidth: 2,
    },
    markerStart: {
      type: MarkerType.Arrow,
      color: '#ff9f43',
      width: 5,
      height: 5,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ff9f43',
      width: 15,
      height: 15,
    },
    animated: false,
  }), [])

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge: Edge = {
        ...params,
        id: `${params.source}-${params.sourceHandle}-${params.target}-${params.targetHandle}`,
        type: 'smoothstep',
        animated: false,
        style: edgeOptions.style,
        markerEnd: edgeOptions.markerEnd,
        markerStart: edgeOptions.markerStart,
        source: params.source || '',
        target: params.target || '',
        sourceHandle: params.sourceHandle || undefined,
        targetHandle: params.targetHandle || undefined,
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges, edgeOptions]
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

    const existingNode = nodes.find((node) => node.id === table.id)
    if (existingNode) {
      // Highlight the existing node
      setNodes((nds) =>
        nds.map((node) =>
          node.id === table.id
            ? { ...node, style: { ...node.style, boxShadow: '0 0 0 2px #3b82f6' } }
            : node
        )
      )
      setTimeout(() => {
        setNodes((nds) =>
          nds.map((node) =>
            node.id === table.id
              ? { ...node, style: { ...node.style, boxShadow: 'none' } }
              : node
          )
        )
      }, 2000)
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

  const nodeTypes = useMemo(() => ({
    tableNode: (props:any) => <TableNode {...props} onRemove={onRemoveNode} />,
  }), [onRemoveNode])

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
            connectionLineStyle={{ stroke: '#ff9f43', strokeWidth: 2 }}
            fitView
            snapToGrid
            snapGrid={[15, 15]}
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