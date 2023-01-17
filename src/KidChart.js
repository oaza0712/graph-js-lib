 // RENDERING FUNCTION
 function KidChart(typeOfChart, userData) {



  //DEFAULT DATA VALUES
  var data = {
    labels: userData.labels,
    datasets: [
      {
        label: "Type of fruit",
        data: userData.values,
        backgroundColor: [
          "rgba(93, 230, 0, 0.8)",
          "rgba(233, 148, 0, 0.8)",
          "rgba(255, 252, 0, 0.8)",
          "rgba(255, 5, 5, 0.8)",
        ],
        borderColor: [
          "rgba(93, 230, 0, 1)",
          "rgba(233, 148, 0, 1)",
          "rgba(255, 252, 0, 1)",
          "rgba(255, 5, 5, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };


  if (typeOfChart == "barPictogram" || typeOfChart == "piePictogram") {
    var data = {
      labels: userData.labels,
      datasets: [
        {
          label: "Type of fruit",
          data: userData.values,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderColor: [
            "rgba(93, 230, 0, 1)",
            "rgba(233, 148, 0, 1)",
            "rgba(255, 252, 0, 1)",
            "rgba(255, 5, 5, 1)",
          ],
          borderWidth: 5,
        },
      ],
    };
  }

  if (typeOfChart == "lineChart") {
    data = {
      labels: userData.labels,
      datasets: [
        {
          label: userData.labelDataset[0],
          data: userData.values,
          fill: false,
          backgroundColor: "rgba(93, 230, 0, 0.8)",
          borderColor: "rgba(93, 230, 0, 0.8)",
        },
      ],
    };
  }

  if (typeOfChart == "linePictogram") {
    data = {
      labels: userData.labels,
      datasets: [
        {
          label: userData.labelDataset[0],
          data: userData.values,
          fill: false,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderColor: "rgba(255, 255, 255, 0.1)",
        },
      ],
    };
  }

  //PLUGIN FOR EMOJI RENDERING
  const plugin = {
    id: "plugin",
    afterDatasetDraw(chart, args, options) {
      const {
        ctx,
        chartArea: { top, bottom, left, right, width, height },
        scales: { x, y },
      } = chart;

      ctx.save();

      if (
        typeOfChart == "piePictogram" ||
        typeOfChart == "pieTransition"
      ) {
        //CALCULATING WHICH PERCENTAGE OF PIE CHART EACH VALUE TAKES
        let angles = [];
        let sum = 0;
        for (let i = 0; i < userData.values.length; i++) {
          sum += userData.values[i];
        }
        for (let i = 0; i < userData.values.length; i++) {
          angles[i] = (userData.values[i] / sum) * 6.2831;
        }

        let current_angle = 4.71238898038 + angles[0] / 2;
        let max_width = 30;

        for (let i = 0; i < userData.values.length; i++) {

          let temp = Math.min(width / 3 / userData.values[i] - 5, 30);
          let size = temp;

          //DISABLING TOO SMALLL ICONS
          if (temp < 0) {
            size = Math.max(temp, 1);
            console.log("Icons don't fit on the chart.");

            userData.values[i] =
              (width / 2 -
                Math.ceil(
                  Math.sqrt(0.5 * size * 0.5 * size + (max_width * max_width) / 4))) / 6;
          }

          let a = 0.5 * size * 0.5 * size;
          let b = max_width * max_width;
          let radius = (width / 2 - Math.ceil(Math.sqrt(a + b / 4)) );
          
          for (let j = 0; j < Math.floor(userData.values[i]); j++) {

            ctx.font = `${size}px Arial`;
            ctx.fillText(
              userData.unicode[i],
              radius * Math.cos(current_angle) + width / 2 - size / 2,
              radius * Math.sin(current_angle) + width / 2 + max_width / 2,
              max_width
            );

            radius -= size + 5;
          }

          current_angle += angles[i] / 2 + angles[i + 1] / 2;
        }
      }

      if (
        typeOfChart == "barTransition" ||
        typeOfChart == "barPictogram"
      ) {
        let size = (y.getPixelForValue(0) - y.getPixelForValue(1)) / 1.5;

        for (let i = 0; i < userData.values.length; i++) {
          for (let j = 0; j<Math.floor(userData.values[i]); j++) {
            ctx.font = `${size}px Arial`;
            ctx.fillText(
              userData.unicode[i],
              x.getPixelForValue(i) - size / 2,
              y.getPixelForValue(j + 1) + size / 0.87,
              size
            );
          }
        }
      }



      if (
        typeOfChart == "lineTransition" ||
        typeOfChart == "linePictogram"
      ) {
        let size = (y.getPixelForValue(0) - y.getPixelForValue(1)) / 2.5;
        for (let i = 0; i < userData.values.length; i++) {
          for (let j = 0;j<Math.floor(userData.values[i]); j++) {
            let between =
              y.getPixelForValue(0) -
              y.getPixelForValue(userData.values[i]);

            ctx.font = `${size}px Arial`;
            if (j == 0) {
              ctx.fillText(
                userData.unicode[0],
                x.getPixelForValue(i) - size / 2,
                y.getPixelForValue(j + 1.5) + size,
                size
              );
            } else {
              ctx.fillText(
                userData.unicode[0],
                x.getPixelForValue(i) - size / 2,
                y.getPixelForValue(j + 1) + size * 0.5,
                size
              );
            }
          }
        }
      }
    },
  };

  var display = false;
  if (typeOfChart == "pieChart" || typeOfChart == "lineChart" ) {
    display = true;
  }

  // config
  const config = {
    type: userData.type,
    data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
    options: {
      plugins: {
        legend: {
          display: display,
        },
      },
    },
    plugins: [plugin],
  };

  // render init block

  const myKidChart = new Chart(
    document.getElementById(typeOfChart),
    config
  );
}