//helper functions, it turned out chrome doesn't support Math.sgn()
function signum(x) {
    return (x < 0) ? -1 : 1;
}
function absolute(x) {
    return (x < 0) ? -x : x;
}

function drawPath(svgContainer, svg, path, startX, startY, endX, endY, startElementSide, endElementSide) {
    // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)

    var deltaX = 20;
    var deltaY = 20;
    // for further calculations which ever is the shortest distance
    //var delta = deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);


    // set sweep-flag (counter/clock-wise)
    // if start element is closer to the left edge,
    // draw the first arc counter-clockwise, and the second one clock-wise
    var arc1 = 0; var arc2 = 1;
    if (startX > endX) {
        arc1 = 1;
        arc2 = 0;
    }
    // draw tha pipe-like path
    // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end
    if(endElementSide == "left"){
      if(startElementSide == "left"){
        path.setAttribute("d", "M" + startX + " " + startY +
            " V" + (startY + deltaY + 5) +
            " H" + (endX + deltaX) +
            " V" + (endY -5) +
            " H" + (endX - deltaX)
        );
      }else if(startElementSide == "right"){
        path.setAttribute("d", "M" + startX + " " + startY +
            " V" + (startY + deltaY) +
            " H" + (endX + 2* deltaX) +
            " V" + (endY) +
            " H" + (endX - deltaX)
        );
      }else if(startElementSide == 'center'){
        path.setAttribute("d", "M" + startX + " " + startY +
            " V" + (endY) +
            " H" + (endX)
        );
      }
    }else{
      if(startElementSide == "left"){
        path.setAttribute("d", "M" + startX + " " + startY +
            " V" + (startY + deltaY +10) +
            " H" + (endX - 2*deltaX) +
            " V" + (endY) +
            " H" + (endX + deltaX)
        );
      }else if(startElementSide == "right"){
        path.setAttribute("d", "M" + startX + " " + startY +
            " V" + (startY + deltaY) +
            " H" + (endX - deltaX) +
            " V" + (endY) +
            " H" + (endX + deltaX)
        );
      }else if(startElementSide == 'center'){
        path.setAttribute("d", "M" + startX + " " + startY +
            " V" + (endY) +
            " H" + (endX)
        );
      }
    }

}

function whichSide(svg, startElem){
  var svgWidth = svg.outerWidth();
  var svgStart = svg.offset().left;
  var svgMid = Math.floor(svg.outerWidth() / 2);
  var startElemMid = Math.floor(startElem.offset().left + startElem.outerWidth() / 2 - svgStart);

  if(startElemMid > svgMid && absolute(startElemMid - svgMid) > 20){
    return "right";
  } else if(startElemMid < svgMid && absolute(startElemMid - svgMid) > 20){
    return "left"
  } else if(startElemMid - svgMid <= 20){
    return "center"
  }
}

export function connectElements(svgContainer, svg, path, startElem, endElem) {
    
    if(!!!svgContainer) return;

    //if start element is not network
    if(startElem.data('type') !== "network"){
      var tempElem = startElem;
      startElem = endElem;
      endElem = tempElem;
    }

    startElem.addClass('connected');
    endElem.addClass('connected');
    startElem.attr("connection",[startElem.index(), endElem.index()]);
    endElem.attr("connection",[startElem.index(), endElem.index()]);
    
    

    // get (top, left) corner coordinates of the svg container
    var svgTop = svgContainer.offset().top;
    var svgLeft = svgContainer.offset().left;

    // get (top, left) coordinates for the two elements
    var startCoord = startElem.offset();
    var endCoord = endElem.offset();

    var startElementSide = whichSide(svgContainer, startElem);
    var endElementSide = whichSide(svgContainer, endElem);


    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point

    var startX = startCoord.left + 0.5 * startElem.outerWidth() - svgLeft;
    var startY = startCoord.top + startElem.outerHeight() - svgTop;

    //change end direction according to end element position
    if(endElementSide == "left"){
      // calculate path's end (x,y) coords
      var endX = endCoord.left + endElem.width() - svgLeft;
      var endY = endCoord.top + 0.5 * endElem.height() - svgTop;
    }else if(endElementSide == "right"){
      var endX = endCoord.left - svgLeft;
      var endY = endCoord.top + 0.5 * endElem.height() - svgTop;
    }

    // call function for drawing the path
    drawPath(svgContainer, svg, path, startX, startY, endX, endY, startElementSide, endElementSide);
}
