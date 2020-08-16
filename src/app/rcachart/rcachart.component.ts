import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import * as d3 from 'd3';
import * as $ from 'jquery';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-rcachart',
  templateUrl: './rcachart.component.html',
  styleUrls: ['./rcachart.component.scss']
})
export class RCAchartComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: any) { }
dataList;
margin;
width;
height;
svg;
duration;
root;
tree;
nodes;
links;
isFullscreen=false;
  @ViewChild('opencloseDiv', {static: false})
  private chartContainer: ElementRef;

treeData =
  {
    "name": "CPU Load",
    "children": [
      { "name": "VM1"},
      { "name": "VM2" },
      { "name": "VM3" },
      { "name": "VM8" },
      { "name": "VM4"},
      { "name": "VM5" },
      { "name": "VM6" },
      { "name": "VM7" }
    ]
  };
  ngOnInit() {
  }
 

  toggleFullscreen(){
   // console.log("toggleFullscreen");
    const elem=this.chartContainer.nativeElement;
   // console.log(elem,"elem");
    //let elem=document.body;
   // let methodToBeInvoked=element1.requestFullScreen
   //$('svg').css('width',screen.width);
  // $('svg').css('height',screen.height);
  if (!this.isFullscreen ){
    this.isFullscreen=true;
      console.log("outside exit",this.isFullscreen);
   if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  }
  }
  else{
    this.isFullscreen=false;
    console.log("inside xit",this.isFullscreen);
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.msExitFullscreen) {
      this.document.msExitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      this.document.webkitExitFullscreen();
    }
  }

  }
setData(){
    // Set the dimensions and margins of the diagram
    const element=this.chartContainer.nativeElement;
    this.margin = {top: 50, right: 0, bottom: 50, left: 50};
    this.width = 280 - this.margin.left - this.margin.right;
    this.height = 300 - this.margin.top - this.margin.bottom;

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
    this.svg = d3.select(element).append('svg')
    .attr('width', this.width + this.margin.right + this.margin.left)
    .attr('height', this.height + this.margin.top + this.margin.bottom)
    .append('g')
    .attr('class','svgContainer')
    .attr('transform', 'translate('+ this.margin.left + ',' + this.margin.top + ')');

    this.duration = 750;

// declares a tree layout and assigns the size
    this.tree = d3.tree().size([this.height, this.width]);

// Assigns parent, children, height, depth
    this.root = d3.hierarchy(this.treeData, (d) => { return d.children; });
    this.root.x0 = this.height / 2;
    this.root.y0 = 0;

    // Collapse after the second level
   // this.root.children.forEach(collapse);

   this.updateChart1(this.root);

}

ngAfterViewInit(){
  this.setData();
  this.root.update=this.updateChart1;
  this.updateChart1(this.root);

}

updateChart1(source){
  let i=0;
  // Assigns the x and y position for the nodes
  this.treeData = this.tree(this.root);

  // Compute the new tree layout.
  this.nodes = this.root.descendants(),
  this.links = this.root.descendants().slice(1);

  // Normalize for fixed-depth.
  //this.nodes.forEach((d) => { d.y = d.depth * 180});
  this.nodes.forEach((d) => { d.y = d.depth * 120});//link length

  // ****************** Nodes section ***************************

  // Update the nodes...
  let node = this.svg.selectAll('g.node')
      .data(this.nodes, (d) =>{return d.id || (d.id = ++i); });

  // Enter any new modes at the parent's previous position.
  var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", (d) => {
        return 'translate(' + source.y0 + ',' + source.x0 + ')';
    })
    .on('click', this.click1.bind(this));

  // Add Circle for the nodes  .attr('r', 1e-6)
  nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style("fill", (d) => {
          return d._children ? 'lightsteelblue' : '#fff';
      });

  // Add labels for the nodes
  nodeEnter.append('text')
      .attr("x", (d) => {
        return d.children || d._children ? -13 : 13;
       })
      .attr("dy", ".35em")
      .attr("text-anchor", (d) => {
          return d.children || d._children ? "end" : "start";
      })
      .style('font', '8px sans-serif')
      .text((d) => { return d.data.name; });

  // UPDATE
  let nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(this.duration)
    .attr('transform', (d) => { 
        return 'translate(' + d.y + ',' + d.x + ')';
     });

  // Update the node attributes and style
  nodeUpdate.select('circle.node')
    .attr('r', 7)
    .style('stroke-width','2px')
    .style('stroke','steelblue')
    .style('fill', (d) => {
        return d._children ? "lightsteelblue" : "#fff";
    })
    .style('overflow','visible')
    .attr('cursor', 'pointer');
    nodeUpdate.select('node').style('overflow','visible');
    nodeUpdate.select('text').style('overflow','visible');

  // Remove any exiting nodes
  let nodeExit = node.exit().transition()
      .duration(this.duration)
      .attr("transform", (d) => {
          return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

  // On exit reduce the node circles size to 0
  nodeExit.select('circle')
    .attr('r', 1e-6);

  // On exit reduce the opacity of text labels
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // ****************** links section ***************************

  // Update the links...
  let link = this.svg.selectAll('path.link')
      .data(this.links, (d) => { return d.id; });

  // Enter any new links at the parent's previous position.
  let linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .style('fill','none')
      .style('stroke','#ccc')
      .style('stroke-width','2px')
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      });

  // UPDATE
  let linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate.transition()
      .duration(this.duration)
      .attr('d', (d) => { return diagonal(d, d.parent) });

  // Remove any exiting links
  let linkExit = link.exit().transition()
      .duration(this.duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();

  // Store the old positions for transition.
  this.nodes.forEach((d) => {
    d.x0 = d.x;
    d.y0 = d.y;
  });

  // Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {

    let path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`;

    return path;
  }
}

  // Toggle children on click.
  click1(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    this.updateChart1(d);
  }


// Collapse the node and all it's children
/*function collapse(d) {
  if(d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}*/
}
