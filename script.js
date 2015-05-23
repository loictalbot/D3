var path, vis, xy;
 var width = 960,
    height = 1160;
xy = d3.geo.mercator().scale(2200).translate([250, 2310]);
 
path = d3.geo.path().projection(xy);
 
vis = d3.select("#vis").append("svg:svg").attr("width", 760).attr("height", 960);

d3.json("http://localhost/france2.json", function(err,json) {
  if (err) console.log(err);
  console.log (json.features);
  var fct = vis.append("svg:g")
	   .attr("class", "tracts")
	   .selectAll("path")
	   .data(json.features)
	   .enter()
	   .append("svg:path");
  
	   fct.attr("class", function(d) { return "region f" + d.properties.ID_1; });
	   fct.attr("id", function(d) { return "id_" + d.properties.ID_1; });
	   
	   fct.on("mouseover", function(d) {
		var hoveredItem = d3.select("#id_"+d.properties.ID_1);
		hoveredItem.style("fill", "#FF6600");
	   });
	   fct.on("mouseout", function(d) {
		var hoveredItem = d3.select("#id_"+d.properties.ID_1).style("opacity", 1);		
		hoveredItem.style("fill", "#3366CC");
	   });
	   fct.on("click", function(d) {
		console.log("you have clicked on "+d.properties.ID_1);
	   });
	   fct.attr("d", path);
	  // fct.attr("fill-opacity", 0.5);
	   //fct.attr("fill", "#FF6600");
	   fct.attr("stroke", "#222");
	return fct;
});