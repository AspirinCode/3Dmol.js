//Test rendering performance for different sized pdb's

var glviewer = null;

QUnit.config.autostart = false;

//Add profile option to QUnit header
QUnit.config.urlConfig.push({
	id: "profilecheck",
	label: "profile",
	value: "",
	tooltip: "Profile rendering"
});

var profile = QUnit.urlParams.profilecheck;
var resultXML = null;
var resultStr = "";

//QUnit-reporter hook to output test results in XML format
QUnit.jUnitReport = function(data) {

	resultXML = $.parseXML(data.xml);
	
	//Wrap XML result in JQuery object; parse and setup output string
	$result = $(resultXML);
	
	resultStr += "GLMol Performance Tests\n";
	var runTime = $result.find("testsuites").attr("time");
	var runDate = $result.find("testsuites").attr("timestamp");
	resultStr += "Total Test Time: " + runTime + " s\n";
	resultStr += "Date: " + runDate + "\n\n";
	
	$result.find("testsuite").each(function(){
		var moduleName = $(this).attr("name");
		var moduleTime = $(this).attr("time");
		resultStr += "\n" + moduleName;
		//alert(moduleName);
		$(this).find("testcase").each(function() {
			var testName = $(this).attr("name");
			var testTime = $(this).attr("time");
			resultStr += "\n\t" + testName + ":   " + testTime + " s";
			//alert(testName);
		});
		resultStr += "\n\tTotal:         " + moduleTime + " s\n";
	});
	
	//Set up a link to download test results
	$("#qunit-testresult").append("<br><a id='download'>Download</a>");
	var url = "data:text/plain;charset=utf-8," + encodeURIComponent(resultStr);
	
	$("#download").attr("download", "webgltest.log");
	$("#download").attr("href", url);
	//alert(resultStr);

};

var styleSpec = {"stick":{stick:{}}, "line":{line:{}}, "cross":{cross:{}}, "sphere":{sphere:{}}, "cartoon":{cartoon:{color:0x0000ff}}};

//test cases
var runtests = (function(profile) {

//Render stick - use some console logging
test("Stick Render", function() {
	var m = glviewer.getModel(0);
	var styleExpected = styleSpec["stick"];
	
	console.group("Stick Render");
	console.time("Stick render time: ");
	
	if (profile)
		console.profile();
	
	glviewer.setStyle({},styleExpected);
	glviewer.render();
	
	if (profile)
		console.profileEnd();
	
	console.timeEnd("Stick render time: ");
	console.groupEnd();
	
	//Should return first atom's style from our model
	var styleActual = m.selectedAtoms()[0].style;
	
	equal(JSON.stringify(styleActual), JSON.stringify(styleExpected), "Stick style set correctly");	
});

//Render cross - use some console logging
test("Cross Render", function() {
	var m = glviewer.getModel(0);
	var styleExpected = styleSpec["cross"];
	
	console.group("Cross Render");
	console.time("Cross render time: ");
	
	if (profile)
		console.profile();	
		
	glviewer.setStyle({},styleExpected);
	glviewer.render();

	if (profile)
		console.profileEnd();
			
	console.timeEnd("Cross render time: ");
	console.groupEnd();
	
	//Should return first atom's style from our model
	var styleActual = m.selectedAtoms()[0].style;
	
	equal(JSON.stringify(styleActual), JSON.stringify(styleExpected), "Cross style set correctly");	
});

//Render sphere - use some console logging
test("Sphere Render", function() {
	var m = glviewer.getModel(0);
	var styleExpected = styleSpec["sphere"];
	
	console.group("Sphere Render");
	console.time("Sphere render time: ");

	if (profile)
		console.profile();
		
	glviewer.setStyle({},styleExpected);
	glviewer.render();

	if (profile)
		console.profileEnd();
			
	console.timeEnd("Sphere render time: ");
	console.groupEnd();
	
	//Should return first atom's style from our model
	var styleActual = m.selectedAtoms()[0].style;
	
	equal(JSON.stringify(styleActual), JSON.stringify(styleExpected), "Sphere style set correctly");	
});

//Render cartoon - use some console logging
test("Cartoon Render", function() {
	var m = glviewer.getModel(0);
	var styleExpected = styleSpec["cartoon"];
	
	console.group("Cartoon Render");
	console.time("Cartoon render time: ");

	if (profile)
		console.profile();
			
	glviewer.setStyle({},styleExpected);
	glviewer.render();

	if (profile)
		console.profileEnd();
			
	console.timeEnd("Cartoon render time: ");
	console.groupEnd();
	
	//Should return first atom's style from our model
	var styleActual = m.selectedAtoms()[0].style;
	
	equal(JSON.stringify(styleActual), JSON.stringify(styleExpected), "Cartoon style set correctly");	
});


});


//TESTS

//moldata 1



QUnit.module( "A. Bovine Calbindin, 76 res (1YCR)", {
	
	setupOnce: function() {
		console.group("Calbindin (76 res)");
		console.log("Testing first molecule");
		glviewer.removeAllModels();
		var moldata = $("#moldata_1").val();
		console.log("moldata length: " + moldata.length);
		var m = glviewer.addModel(moldata, "pdb");
		glviewer.mapAtomProperties(WebMol.partialCharges);
		glviewer.zoomTo();
		glviewer.render();
	},
		
	teardownOnce: function() {		
		console.groupEnd();
	}
	
});

runtests(profile);

//moldata 2

QUnit.module( "B. Cathodic Hemoglobin, 143 res (2AA1)", {
	
	setupOnce: function() {
		glviewer.removeAllModels();
		stop();
   		$.get("test_structs/2AA1.pdb", function(data) {				
	      		glviewer.addModel(data, "pdb");
	      		glviewer.zoomTo();
	      		glviewer.render();
	      		start();
   		}, "text");
   		console.groupEnd();
   		console.group("Hemoglobin (143 res)");
	},
	
	teardownOnce: function() {
		console.groupEnd();
	}
});

runtests(profile);

//moldata 3

QUnit.module( "C. Calicivirus Capsid, 534 res (3M8L)", {
	
	setupOnce: function() {
		console.log("Testing third molecule");
		glviewer.removeAllModels();
		stop();
   		$.get("test_structs/3M8L.pdb", function(data) {
	      		glviewer.addModel(data, "pdb");
	      		glviewer.zoomTo();
	      		glviewer.render();
	      		start();
   		}, "text");
   		console.groupEnd();
   		console.group("Capsid (534 res)");
	},
		
	teardownOnce: function() {
		console.groupEnd();
		//glviewer.removeAllModels();
	}
});

runtests(profile);





