var up1 = true;
var up2 = true;
var up3 = true;
var up4 = true;
var up5 = true;
var up6 = true;
var up7 = true;
var counterBounce1 = 0;
var counterBounce2 = 0;
var counterBounce3 = 0;
var counterBounce4 = 0;
var counterBounce5 = 0;
var counterBounce6 = 0;
var counterBounce7 = 0;

function bounceTetramino(up, count, y) {
  if (up) {
    count++;
    if (count==20) {
      up = false;
    }
    y++;
    return y;
  } else {
    count--;
    if (count==0) {
      up = true;
    }
    y--;
    return y;
  }
}

function bounceTetramino1() {
  if (up1) {
    tetramino1.y++;
    counterBounce1++;
    if (counterBounce1==20) {
      up1 = false;
    }
  } else {
    tetramino1.y--;
    counterBounce1--;
    if (counterBounce1==0) {
      up1 = true;
    }
  }
}

function bounceTetramino2() {
  if (up2) {
    tetramino2.y++;
    counterBounce2++;
    if (counterBounce2==20) {
      up2 = false;
    }
  } else {
    tetramino2.y--;
    counterBounce2--;
    if (counterBounce2==0) {
      up2 = true;
    }
  }
}

function bounceTetramino3() {
  if (up3) {
    tetramino3.y++;
    counterBounce3++;
    if (counterBounce3==20) {
      up3 = false;
    }
  } else {
    tetramino3.y--;
    counterBounce3--;
    if (counterBounce3==0) {
      up3 = true;
    }
  }
}

function bounceTetramino4() {
  if (up4) {
    tetramino4.y++;
    counterBounce4++;
    if (counterBounce4==20) {
      up4 = false;
    }
  } else {
    tetramino4.y--;
    counterBounce4--;
    if (counterBounce4==0) {
      up4 = true;
    }
  }
}

function bounceTetramino5() {
  if (up5) {
    tetramino5.y++;
    counterBounce5++;
    if (counterBounce5==30) {
      up5 = false;
    }
  } else {
    tetramino5.y--;
    counterBounce5--;
    if (counterBounce5==0) {
      up5 = true;
    }
  }
}

function bounceTetramino6() {
  if (up6) {
    tetramino6.y++;
    counterBounce6++;
    if (counterBounce6==20) {
      up6 = false;
    }
  } else {
    tetramino6.y--;
    counterBounce6--;
    if (counterBounce6==0) {
      up6 = true;
    }
  }
}

  function bounceTetramino7() {
    if (up7) {
      tetramino7.y++;
      counterBounce7++;
      if (counterBounce7==25) {
        up7 = false;
      }
    } else {
      tetramino7.y--;
      counterBounce7--;
      if (counterBounce7==0) {
        up7 = true;
      }
    }
  }
