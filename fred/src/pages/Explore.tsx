import { createColumnHelper } from "@tanstack/react-table";
import { useGDPData } from "../hooks/useGDPData";
import { GDPData } from "../types/dataTypes";
import { DataTable } from "../components/DataTable";
import { Card } from "../components/Card";


function Explore() {
    const { data: gdpData } = useGDPData('2020-01-01', '2024-10-01');

      // Create Column Helper for DataTable
  const columnHelper = createColumnHelper<GDPData>();

  // Define Columns for DataTable
  const columns = [
    columnHelper.accessor('DATE', {
      header: 'Reported Date',
      cell: ({ row }) => new Date(row.original.DATE).toLocaleDateString(),
    }),
    columnHelper.accessor('GDPC1', {
      header: 'GDP (Billions USD)',
      cell: ({ row }) => `$${(row.original.GDPC1 / 1000).toFixed(2)}B`,
    }),
  ];
  return (
    <div>
        <Card title="GDP Data">
          <DataTable 
            data={gdpData ?? []} 
            columns={columns}
            showPagination={true}
            showGlobalFilter={false}
          />
        </Card>
    </div>
  );
}
export default Explore;