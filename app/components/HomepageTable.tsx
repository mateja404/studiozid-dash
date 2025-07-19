import { useEffect, useState } from "react";
import { ColumnDef,  SortingState,  useReactTable,  ColumnFiltersState,  getCoreRowModel,  getPaginationRowModel,  getSortedRowModel,  getFilteredRowModel,  VisibilityState, flexRender, } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table,  TableBody,  TableCell,  TableHead,  TableHeader,  TableRow, } from "@/components/ui/table";
import axios from "axios";
import { DropdownMenu,  DropdownMenuContent,  DropdownMenuItem,  DropdownMenuLabel,  DropdownMenuSeparator,  DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export type Project = {
    id: number
    name: string
    description: string
    status: string
    created_at: string
    updated_at: string
}

export function HomepageTable() {
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([])
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const fetchProjects = async () => {
        try {
            const response = await axios.get("/api/get-all-projects")
            setProjects(response.data.projects)
        } catch (error) {
            console.error("Error fetching projects:", error)
        }
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    async function deleteProject(id: any) {
        try {
            const res = await axios.delete(`/api/delete-project`, { data: { id: id } });
            toast.success(res.data.message);
            location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const columns: ColumnDef<Project>[] = [
        {
            accessorKey: "worker_name",
            header: "Ime radnika",
            cell: ({ row }) => row.getValue("worker_name"),
        },
        {
            accessorKey: "budget",
            header: "Budžet",
            cell: ({ row }) => {
                const budget = parseFloat(row.getValue("budget"));
                const formatted = new Intl.NumberFormat("hr-HR", {
                    style: "currency",
                    currency: "EUR",
                }).format(budget);
                return <div className="text-left">{formatted}</div>;
            },
        },
        {
            accessorKey: "address",
            header: "Adresa",
            cell: ({ row }) => row.getValue("address"),
        },
        {
            accessorKey: "finished",
            header: "Status",
            cell: ({ row }) => row.getValue("finished"),
        },
        {
            id: "actions",
            header: "Akcije",
            cell: ({ row }) => {
                const project = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Akcije</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer focus-visible:ring-0 outline-none" onClick={() => router.push(`/projekti/projekat/${row.original.id}`)}>Pogledaj projekat</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive cursor-pointer focus-visible:ring-0 outline-none" onClick={() => deleteProject(row.original.id)}>Obriši projekat</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            }
        }
    ];

    const table = useReactTable({
        data: projects,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });
    return (
        <div className="w-full">
            <Toaster/>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filtriraj po imenu..."
                    value={(table.getColumn("worker_name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("worker_name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm focus-visible:ring-0"
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Nazad</Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Dalje</Button>
                </div>
            </div>
        </div>
    )
}