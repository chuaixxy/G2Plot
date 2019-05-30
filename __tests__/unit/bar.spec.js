import { Bar } from '../../src';
import { expect } from 'chai';

describe('Bar plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  const data = [ {
    year: '1991',
    value: 31
  }, {
    year: '1992',
    value: 41
  }, {
    year: '1993',
    value: 35
  }, {
    year: '1994',
    value: 55
  }, {
    year: '1995',
    value: 49
  }, {
    year: '1996',
    value: 15
  }, {
    year: '1997',
    value: 17
  }, {
    year: '1998',
    value: 29
  }, {
    year: '1999',
    value: 33
  } ];

  it('初始化以及销毁', () => {
    const barPlot = new Bar(canvasDiv, {
      padding: 'auto',
      data,
      xField: 'value',
      yField: 'year',
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      }
    });
    barPlot.render();
    const positionField = barPlot.plot.get('elements')[0].get('position').fields;
    const isTransposed = barPlot.plot.get('coord').isTransposed;
    const axes = barPlot.plot.get('axisController').axes;

    expect(barPlot).to.be.instanceOf(Bar);
    expect(positionField[0]).to.be.equal('year');
    expect(positionField[1]).to.be.equal('value');
    expect(isTransposed).to.be.equal(true);
    expect(axes.length).to.be.equal(2);
    barPlot.destroy();
    expect(barPlot.plot.destroyed).to.be.true;
  });

  it('隐藏两个坐标轴', () => {
    const barPlot = new Bar(canvasDiv, {
      padding: 'auto',
      data,
      xField: 'value',
      yField: 'year',
      xAxis: {
        visible: false,
      },
      yAxis: {
        visible: false
      }
    });
    barPlot.render();
    const axes = barPlot.plot.get('axisController').axes;
    expect(axes.length).to.be.equal(0);
    barPlot.destroy();
    expect(barPlot.plot.destroyed).to.be.true;
  });

  it('x轴 样式', () => {
    const barPlot = new Bar(canvasDiv, {
      padding: 80,
      data,
      xField: 'value',
      yField: 'year',
      xAxis: {
        min: 5,
        nice: false,
        visible: true,
        tickCount: 5,
        formatter: (v) => {
          return v + 'abc';
        },
        style: {
          line: {
            visible: true,
            stroke: 'red',
          },
          tickLine: { visible: true, stroke: 'red' },
          label: { visible: true, fill: 'red', fontSize: 24 },
          title: {
            visible: true,
            textStyle: {
              fill: 'red',
              fontSize: 20
            }
          }
        }
      },
      yAxis: {
        visible: false
      }
    });
    barPlot.render();
    const axes = barPlot.plot.get('axisController').axes;
    expect(axes.length).to.be.equal(1);
    const axis = axes[0];
    const labels = axis.get('labelItems');
    expect(labels[0].text).to.be.include('abc');
    // style
    const line = axis.get('line');
    const tickLine = axis.get('tickLine');
    expect(line.stroke).to.be.equal('red');
    expect(tickLine.stroke).to.be.equal('red');
    expect(labels[0].textStyle.fill).to.be.equal('red');
    barPlot.destroy();
    expect(barPlot.plot.destroyed).to.be.true;
  });

  it('x轴 隐藏 grid line tick label', () => {
    const barPlot = new Bar(canvasDiv, {
      padding: 'auto',
      data,
      xField: 'value',
      yField: 'year',
      xAxis: {
        min: 5,
        nice: false,
        visible: true,
        tickCount: 5,
        style: {
          line: {
            visible: false,
            stroke: 'red',
          },
          grid: {
            visible: false,
          },
          tickLine: { visible: false, stroke: 'red' },
          label: { visible: false, fill: 'red', fontSize: 24 }
        }
      },
      yAxis: {
        visible: false
      }
    });
    barPlot.render();
    const axes = barPlot.plot.get('axisController').axes;
    expect(axes.length).to.be.equal(1);
    const axis = axes[0];
    // style
    const line = axis.get('line');
    const tickLine = axis.get('tickLine');
    expect(line).to.be.equal(null);
    expect(tickLine).to.be.equal(null);
    barPlot.destroy();
    expect(barPlot.plot.destroyed).to.be.true;
  });

  it('y轴 样式', () => {
    const barPlot = new Bar(canvasDiv, {
      padding: 'auto',
      data,
      xField: 'value',
      yField: 'year',
      yAxis: {
        min: 5,
        nice: false,
        visible: true,
        tickCount: 5,
        formatter: (v) => {
          return v + 'abc';
        },
        style: {
          line: {
            visible: true,
            stroke: 'red',
          },
          tickLine: { visible: true, stroke: 'red' },
          label: { visible: true, fill: 'red', fontSize: 24 }
        }
      },
      xAxis: {
        visible: false
      }
    });
    barPlot.render();
    const axes = barPlot.plot.get('axisController').axes;
    expect(axes.length).to.be.equal(1);
    const axis = axes[0];
    const labels = axis.get('labelItems');
    expect(labels[0].text).to.be.include('abc');
    // style
    const line = axis.get('line');
    const tickLine = axis.get('tickLine');
    expect(line.stroke).to.be.equal('red');
    expect(tickLine.stroke).to.be.equal('red');
    expect(labels[0].textStyle.fill).to.be.equal('red');
    barPlot.destroy();
    expect(barPlot.plot.destroyed).to.be.true;
  });

  it('y轴 隐藏 grid line tick label', () => {
    const barPlot = new Bar(canvasDiv, {
      padding: 'auto',
      data,
      xField: 'value',
      yField: 'year',
      yAxis: {
        min: 5,
        nice: false,
        visible: true,
        tickCount: 5,
        style: {
          line: {
            visible: false,
            stroke: 'red',
          },
          grid: {
            visible: false,
          },
          tickLine: { visible: false, stroke: 'red' },
          label: { visible: false, fill: 'red', fontSize: 24 },
        }
      },
      xAxis: {
        visible: false
      }
    });
    barPlot.render();
    const axes = barPlot.plot.get('axisController').axes;
    expect(axes.length).to.be.equal(1);
    const axis = axes[0];
    // style
    const line = axis.get('line');
    const tickLine = axis.get('tickLine');
    expect(line).to.be.equal(null);
    expect(tickLine).to.be.equal(null);
    barPlot.destroy();
    expect(barPlot.plot.destroyed).to.be.true;
  });

});
