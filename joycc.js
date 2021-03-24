const { listConnectedJoyCons } = require("switch-joy-con");
const devices = listConnectedJoyCons();

var arDrone = require('ar-drone');
var client  = arDrone.createClient();

var s = 0.5;
var sport = 0;
var power = 0;

client.on('navdata', console.log);
console.log(devices);

const left = devices[0].open();


// Sportmodus (min)
left.on("down:minus", () => {
	
	if (sport == 0) {
		sport = 1;
		s = 1;
		
		console.log('sportmodus aan')
	}
	else if (sport == 1) {
		sport = 0;
		s = 0.5;
		
		console.log('sportmodus uit')	

	}
});


// Opstijgen en landen (screenshot):
left.on("down:screenshot", () => {
	
	if (power == 0) {
		power = 1;
		client.takeoff();
	}
	else if (power == 1) {
		power = 0;
		client.land();
	}
});


// Hoogte

// Stijgen (pijltje omlaag)
left.on("down:dpadRight", () => {
  client.up(s);
});
left.on("up:dpadRight", () => {
  client.stop();
  
// Dalen (pijltje omhoog)
});
left.on("down:dpadLeft", () => {
  client.down(s);
});
  left.on("up:dpadLeft", () => {
  client.stop();
});


// Animaties:

// Flip naar links (pijltje links)
left.on("down:dpadUp", () => {
  client.animate('flipLeft', 1000);
});

// Flip naar rechts (pijltje rechts)
left.on("down:dpadDown", () => {
  client.animate('flipRight', 1000);
});


// Herkalibreren
left.on("up:analogStickPress", () => {
  client.disableEmergency();
  power = 0;
});


// Draaien:

// Draai rechts (sr)
left.on("down:sr", () => {
  client.clockwise(s);
});
left.on("up:sr", () => {
  client.stop();
  
// Draai links (sl)
});
left.on("down:sl", () => {
  client.counterClockwise(s);
});
left.on("up:sl", () => {
  client.stop();
});


// Rondvliegen (joystick):
left.on("change:analogStick", value => {
  switch (value) {
    case left.Directions.UP: {
      
	  client.left(s)
      break;
    }
    case left.Directions.RIGHT: {
      
	  client.front(s)
      break;
    }
    case left.Directions.DOWN_RIGHT: {
      
	  client.right(s)
	  client.up(s)
      break;
    }
    case left.Directions.DOWN: {
     
	  client.right(s)
      break;
    }
    case left.Directions.DOWN_LEFT: {
 
	  client.right(s)
	  client.back(s)
      break;
    }
    case left.Directions.LEFT: {
      
	  client.back(s)
      break;
    }
    case left.Directions.UP_LEFT: {
      
	  client.left(s)
	  client.back(s)
      break;
    }
    case left.Directions.UP_RIGHT: {
     
	  client.left(s)
	  client.front(s)
      break;
    }
    case left.Directions.NEUTRAL: {
     
	  client.stop()
      break;
    }
  }
});


