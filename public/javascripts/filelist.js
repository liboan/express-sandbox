$(document).ready(function() {
	$("#newDir").click(newDir);
	$("#newFile").click(newFile);
});

function noExist(name) {
	$("li").each(function (index) {
		console.log(name + $(this).children().text() + " " + (name === $(this).children().text()));		
		if (name === $(this).children().text()) {
			//alert("TRUE!!!")
			return false;
		}
	});
	return true;
}

function newDir() {
	var name = prompt("Enter directory name: ");
	if (name !== null) {
		$.ajax({
			url: "/newDir",
			type: "POST",
			data: {
				"path": window.location.pathname + name
			},
			dataType: "text",
			success: function(data, textStatus, jqXHR) {
				alert("SUCCESS");
				console.log(data);
				location.reload();
				//console.log(data);
				/*$(document).ready(function() {
					$("#fileList").html(data);
				});*/
			},
			error: function (jqXHR, status, errorThrown) {
				alert("Error in newDir, status & errorThrown: " + status + ", " + errorThrown);
			}		
		});
	}
}

function newFile() {
	var name = prompt("Enter file name: ");
	if (name.indexOf(".txt") != -1 || name.indexOf(".html") != -1 || name.indexOf(".js") != -1 || name.indexOf(".css") != -1)  {
		if (/[^a-zA-Z0-9._-]/.test(name) || typeof name === 'undefined' || name === null) { //make sure no dots when making path
			alert("Make sure your file name contains only characters a-z and 0-9, and dashes or underscores.");			
		}

		else {
			$.ajax({
				url: "/newFile",
				type: "POST",
				data: {
					"path": window.location.pathname + name
				},
				dataType: "text",
				success: function(data, textStatus, jqXHR) {
					alert("SUCCESS");
					console.log(data);
					location.reload();
					//console.log(data);
					/*$(document).ready(function() {
						$("#fileList").html(data);
					});*/
				},
				error: function (jqXHR, status, errorThrown) {
					alert("Error in newFile, status & errorThrown: " + status + ", " + errorThrown);
				}		
			});
		}
	}
	else {
		alert("Make sure your file type is either .txt, .html, .js, or .css. ");
	}
}		
