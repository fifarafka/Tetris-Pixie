function keyboard() {
  var key = {};
  key.code = undefined;

  document.addEventListener('keydown', function(event) {
	  key.code = event.keyCode;
	  console.log('Key pressed: ' + event.keyCode);
  });

  key.reset = function() {
	  key.code = undefined;
  };
  return key;
}
