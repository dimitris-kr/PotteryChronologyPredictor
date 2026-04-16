import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ModelVersion} from '../../../core/models/model';
import {EChartsOption} from 'echarts';
import {NgxEchartsDirective} from 'ngx-echarts';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-model-version-progress-chart',
    imports: [
        NgxEchartsDirective,
        MatRadioGroup,
        MatRadioButton,
        FormsModule
    ],
  templateUrl: './model-version-progress-chart.html',
  styleUrl: './model-version-progress-chart.scss',
})
export class ModelVersionProgressChart implements OnChanges{

    @Input({ required: true })
    versions: ModelVersion[] = [];

    @Input({ required: true })
    task!: string;

    selectedMetric: Metric = 'accuracy';

    chartOption: EChartsOption = {};

    ngOnChanges() {
        this.setDefaultMetric();
        this.buildChart();
    }

    setDefaultMetric() {
        if (this.task === 'classification') {
            this.selectedMetric = 'accuracy';
        } else {
            this.selectedMetric = 'mae';
        }
    }

    onMetricChange(metric: Metric) {
        this.selectedMetric = metric;
        this.buildChart();
    }

    buildChart() {
        if (!this.versions?.length) return;

        const xData = this.versions.map(v => v.version);

        const yData = this.versions.map(v => {
            switch (this.selectedMetric) {
                case 'accuracy':
                    return v.val_accuracy ? v.val_accuracy * 100 : null;
                case 'mae':
                    return v.val_mae ?? null;
                case 'sample_size':
                    return v.train_sample_size;
            }
        });

        const name = this.getMetricConfig();
        const color = '#D6614A';

        this.chartOption = {
            grid: {
                left: 40,
                right: 20,
                top: 20,
                bottom: 40
            },

            tooltip: {
                trigger: 'axis',
                formatter: (params: any) => {
                    const p = params[0];
                    return `
                        Version: <strong>${p.axisValue}</strong><br/>
                        ${name}: <strong>${this.formatValue(p.value)}</strong>
                    `;
                }
            },

            xAxis: {
                type: 'category',
                data: xData,
                axisLabel: {
                    rotate: 0
                },
                name: 'Version'
            },

            yAxis: {
                type: 'value',
                name: name,
            },

            series: [
                {
                    data: yData,
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 8,
                    lineStyle: {
                        width: 3,
                        color
                    },
                    itemStyle: {
                        color
                    },
                    areaStyle: {
                        opacity: 0.1,
                        color
                    }
                }
            ]
        };
    }

    getMetricConfig() {
        switch (this.selectedMetric) {
            case 'accuracy':
                return 'Accuracy (%)';
            case 'mae':
                return 'MAE';
            case 'sample_size':
                return 'Train Sample Size';
        }
    }

    formatValue(value: number) {
        if (value == null) return '-';

        if (this.selectedMetric === 'accuracy') {
            return value.toFixed(2) + '%';
        }

        if (this.selectedMetric === 'mae') {
            return value.toFixed(0) + ' years';
        }

        if (this.selectedMetric === 'sample_size') {
            return value.toLocaleString() + ' pottery items';
        }

        return value.toLocaleString();
    }
}

type Metric = 'accuracy' | 'mae' | 'sample_size';
