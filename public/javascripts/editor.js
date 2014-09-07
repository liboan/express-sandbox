//function to read file
function readFile() {
	var pathname = window.location.pathname;
	var requestPath = pathname.split("edit/").pop();
	console.log(requestPath);
	$.ajax({
		url: "sandbox-server.js",
		type: "POST",
		data: {"request":"readFile","path":requestPath },
		dataType: "text",
		success: function(data,textStatus, jqXHR) {
			console.log("Response code: " + jqXHR.status);

			if (jqXHR.status == 404) {
				$("#loading").html("There was an error. Check if the file exists.");
			}
			else {
				$("#filename").html("Filename: " + pathname.substring(pathname.lastIndexOf("/")+1,pathname.length));
				$("#fileText").css("display","block");
				$("#fileText").html(data);
				$("#loading").css("display", "none");
			}						
		},
		error: function(jqXHR,status,errorThrown) {
			//alert("Error in getScores, status & errorThrown: " + status + ", " + errorThrown);
			//alert("jqXHR status code: " + jqXHR.status);
			$("#loading").html("There was an error. Check if the file exists.");
		}
	});
}

//function to write file
function writeFile(data) {
	var pathname = window.location.pathname;
	var requestPath = pathname.split("edit/").pop();
	console.log(requestPath);
	console.log(data);
	$.ajax({
		url: "sandbox-server.js",
		type: "POST",
		data: {"request":"writeFile","path":requestPath,"data":data},
		dataType: "text",
		success: function(data, textStatus, jqXHR) {
			alert("Write successful! Your newly changed file will be opened in a popup.");
			window.open(pathname.replace("edit","files"));
		},
		error: function(jqXHR,status,errorThrown) {
			alert("Error writing file.");
			console.log("Error in getScores, status & errorThrown: " + status + ", " + errorThrown);
			console.log("jqXHR status code: " + jqXHR.status);
		}
	});
}

$(document).ready(readFile);
	$(document).ready(function() {
		$("#submit").click(function() {
			//alert("clicked");
			writeFile($("#fileText").val());
		});
});