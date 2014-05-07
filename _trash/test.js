 Float32Array.prototype.avg = function() {
   var av = 0;
   var cnt = 0;
   var len = this.length;
   for (var i = 0; i < len; i++) {
     //if (this[i] !== 0) {
       var e = +this[i];

       if(!e && this[i] !== 0 && this[i] !== '0') e--;

       if (this[i] == e) {
         av += e; cnt++;
       }
     //}
   }
   return av/cnt;
 }
 
 
  navigator.getMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);

  navigator.getMedia (

     // constraints
     {
        video: false,
        audio: true
     },

     // successCallback
     function(localMediaStream) {
        var c = AudioContext();

        var mssource = c.createMediaStreamSource(localMediaStream);
        var analyser = c.createAnalyser();
        

        mssource.connect(analyser);
        mssource.connect(c.destination);
        
        var array = new Float32Array(analyser.frequencyBinCount);

        for (var a in analyser) {
          console.log(a);
        }
        setInterval(function() {
          //array = new Float32Array(analyser.frequencyBinCount);
          analyser.getFloatFrequencyData(array);
          var a = array.avg();
          document.body.innerHTML = a;     
        }, 1000/66);
        
        setInterval(function(){
          //console.log
          var c = AudioContext();
        
          var mssource = c.createMediaStreamSource(localMediaStream);
          var analyser = c.createAnalyser();
        
        
          mssource.connect(analyser);
          analyser.connect(c.destination);
          var array = new Float32Array(analyser.frequencyBinCount);
        }, 30000);
     },

     // errorCallback
     function(err) {
      console.log("The following error occured: " + err);
     }

  );