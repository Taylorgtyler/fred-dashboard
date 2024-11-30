import { useGDPData } from "../hooks/useGDPData";
import { useURData } from "../hooks/useURData";
import { MetricCard } from "../components/MetricCard";
import { useGDPPCData } from "../hooks/useGDPPCData";
import { useLFPRData } from "../hooks/useLFPRData";
import { useFFERData } from "../hooks/useFFERData";
import BarChart from "../components/BarChart";
import AreaChart from "../components/AreaChart";

function Dashboard() {
  // Fetch Data
  const { data: gdpData } = useGDPData('2020-01-01', '2024-10-01');
  const { data: urData } = useURData('2020-01-01', '2024-10-01');
  const { data: gdpPCData } = useGDPPCData('2020-01-01', '2024-10-01');
  const { data: lfprData } = useLFPRData('2020-01-01', '2024-10-01');
  const { data: fferData } = useFFERData('2020-01-01', '2024-10-01');

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 sm:mb-6">
        <MetricCard title="Unemployment Rate" value={urData?.[urData.length - 1]?.UNRATE} description="Unemployment rate in the US" isPercentage={true} />
        <MetricCard title="Labor Force Participation Rate" value={lfprData?.[lfprData.length - 1]?.CIVPART} description="Labor force participation rate in the US" isPercentage={true} />
        <MetricCard title="GDP Per Capita" value={gdpPCData?.[gdpPCData.length - 1]?.A939RX0Q048SBEA} description="GDP per capita in the US" isPercentage={false} isCurrency={true} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 h-[400px] md:h-[500px]">
          {gdpData && (
            <AreaChart 
              data={gdpData}
              xAccessor={(d) => d.DATE}
              series={[
                {
                  accessor: 'GDPC1',
                  color: '#3b6978',
                  label: 'GDP'
                }
              ]}
              events={true}
            />
          )}
        {fferData && (
          <BarChart
            data={fferData}
            xAccessor={(d) => d.DATE}
            yAccessor={(d) => d.DFF}
          />
        )}
      </div>
    </div>
  );
}
export default Dashboard;
