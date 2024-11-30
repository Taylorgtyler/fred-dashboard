import { useMemo } from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { GradientDarkgreenGreen } from '@visx/gradient';
import { scaleBand, scaleLinear } from '@visx/scale';
import { ParentSize } from '@visx/responsive';
import { AxisLeft } from '@visx/axis';

interface DataItem {
  [key: string]: string | number;
}

interface BarChartProps<T extends DataItem> {
  data: T[];
  xAccessor: (d: T) => string;
  yAccessor: (d: T) => number;
  events?: boolean;
}

function BarChartBase<T extends DataItem>({
  width,
  height,
  data,
  xAccessor,
  yAccessor,
  events = false,
}: BarChartProps<T> & { width: number; height: number }) {
  if (width < 10) return null;

  const margin = { top: 30, right: 30, bottom: 30, left: 50 };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // scales
  const xScale = useMemo(
    () => scaleBand<string>({
      range: [0, xMax],
      round: true,
      domain: data.map(d => formatDate(xAccessor(d))),
      padding: 0.4,
    }),
    [xMax, data, xAccessor]
  );

  const yScale = useMemo(
    () => scaleLinear<number>({
      range: [yMax, 0],
      round: true,
      domain: [0, Math.max(...data.map(d => Number(yAccessor(d)))) * 1.1],
    }),
    [yMax, data, yAccessor]
  );

  return (
    <svg width={width} height={height}>
      <GradientDarkgreenGreen id="teal" />
      <rect
        width={width}
        height={height}
        fill="url(#teal)"
        rx={14}
      />
      <Group left={margin.left} top={margin.top}>
        <AxisLeft
          scale={yScale}
          stroke="white"
          tickStroke="white"
          tickLabelProps={{
            fill: 'white',
            fontSize: 11,
            textAnchor: 'end',
            dx: -4,
          }}
        />
        {data.map((d, i) => {
          const xValue = formatDate(xAccessor(d));
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(Number(yAccessor(d))) ?? 0);
          const barX = xScale(xValue);
          const barY = yMax - barHeight;

          return (
            <Bar
              key={`bar-${i}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="rgba(255, 255, 255, 0.7)"
              onClick={() => {
                if (events) alert(`clicked: ${JSON.stringify(Object.values(d))}`);
              }}
            />
          );
        })}
      </Group>
    </svg>
  );
}

export default function BarChart<T extends DataItem>(props: BarChartProps<T>) {
  return (
    <ParentSize>
      {({ width, height }) => (
        <BarChartBase
          width={width}
          height={height}
          {...props}
        />
      )}
    </ParentSize>
  );
}