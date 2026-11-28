import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import type { Observable } from "rxjs";

export function createXYChart(root: am5.Root) {
  return am5xy.XYChart.new(root, {
    panX: true,
    wheelX: "panX",
    wheelY: "zoomX",
    cursor: am5xy.XYCursor.new(root, {}),
    maxTooltipDistance: 0,
    autoAppear: true,
    appearDuration: 1000,
    appearDelay: 100,
  });
}

export function createXlabel(root: am5.Root, text: string) {
  return am5.Label.new(root, {
    text: text,
    fontSize: 14,
    fontWeight: "bold",
    x: am5.percent(50),
    centerX: am5.percent(50),
    paddingTop: 10,
  });
}

export function createYlabel(root: am5.Root, text: string) {
  return am5.Label.new(root, {
    text: text,
    fontSize: 14,
    fontWeight: "bold",
    rotation: -90,
    x: am5.percent(50),
    centerX: am5.percent(50),
    y: am5.percent(50),
    centerY: am5.percent(50),
    marginRight: 30,
  });
}

export const seriesAnimationConfig: am5.ISeriesSettings = {
  autoAppear: true,
  appearDuration: 1000,
  appearDelay: 100,
  interpolationDuration: 1000,
  interpolationEasing: am5.ease.out(am5.ease.cubic),
  sequencedInterpolation: true,
};

export abstract class BasicChart<T> {
  protected root: am5.Root;
  protected chart: am5xy.XYChart;
  protected xAxis: am5xy.Axis<am5xy.AxisRendererX>;
  protected yAxis: am5xy.Axis<am5xy.AxisRendererY>;

  protected readonly data: T[];

  constructor(rootId: string, data: T[], xLabel: string, yLabel: string) {
    this.data = data;
    this.root = am5.Root.new(rootId);
    this.chart = this.root.container.children.push(createXYChart(this.root));
    this.xAxis = this.chart.xAxes.push(this.createxAxis());
    this.xAxis.children.push(createXlabel(this.root, xLabel));
    this.yAxis = this.chart.yAxes.push(this.createyAxis());
    this.yAxis.children.unshift(createYlabel(this.root, yLabel));
    this.createSeries();
    this.filters()?.subscribe((state) => this.updateSeries(state));
  }

  protected abstract createxAxis(): am5xy.Axis<am5xy.AxisRendererX>;
  protected abstract createyAxis(): am5xy.Axis<am5xy.AxisRendererY>;

  protected abstract filters(): Observable<unknown> | null;
  protected abstract createSeries(): void;
  protected abstract updateSeries(state: unknown): void;
}

export abstract class BasicTimeSeriesChart<T> extends BasicChart<T> {
  createxAxis(): am5xy.DateAxis<am5xy.AxisRendererX> {
    return am5xy.DateAxis.new(this.root, {
      baseInterval: { timeUnit: "year", count: 1 },
      gridIntervals: [{ timeUnit: "year", count: 1 }],
      renderer: am5xy.AxisRendererX.new(this.root, {}),
    });
  }

  createyAxis(): am5xy.ValueAxis<am5xy.AxisRendererY> {
    return am5xy.ValueAxis.new(this.root, {
      min: 0,
      autoAppear: true,
      appearDuration: 1000,
      appearDelay: 100,
      interpolationDuration: 500,
      renderer: am5xy.AxisRendererY.new(this.root, {}),
    });
  }
}
