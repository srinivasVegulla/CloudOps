import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins from "@amcharts/amcharts4/plugins/forceDirected";
import { CopsService } from '../service.component';
declare var $: any;

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-topology',
  templateUrl: './topology.component.html',
  styleUrls: ['./topology.component.scss']
})
export class TopologyComponent implements OnInit {

  constructor(private copsService: CopsService) { }

  initialData;
  hostcount;
  finalDataPrepared = [];
  hostArr = [];
  isLoading;
  menuListObjects = [
    {
      "displayName": "VM",
      "imagePath": "assets/images/topology/VM.png",
      "classesToBeAdded": "vmColor"
    },
    {
      "displayName": "Host",
      "imagePath": "assets/images/topology/Host1x.png",
      "classesToBeAdded": "hostColor"
    },
    {
      "displayName": "Cluster",
      "imagePath": "assets/images/topology/Cluster1.png",
      "classesToBeAdded": "clusterColor"
    },
  ]
  ngOnInit() {
    this.isLoading = true;
  }

  ngAfterViewInit() {
    this.hostStatus();
  }

  hostStatus() {
    this.copsService.getHostStatus().subscribe((response) => {
      console.log("hoststatus", response);
      this.initialData = response;
      this.hostcount = this.initialData.hypervisors.length;
      this.finalDataPrepared["hypervisors"] = [];
      for (let i = 0; i < this.initialData["hypervisors"].length; i++) {
        this.finalDataPrepared["hypervisors"][i] = this.initialData["hypervisors"][i];
      }

      console.log("hi finalDataPrepared", this.finalDataPrepared);
      this.vminfo();
    });
  }

  vminfo() {
    this.copsService.getVmInfo().subscribe((response) => {
      console.log("respponseVmInfo", response);
      let vminfo = response;
      this.drawChart(vminfo);
    });
  }

  drawChart(vmInfoObj) {
    for (let i = 0; i < this.finalDataPrepared["hypervisors"].length; i++) {
      this.finalDataPrepared["hypervisors"][i].vminfo = [];
      for (let j = 0; j < vmInfoObj["vminfo"].length; j++) {
        if (this.finalDataPrepared["hypervisors"][i]["hypervisor_hostname"] == vmInfoObj["vminfo"][j]["OS-EXT-SRV-ATTR:hypervisor_hostname"]) {
          this.finalDataPrepared["hypervisors"][i].vminfo.push(vmInfoObj["vminfo"][j]);
        }
      }
    }

    var vmArr = [];
    for (let i = 0; i < this.finalDataPrepared["hypervisors"].length; i++) {
      for (let j = 0; j < this.finalDataPrepared["hypervisors"][i].vminfo.length; j++) {
        let color = (this.finalDataPrepared["hypervisors"][i].vminfo[j].status == 'ACTIVE') ? 'rgb(12,100,6)' : 'red'
        var vmObj = {
          "name": this.finalDataPrepared["hypervisors"][i].vminfo[j].name,
          "value": 1,
          "color": color,
          "Running": (this.finalDataPrepared["hypervisors"][i].vminfo[j].status == 'ACTIVE' ? 'RUNNING': 'DOWN'),
          "status": this.finalDataPrepared["hypervisors"][i].vminfo[j].status,
          "image": "assets/images/topology/VM.png"
        }
        vmArr.push(vmObj);
      }

      var hostObj = {
        "name": this.finalDataPrepared["hypervisors"][i]["hypervisor_hostname"],
        "image": "assets/images/topology/Host1x.png",
        "count": this.finalDataPrepared["hypervisors"][i]["vminfo"].length,
        "namegroup": "VMs",
        "color": "rgb(110,10,100)",
        "children": vmArr
      }
      this.hostArr.push(hostObj);
      vmArr = [];
    }

    am4core.ready(function () {
      setTimeout(function () {
        $("g[aria-labelledby]").remove();
      }, 50);
    });

    let chart = am4core.create("chartdiv1", am4plugins.ForceDirectedTree);
    chart.align = "left";
    chart.contentAlign = "left";
    chart.rotation = 360;

    // Create series
    var series = chart.series.push(new am4plugins.ForceDirectedSeries());
    // series.legendSettings.labelText = "[bold]{name} [/]";
    series.maxLevels = 1;
    series.valign = "middle";

    series.data = [
      {
        "name": "CloudOps",
        "image": "assets/images/topology/Cluster1.png",
        "count": this.hostArr.length,
        "namegroup": "Hosts",
        "color": "rgb(223,82,134)",
        "children": this.hostArr
      }
    ];

    // Configure icons
    var icon = series.nodes.template.createChild(am4core.Image);
    icon.propertyFields.href = "image";
    icon.horizontalCenter = "middle";
    icon.verticalCenter = "middle";
    //size of image
    icon.width = 20;
    icon.height = 20;

    //icon.fill=am4core.color("red").lighten(0.5);
    //icon.maskRectangle;

    series.nodes.template.expandAll = false;

    // Set up data fields
    series.dataFields.value = "value";
    series.dataFields.name = "name";
   // series.dataFields.status = "status";
    series.dataFields.children = "children";
    series.dataFields.color = "color";

    // series.nodes.template.tooltipText = "{name}:{value}  {namegroup}:{count}";

    // series.nodes.template.fillOpacity = 0.7;
    series.nodes.template.strokeOpacity = 0.7;
    //series.nodes.template.
    series.manyBodyStrength = -20;

    // series.minRadius = am4core.percent(2);

    //link width
    series.links.template.strength = 1;
    series.links.template.strokeWidth = 3;

    // Add labels
    // series.nodes.template.label.text = "{name}";
    // series.nodes.template.label.truncate = true;

    //size of text
    series.fontSize = 5;

    //radius around icon
    series.minRadius = 13;
    series.maxRadius = 35;
    // series.nodes.template.outerCircle.radius=50;
    // series.nodes.template.circle.radius=10;

    //distance of nodes from center
    series.centerStrength = 0.5;

    //series.x=10;
    //series.y=108;

    // Configure circles
    series.nodes.template.circle.disabled = false;
    series.nodes.template.outerCircle.disabled = false;
    //  series.nodes.template.r      
    /* var mask = new am4core.RoundedRectangle();
     mask.x=10;
     mask.y=10;
     icon.mask = mask;   */



    series.tooltip.getFillFromObject = false;
    series.tooltip.background.fill = am4core.color("#fff");
    series.tooltip.getStrokeFromObject = true;

    //series.tooltip.background.stroke = am4core.color("color");
    series.tooltip.label.fill = am4core.color("#000");

    series.nodes.template.adapter.add("tooltipHTML", function (text, target) {
      if (target.dataItem) {
        switch (target.dataItem.level) {
          case 0:
            return "<div><span style='font-weight:bold'>Cluster: {name} </span>  {namegroup}:<span style='color: green'>{count}</span></div>";
          case 1:
            return "<div><span style='font-weight:bold'>Host: {name} </span>  {namegroup}:<span style='color: green'>{count}</span></div>";
          case 2:
            return `<h5 style='font-weight:bold'>VM: {name} </h5>
                       <div >STATUS : <span style='font-weight:bold'>{status}</span></div>
                       <div >SERVICE : <span style='font-weight:bold'> {Running}</span></div>`;
        }
      }
      return text;
    });

    this.isLoading = false;
  }

  getColor(obj) {
    return obj['classesToBeAdded'];
  }
}


