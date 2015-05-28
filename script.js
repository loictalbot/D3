var path, vis, xy;
 var width = 960,
    height = 1160;
xy = d3.geo.mercator().scale(2200).translate([250, 2310]);
 
path = d3.geo.path().projection(xy);
 
vis = d3.select("#vis").append("svg:svg").attr("width", 760).attr("height", 960);

function propagateLinks(name, cssClass) {
	$('#links').append("<div id='"+ cssClass+ "' class='leftCol'><a class='alink link_"+ cssClass+"' href='#'>"+name+"</a></div>");
}

function highLightOFF(id) {
	var hoveredItem = d3.select("#id_"+id).style("opacity", 1);		
	hoveredItem.style("fill", "#3366CC");
}

function highLightON(id) {
	var hoveredItem = d3.select("#id_"+id);
	hoveredItem.style("fill", "#FF6600");
}

d3.json("http://localhost/france2.json", function(err,json) {
  if (err) console.log(err);
  //console.log (json.features);
  var fct = vis.append("svg:g")
	   .attr("class", "tracts")
	   .selectAll("path")
	   .data(json.features)
	   .enter()
	   .append("svg:path");
  
	   fct.attr("class", function(d) {propagateLinks(d.properties.NAME_1, d.properties.ID_1); return "region f" + d.properties.ID_1; });
	   fct.attr("id", function(d) { return "id_" + d.properties.ID_1; });
	   fct.on("mouseover", function(d) {
	    d3.select(".link_"+d.properties.ID_1).style("text-decoration", "underline");
		highLightON(d.properties.ID_1);
	   });
	   fct.on("mouseout", function(d) {
		d3.select(".link_"+d.properties.ID_1).style("text-decoration", "none");
		highLightOFF(d.properties.ID_1);
	   });
	   fct.on("click", function(d) {
		console.log("you have clicked on "+d.properties.ID_1);
	   });
	   fct.attr("d", path);
	  // fct.attr("fill-opacity", 0.5);
	   //fct.attr("fill", "#FF6600");
	   fct.attr("stroke", "#222");
	   
	setupLinks();
	return fct;
});

function setupLinks() {
   $('.leftCol').hover(function() {
	  var thisId = $(this).attr('id');
	  console.log(thisId);
	  highLightON(thisId);
   });
   $('.leftCol').mouseout(function() {
	  var thisId = $(this).attr('id');
	  highLightOFF(thisId);
   });   
}