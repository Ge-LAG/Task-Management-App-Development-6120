import React from 'react';
import ReactECharts from 'echarts-for-react';

const TaskChart = ({ tasks }) => {
  const completed = tasks.filter(task => task.completed).length;
  const pending = tasks.filter(task => !task.completed).length;

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      bottom: '0%',
      left: 'center'
    },
    series: [
      {
        name: 'Tasks',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { 
            value: completed, 
            name: 'Completed',
            itemStyle: { color: '#10b981' }
          },
          { 
            value: pending, 
            name: 'Pending',
            itemStyle: { color: '#f59e0b' }
          }
        ]
      }
    ]
  };

  if (tasks.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-500">
        <p>No data to display</p>
      </div>
    );
  }

  return (
    <ReactECharts 
      option={option} 
      style={{ height: '250px' }}
      opts={{ renderer: 'svg' }}
    />
  );
};

export default TaskChart;