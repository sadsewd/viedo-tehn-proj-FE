import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function SensorsChart({ data }: { data: any[] }) {
  const dataset = React.useMemo(() => {
    if (!data?.length) return [];

    const parsed = data.map((row) => ({
      datums: new Date(row.datums),
      apgaismojums: row.apgaismojums,
    }));

    const smoothedValues = smoothSeries(
      parsed.map((d) => d.apgaismojums),
      0.3,
    );

    return parsed.map((row, i) => ({
      ...row,
      apgaismojums: smoothedValues[i],
    }));
  }, [data]);

  function smoothSeries(values: number[], delta = 0.2): number[] {
    if (!values.length) return [];

    const smoothed = [values[0]];

    for (let i = 1; i < values.length; i++) {
      const b = values[i];
      const a = smoothed[i - 1];
      const ab = a - b;

      const c =
        b < a
          ? b - Math.abs(ab) * delta // samazināšana
          : b + Math.abs(ab) * delta; // palielināšana

      smoothed.push(c);
    }

    return smoothed;
  }

  return (
    <LineChart
      dataset={dataset}
      xAxis={[
        {
          dataKey: 'datums',
          scaleType: 'time',
          label: 'Datums',
        },
      ]}
      series={[
        {
          dataKey: 'apgaismojums',
          label: 'Apgaismojums (%)',
          showMark: false,
        },
      ]}
      height={350}
    />
  );
}
