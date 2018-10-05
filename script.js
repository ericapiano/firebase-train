$(document).ready(function() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCVIGOfnzDHrdsjQIDT8a5EyW5quo1jXrc",
      authDomain: "train-scheduler-399b7.firebaseapp.com",
      databaseURL: "https://train-scheduler-399b7.firebaseio.com",
      projectId: "train-scheduler-399b7",
      storageBucket: "train-scheduler-399b7.appspot.com",
      messagingSenderId: "1028697634958"
    };
    firebase.initializeApp(config);
  
    var trainDatabase = firebase.database();
  
    $("#enterButton").on("click", function(event){
      event.preventDefault();
      var trainName = $("#name").val().trim();
      var trainDestination = $("#destination").val().trim();
      var trainTime = $("#time").val().trim();
      var trainFrequency = $("#frequency").val().trim();
  
      var addedTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
  
       }
  
       trainDatabase.ref().push(addedTrain);
       console.log(addedTrain.name)
       console.log(addedTrain.destination)
       console.log(addedTrain.time)
       console.log(addedTrain.frequency)
  
       $("#name").val("")
       $("#destination").val("")
       $("#time").val("")
       $("#frequency").val("")
  
    })

    trainDatabase.ref().on("child_added", function(childSnapshot, prevChildKey) {

      console.log(childSnapshot.val())

      var trainN = childSnapshot.val().name
      var destinationCity = childSnapshot.val().destination
      var timeIn = childSnapshot.val().time
      var frequencyMin = childSnapshot.val().frequency

      var timeArray = frequencyMin.split(":")
      var trainTime = moment().hours(timeArray[0]).minutes(timeArray[1]);
      var maxMoment = moment().max(moment(), trainTime);
      var trainMinutes;
      var trainArrival;

      if (maxMoment === trainTime) {
        trainArrival = trainTime.format("hh:mm A")
        trainMinutes = trainTime.diff(moment(), "minutes")

      } else {
        var differenceInTimes = moment().diff(trainTime, "minutes")
        var trainRemainder = differenceInTimes % frequencyMin
        trainMinutes = frequencyMin - trainRemainder
        trainArrival = moment().add(trainMinutes, "m").format("hh:mm A")
      
      }
      console.log(maxMoment);
      console.log(trainTime);
      console.log(trainRemainder);
      console.log(trainMinutes);
      console.log(trainArrival);



      $("#floatTable > tbody").append("<tr><td>" + trainN + "</td><td>" + destinationCity + "</td><td>" + timeIn + "</td><td>" + frequencyMin + "</td><td>" + trainArrival + "</td></tr>")



    })

    $("#clearButton").on("click", function(event){
      event.preventDefault();
      
      $("td").empty();
      
      })

  

})