import { useMemo, useCallback } from 'react';
import { AreaClosed, Line, Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleTime, scaleLinear } from '@visx/scale';
import { ParentSize } from '@visx/responsive';
import { AxisLeft } from '@visx/axis';
import { curveMonotoneX } from '@visx/curve';
import { withTooltip, TooltipWithBounds } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { bisector } from '@visx/vendor/d3-array';
import { timeFormat } from '@visx/vendor/d3-time-format';
import { GradientDarkgreenGreen } from '@visx/gradient';

interface DataItem {
  [key: string]: string | number;
}

interface AreaSeriesConfig {
  accessor: string;
  color: string;
  label: string;
}

interface AreaChartProps<T extends DataItem> {
  data: T[];
  xAccessor: (d: T) => string;
  series: AreaSeriesConfig[];
  events?: boolean;
}

interface ProvidedProps<T> {
  showTooltip: (args: { tooltipData: T; tooltipLeft: number; tooltipTop: number }) => void;
  hideTooltip: () => void;
  tooltipData?: T;
  tooltipLeft?: number;
  tooltipTop?: number;
}

const formatDate = timeFormat("%b '%y");

function AreaChartBase<T extends DataItem>({
  width,
  height,
  data,
  xAccessor,
  series,
  events = false,
  showTooltip,
  hideTooltip,
  tooltipData,
  tooltipLeft = 0,
  tooltipTop = 0,
}: AreaChartProps<T> & 
   { width: number; height: number } & 
   ProvidedProps<T>) {
  if (width < 10) return null;

  const margin = { top: 30, right: 30, bottom: 30, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = useMemo(() => {
    const dates = data.map(d => new Date(xAccessor(d)));
    return scaleTime({
      range: [0, innerWidth],
      domain: [Math.min(...dates.map(d => d.getTime())), Math.max(...dates.map(d => d.getTime()))]
    });
  }, [innerWidth, data, xAccessor]);

  const yScale = useMemo(() => {
    const maxValue = Math.max(
      ...series.map(s => Math.max(...data.map(d => Number(d[s.accessor]))))
    );
    return scaleLinear({
      range: [innerHeight, 0],
      domain: [0, maxValue * 1.1],
      nice: true,
    });
  }, [innerHeight, data, series]);

  const handleTooltip = useCallback(
    (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
      const { x } = localPoint(event) || { x: 0 };
      const x0 = xScale.invert(x - margin.left);
      const bisectDate = bisector<T, Date>((d) => new Date(xAccessor(d))).left;
      const index = bisectDate(data, x0);
      const d = data[index];

      if (d) {
        showTooltip({
          tooltipData: d,
          tooltipLeft: x,
          tooltipTop: margin.top + yScale(Number(d[series[0].accessor])),
        });
      }
    },
    [showTooltip, xScale, yScale, data, xAccessor, series, margin]
  );

  return (
    <svg width={width} height={height}>
      <GradientDarkgreenGreen id="background-gradient" />
      <rect width={width} height={height} fill="url(#background-gradient)" rx={14} />
      
      <Group left={margin.left} top={margin.top}>
        <AxisLeft
          scale={yScale}
          stroke="#fff"
          tickStroke="#fff"
          tickLabelProps={() => ({
            fill: '#fff',
            fontSize: 11,
            textAnchor: 'end',
            dx: -4,
          })}
        />

        {series.map((s, i) => (
          <Group key={s.accessor}>
            <GradientDarkgreenGreen
              id={`gradient-${i}`}
              fromOpacity={1}
              toOpacity={0}
            />
            <AreaClosed<T>
              data={data}
              x={d => xScale(new Date(xAccessor(d))) ?? 0}
              y={d => yScale(Number(d[s.accessor])) ?? 0}
              yScale={yScale}
              strokeWidth={2}
              stroke="#fff"
              fill={`url(#gradient-${i})`}
              curve={curveMonotoneX}
            />
          </Group>
        ))}

        {events && (
          <Bar
            width={innerWidth}
            height={innerHeight}
            fill="transparent"
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={hideTooltip}
          />
        )}

        {tooltipData && (
          <Line
            from={{ x: tooltipLeft - margin.left, y: 0 }}
            to={{ x: tooltipLeft - margin.left, y: innerHeight }}
            stroke="#333"
            strokeWidth={1}
            pointerEvents="none"
            strokeDasharray="5,2"
          />
        )}
      </Group>

      {tooltipData && (
        <TooltipWithBounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
          style={{
            backgroundColor: 'white',
            border: '1px solid #999',
            padding: '8px',
            borderRadius: '4px',
          }}
        >
          <div>
            <strong>{formatDate(new Date(xAccessor(tooltipData)))}</strong>
            {series.map(s => (
              <div key={s.accessor} style={{ color: s.color }}>
                {s.label}: {tooltipData[s.accessor]}
              </div>
            ))}
          </div>
        </TooltipWithBounds>
      )}
    </svg>
  );
}

function AreaChart<T extends DataItem>(props: AreaChartProps<T>) {
  const AreaChartWithTooltip = withTooltip<AreaChartProps<T> & { width: number; height: number }, T>(AreaChartBase);
  
  return (
    <ParentSize>
      {({ width, height }) => (
        <AreaChartWithTooltip
          width={width}
          height={height}
          {...props}
        />
      )}
    </ParentSize>
  );
}

export default AreaChart; 