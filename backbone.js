fetch('https://berkeley.collegescheduler.com/api/terms/2017%20Spring/schedules/generate', {
    method: 'post',
    credentials: 'include',
    headers: {
      "Content-type": "application/json",
      "x-newrelic-id": "UAMHUFJRGwIHUFVVAQQB",
      "x-requested-with": "XMLHttpRequest",
      //"x-xsrf-token": "t-kntfg73vPZjehvBpYbU6stDWjEHmuZ5QxwO3Y-i5fasc3t-K7TEIl-vuu-Dei5RNwwIyI5czYz6CBYG-jvywsRYLI1"
      "x-xsrf-token": $("input[name='__RequestVerificationToken']").val()
    },
    body: {"currentSections":[],"term":"2017 Spring","courses":["365973"],"breaks":[],"cartSections":[],"padding":0} //These can be changed to be populuated from what the student themselves selects, but we didn't want to have 1000s of cases when writing the code
  })
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(ids(data));
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

function ids(list_of_schedules){
  id_numbers = []
  schedules = list_of_schedules.schedules;
  for (var i=0; i<schedules.length; i++){
    schedule = schedules[i].combination;
    id_numbers2 = [];
    for (var j=0; j<schedule.length; j++){
      index = schedule[j].length-5;
      q = schedule[j].substring(index);
      // var formData = new FormData(document.getelementbyid(SSR_SSENRL_CART));
      // formData.append('DERIVED_REGFRM1_CLASS_NBR', q)
      fetch('https://bcsweb.is.berkeley.edu/psc/bcsprd/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES_2.SSR_SSENRL_CART.GBL', {
          method: 'post',
          credentials: 'include',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: "new FormData(document.getElementById(SSR_SSENRL_CART)).append('DERIVED_REGFRM1_CLASS_NBR', q)"
        })
        .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }

            // Examine the text in the response
            response.text().then(function(data) {
              console.log(data);
              var teacher = document.getelementbyid('win0divDERIVED_CLS_DTL_SSR_INSTR_LONG$0').value;
              console.log(teacher); //this is just an example of the data that we could get
            });
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
      id_numbers2.push(schedule[j].substring(index));
    }
    id_numbers.push(id_numbers2);
  }
  return id_numbers
}
