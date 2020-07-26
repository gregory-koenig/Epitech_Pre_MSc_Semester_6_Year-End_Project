import React, { Component } from 'react';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import { Card, CardBody, CardColumns, CardHeader } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

const bar = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Scan per month in 2020',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 2,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [0, 0, 0, 0, 0, 2, 20, 0, 0, 0, 0, 0],
    },
  ],
};

const bar2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Attack per month in 2020',
      backgroundColor: 'rgba(63,191,127,0.2)',
      borderColor: 'rgba(63,191,127,1)',
      borderWidth: 2,
      hoverBackgroundColor: 'rgba(63,191,127,0.4)',
      hoverBorderColor: 'rgba(63,191,127,1)',
      data: [0, 0, 0, 0, 0, 0, 10, 67, 14, 33, 3, 23],
    },
  ],
};

const doughnut = {
  labels: [
    'High',
    'Medium',
    'Low',
  ],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
    }],
};

const pie = {
  labels: [
    'XSS',
    'SQL Injection',
    'Misconfigurations',
  ],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
    }],
};

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}

class Charts extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <CardColumns className="cols-2">
          <Card>
            <CardHeader>
              Number of scan
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Bar data={bar} options={options} />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              Severity of detected vulnerability
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Doughnut data={doughnut} />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              Number of attack
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Bar data={bar2} options={options} />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              Type of vulnerability
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Pie data={pie} />
              </div>
            </CardBody>
          </Card>

        </CardColumns>
      </div>
    );
  }
}

export default Charts;
