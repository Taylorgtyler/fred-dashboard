import { useGDPData } from "../hooks/useGDPData";
import { useURData } from "../hooks/useURData";
import { MetricCard } from "./MetricCard";
import { GDPData } from "../types/dataTypes";
import { DataTable } from "./DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { useGDPPCData } from "../hooks/useGDPPCData";
import { LineChart } from "./LineChart";
import { Card } from "./Card";
import { useLFPRData } from "../hooks/useLFPRData";
function Dashboard() {
  // Fetch Data
  const { data: gdpData } = useGDPData('2020-01-01', '2024-10-01');
  const { data: urData } = useURData('2020-01-01', '2024-10-01');
  const { data: gdpPCData } = useGDPPCData('2020-01-01', '2024-10-01');
  const { data: lfprData } = useLFPRData('2020-01-01', '2024-10-01');
  
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
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 sm:mb-6">
        <MetricCard title="Unemployment Rate" value={urData?.[urData.length - 1]?.UNRATE} description="Unemployment rate in the US" isPercentage={true} />
        <MetricCard title="Labor Force Participation Rate" value={lfprData?.[lfprData.length - 1]?.CIVPART} description="Labor force participation rate in the US" isPercentage={true} />
        <MetricCard title="GDP Per Capita" value={gdpPCData?.[gdpPCData.length - 1]?.A939RX0Q048SBEA} description="GDP per capita in the US" isPercentage={false} isCurrency={true} />      </div>
      <div className="mb-8 gap-4 grid grid-cols-1 h-64 md:h-96 sm:h-80"> {/* Responsive height: 16rem on small screens, 24rem on medium and larger */}
        <Card title="GDP Over Time">
          {gdpData && (
            <LineChart 
            data={gdpData}
            valueKey="GDPC1"
            />
          )}
        </Card>
      </div>
      <Card title="GDP Data">
        <div>
          <DataTable 
          data={gdpData ?? []} 
          columns={columns}
          showPagination={true}
          showGlobalFilter={false}
          />
        </div>
      </Card>
    </div>
  );
}
export default Dashboard;
