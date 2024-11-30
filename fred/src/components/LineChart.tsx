import { scaleLinear, scaleTime } from '@visx/scale';
import { LinePath, Circle } from '@visx/shape'; // Import Circle for data points
import { AxisLeft, AxisBottom } from '@visx/axis';
import { curveLinear } from '@visx/curve';
import { timeFormat } from 'd3-time-format';
import { useState, useEffect, useRef } from 'react'; // Import useState and useRef for tooltip state management

interface DataPoint {
  DATE: string;
  [key: string]: any;
}

interface LineChartProps<TData extends DataPoint> {
  data: TData[];
  valueKey: keyof TData;
  title?: string;
  valueFormatter?: (value: number) => string;
  dateFormatter?: (date: Date) => string;
}

export function LineChart<TData extends DataPoint>({ 
  data,
  valueKey,
  title = '',
  valueFormatter = (value: number) => `$${(value / 1000).toFixed(0)}B`,
  dateFormatter = (date: Date) => timeFormat("%b %Y")(date),
}: LineChartProps<TData>) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        setDimensions({
          width: svgRef.current.clientWidth,
          height: svgRef.current.clientHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial dimensions

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Chart margins
  const margin = { top: 40, right: 40, bottom: 60, left: 80 };

  // Dimensions
  const innerWidth = dimensions.width - margin.left - margin.right;
  const innerHeight = Math.max(dimensions.height - margin.top - margin.bottom, 200); // Set a minimum height of 200

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
    <svg ref={svgRef} width="100%" height="100%" className="overflow-visible">

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
          x={dimensions.width / 2}
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