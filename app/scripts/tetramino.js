function tetramino() {

	var tetraminoI = []
	var tetraminoT = [];
	var tetraminoO = [];
	var tetraminoL = [];
	var tetraminoJ = [];
	var tetraminoS = [];
	var tetraminoZ = [];


  tetraminoO[0] = ['0','0','0','0'];
  tetraminoO[1] = ['0','2','2','0'];
  tetraminoO[2] = ['0','2','2','0'];
  tetraminoO[3] = ['0','0','0','0'];

  tetraminoI[0] = ['0','2','0','0'];
  tetraminoI[1] = ['0','2','0','0'];
  tetraminoI[2] = ['0','2','0','0'];
  tetraminoI[3] = ['0','2','0','0'];

  tetraminoL[0] = ['0','2','0','0'];
  tetraminoL[1] = ['0','2','0','0'];
  tetraminoL[2] = ['0','2','2','0'];
  tetraminoL[3] = ['0','0','0','0'];

  tetraminoJ[0] = ['0','0','2','0'];
  tetraminoJ[1] = ['0','0','2','0'];
  tetraminoJ[2] = ['0','2','2','0'];
  tetraminoJ[3] = ['0','0','0','0'];

  tetraminoS[0] = ['0','0','0','0'];
  tetraminoS[1] = ['0','2','2','0'];
  tetraminoS[2] = ['2','2','0','0'];
  tetraminoS[3] = ['0','0','0','0'];

  tetraminoZ[0] = ['0','0','0','0'];
  tetraminoZ[1] = ['2','2','0','0'];
  tetraminoZ[2] = ['0','2','2','0'];
  tetraminoZ[3] = ['0','0','0','0'];

  tetraminoT[0] = ['0','0','0','0'];
  tetraminoT[1] = ['2','2','2','0'];
  tetraminoT[2] = ['0','2','0','0'];
  tetraminoT[3] = ['0','0','0','0'];


switch(Math.floor((Math.random() * 7) + 1)) {
    case 1:
      return tetraminoI;
      break;
    case 2:
      return tetraminoO;
      break;
    case 3:
      return tetraminoJ;
      break;
    case 4:
      return tetraminoL;
      break;
    case 5:
      return tetraminoS;
      break;
    case 6:
      return tetraminoZ;
      break;
    case 7:
      return tetraminoT;
      break;
	}
}
