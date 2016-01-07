
/////////////////////////////////////////////////////////////////////////////////
/* 
 - Get response text
*/
function RestClient () {
	this.url = ""
	this.httpRequest;
	this.responseHandler = function () {}
	this.sendRequest = function (url, method, params) {
		var isAsync = true;
		httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = this.responseHandler;
		httpRequest.open(method, url, isAsync);
		httpRequest.send(params)
	}
}
/////////////////////////////////////////////////////////////////////////////////
function MarkDownToHtmlConveter () {
	// The rendered html text
	this.html = "";
	// Extend RestClient class
	this.prototype = new RestClient();
	// The url to the markdown api
	this.url = "https://api.github.com/markdown/raw";
	/***********************************************************
		param markdown - The markdown to be rendered into html
		return The rendered html text
	************************************************************/
	this.toHtml = function (markdown) {
		// Use github markdown api to convert to html
		this.prototype.sendRequest (this.url, "POST", markdown);
	}
	this.prototype.responseHandler = function () {
		if (httpRequest.readyState === XMLHttpRequest.DONE) {
			if (httpRequest.status === 200) {
				this.html = httpRequest.responseText;
				updateHtmlView (this.html);
			} else {
				alert ("There was a problem with the request");
			}
		}
	}
}

/////////////////////////////////////////////////////////////////////////////////
/************************************************
	Get the markdown from textbox
	return The markdown text from the textbox
*************************************************/
function getMarkdown () {
	return document.getElementById("markdown").value
}

/*************************************************
	Update the html when the user clicks transform
	param html The html text used to update the view
**************************************************/
function updateHtmlView(html) {
	document.getElementById ("rendered").innerHTML = html;
	document.getElementById("code").value =html;
}

/////////////////////////////////////////////////////////////////////////////////
function testing () {
	var converter = new MarkDownToHtmlConveter();
	var markdown = getMarkdown();
	//var markdown = "# DataTables plug-in for jQuery\n"+""+"DataTables is a table enhancing plug-in for the [jQuery](//jquery.com) Javascript library, adding sorting, paging and filtering abilities to plain HTML tables with minimal effort. The stated goal of DataTables is:"+""+"> To enhance the accessibility of data in HTML tables."+""+"To meet this goal, DataTables is developed with two distinct groups of users in mind:"+""+"* You the developers using DataTables. For developers DataTables provides a wide array of options for how data should be obtained, displayed and acted upon, along with an extensive API for accessing and manipulating the table."+""+"* End users. For those using the interface DataTables presents, actions to get the most from the information contained in tables, such as sorting and filtering, along with paging and scrolling of the data in table, are easy to use, intuitive and fast."+""+""+"## Installation"+""+"In most cases, to use DataTables all you need to do is include jQuery, the DataTables Javascript and DataTables CSS files in your HTML page. See the [DataTables manual](http://datatables.net/manual/installation#Including-Javascript-/-CSS) for details on how to do this using the latest version of DataTables."+""+""+"## Usage"+""+"In its simplest case, DataTables can be initialised with a single line of Javascript:"+""+"```js"+"$('table').dataTable();"+"```"+""+"where the jQuery selector is used to obtain a reference to the table you want to enhance with DataTables. Optional configuration parameters can be passed in to DataTables to have it perform certain actions by using a configuration object as the parameter passed in to the DataTables constructor. For example:"+""+"```js"+"$('table').dataTable( {"+"  paginate: false,"+"  scrollY: 300"+"} );"+"```"+""+"will disable paging and enable scrolling."+""+"A full list of the options available for DataTables are available in the [documentation](//datatables.net)."+""+""+"## Documentation"+""+"Full documentation of the DataTables options, API and plug-in interface are available on the [DataTables web-site](//datatables.net). The site also contains information on the wide variety of plug-ins that are available for DataTables, which can be used to enhance and customise your table even further."+""+""+"## Support"+""+"Support for DataTables is available through the [DataTables forums](//datatables.net/forums) and [commercial support options](//datatables.net/support) are available."+""+""+"## License"+""+"DataTables is release under the [MIT license](//datatables.net/license). You are free to use, modify and distribute this software, as long as the copyright header is left intact (specifically the comment block which starts with `/*!`."+""+""
	//console.log(markdown);
	converter.toHtml(markdown);

	// Run experimental code

	//scratchPad();
}

function scratchPad () {
	myRestClient = new RestClient();
	myRestClient.doRestStuff = function () {
		sendRequest ("https://api.github.com/zen", "GET", null);
	}
	myRestClient.responseHandler = function () {
		console.log(this.httpRequest.responseText);
	}

	myRestClient.doRestStuff();

}
