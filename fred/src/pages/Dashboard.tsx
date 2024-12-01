import { useURData } from "../hooks/useURData";
import { MetricCard } from "../components/MetricCard";
import { useGDPPCData } from "../hooks/useGDPPCData";
import { useLFPRData } from "../hooks/useLFPRData";
import { DateFilter } from "../components/DateFilter";
import { useFilterStore } from "../store/filterStore";
import { Card } from "../components/Card";
import { useRMPIData } from "../hooks/useRMPIData";
import { StackedLineChart } from "../components/StackedLineChart";
function Dashboard() {
  const { startDate, endDate } = useFilterStore();
  // Fetch Data
  const { data: urData } = useURData(startDate, endDate);
  const { data: gdpPCData } = useGDPPCData(startDate, endDate);
  const { data: lfprData } = useLFPRData(startDate, endDate);
  const { data: rmpiData } = useRMPIData(startDate, endDate);

  return (
    <div className="p-4 mx-8">
      <div className="flex justify-end mb-4">
        <DateFilter />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 sm:mb-6">
        <MetricCard title="Unemployment Rate" value={urData?.[urData.length - 1]?.UNRATE} description="Current unemployment rate in the US" isPercentage={true} />
        <MetricCard title="Labor Force Participation Rate" value={lfprData?.[lfprData.length - 1]?.CIVPART} description="Current labor force participation rate in the US" isPercentage={true} />
        <MetricCard title="GDP Per Capita" value={gdpPCData?.[gdpPCData.length - 1]?.A939RX0Q048SBEA} description="Current GDP per capita in the US" isPercentage={false} isCurrency={true} />
      </div>
      <div className="grid grid-cols-1gap-4 mb-8 h-[400px] md:h-[500px]">
        <Card title="Real Median Personal Income vs GDP Per Capita Over Time">
          {rmpiData && gdpPCData && <StackedLineChart dataset1={rmpiData} dataset2={gdpPCData} label1="MEPAINUSA672N" label2="A939RX0Q048SBEA" lineName1="Real Median Personal Income" lineName2="GDP Per Capita" />}
        </Card>
      </div>
    </div>
  );
}
export default Dashboard;
