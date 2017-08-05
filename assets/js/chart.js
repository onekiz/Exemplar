var ctx = document.getElementById('myChart').getContext('2d');

function populateChart (label, value) {
  console.log(label,value);
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: label,
      datasets: [{
        label: 'secs on topic',
        data: value,
        backgroundColor: [
          'rgba(255, 99, 132, 0.0)',
          'rgba(54, 162, 235, 0.0)',
          'rgba(255, 206, 86, 0.0)',
          'rgba(75, 192, 192, 0.0)',
          'rgba(153, 102, 255, 1.0)',
          'rgba(255, 159, 64, 1.0)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontSize: 20,
            fontColor: '#666'

          }
        }]
      }
    }
  });
}

firebase.database().ref('/users').on('value', function (data) {
  var keyz = firebase.auth().currentUser.uid;
  var dat = data.val();
  console.log(dat[keyz]);
  // array of all keys - users
  // selecting logged in user key
  var searchTerm = {};

  var label = [];
  var value = [];

  //loop through all keys and assign the value to time read
  for (key in dat[keyz].papers) {
    // searchTerm[key] = dat[keyz].papers[key].timeRead;
    label.push(key);
    value.push(dat[keyz].papers[key].timeRead);
  }
  console.log(searchTerm);

  populateChart(label, value);
  // console.log('chart',dat[keyz].papers);
  // populateChart()
});
