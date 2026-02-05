import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ClassificationBreakdown} from '../../../core/models/prediction';
import {EChartsOption} from 'echarts';
import {NgxEchartsDirective} from 'ngx-echarts';
import {getColor} from '../../../core/utils/helpers';

@Component({
  selector: 'app-classification-breakdown-chart',
    imports: [
        NgxEchartsDirective
    ],
  templateUrl: './classification-breakdown-chart.html',
  styleUrl: './classification-breakdown-chart.scss',
})
export class ClassificationBreakdownChart implements OnChanges{
    @Input({ required: true })
    breakdown!: ClassificationBreakdown;

    option!: EChartsOption;

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.breakdown) return;

        this.buildOption();
    }

    private buildOption(): void {
        const data = Object.entries(this.breakdown.probabilities)
            .map(([name, value]) => ({
                name,
                value,
                itemStyle: {
                    color: getColor(name) ?? '#ccc',
                },
            }))
            .sort((a, b) => b.value - a.value);

        this.option = {
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {d}%',
            },

            legend: {
                orient: 'vertical',
                right: 10,
                top: 'middle',
                type: 'scroll',
                formatter: (name: string) => {
                    const item = data.find(d => d.name === name);
                    if (!item) return name;

                    const percent = Math.round(item.value * 100);
                    return `${name}  ${percent}%`;
                },
            },

            series: [
                {
                    type: 'pie',
                    radius: ['60%', '90%'], // donut
                    center: ['35%', '50%'],
                    avoidLabelOverlap: false,
                    padAngle: 1,

                    label: {
                        show: false,
                        position: 'center',
                    },

                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 16,
                            fontWeight: 'bold',
                            formatter: '{b}\n{d}%',
                        },
                    },

                    labelLine: {
                        show: false,
                    },

                    data,
                },
            ],
        };
    }
}
