import {Component, Input, SimpleChanges} from '@angular/core';
import {NgxEchartsDirective} from "ngx-echarts";
import {ClassificationBreakdown, RegressionBreakdown, RegressionPrediction} from '../../../core/models/prediction';
import {EChartsOption} from 'echarts';
import {getColor} from '../../../core/utils/helpers';

@Component({
    selector: 'app-regression-breakdown-chart',
    imports: [
        NgxEchartsDirective
    ],
    templateUrl: './regression-breakdown-chart.html',
    styleUrl: './regression-breakdown-chart.scss',
})
export class RegressionBreakdownChart {
    @Input({required: true})
    breakdown!: RegressionPrediction;

    option!: EChartsOption;

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.breakdown) return;

        this.buildOption();
    }



    private buildOption(): void {
        this.option = {
            grid: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            },

            xAxis: {
                type: 'value',
                min: this.breakdown.ci_lower - 2,
                max: this.breakdown.ci_upper + 2,
                axisLine: {show: false},
                axisTick: {show: false},
                axisLabel: {
                    color: '#9A9A9A',
                },
                splitLine: {
                    lineStyle: {
                        color: '#E5DED7'
                    }
                }
            },

            yAxis: {
                type: 'category',
                data: [''],
                axisLine: {show: false},
                axisTick: {show: false},
                axisLabel: {show: false}
            },

            series: [
                {
                    name: 'Confidence Interval',
                    type: 'line',
                    data: [
                        [this.breakdown.ci_lower, 0],
                        [this.breakdown.ci_upper, 0]
                    ],
                    lineStyle: {
                        color: '#CDC9C6',
                        width: 4
                    },
                    symbol: 'circle',
                    symbolSize: 12,
                    itemStyle: {
                        color: '#CDC9C6',
                    },
                    label: {
                        show: true,
                        position: 'top',
                        color: '#CDC9C6',
                        fontWeight: 400
                    },
                    z: 0
                },

                /**
                 * Prediction line
                 */
                {
                    name: 'STD',
                    type: 'line',
                    data: [
                        [this.breakdown.prediction - this.breakdown.std, 0],
                        [this.breakdown.prediction + this.breakdown.std, 0]
                    ],
                    lineStyle: {
                        color: '#ABA9A7',
                        width: 4
                    },
                    symbol: 'circle',
                    symbolSize: 12,
                    itemStyle: {
                        color: '#ABA9A7',
                    },
                    label: {
                        show: true,
                        position: 'top',
                        color: '#ABA9A7',
                        fontWeight: 400
                    },
                    z: 50
                },

                /**
                 * Prediction point
                 */
                {
                    name: 'Prediction Value',
                    type: 'scatter',
                    data: [[this.breakdown.prediction, 0]],
                    symbolSize: 16,
                    itemStyle: {
                        color: '#D6614A',
                        opacity: 1,
                    },
                    label: {
                        show: true,
                        position: 'top',
                        color: '#D6614A',
                        fontWeight: 600
                    },
                    z: 100
                }
            ],

            tooltip: {
                trigger: 'item',
                confine: true,
                formatter: (params: any) => {
                    const value = params.value?.[0];

                    switch (params.seriesName) {
                        case 'Confidence Interval': {
                            const label =
                                params.dataIndex === 0
                                    ? 'Lower bound'
                                    : 'Upper bound';

                            return `
          <strong>95% Confidence Interval</strong><br/>
          ${label}: ${value}<br/>
          <br/>
          <span style="color:#999">
            Range: ${this.breakdown.ci_lower} → ${this.breakdown.ci_upper}
          </span>
        `;
                        }

                        case 'STD': {
                            const label =
                                params.dataIndex === 0
                                    ? 'Prediction − STD'
                                    : 'Prediction + STD';

                            return `
          <strong>Model Uncertainty (STD)</strong><br/>
          ${label}: ${value}<br/>
          <br/>
          <span style="color:#999">
            STD = ±${this.breakdown.std} years
          </span>
        `;
                        }

                        case 'Prediction Value':
                            return `
          <strong>Prediction</strong><br/>
          ${this.breakdown.prediction}<br/>
          <br/>
          <span style="color:#999">
            Central estimate
          </span>
        `;

                        default:
                            return '';
                    }
                }
            }
        };
    }
}
