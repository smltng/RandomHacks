<!doctype html>
<html>
<head>
	<title></title>
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script src="js/bootstrap.js"></script>
  
  <script src="//www.parsecdn.com/js/parse-1.6.7.min.js"></script>
</head>
<body>
	
  <div id="main">
    <p>works</p>
  </div>

  <input type="text" id="name">
  <button type="submit" id="btn-submit">Submit</button>

  
  <script>
    Parse.initialize("z9ajnPiKmHIXc05vn7bojsGlH1gRVBIElbF0XcgU", "s8EsAA7ZNUab0UYTCYDOP20LylqYaKeaTyAFdsKm");
  </script>

  <script>
    var btnSubmit = document.getElementById('btn-submit');
    
    btnSubmit.onclick = function () {
      var textField = document.getElementById('name');

      var Label = Parse.Object.extend("Label");
      var labelObj = new Label();

      labelObj.set("name", textField.value);
      
      labelObj.save(null, {
        success: function(labelObj) {
          // Execute any logic that should take place after the object is saved.
          alert('New object created with objectId: ' + labelObj.id);
        },
        error: function(labelObj, error) {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          alert('Failed to create new object, with error code: ' + error.message);
        }
      });
    }  
  </script>

</body>
</html>

