import { Chart } from 'chart.js/auto'
import { Colors } from 'chart.js';
import {draw, generate} from 'patternomaly'

(async function() {
 

  var myChart = new Chart(
    document.getElementById('acquisitions').getContext('2d'),
    {
      type:'bar',
      data: {
        labels:['jabuke', 'kruske', 'slijeve', 'banane'],
        datasets: [{
          data: [45, 25, 20, 10],
          backgroundColor:  [pattern.draw('square', 'rgb(206, 70, 10, 1)'),  pattern.draw('circle', 'rgb(206, 70, 10, 1)'),
          pattern.draw('diamond','rgb(206, 70, 10, 1)'), pattern.draw('triangle', 'rgb(206, 70, 10, 1)')],
          /*
          borderColor: 'rgba(206, 70, 10, 1)',
          backgroundColor:'rgba(206, 70, 10, 1)',
         ,
          backgroundColor:'rgba(206, 70, 10, 1)',
*/
          /*
          backgroundColor:  pattern.draw('square', 'rgba(206, 70, 10, 1)'),
          backgroundColor:       pattern.draw('circle', 'rgba(206, 70, 10, 1)'),
            backgroundColor:  pattern.draw('diamond','rgba(206, 70, 10, 1)'),
            backgroundColor:       pattern.draw('triangle', 'rgba(206, 70, 10, 1)'),
      */
          label: 'Number of differetn types of fruit'
        }]
      }
    }
  );

})();

function Barchart(){

  let _this = this;
  let labelsArray = [];
  let dataAray = [];


}