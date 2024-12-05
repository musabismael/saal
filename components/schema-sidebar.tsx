"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Minus, Plus, ChevronRight, Table } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TableFlow as TableType } from "../types/schema"

interface SidebarItem {
  id: string
  name: string
  type: 'folder' | 'table'
  children?: SidebarItem[]
  columns?: Array<{ name: string, column_data_type: string }>
}

interface SchemaSidebarProps {
  onDragStart: (event: React.DragEvent, table: TableType) => void
  onClose: () => void
}

export function SchemaSidebar({ onDragStart, onClose }: SchemaSidebarProps) {
  const [search, setSearch] = useState("")
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["imp"]))
  const scrollRef = useRef<HTMLDivElement>(null);

  const items: SidebarItem[] = [
    {
      id: "imp",
      name: "imp",
      type: "folder",
      children: [
        {
          id: "employee_salary",
          name: "employee_salary",
          type: "table",
          columns: [
            { name: "id", column_data_type: "INTEGER" },
            { name: "employee_id", column_data_type: "INTEGER" },
            { name: "salary", column_data_type: "DECIMAL" },
          ]
        },
        {
          id: "employee1",
          name: "employee",
          type: "table",
          columns: [
            { name: "id", column_data_type: "INTEGER" },
            { name: "name", column_data_type: "VARCHAR(255)" },
            { name: "email", column_data_type: "VARCHAR(255)" },
          ]
        },
        {
          id: "employee2",
          name: "employee",
          type: "table",
          columns: [
            { name: "id", column_data_type: "INTEGER" },
            { name: "name", column_data_type: "VARCHAR(255)" },
            { name: "email", column_data_type: "VARCHAR(255)" },
          ]
        },
        {
          id: "patients",
          name: "patients",
          type: "table",
          columns: [
            { name: "id", column_data_type: "INTEGER" },
            { name: "name", column_data_type: "VARCHAR(255)" },
            { name: "email", column_data_type: "VARCHAR(255)" },
          ]
        },
      ]
    },
    {
      id: "Employee",
      name: "Employee",
      type: "table",
      columns: [
        { name: "id", column_data_type: "INTEGER" },
        { name: "name", column_data_type: "VARCHAR(255)" },
        { name: "email", column_data_type: "VARCHAR(255)" },
      ]
    },
    {
      id: "test",
      name: "test",
      type: "table",
      columns: [
        { name: "id", column_data_type: "INTEGER" },
        { name: "name", column_data_type: "VARCHAR(255)" },
        { name: "email", column_data_type: "VARCHAR(255)" },
      ]
    },
    {
      id: "tag1",
      name: "tag1",
      type: "table",
      columns: [
        { name: "id", column_data_type: "INTEGER" },
        { name: "name", column_data_type: "VARCHAR(255)" },
        { name: "email", column_data_type: "VARCHAR(255)" },
      ]
    },
    {
      id: "test2",
      name: "test2",
      type: "table",
      columns: [
        { name: "id", column_data_type: "INTEGER" },
        { name: "name", column_data_type: "VARCHAR(255)" },
        { name: "email", column_data_type: "VARCHAR(255)" },
      ]
    },
    {
      id: "test3",
      name: "test3",
      type: "table",
      columns: [
        { name: "id", column_data_type: "INTEGER" },
        { name: "name", column_data_type: "VARCHAR(255)" },
        { name: "email", column_data_type: "VARCHAR(255)" },
      ]
    },
    {
      id: "test4",
      name: "test4",
      type: "table",
      columns: [
        { name: "id", column_data_type: "INTEGER" },
        { name: "name", column_data_type: "VARCHAR(255)" },
        { name: "email", column_data_type: "VARCHAR(255)" },
      ]
    },
    {
      id: "test5",
      name: "test5",
      type: "table",
      columns: [
        { name: "id", column_data_type: "INTEGER" },
        { name: "name", column_data_type: "VARCHAR(255)" },
        { name: "email", column_data_type: "VARCHAR(255)" },
      ]
    },
    {
      id: "test6",
      name: "test6",
      type: "table",
      columns: [
        { name: "id", column_data_type: "INTEGER" },
        { name: "name", column_data_type: "VARCHAR(255)" },
        { name: "email", column_data_type: "VARCHAR(255)" },
      ]
    },
    {
      id: "HHHHHH",
      name: "HHHHHH",
      type: "table",
      columns: [
        { name: "id", column_data_type: "INTEGER" },
        { name: "name", column_data_type: "VARCHAR(255)" },
        { name: "email", column_data_type: "VARCHAR(255)" },
      ]
    },
    {
      id: "test7",
      name: "test7",
      type: "table",
      columns: [
        { name: "id", column_data_type: "INTEGER" },
        { name: "name", column_data_type: "VARCHAR(255)" },
        { name: "email", column_data_type: "VARCHAR(255)" },
      ]
    },
    {
      id: "test8",
      name: "test8",
      type: "table",
      columns: [
        { name: "id", column_data_type: "INTEGER" },
        { name: "name", column_data_type: "VARCHAR(255)" },
        { name: "email", column_data_type: "VARCHAR(255)" },
      ]
    },
    {
      id: "test9",
      name: "test9",
      type: "table",
      columns: [
        { name: "id", column_data_type: "INTEGER" },
        { name: "name", column_data_type: "VARCHAR(255)" },
        { name: "email", column_data_type: "VARCHAR(255)" },
      ]
    },
    {
      id: "test10",
      name: "test10",
      type: "table",
      columns: [
        { name: "id", column_data_type: "INTEGER" },
        { name: "name", column_data_type: "VARCHAR(255)" },
        { name: "email", column_data_type: "VARCHAR(255)" },
      ]
    }
  ]

  const toggleItem = (itemId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    setExpandedFolders(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const renderItem = (item: SidebarItem, level = 0) => {
    const paddingLeft = level * 20 + 'px'
    const isExpanded = expandedFolders.has(item.id)

    return (
      <div key={item.id}>
        <div 
          className="flex items-center gap-2 py-1 px-2 hover:bg-muted/50 cursor-pointer group"
          style={{ paddingLeft }}
          draggable={item.type === 'table'}
          onDragStart={item.type === 'table' ? (e) => onDragStart(e, item as unknown as TableType) : undefined}
          onClick={(e) => toggleItem(item.id, e)}
        >
          <div className="w-5 h-5 flex items-center justify-center border border-muted-foreground rounded-sm">
            {isExpanded ? 
              <Minus className="h-3 w-3 shrink-0 text-muted-foreground" /> : 
              <Plus className="h-3 w-3 shrink-0 text-muted-foreground" />
            }
          </div>
          <Table className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{item.name}</span>
        </div>
        {isExpanded && (
          <div className="ml-6 border-l border-muted-foreground/20 pl-2">
            {item.type === 'table' && item.columns ? (
              item.columns.map((column, index) => (
                <div key={index} className="flex items-center gap-2 py-1">
                  <div className="w-2 h-0.5 bg-muted-foreground/20"></div>
                  <span className="text-xs text-muted-foreground">{column.name}: {column.column_data_type}</span>
                </div>
              ))
            ) : (
              item.children && item.children.map(child => renderItem(child, level + 1))
            )}
          </div>
        )}
      </div>
    )
  }

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    (item.children && item.children.some(child => 
      child.name.toLowerCase().includes(search.toLowerCase())
    ))
  )

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [filteredItems]);

  return (
    <div className="w-64 border-r bg-background flex flex-col h-screen">
      <div className="p-2 border-b">
        <div className="relative">
          <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center px-2 rounded-r-md bg-blue-500">
            <Search className="h-4 w-4 text-white" />
          </div>
          <Input
            placeholder="Filter by Table Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-9 h-9"
          />
        </div>
      </div>
      <ScrollArea className="flex-grow" ref={scrollRef}>
        <div className="py-2">
          {filteredItems.map(item => renderItem(item))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <button 
          className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between"
          onClick={onClose}
        >
          Browse Workbooks
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

