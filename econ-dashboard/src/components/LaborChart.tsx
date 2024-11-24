import React from 'react';
import { XYChart, LineSeries, Axis, Grid, Tooltip } from '@visx/xychart';
import useEconomicStore from '../store/economicStore';

interface DataPoint {
  date: string;
  value: number;
}

export const LaborChart: React.FC = () => {
  const { unemployment, participation } = useEconomicStore();

  return (
    <div className="h-[400px]">
      <XYChart
        height={400}
        xScale={{ type: 'time' }}
        yScale={{ type: 'linear' }}
      >
        <Grid columns={false} numTicks={5} />
        <Axis orientation="bottom" label="Date" />
        <Axis orientation="left" label="Unemployment Rate (%)" />
        <Axis orientation="right" label="Participation Rate (%)" />
        <LineSeries
          data={unemployment}
          dataKey="unemployment"
          xAccessor={(d) => new Date(d.date)}
          yAccessor={(d) => d.value}
          stroke="#dc2626"
        />
        <LineSeries
          data={participation}
          dataKey="participation"
          xAccessor={(d) => new Date(d.date)}
          yAccessor={(d) => d.value}
          stroke="#059669"
        />
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showSeriesGlyphs
          renderTooltip={({ tooltipData }) => (
            <div className="p-2">
              <strong>
                {new Date((tooltipData?.nearestDatum?.datum as DataPoint).date).toLocaleDateString()}
              </strong>
              <div>
                Unemployment: {(tooltipData?.nearestDatum?.datum as DataPoint).value.toFixed(1)}%
              </div>
              <div>
                Participation: {(tooltipData?.nearestDatum?.datum as DataPoint).value.toFixed(1)}%
              </div>
            </div>
          )}
        />
      </XYChart>
    </div>
  );
}; 