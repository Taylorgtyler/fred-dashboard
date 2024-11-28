import { scaleLinear, scaleTime } from '@visx/scale';
import { LinePath, AreaClosed, Circle } from '@visx/shape'; // Import Circle for data points
import { AxisLeft, AxisBottom } from '@visx/axis';
import { curveLinear } from '@visx/curve';
import { timeFormat } from 'd3-time-format';
import { useState } from 'react'; // Import useState for tooltip state management

interface DataPoint {
  DATE: string;
  [key: string]: any;
}

interface LineChartProps<TData extends DataPoint> {
  data: TData[];
  width?: number;
  height?: number;
  valueKey: keyof TData;
  title?: string;
  valueFormatter?: (value: number) => string;
  dateFormatter?: (date: Date) => string;
}

export function LineChart<TData extends DataPoint>({ 
  data,
  width = 800,
  height = 400,
  valueKey,
  title = '',
  valueFormatter = (value: number) => `$${(value / 1000).toFixed(0)}B`,
  dateFormatter = (date: Date) => timeFormat("%b %Y")(date),
}: LineChartProps<TData>) {
  // Chart margins
  const margin = { top: 40, right: 40, bottom: 60, left: 80 };

  // Dimensions
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Accessors
  const xAccessor = (d: TData) => new Date(d.DATE);
  const yAccessor = (d: TData) => Number(d[valueKey]);

  // Scales
  const xScale = scaleTime({
    range: [margin.left, innerWidth + margin.left],
    domain: [xAccessor(data[0]), xAccessor(data[data.length - 1])],
    nice: true,
  });

  const yScale = scaleLinear({
    range: [innerHeight + margin.top, margin.top],
    domain: [0, Math.max(...data.map(yAccessor))],
    nice: true,
  });

  // Tooltip state
  const [tooltipData, setTooltipData] = useState<{ date: string; value: number } | null>(null);

  return (
    <svg width={width} height={height} className="overflow-visible">
      {/* Area under the line */}
      <AreaClosed
        data={data}
        x={(d) => xScale(xAccessor(d))}
        y={(d) => yScale(yAccessor(d))}
        yScale={yScale}
        curve={curveLinear}
        fill="#e2e8f0"
      />

      {/* Line */}
      <LinePath
        data={data}
        x={(d) => xScale(xAccessor(d))}
        y={(d) => yScale(yAccessor(d))}
        stroke="#2563eb"
        strokeWidth={2}
        curve={curveLinear}
      />

      {/* Data Points */}
      {data.map((d, index) => (
        <Circle
          key={`data-point-${index}`}
          cx={xScale(xAccessor(d))}
          cy={yScale(yAccessor(d))}
          r={4} // Radius of the data point
          fill="#2563eb" // Color of the data point
          onMouseEnter={() => setTooltipData({ date: d.DATE, value: Number(d[valueKey]) })}
          onMouseLeave={() => setTooltipData(null)}
        />
      ))}

      {/* Tooltip */}
      {tooltipData && (
        <text
          x={xScale(xAccessor(data[data.findIndex(d => d.DATE === tooltipData.date)]))}
          y={yScale(tooltipData.value) - 10}
          textAnchor="middle"
          fontSize={12}
          fill="#1e293b"
        >
          {`${dateFormatter(new Date(tooltipData.date))}: ${valueFormatter(tooltipData.value)}`}
        </text>
      )}

      {/* Axes */}
      <AxisBottom
        scale={xScale}
        top={innerHeight + margin.top}
        tickFormat={(d) => dateFormatter(d as Date)}
        stroke="#64748b"
        tickStroke="#64748b"
        tickLabelProps={{
          fill: '#64748b',
          fontSize: 12,
          textAnchor: 'middle',
          dx: -10, // Adjusting the position to prevent overlap
        }}
        tickValues={data.map(xAccessor).filter((_, index) => index % 2 === 0)} // Show every other tick
      />

      <AxisLeft
        scale={yScale}
        left={margin.left}
        tickFormat={(value) => valueFormatter(Number(value))}
        stroke="#64748b"
        tickStroke="#64748b"
        tickLabelProps={{
          fill: '#64748b',
          fontSize: 12,
          textAnchor: 'end',
          dx: -4,
        }}
      />

      {/* Chart Title */}
      {title && (
        <text
          x={width / 2}
          y={margin.top / 2}
          textAnchor="middle"
          fontSize={16}
          fill="#1e293b"
        >
          {title}
        </text>
      )}
    </svg>
  );
}