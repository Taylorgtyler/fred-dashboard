import React, { useEffect } from 'react';
import { XYChart, LineSeries, Axis, Grid, Tooltip } from '@visx/xychart';
import useEconomicStore from '../store/economicStore';
import { ParentSize } from '@visx/responsive';
import { GDPDataPoint } from '../types/economicTypes';
export const GDPChart: React.FC = () => {
  const { gdp, selectedDateRange, fetchData, isLoading } = useEconomicStore();

  useEffect(() => {
    const [startDate, endDate] = selectedDateRange;
    fetchData(
      startDate.toISOString().split('T')[0],
      endDate.toISOString().split('T')[0]
    );
  }, [fetchData, selectedDateRange]);

  if (isLoading) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!gdp || gdp.length === 0) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center">
        <div>No data available</div>
      </div>
    );
  }

  return (
    <div className="h-[400px] w-full">
      <ParentSize>
        {({ width, height }) => (
          <XYChart
            width={width}
            height={400}
            margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
            xScale={{ type: 'time' }}
            yScale={{ type: 'linear' }}
          >
            <Grid columns={false} numTicks={5} />
            <Axis orientation="bottom" label="Date" />
            <Axis orientation="left" label="GDP Growth Rate (%)" />
            <LineSeries
              dataKey="GDP Growth"
              data={gdp}
              xAccessor={(d) => new Date(d.DATE)}
              yAccessor={(d) => d.GDPC1}
              stroke="#2563eb"
            />
            <Tooltip
              snapTooltipToDatumX
              snapTooltipToDatumY
              showSeriesGlyphs
              renderTooltip={({ tooltipData }) => (
                <div className="p-2">
                  <strong>
                    {new Date((tooltipData?.nearestDatum?.datum as GDPDataPoint).DATE).toLocaleDateString()}
                  </strong>
                  <div>
                    GDP Growth: {(tooltipData?.nearestDatum?.datum as GDPDataPoint).GDPC1.toFixed(1)}%
                  </div>
                </div>
              )}
            />
          </XYChart>
        )}
      </ParentSize>
    </div>
  );
}; 