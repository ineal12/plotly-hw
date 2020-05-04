/***********************************************/
function optionChanged(newSample) {
    console.log(`Entering ${arguments.callee.name} [ ${newSample}]`)
    // Fetch new data each time a new sample is selected
    createBarchart(newSample)
    createBubbleChart(newSample);
    buildMetadata(newSample);
}
/***********************************************/
function buildMetadata(sample) {
    d3.json(`/metadata/${sample}`).then((data) => {
      var PANEL = d3.select("#sample-metadata");
      PANEL.html("");
      Object.entries(data).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key}: ${value}`);
      });

      // BONUS: Build the Gauge Chart
      buildGauge(data.WFREQ);
    });
  }

/***********************************************/
function createBubbleChart(sample) {d3.json(`/samples/${sample}`).then((data) => {
    var ids = data.otu_ids;
    var labels = data.otu_labels;
    var values = data.sample_values;


    // @TODO: Build a Bubble Chart using the sample data
    var LayoutBubble = {
      margin: { t: 0 },
      xaxis: { title: "Id's" }
      };

      var DataBubble = [
      {
        x: ids,
        y: values,
        text: labels,
        mode: "markers",
        marker: {
          color: ids,
          size: values,
          }
      }
    ];

    Plotly.plot("bubble", DataBubble, LayoutBubble);
    // write code to create the BubbleChart
    console.log(`Entering ${arguments.callee.name} [ ${sample}]`)
}

/***********************************************/
function createBarchart(sample) {
    // write code to create barchart
    console.log(`Entering ${arguments.callee.name} [ ${sample}]`)
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var arrayResult = samples.filter(object => object.id == sample);
        var result = arrayResult[0];
        var otuids = result.otu_ids;
        var values = result.sample_values;
        var otulabels = result.otu_labels;
        var layout = {
            title: "Bacteria Bar Chart"};

        var y = otuids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
            var barData = [
                {
                    y: y,
                    x: values.slice(0, 10).reverse(),
                    text: otulabels.slice(0, 10).reverse(),
                    type: "bar",
                    orientation: "h",
                }
            ];

            Plotly.newPlot("bar", barData, layout);
        });

};
  
    console.log(`Entering ${arguments.callee.name} [ ${sample}]`)

/***********************************************/
// Use D3 to select the dropdown menu
var dropdownMenu = d3.select("#selDataset");
// Assign the value of the dropdown menu option to a variable
var dataset = dropdownMenu.property("value");
var Samples = data_samples[dataset]["otu_ids"];
var Values = data_samples[dataset]["sample_values"];
var Labels = data_samples[dataset]["otu_labels"];
var filteredSamplesTopTen = data_samples[dataset]["otu_ids"].filter(filterData);
var filteredValuesTopTen = data_samples[dataset]["sample_values"].filter(filterData);
var demoData = incomingData["metadata"][dataset];
filteredSamplesTopTen.forEach((element, index) => {
  element = "OTU " + element;
  console.log(element);
  filteredSamplesTopTen[index] = element;
});
/***********************************************/

fillDropDown()